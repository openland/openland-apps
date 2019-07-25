import * as React from 'react';
import Glamorous from 'glamorous';
import { showModalBox } from 'openland-x/showModalBox';
import { XCloudImage } from 'openland-x/XCloudImage';

const ModalPic = Glamorous(XCloudImage)({
    borderRadius: 8,
    objectFit: 'contain',
    maxHeight: '90vh',
});

export const showAvatarModal = (photo: string) => {
    showModalBox({ width: 512 }, ctx => (
        <ModalPic
            srcCloud={photo.includes('ucarecdn') ? photo : `https://ucarecdn.com/${photo}/`}
            resize={'fill'}
            width={512}
            height={512}
        />
    ));
};