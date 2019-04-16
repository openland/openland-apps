import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal, XModalProps } from 'openland-x-modal/XModal';
import DownloadButtonIcon from 'openland-icons/ic_file_download.svg';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { XLink2 } from 'openland-x/XLink2';
import { MessagesStateContext } from './messenger/MessagesStateContext';

const ModalBody = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 40px;
    &:hover a {
        opacity: 1 !important;
    }
`;

const ModalImage = css`
    border-radius: 8px;
    object-fit: contain;
    max-height: 90vh;
`;

interface ImagePreviewModal extends XModalProps {
    file: string;
    width: number;
    height: number;
}

export const ImagePreviewModal = (props: ImagePreviewModal) => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const modalBody = (width: number, height: number) => (
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
                        srcCloud={props.file}
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
                        href={props.file + '/-/preview/-/inline/no/'}
                        hoverTextDecoration="none"
                    >
                        <DownloadButtonIcon />
                    </XView>
                </XView>
            </XView>
        </div>
    );
    let dimensions = layoutMedia(props.width, props.height, 1000, 1000);

    if (messagesContextProps.useForwardHeader) {
        return props.target as React.ReactElement;
    }

    return (
        <XModal
            useTopCloser={true}
            width={dimensions.width}
            heading={null}
            transparent={true}
            body={modalBody(dimensions.width, dimensions.height)}
            target={props.target}
        />
    );
};
