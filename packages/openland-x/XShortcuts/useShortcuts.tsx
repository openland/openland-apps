import * as React from 'react';
import { randomKey } from 'openland-unicorn/components/utils/randomKey';

// https://github.com/Microsoft/TypeScript/issues/29729#issuecomment-505826972
type StringUnionAutocompleteFix<T extends U, U = string> = T | (U & {});
type ShortcutKeys = StringUnionAutocompleteFix<'Control' | 'Meta' | 'Shift' | 'Alt' | 'Escape' | 'Enter' | 'Backspace' | 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight'>;

interface ShortcutsProps {
    uuid: string;
    keys: ShortcutKeys[];
    callback: () => void | boolean;
    disabled?: boolean;
}
const checkAlteringKeys = (ev: KeyboardEvent, key: ShortcutKeys) => {
    return (key === 'Control' && ev.ctrlKey)
        || (key === 'Meta' && ev.metaKey)
        || (key === 'Shift' && ev.shiftKey)
        || (key === 'Alt' && ev.altKey);
};

const checkFires = (ev: KeyboardEvent, keys: ShortcutKeys[]) => {
    let fires = false;
    for (let k of keys) {
        if (k === ev.key
            || (k.length === 1 && ('Key' + k.toUpperCase()) === ev.code)
            || checkAlteringKeys(ev, k)
        ) {
            fires = true;
        } else {
            return false;
        }
    }
    return fires;
};

// store callbacks in stack to prevent cross-listeners fire
let listeners: ShortcutsProps[] = [];

let inited = false;
const init = () => {
    if (inited) {
        return;
    }
    inited = true;

    window.addEventListener('keydown', async (ev) => {
        // console.warn(ev);
        let listener: ShortcutsProps;
        for (let i = listeners.length - 1; i >= 0; i--) {
            listener = listeners[i];
            if (checkFires(ev, listener.keys)) {
                let handled = listener.callback && await listener.callback();
                if (handled === undefined || handled === true) {
                    ev.preventDefault();
                    return;
                }
            }
        }
    });
};

const listen = (listener: ShortcutsProps) => {
    let current = listeners.find(l => l.uuid === listener.uuid);
    if (!current) {
        listeners.push(listener);
        current = listener;
    }
    current.disabled = false;
    // update callback function on new useEffect call
    current.callback = listener.callback;
    return () => {
        (async () => {
            let toRemove = listeners.find(l => l.uuid === listener.uuid);
            if (toRemove) {
                // mark listener on useEffect clean up
                toRemove.disabled = true;
                // await next tick
                await null;
                //  if useEffect was not called, parent component seems to be removed - remove listener
                if (toRemove.disabled) {
                    listeners = listeners.filter(l => !l.disabled);
                }
            }
        })();
    };
};

interface ShortcutProps {
    keys: ShortcutKeys[];
    callback?: () => void | boolean;
}
export const useShortcuts = (shortcuts: ShortcutProps[] | ShortcutProps, deps?: any[]) => {
    let shrtcts = Array.isArray(shortcuts) ? shortcuts : [shortcuts];
    let uuid = React.useMemo(randomKey, []);
    init();
    React.useEffect(() => {
        let dispose = shrtcts.map((s, i) => ({ ...s, uuid: uuid + '_' + i })).map(listen).filter(d => !!d);
        return () => {
            // sorry, ts doesn't see my filter :/
            dispose.map(d => d!());
        };
    }, deps);
};