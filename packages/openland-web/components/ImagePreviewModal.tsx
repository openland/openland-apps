import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal, XModalProps } from 'openland-x-modal/XModal';
import DownloadButtonIcon from 'openland-icons/ic_file_download.svg';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { XLink2 } from 'openland-x/XLink2';
import { MessagesStateContext } from '../fragments/chat/messenger/MessagesStateContext';
import { showModalBox } from 'openland-x/showModalBox';

const ModalBody = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* margin-bottom: 40px; */
    &:hover a {
        opacity: 1 !important;
    }
`;

const ModalImage = css`
    border-radius: 8px;
    object-fit: contain;
    max-height: 90vh;
`;

type ImagePreviewModalProps = {
    file: string;
    width: number;
    height: number;
};

const modalBody = (width: number, height: number) => (props: ImagePreviewModalProps) => (
    <div className={ModalBody}>
        <XLink2
            cursor="pointer"
            position="fixed"
            right={20}
            top={20}
            width={36}
            height={36}
            borderRadius={5}
            backgroundColor="transparent"
            justifyContent="center"
            alignItems="center"
            autoClose={true}
        >
            <ModalCloseIcon />
        </XLink2>
        <XView flexDirection="row" alignItems="center" justifyContent="center">
            <XView backgroundColor="#000" borderRadius={8}>
                <XCloudImage
                    srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                    resize={'fill'}
                    width={width}
                    height={height}
                    className={ModalImage}
                />
                <XView
                    as="a"
                    justifyContent="center"
                    alignItems="center"
                    width={36}
                    height={36}
                    borderRadius={5}
                    backgroundColor="rgba(0, 0, 0, 0.6)"
                    opacity={0}
                    position="absolute"
                    top={20}
                    right={20}
                    href={'https://ucarecdn.com/' + props.file + '/-/preview/-/inline/no/'}
                    hoverTextDecoration="none"
                >
                    <DownloadButtonIcon />
                </XView>
            </XView>
        </XView>
    </div>
);

export const showImagePreviewModal = (props: ImagePreviewModalProps) => {
    showModalBox({ flowing: true }, () => {
        let dimensions = layoutMedia(props.width, props.height, 1000, 1000);
        const modal = modalBody(dimensions.width, dimensions.height)(props);
        return modal;
    });
};

export const ImagePreviewModal = (props: ImagePreviewModalProps & Pick<XModalProps, 'target'>) => {
    if (!props.target) {
        return null;
    }

    const messagesContextProps = React.useContext(MessagesStateContext);
    if (messagesContextProps.useForwardHeader) {
        return props.target as React.ReactElement;
    }

    const targetClone = React.cloneElement(props.target, {
        onClick: () => showImagePreviewModal(props),
    });
    return targetClone;
};
