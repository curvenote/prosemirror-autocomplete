"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeAutocomplete = exports.openAutocomplete = void 0;
const utils_1 = require("./utils");
function openAutocomplete(view, trigger, filter) {
    // TODO: Can activate a type?
    const plugin = utils_1.pluginKey.get(view.state);
    const meta = { action: 'add', trigger, filter, type: null };
    const tr = view.state.tr
        .insertText(`${trigger}${filter !== null && filter !== void 0 ? filter : ''}`)
        .scrollIntoView()
        .setMeta(plugin, meta);
    view.dispatch(tr);
}
exports.openAutocomplete = openAutocomplete;
function closeAutocomplete(view) {
    const plugin = utils_1.pluginKey.get(view.state);
    const meta = { action: 'remove' };
    const tr = view.state.tr.setMeta(plugin, meta);
    view.dispatch(tr);
    return true;
}
exports.closeAutocomplete = closeAutocomplete;
//# sourceMappingURL=actions.js.map