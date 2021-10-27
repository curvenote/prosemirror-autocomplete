"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autocomplete = void 0;
const prosemirror_inputrules_1 = require("prosemirror-inputrules");
const decoration_1 = require("./decoration");
const inputRules_1 = require("./inputRules");
const defaultOptions = {
    reducer: () => false,
    triggers: [],
};
function autocomplete(opts = {}) {
    const options = Object.assign(Object.assign({}, defaultOptions), opts);
    const { reducer: handler, triggers } = options;
    const plugin = (0, decoration_1.getDecorationPlugin)(handler);
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