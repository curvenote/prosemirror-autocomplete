"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInputRule = void 0;
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const utils_1 = require("./utils");
function createInputRule(plugin, type) {
    const trigger = typeof type.trigger === 'string'
        ? RegExp(`(?:^|\\s|\\n|[^\\d\\w])(${type.trigger.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})$`)
        : type.trigger;
    return new prosemirror_inputrules_1.InputRule(trigger, (state, match) => {
        const { decorations } = plugin.getState(state);
        // If we are currently suggesting, don't activate
        if ((0, utils_1.inSuggestion)(state.selection, decorations))
            return null;
        // We are taking over the text input here
        const tr = state.tr.insertText(match[1][match[1].length - 1]).scrollIntoView();
        const meta = { action: 'add', trigger: match[1], type };
        tr.setMeta(plugin, meta);
        return tr;
    });
}
exports.createInputRule = createInputRule;
//# sourceMappingURL=inputRules.js.map