import * as React from 'react';
import { canUseDOM } from 'openland-y-utils/canUseDOM';

export type XModal = (controller: XModalController) => React.ReactElement<{}>;

export interface XModalController {
    hide(): void;
    setOnEscPressed(handler: () => void): void;
}

export interface XModalProvider {
    showModal(modal: XModal): void;
}

let currentProvider: XModalProvider | undefined = undefined;

export function showModal(modal: XModal) {
    if (!canUseDOM) {
        throw Error('Displaying modals on server is not supported');
    }
    if (currentProvider) {
        currentProvider.showModal(modal);
    }
}

export function registerModalProvider(provider: XModalProvider) {
    currentProvider = provider;
}