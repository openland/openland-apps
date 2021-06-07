import * as React from 'react';
import moment from 'moment';
import { css, cx } from 'linaria';
import { MessageSender } from 'openland-api/spacex.types';
import {
    useImageViewer,
    ImageViewerCb,
    ViewerState,
    ViewerAction,
    viewerReducer,
} from 'openland-x-utils/imageViewer';
import { layoutMedia } from 'openland-y-utils/MediaLayout';
import { showChatPicker } from 'openland-web/fragments/chat/showChatPicker';
import { showModalBox } from 'openland-x/showModalBox';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { TextCaption } from 'openland-web/utils/TextStyles';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XLoader } from 'openland-x/XLoader';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { emoji } from 'openland-y-utils/emoji';
import { useClient } from 'openland-api/useClient';
import { UToast } from 'openland-web/components/unicorn/UToast';
import IcDownload from 'openland-icons/s/ic-download-24.svg';
import IcForward from 'openland-icons/s/ic-forward-24.svg';
import IcClose from 'openland-icons/s/ic-close-24.svg';
import IcLeft from 'openland-icons/s/ic-back-24.svg';
import IcRight from 'openland-icons/s/ic-next-24.svg';

const modalImgContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    user-select: none;
`;

const fadeoutStyle = css`
    opacity: 0 !important;
    transition: 500ms opacity ease !important;
`;

const modalToolbarContainer = css`
    width: 100%;
    height: 56px;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
    transition: 200ms opacity ease;
    opacity: 0.56;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.48) 0%, rgba(0, 0, 0, 0) 100%);
    :hover {
        opacity: 1;
    }
`;

const modalImgContent = css`
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    max-height: 100%;
    z-index: 0;
`;

const modalInfoContainer = css`
    padding: 16px;
    display: flex;
    align-items: center;
    pointer-events: none;
    margin-right: auto;
    white-space: nowrap;
`;

const modalSecondaryText = css`
    color: var(--foregroundContrast);
    margin-right: 12px;
`;

const modalButtonsContainer = css`
    display: flex;
    align-items: center;
`;

const modalButtonStyle = css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    opacity: 0.72;
    cursor: pointer;
    &:hover {
        opacity: 1;
    }
`;

const previewContainer = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: opacity 200ms cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 1;
    z-index: 1;
`;

const imgPreviewClass = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    filter: blur(5px);
    background: transparent;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const imgAppearClass = css`
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    max-width: 100%;
    max-height: 100%;
    height: auto;
    background: transparent;
    object-fit: contain;
    cursor: pointer;
`;

const imgSpacer = css`
    &:before {
        content: '';
        display: block;
        padding-top: var(--ratio);
        width: 100%;
    }
`;

const cursorContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    position: absolute;
    cursor: pointer;
    padding-top: 56px;
    padding-left: 12px;
    padding-right: 12px;
    justify-content: center;
    top: 0;
    bottom: 0;
    width: 64px;
    transition: 200ms opacity ease;
    opacity: 0.56;
    & > div {
        flex-grow: 0;
        width: 40px;
        height: 40px;
        transition: 200ms all ease;
        border-radius: 100%;
    }
    :hover {
        opacity: 1;
    }
    :hover > div {
        background-color: rgba(0, 0, 0, 0.48);
    }
`;

const prevCursorContent = css`
    left: 0;
`;

const nextCursorContent = css`
    right: 0;
`;

const forwardToastClassName = css`
    position: absolute;
    z-index: 1;
    top: 65px;
`;

interface ModalControllerProps {
    cId: string;
    cursor: string;
    setViewerState: (data: ImageViewerCb) => void;
    hide: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
}

const ModalController = React.memo((props: ModalControllerProps) => {
    const client = useClient();
    const [cursor, setCursor] = React.useState('');

    const sharedInfo = client.usePicSharedMedia(
        {
            chatId: props.cId,
            first: 1,
            around: props.cursor,
        },
        { fetchPolicy: 'cache-and-network' },
    ).chatSharedMedia;

    useShortcuts([
        {
            keys: ['Escape'],
            callback: () => props.hide(),
        },
        {
            keys: ['ArrowLeft'],
            callback: props.onPrevClick,
        },
        {
            keys: ['ArrowRight'],
            callback: props.onNextClick,
        },
    ]);

    React.useEffect(() => {
        if (props.cursor !== cursor) {
            setCursor(props.cursor);
            (async () => {
                await client.refetchPicSharedMedia({
                    chatId: props.cId,
                    first: 1,
                    around: props.cursor,
                });
                let viewerData;
                if (sharedInfo) {
                    viewerData = useImageViewer(sharedInfo, props.cursor);
                    props.setViewerState(viewerData);
                }
                if (viewerData && viewerData.prevCursor) {
                    await client.refetchPicSharedMedia({
                        chatId: props.cId,
                        first: 1,
                        around: viewerData.prevCursor,
                    });
                }
                if (viewerData && viewerData.nextCursor) {
                    await client.refetchPicSharedMedia({
                        chatId: props.cId,
                        first: 1,
                        around: viewerData.nextCursor,
                    });
                }
            })();
        }
    }, [sharedInfo, cursor, props.cursor]);

    return null;
});

interface ModalProps {
    file: {
        fileId: string;
        filePreview?: string | null;
        fileMetadata: {
            imageWidth: number | null;
            imageHeight: number | null;
        };
    };
    sender?: MessageSender;
    senderNameEmojify?: string | JSX.Element;
    date?: number;
    chatId?: string;
    mId?: string;
}

const ModalContent = React.memo((props: ModalProps & { hide: () => void }) => {
    const { fileId, fileMetadata, filePreview } = props.file;
    const { imageWidth, imageHeight } = fileMetadata;
    const isMobile = useIsMobile();
    const messenger = React.useContext(MessengerContext);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const prevRef = React.useRef<HTMLDivElement>(null);

    const [forwardToast, setForwardToast] = React.useState<{ title: string; show: boolean }>({
        title: 'Forwarded',
        show: false,
    });
    const [fadeout, setFadeout] = React.useState(false);
    const [mouseCursorData, setMouseCursorData] = React.useState({ x: 0, y: 0 });

    const [state, dispatch] = React.useReducer<React.Reducer<ViewerState, ViewerAction>>(
        viewerReducer,
        {
            loaded: false,
            cursor: props.mId,
            current: [],
            prev: undefined,
            prevCursor: null,
            nextCursor: null,
            next: undefined,
            index: undefined,
            hasNextPage: false,
            hasPrevPage: false,
        },
    );
    const { current, index, loaded, cursor } = state;

    const currentItem =
        current.length && index !== undefined
            ? current[index]
            : {
                  fileId: fileId,
                  imageWidth: imageWidth,
                  imageHeight: imageHeight,
                  filePreview: filePreview!,
                  date: props.date!,
                  senderName: (props.senderNameEmojify
                      ? props.senderNameEmojify
                      : props.sender
                      ? emoji(props.sender.name)
                      : '') as string,
              };

    React.useEffect(() => {
        if (index === undefined && current.length > 0) {
            dispatch({
                type: 'state-changed',
                newState: { index: current.findIndex((x) => x.fileId === fileId) },
            });
        }
    }, [current]);

    useShortcuts([
        {
            keys: ['Escape'],
            callback: () => props.hide(),
        },
    ]);

    const onLoad = React.useCallback(() => {
        if (imgRef.current && prevRef.current) {
            imgRef.current.style.opacity = '1';
            imgRef.current.style.visibility = 'visible';
            prevRef.current.style.opacity = '0';
            dispatch({ type: 'image-loaded' });
        }
    }, []);

    React.useLayoutEffect(() => {
        if (imgRef.current && prevRef.current && !loaded) {
            imgRef.current.style.opacity = '0';
            imgRef.current.style.visibility = 'hidden';
            prevRef.current.style.opacity = '1';
        }
    }, [loaded]);

    const hasPrevAttach = index! > 0;
    const hasNextAttach = index! < current.length - 1;

    const onPrevClick = () => {
        dispatch({ type: 'back' });
    };
    const onNextClick = () => {
        dispatch({ type: 'forward' });
    };

    const forwardCallback = React.useCallback(() => {
        showChatPicker((id: string) => {
            messenger.sender.shareFile(id, currentItem.fileId);
            if (messenger.user.id === id) {
                setForwardToast({ title: 'Added to saved messages', show: true });
            } else {
                setForwardToast({ title: 'Forwarded', show: true });
            }
        });
    }, [state]);

    const sender = currentItem.senderName;

    const date = currentItem.date;
    const downloadLink =
        'https://ucarecdn.com/' +
        currentItem.fileId +
        '/-/format/jpg/-/inline/no/Openland-' +
        moment(date).format('YYYY-MM-DD-HH-mm-ss') +
        '.jpg';

    const url = `https://ucarecdn.com/${currentItem.fileId}/-/format/auto/-/`;

    const layoutModal = layoutMedia(
        currentItem.imageWidth!,
        currentItem.imageHeight!,
        680,
        360,
        32,
        32,
    );

    const width = layoutModal.width;
    const height = layoutModal.height;

    const ops = `scale_crop/${width * 2}x${height * 2}/`;
    const opsRetina = `scale_crop/${width * 4}x${height * 4}/center/ 2x`;
    const src = url + ops;
    const srcSet = url + opsRetina;

    const previewSrc = currentItem.filePreview;

    const mouseMove = React.useCallback(
        (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            if (fadeout) {
                const data = { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY };
                setFadeout(false);
                setMouseCursorData(data);
            }
        },
        [fadeout, mouseCursorData],
    );

    React.useLayoutEffect(() => {
        const timer = setTimeout(() => {
            setFadeout(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [mouseCursorData]);

    return (
        <div className={modalImgContainer} onMouseMove={mouseMove} onClick={props.hide}>
            <UToast
                isVisible={forwardToast.show}
                type="success"
                text={forwardToast.title}
                className={forwardToastClassName}
                closeCb={() => setForwardToast({ title: 'Forwarded', show: false })}
            />
            <div
                className={cx(modalToolbarContainer, fadeout && fadeoutStyle)}
                onClick={(e) => e.preventDefault()}
            >
                {cursor && props.chatId && (
                    <React.Suspense fallback={null}>
                        <ModalController
                            cId={props.chatId}
                            cursor={cursor || ''}
                            setViewerState={(data) =>
                                dispatch({ type: 'state-changed', newState: data })
                            }
                            hide={props.hide}
                            onPrevClick={onPrevClick}
                            onNextClick={onNextClick}
                        />
                    </React.Suspense>
                )}
                {sender && date && (
                    <div className={modalInfoContainer}>
                        {!isMobile && (
                            <div className={cx(TextCaption, modalSecondaryText)}>{sender}</div>
                        )}
                        <div className={cx(TextCaption, modalSecondaryText)}>
                            {formatDateTime(date)}
                        </div>
                    </div>
                )}
                <div className={modalButtonsContainer}>
                    <a
                        className={modalButtonStyle}
                        href={downloadLink}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <UIcon icon={<IcDownload />} color="var(--foregroundContrast)" />
                    </a>
                    <div
                        className={modalButtonStyle}
                        onClick={(e) => {
                            e.stopPropagation();
                            forwardCallback();
                        }}
                    >
                        <UIcon icon={<IcForward />} color="var(--foregroundContrast)" />
                    </div>
                    <div className={modalButtonStyle} onClick={props.hide}>
                        <UIcon icon={<IcClose />} color="var(--foregroundContrast)" />
                    </div>
                </div>
            </div>
            <div className={modalImgContent} style={{ maxWidth: width * 2 }}>
                <div
                    className={imgSpacer}
                    style={
                        {
                            width: width * 2,
                            maxWidth: '100%',
                            margin: 'auto',
                            '--ratio': ((height * 2) / (width * 2)) * 100 + '%',
                        } as React.CSSProperties
                    }
                />
                <div className={previewContainer} ref={prevRef}>
                    {previewSrc && (
                        <img
                            className={imgPreviewClass}
                            src={previewSrc}
                            width={width * 2}
                            height={height * 2}
                            style={{ cursor: 'default' }}
                        />
                    )}
                    <XLoader loading={true} transparentBackground={true} contrast={true} />
                </div>
                <ImgWithRetry
                    ref={imgRef}
                    onLoad={onLoad}
                    src={src}
                    srcSet={srcSet}
                    className={imgAppearClass}
                    width={width * 2}
                    height={height * 2}
                    style={{ objectFit: 'contain', cursor: 'default' }}
                />
            </div>
            {(state.hasPrevPage || hasPrevAttach) && (
                <div
                    className={cx(cursorContainer, prevCursorContent, fadeout && fadeoutStyle)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onPrevClick();
                    }}
                >
                    <UIcon icon={<IcLeft />} color={'var(--foregroundContrast)'} />
                </div>
            )}
            {(state.hasNextPage || hasNextAttach) && (
                <div
                    className={cx(cursorContainer, nextCursorContent, fadeout && fadeoutStyle)}
                    onClick={(e) => {
                        e.stopPropagation();
                        onNextClick();
                    }}
                >
                    <UIcon icon={<IcRight />} color={'var(--foregroundContrast)'} />
                </div>
            )}
        </div>
    );
});

export const showImageModal = (props: ModalProps) => {
    showModalBox(
        { fullScreen: true, darkOverlay: true, useTopCloser: false, hideOnEsc: false },
        (ctx) => <ModalContent {...props} hide={ctx.hide} />,
    );
};
