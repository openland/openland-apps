import { Placement } from 'popper.js';

export type UPopper = (controller: UPopperController) => {
    target: HTMLElement,
    placement?: Placement;
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

export function showPopper(target: HTMLElement, placement: Placement, popper: (ctx: UPopperController) => React.ReactElement<{}>) {
    currentProvider!!.showPopper((ctx) => ({
        target,
        placement,
        content: popper(ctx)
    }));
}