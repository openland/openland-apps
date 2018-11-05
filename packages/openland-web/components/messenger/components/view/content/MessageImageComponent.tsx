import * as React from 'react';
import Glamorous from 'glamorous';
import { layoutMedia } from './utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import ModalCloseIcon from '../../icons/ic-modal-close.svg';
import DownloadButtonIcon from '../../icons/ic_file_download.svg';

export const ModalCloser = Glamorous(XLink)({
    position: 'fixed',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});

const ImgDownload = Glamorous.a({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    opacity: 0,
    position: 'absolute',
    top: 20,
    right: 20
});

export const ModalBody = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
    '&:hover > .download-button': {
        opacity: 1
    }
});

const ImgWrapper = Glamorous(XLink)({
    alignSelf: 'flex-start'
});

export const ModalPic = Glamorous(XCloudImage)({
    borderRadius: 8,
    objectFit: 'contain',
    maxHeight: '90vh'
});

interface MessageImageComponentProps {
    file: string;
    fileName?: string;
    width: number;
    height: number;
}

export const MessageImageComponent = (props: MessageImageComponentProps) => {
    let dimensions = layoutMedia(props.width, props.height);
    let dimensions2 = layoutMedia(props.width, props.height, 1000, 1000);
    return (
        <XModal
            useTopCloser={true}
            width={dimensions2.width}
            heading={null}
            transparent={true}
            body={(
                <ModalBody>
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                    <ModalPic
                        srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                        resize={'fill'}
                        width={dimensions2.width}
                        height={dimensions2.height}
                    />
                    <ImgDownload
                        className="download-button"
                        href={'https://ucarecdn.com/' + props.file + '/-/preview/-/inline/no/'}
                    >
                        <DownloadButtonIcon />
                    </ImgDownload>
                </ModalBody>
            )}
            target={(
                <ImgWrapper>
                    <XCloudImage
                        srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                        resize={'fill'}
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                </ImgWrapper>
            )}
        />
    );
};