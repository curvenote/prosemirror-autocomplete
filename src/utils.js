"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inSuggestion = exports.pluginKey = exports.DEFAULT_DECO_ATTRS = exports.DEFAULT_ID = void 0;
const prosemirror_state_1 = require("prosemirror-state");
exports.DEFAULT_ID = 'autocomplete';
exports.DEFAULT_DECO_ATTRS = { id: exports.DEFAULT_ID, class: exports.DEFAULT_ID };
exports.pluginKey = new prosemirror_state_1.PluginKey(exports.DEFAULT_ID);
function inSuggestion(selection, decorations) {
    return decorations.find(selection.from, selection.to).length > 0;
}
exports.inSuggestion = inSuggestion;
//# sourceMappingURL=utils.js.map