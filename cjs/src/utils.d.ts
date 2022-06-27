import { PluginKey, Selection } from 'prosemirror-state';
import { DecorationSet } from 'prosemirror-view';
export declare const pluginKey: PluginKey<any>;
export declare function inSuggestion(selection: Selection, decorations: DecorationSet): boolean;
