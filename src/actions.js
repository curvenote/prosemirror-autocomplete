"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeAutocomplete = exports.openAutocomplete = void 0;
const utils_1 = require("./utils");
function openAutocomplete(view, trigger, search) {
    // TODO: Can activate a type?
    const plugin = utils_1.pluginKey.get(view.state);
    const meta = { action: 'add', trigger, search, type: null };
    const tr = view.state.tr
        .insertText(`${trigger}${search !== null && search !== void 0 ? search : ''}`)
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