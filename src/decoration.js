"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDecorationPlugin = void 0;
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_view_1 = require("prosemirror-view");
const actions_1 = require("./actions");
const types_1 = require("./types");
const utils_1 = require("./utils");
const inactiveSuggestionState = {
    active: false,
    decorations: prosemirror_view_1.DecorationSet.empty,
};
function actionFromEvent(event) {
    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            return event.key;
        case 'Tab':
        case 'Enter':
            return types_1.ActionKind.select;
        case 'Escape':
            return types_1.ActionKind.close;
        default:
            return null;
    }
}
function cancelIfInsideAndPass(view) {
    const plugin = utils_1.pluginKey.get(view.state);
    const { decorations } = plugin.getState(view.state);
    if ((0, utils_1.inSuggestion)(view.state.selection, decorations)) {
        (0, actions_1.closeAutocomplete)(view);
    }
    return false;
}
function getDecorationPlugin(reducer) {
    const plugin = new prosemirror_state_1.Plugin({
        key: utils_1.pluginKey,
        view() {
            return {
                update: (view, prevState) => {
                    var _a, _b, _c, _d;
                    const prev = plugin.getState(prevState);
                    const next = plugin.getState(view.state);
                    const started = !prev.active && next.active;
                    const stopped = prev.active && !next.active;
                    const changed = next.active && !started && !stopped && prev.text !== next.text;
                    const action = {
                        view,
                        trigger: (_a = next.trigger) !== null && _a !== void 0 ? _a : prev.trigger,
                        filter: (_b = next.text) !== null && _b !== void 0 ? _b : prev.text,
                        range: (_c = next.range) !== null && _c !== void 0 ? _c : prev.range,
                        type: (_d = next.type) !== null && _d !== void 0 ? _d : prev.type,
                    };
                    if (started)
                        reducer(Object.assign(Object.assign({}, action), { kind: types_1.ActionKind.open }));
                    if (changed)
                        reducer(Object.assign(Object.assign({}, action), { kind: types_1.ActionKind.filter }));
                    if (stopped)
                        reducer(Object.assign(Object.assign({}, action), { kind: types_1.ActionKind.close }));
                },
            };
        },
        state: {
            init: () => (Object.assign({}, inactiveSuggestionState)),
            apply(tr, state) {
                var _a;
                const meta = tr.getMeta(plugin);
                if ((meta === null || meta === void 0 ? void 0 : meta.action) === 'add') {
                    const { trigger, search, type } = meta;
                    const from = tr.selection.from - trigger.length - ((_a = search === null || search === void 0 ? void 0 : search.length) !== null && _a !== void 0 ? _a : 0);
                    const to = tr.selection.from;
                    const attrs = Object.assign(Object.assign({}, utils_1.DEFAULT_DECO_ATTRS), type === null || type === void 0 ? void 0 : type.decorationAttrs);
                    const deco = prosemirror_view_1.Decoration.inline(from, to, attrs, {
                        inclusiveStart: false,
                        inclusiveEnd: true,
                    });
                    return {
                        active: true,
                        trigger: meta.trigger,
                        decorations: prosemirror_view_1.DecorationSet.create(tr.doc, [deco]),
                        text: search !== null && search !== void 0 ? search : '',
                        range: { from, to },
                        type,
                    };
                }
                const { decorations } = state;
                const nextDecorations = decorations.map(tr.mapping, tr.doc);
                const hasDecoration = nextDecorations.find().length > 0;
                // If no decoration, explicitly remove, or click somewhere else in the editor
                if ((meta === null || meta === void 0 ? void 0 : meta.action) === 'remove' ||
                    !(0, utils_1.inSuggestion)(tr.selection, nextDecorations) ||
                    !hasDecoration)
                    return inactiveSuggestionState;
                const { active, trigger, type } = state;
                // Ensure that the trigger is in the decoration
                const { from, to } = nextDecorations.find()[0];
                const text = tr.doc.textBetween(from, to);
                if (!text.startsWith(trigger))
                    return inactiveSuggestionState;
                return {
                    active,
                    trigger,
                    decorations: nextDecorations,
                    text: text.slice(trigger.length),
                    range: { from, to },
                    type,
                };
            },
        },
        props: {
            decorations: (state) => plugin.getState(state).decorations,
            handlePaste: (view) => cancelIfInsideAndPass(view),
            handleDrop: (view) => cancelIfInsideAndPass(view),
            handleKeyDown(view, event) {
                var _a, _b;
                const { trigger, active, decorations, type } = plugin.getState(view.state);
                if (!active || !(0, utils_1.inSuggestion)(view.state.selection, decorations))
                    return false;
                const { from, to } = decorations.find()[0];
                const text = view.state.doc.textBetween(from, to);
                // Be defensive, just in case the trigger doesn't exist
                const filter = text.slice((_a = trigger === null || trigger === void 0 ? void 0 : trigger.length) !== null && _a !== void 0 ? _a : 1);
                const checkCancelOnSpace = (_b = type === null || type === void 0 ? void 0 : type.cancelOnFirstSpace) !== null && _b !== void 0 ? _b : true;
                if (checkCancelOnSpace &&
                    filter.length === 0 &&
                    (event.key === ' ' || event.key === 'Spacebar')) {
                    (0, actions_1.closeAutocomplete)(view);
                    // Take over the space creation so no other input rules are fired
                    view.dispatch(view.state.tr.insertText(' ').scrollIntoView());
                    return true;
                }
                if (filter.length === 0 && event.key === 'Backspace') {
                    (0, prosemirror_inputrules_1.undoInputRule)(view.state, view.dispatch);
                    (0, actions_1.closeAutocomplete)(view);
                    return true;
                }
                const kind = actionFromEvent(event);
                const action = {
                    view,
                    trigger,
                    filter,
                    range: { from, to },
                    type,
                };
                switch (kind) {
                    case types_1.ActionKind.close:
                        // The user action will be handled in the view code above
                        // Allows clicking off to be handled in the same way
                        return (0, actions_1.closeAutocomplete)(view);
                    case types_1.ActionKind.select: {
                        // Only trigger the cancel if it is not expliticly handled in the select
                        const result = reducer(Object.assign(Object.assign({}, action), { kind: types_1.ActionKind.select }));
                        if (result === types_1.KEEP_OPEN)
                            return true;
                        return result || (0, actions_1.closeAutocomplete)(view);
                    }
                    case types_1.ActionKind.up:
                    case types_1.ActionKind.down:
                        return Boolean(reducer(Object.assign(Object.assign({}, action), { kind })));
                    case types_1.ActionKind.left:
                    case types_1.ActionKind.right:
                        if (!(type === null || type === void 0 ? void 0 : type.allArrowKeys))
                            return false;
                        return Boolean(reducer(Object.assign(Object.assign({}, action), { kind })));
                    default:
                        break;
                }
                return false;
            },
        },
    });
    return plugin;
}
exports.getDecorationPlugin = getDecorationPlugin;
//# sourceMappingURL=decoration.js.map