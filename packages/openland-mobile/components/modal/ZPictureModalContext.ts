import * as React from 'react';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';

export interface ZPictureModalProvider {
    showModal: (config: ZPictureTransitionConfig) => void;
}

export const ZPictureModalContext = React.createContext<ZPictureModalProvider | undefined>(undefined);