import { Plugin } from 'prosemirror-state';
import { Options, AutocompleteAction } from './types';
export declare function defaultReducer(options: Partial<Options>): (action: AutocompleteAction) => boolean;
export declare function autocomplete(opts?: Partial<Options>): Plugin<any, any>[];
