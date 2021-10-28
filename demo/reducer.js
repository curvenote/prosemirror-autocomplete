"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const src_1 = require("../src");
const actions_1 = require("../src/actions");
const suggestion = document.querySelector('#suggestion');
const info = document.querySelector('#info');
const picker = {
    view: null,
    open: false,
    current: 0,
    range: null,
};
const NUM_SUGGESTIONS = suggestion.children.length;
function setInfo(action) {
    var _a;
    info.innerText = `Action: ${action.kind}, Range: ${action.range.from}-${action.range.to}, Filter: ${action.filter}, Trigger: ${action.trigger}, Type: ${(_a = action.type) === null || _a === void 0 ? void 0 : _a.name}`;
}
function placeSuggestion() {
    var _a;
    suggestion.style.display = picker.open ? 'block' : 'none';
    const rect = (_a = document.getElementById(src_1.DEFAULT_ID)) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
    if (!rect)
        return;
    suggestion.style.top = `${rect.top + rect.height}px`;
    suggestion.style.left = `${rect.left}px`;
    [].forEach.call(suggestion.children, (item, i) => {
        item.classList[i === picker.current ? 'add' : 'remove']('selected');
    });
}
function reducer(action) {
    var _a;
    picker.view = action.view;
    setInfo(action);
    switch (action.kind) {
        case src_1.ActionKind.open:
            picker.current = 0;
            picker.open = true;
            picker.range = action.range;
            placeSuggestion();
            return true;
        case src_1.ActionKind.close:
            picker.open = false;
            placeSuggestion();
            return true;
        case src_1.ActionKind.up:
            picker.current -= 1;
            picker.current += NUM_SUGGESTIONS; // negative modulus doesn't work
            picker.current %= NUM_SUGGESTIONS;
            placeSuggestion();
            return true;
        case src_1.ActionKind.down:
            picker.current += 1;
            picker.current %= NUM_SUGGESTIONS;
            placeSuggestion();
            return true;
        case src_1.ActionKind.select: {
            const tr = action.view.state.tr
                .deleteRange(action.range.from, action.range.to)
                .insertText(`You can define this ${action.type ? `${(_a = action.type) === null || _a === void 0 ? void 0 : _a.name} ` : ''}action!`);
            action.view.dispatch(tr);
            return true;
        }
        default:
            return false;
    }
}
exports.reducer = reducer;
[].forEach.call(suggestion.children, (item, i) => {
    item.addEventListener('click', () => {
        if (!picker.view)
            return;
        (0, actions_1.closeAutocomplete)(picker.view);
        picker.open = false;
        placeSuggestion();
        if (!picker.range)
            return;
        const tr = picker.view.state.tr
            .deleteRange(picker.range.from, picker.range.to)
            .insertText(`Clicked on ${i + 1}`);
        picker.view.dispatch(tr);
        picker.view.focus();
    });
});
//# sourceMappingURL=reducer.js.map