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
import { useCheckPerf } from 'openland-web/pages/main/mail/components/Components';

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

const ImageWrapper = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    & img {
        max-width: 100%;
        object-fit: contain;
    }
`;

const ImageClassName = css`
    display: block;
    margin-left: -3px;
`;

const ImageRadiusClassName = css`
    border-radius: 3px;
    padding-left: 3px;
`;

export type MessageImageComponentDimentions = {
    originalWidth: number;
    originalHeight: number;
    width: number;
    height: number;
};

interface MessageImageComponentProps {
    file: string;
    fileName?: string;
    startSelected: boolean;
    dimentions: MessageImageComponentDimentions;
}

export const MessageImageComponent = React.memo<MessageImageComponentProps>(props => {
    console.log('MessageImageComponent rerender', props);
    useCheckPerf({ name: 'MessageImageComponent' });
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

    const modalBody = (width: number, height: number) => (
        <div className={ModalBody}>
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

    let finalDimensions = layoutMedia(props.dimentions.width, props.dimentions.height);
    let finalDimensions2 = layoutMedia(
        props.dimentions.originalWidth,
        props.dimentions.originalHeight,
        1000,
        1000,
    );

    let radiusForImages = false;
    let localSettingsRadius = localStorage.getItem('image_view_alternative');
    if (localSettingsRadius) {
        if (localSettingsRadius === 'true') {
            radiusForImages = true;
        }
    }

    return (
        <>
            {!isMobile && (
                <XModal
                    useTopCloser={true}
                    width={finalDimensions2.width}
                    heading={null}
                    transparent={true}
                    isOpen={isOpen}
                    onClosed={closeView}
                    body={modalBody(finalDimensions2.width, finalDimensions2.height)}
                />
            )}
            <XView onClick={openView} cursor="pointer" paddingBottom={5}>
                <div
                    className={
                        ImageWrapper + (radiusForImages ? ' ' + ImageRadiusClassName : undefined)
                    }
                >
                    <XCloudImage
                        srcCloud={'https://ucarecdn.com/' + props.file + '/'}
                        resize="fill"
                        width={finalDimensions.width}
                        height={finalDimensions.height}
                        className={
                            ImageClassName +
                            (radiusForImages ? ' ' + ImageRadiusClassName : undefined)
                        }
                    />
                </div>
            </XView>
        </>
    );
});
