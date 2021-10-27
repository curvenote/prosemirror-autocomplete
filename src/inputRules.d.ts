import { InputRule } from 'prosemirror-inputrules';
import { Plugin } from 'prosemirror-state';
import { Trigger } from './types';
export declare function createInputRule(plugin: Plugin, type: Trigger): InputRule<any>;
