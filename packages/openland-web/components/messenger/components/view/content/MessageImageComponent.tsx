import * as React from 'react';
import Glamorous from 'glamorous';
import { layoutMedia } from './utils/MediaLayout';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import ModalCloseIcon from '../../icons/ic-modal-close.svg';
import DownloadButtonIcon from '../../icons/ic_file_download.svg';

const ModalCloser = Glamorous(XLink)({
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

const ModalBody = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:hover > .download-button': {
        opacity: 1
    }
});

const ModalPic = Glamorous.img({
    objectFit: 'contain',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
    borderRadius: 8
});

interface MessageImageComponentProps {
    file: string;
    fileName?: string;
    width: number;
    height: number;
}

export const MessageImageComponent = (props: MessageImageComponentProps) => {
    let dimensions = layoutMedia(props.width, props.height);
    return (
        <XModal
            useTopCloser={true}
            size="s-large"
            heading={null}
            transparent={true}
            body={(
                <ModalBody>
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                    <ModalPic
                        src={'https://ucarecdn.com/' + props.file + '/'}
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
                <XLink>
                    <XCloudImage
                        srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                        resize={'fill'}
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                </XLink>
            )}
        />
    );
};