import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XModal } from 'openland-x-modal/XModal';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import DownloadButtonIcon from 'openland-icons/ic_file_download.svg';
import { layoutMedia } from 'openland-web/utils/MediaLayout';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XMemo } from 'openland-y-utils/XMemo';

const modalBodyClassName = css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 40px;
    &:hover a {
        opacity: 1 !important;
    }
`;

const modalImageClassName = css`
    border-radius: 8px;
    object-fit: contain;
    max-height: 90vh;
`;

const imageWrapperClassName = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 6px;
    & img {
        max-width: 100%;
        object-fit: contain;
    }
`;

const imageClassName = css`
    display: block;
    border-radius: 6px;
    margin-left: -3px;
`;

interface MessageImageComponentProps {
    file: string;
    fileName?: string;
    width: number;
    height: number;
    startSelected: boolean;
}

const ModalBody = React.memo(
    ({
        width,
        height,
        closeView,
        file,
    }: {
        width: number;
        height: number;
        closeView: (event: React.MouseEvent<any, MouseEvent>) => void;
        file: string;
    }) => (
        <div className={modalBodyClassName}>
            <XView
                onClick={closeView}
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
            >
                <ModalCloseIcon />
            </XView>
            <XView flexDirection="row" alignItems="center" justifyContent="center">
                <XView backgroundColor="#000" borderRadius={8}>
                    <XCloudImage
                        srcCloud={`https://ucarecdn.com/${file}`}
                        resize={'fill'}
                        width={width}
                        height={height}
                        className={modalImageClassName}
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
                        href={`https://ucarecdn.com/${file}/-/preview/-/inline/no/`}
                        hoverTextDecoration="none"
                    >
                        <DownloadButtonIcon />
                    </XView>
                </XView>
            </XView>
        </div>
    ),
);

export const MessageImageComponent = XMemo<MessageImageComponentProps>(props => {
    let [isOpen, handleOpen] = React.useState(false);
    const isMobile = React.useContext(IsMobileContext);
    const openView = (e: any) => {
        if (props.startSelected) {
            return;
        }
        e.stopPropagation();
        handleOpen(true);
    };

    const closeView = () => {
        handleOpen(false);
    };

    let dimensions = layoutMedia(props.width, props.height);
    let dimensions2 = layoutMedia(props.width, props.height, 1000, 1000);
    return (
        <>
            {!isMobile && (
                <XModal
                    useTopCloser={true}
                    width={dimensions2.width}
                    heading={null}
                    transparent={true}
                    isOpen={isOpen}
                    onClosed={closeView}
                    body={
                        <ModalBody
                            width={dimensions2.width}
                            height={dimensions2.height}
                            closeView={closeView}
                            file={props.file}
                        />
                    }
                />
            )}
            <XView onClick={openView} cursor="pointer" paddingBottom={5}>
                <div className={imageWrapperClassName}>
                    <XCloudImage
                        srcCloud={`https://ucarecdn.com/${props.file}/`}
                        resize={'fill'}
                        width={dimensions.width}
                        height={dimensions.height}
                        className={imageClassName}
                    />
                </div>
            </XView>
        </>
    );
});
