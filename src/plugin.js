"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autocomplete = exports.defaultReducer = void 0;
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const types_1 = require("./types");
const decoration_1 = require("./decoration");
const inputRules_1 = require("./inputRules");
function defaultReducer(options) {
    return (action) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        switch (action.kind) {
            case types_1.ActionKind.open:
                return (_b = (_a = options.onOpen) === null || _a === void 0 ? void 0 : _a.call(options, action)) !== null && _b !== void 0 ? _b : false;
            case types_1.ActionKind.close:
                return (_d = (_c = options.onClose) === null || _c === void 0 ? void 0 : _c.call(options, action)) !== null && _d !== void 0 ? _d : false;
            case types_1.ActionKind.up:
            case types_1.ActionKind.down:
            case types_1.ActionKind.left:
            case types_1.ActionKind.right:
                return (_f = (_e = options.onArrow) === null || _e === void 0 ? void 0 : _e.call(options, action)) !== null && _f !== void 0 ? _f : false;
            case types_1.ActionKind.filter:
                return (_h = (_g = options.onFilter) === null || _g === void 0 ? void 0 : _g.call(options, action)) !== null && _h !== void 0 ? _h : false;
            case types_1.ActionKind.select:
                return (_k = (_j = options.onSelect) === null || _j === void 0 ? void 0 : _j.call(options, action)) !== null && _k !== void 0 ? _k : false;
            default:
                return false;
        }
    };
}
exports.defaultReducer = defaultReducer;
function autocomplete(opts = {}) {
    const options = Object.assign({ triggers: [], reducer: defaultReducer(opts) }, opts);
    const { reducer, triggers } = options;
    const plugin = (0, decoration_1.getDecorationPlugin)(reducer);
    const rules = [
        plugin,
        (0, prosemirror_inputrules_1.inputRules)({
            // Create an input rule for each trigger
            rules: triggers.map((type) => (0, inputRules_1.createInputRule)(plugin, type)),
        }),
    ];
    return rules;
}
exports.autocomplete = autocomplete;
//# sourceMappingURL=plugin.js.map