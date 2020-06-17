import { Placement } from 'popper.js';

export type UPopper = (
    controller: UPopperController,
) => {
    target: HTMLElement;
    placement?: Placement;
    useObserve?: boolean;
    content: React.ReactElement<{}>;
};

export interface UPopperController {
    hide(): void;
}

export interface UPopperProvider {
    showPopper(element: UPopper): void;
}

let currentProvider: UPopperProvider | undefined = undefined;

export function registerPopupProvider(provider: UPopperProvider) {
    currentProvider = provider;
}

export function showPopper(
    config: {
        target: HTMLElement;
        placement: Placement;
        useObserve?: boolean;
    },
    popper: (ctx: UPopperController) => React.ReactElement<{}>,
) {
    currentProvider!!.showPopper((ctx) => ({
        target: config.target,
        placement: config.placement,
        useObserve: config.useObserve,
        content: popper(ctx),
    }));
}
