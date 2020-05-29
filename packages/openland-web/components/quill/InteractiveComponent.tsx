import * as React from 'react';

//
// Rendering
//

export interface InteractiveRenderer {
    register(key: string, node: HTMLDivElement): void;
}
export const registeredRenderers = new Map<string, InteractiveRenderer>();
export function registerRenderer(id: string, renderer: InteractiveRenderer) {
    registeredRenderers.set(id, renderer);
}
export function unregisterRenderer(id: string) {
    registeredRenderers.delete(id);
}

//
// Registry
//

export const registeredComponents = new Map<string, React.ComponentType<{ id: string }>>();
export function registerInteractiveComponent(name: string, component: React.ComponentType<{ id: string }>) {
    registeredComponents.set(name, component);
}

//
// Component
//

export interface InteractiveComponentStore {
    get(key: string): any;
    set(key: string, value: any): void;
}
export const InteraciveComponentStoreContext = React.createContext<InteractiveComponentStore | null>(null);
export function interactiveComponent<T>(
    Component: React.ComponentType<{ value: T, setValue: (v: T) => void }>
): React.ComponentType<{ id: string }> {
    return React.memo((props: { id: string }) => {
        let store = React.useContext(InteraciveComponentStoreContext);
        if (!store) {
            throw Error('Unable to find store');
        }
        let [value, setValue] = React.useState(store.get(props.id) as T);
        let setValueCallback = React.useCallback((v: T) => {
            setValue(v);
            store!.set(props.id, v);
        }, []);
        return <Component value={value} setValue={setValueCallback} />;
    });
}