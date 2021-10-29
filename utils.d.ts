import { PluginKey, Selection } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export declare const DEFAULT_ID = "autocomplete";
export declare const DEFAULT_DECO_ATTRS: {
    id: string;
    class: string;
};
export declare const pluginKey: PluginKey<any, any>;
export declare function inSuggestion(selection: Selection, decorations: DecorationSet): boolean;
