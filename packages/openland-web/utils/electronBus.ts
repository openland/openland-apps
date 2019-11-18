import { isElectron } from 'openland-y-utils/isElectron';

const listeners = new Map<string, Set<Listener>>();

export type Listener = (event: any, arg: any) => void;

export const electronBus = (type: string, listener: Listener) => {
    if (!isElectron) {
        return;
    }
    let ls = listeners.get(type);
    if (!ls) {
        ls = new Set();
        listeners.set(type, ls);

        // @ts-ignore
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.on(type, (e: any, arg: any) => {
            ls!.forEach(l => l(e, arg));
        });
    }
    ls.add(listener);
    return () => {
        ls!.delete(listener);
    };
};