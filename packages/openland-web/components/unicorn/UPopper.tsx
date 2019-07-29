export type UPopper = (controller: UPopperController) => {
    target: HTMLElement,
    content: React.ReactElement<{}>
};

export interface UPopperController {
    hide(): void;
    setOnEscPressed(handler: () => void): void;
}

export interface UPopperProvider {
    showPopper(element: UPopper): void;
}

let currentProvider: UPopperProvider | undefined = undefined;

export function registerPopupProvider(provider: UPopperProvider) {
    currentProvider = provider;
}

export function showPopper(target: HTMLElement, popper: (ctx: UPopperController) => React.ReactElement<{}>) {
    currentProvider!!.showPopper((ctx) => ({ 
       target,
       content: popper(ctx) 
    }));
}