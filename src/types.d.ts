import { DecorationAttrs, DecorationSet, EditorView } from 'prosemirror-view';
export declare const KEEP_OPEN = "KEEP_OPEN";
export interface FromTo {
    from: number;
    to: number;
}
export declare type InactiveAutocompleteState = {
    active: false;
    decorations: DecorationSet;
};
export declare type ActiveAutocompleteState = {
    active: true;
    decorations: DecorationSet;
    trigger: string;
    text: string;
    range: FromTo;
    type: Trigger | null;
};
export declare type AutocompleteState = InactiveAutocompleteState | ActiveAutocompleteState;
export declare enum ActionKind {
    'open' = "open",
    'close' = "close",
    'filter' = "filter",
    'up' = "ArrowUp",
    'down' = "ArrowDown",
    'left' = "ArrowLeft",
    'right' = "ArrowRight",
    'select' = "select"
}
export declare type AutocompleteAction = {
    kind: ActionKind;
    view: EditorView;
    trigger: string;
    filter?: string;
    range: FromTo;
    type: Trigger | null;
};
export interface OpenAutocomplete {
    action: 'add';
    trigger: string;
    search?: string;
    type: Trigger | null;
}
export interface CloseAutocomplete {
    action: 'remove';
}
export declare type AutocompleteTrMeta = OpenAutocomplete | CloseAutocomplete;
export declare type Trigger = {
    name: string;
    trigger: string | RegExp;
    cancelOnFirstSpace?: boolean;
    allArrowKeys?: boolean;
    decorationAttrs?: DecorationAttrs;
};
export declare type Options = {
    onOpen?: (action: AutocompleteAction) => boolean;
    onClose?: (action: AutocompleteAction) => boolean;
    onFilter?: (action: AutocompleteAction) => boolean;
    onArrow?: (action: AutocompleteAction) => boolean;
    onSelect?: (action: AutocompleteAction) => boolean;
    reducer: (action: AutocompleteAction) => boolean | typeof KEEP_OPEN;
    triggers: Trigger[];
};
