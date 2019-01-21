import * as React from 'react';
import { showModal } from '../ZModal';
import { ZPictureTransitionConfig } from './ZPictureTransitionConfig';
import { ZPictureOverlay } from './ZPictureOverlay';

export function showPictureModal(config: ZPictureTransitionConfig) {
    showModal((ctr) => {
        return(
            <ZPictureOverlay config={config} onClose={ctr.hide} />
        );
    });
}