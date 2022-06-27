import { Plugin } from 'prosemirror-state';
import { Options, AutocompleteState } from './types';
export declare function getDecorationPlugin(reducer: Required<Options>['reducer']): Plugin<AutocompleteState>;
