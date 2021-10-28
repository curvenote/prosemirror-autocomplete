"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const prosemirror_state_1 = require("prosemirror-state");
const prosemirror_view_1 = require("prosemirror-view");
const prosemirror_model_1 = require("prosemirror-model");
const prosemirror_schema_basic_1 = require("prosemirror-schema-basic");
const prosemirror_example_setup_1 = require("prosemirror-example-setup");
const src_1 = __importDefault(require("../src"));
const reducer_1 = require("./reducer");
const editor = document.querySelector('#editor');
const content = document.querySelector('#content');
const options = {
    reducer: reducer_1.reducer,
    triggers: [
        // For demo purposes, make the `#` and `@` easier to create
        { name: 'hashtag', trigger: /(#)$/ },
        { name: 'mention', trigger: /(@)$/ },
        { name: 'emoji', trigger: ':' },
        { name: 'link', trigger: '[[', cancelOnFirstSpace: false },
        { name: 'jinja', trigger: '{{', cancelOnFirstSpace: false },
        { name: 'command', trigger: '/', decorationAttrs: { class: 'command' } },
        { name: 'variable', trigger: /((?:^[a-zA-Z0-9_]+)\s?=)$/, cancelOnFirstSpace: false },
        { name: 'code', trigger: /((?:[a-zA-Z0-9_]+)\.)$/ },
    ],
};
window.view = new prosemirror_view_1.EditorView(editor, {
    state: prosemirror_state_1.EditorState.create({
        doc: prosemirror_model_1.DOMParser.fromSchema(prosemirror_schema_basic_1.schema).parse(content),
        plugins: [...(0, src_1.default)(options), ...(0, prosemirror_example_setup_1.exampleSetup)({ schema: prosemirror_schema_basic_1.schema, menuBar: false })],
    }),
});
//# sourceMappingURL=index.js.map