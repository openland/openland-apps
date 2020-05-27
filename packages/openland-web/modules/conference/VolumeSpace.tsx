import * as React from 'react';
import { useJsDrag } from './CallFloating';
import { css, cx } from 'linaria';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { VideoComponent } from './ScreenShareModal';
import { UAvatar, getPlaceholderColorRawById } from 'openland-web/components/unicorn/UAvatar';
import { bezierPath, pointsDistance, pointNearLine } from './space-utils';
import { Path, MediaSessionVolumeSpace, SpaceObject, SimpleText, Image } from 'openland-engines/legacy/MediaSessionVolumeSpace';
import { uploadcareOptions, layoutMedia } from 'openland-y-utils/MediaLayout';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { makeStars } from './stars';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { VMMapMap } from 'openland-y-utils/mvvm/vm';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { AppUserMediaTrackWeb } from 'openland-y-runtime-web/AppUserMedia';
import { YoutubeParty } from './YoutubeParty';
import { AppMediaStreamTrack } from 'openland-y-runtime-api/AppMediaStream';
import { SpaceControls } from './SpaceControls';
import { showAttachConfirm } from 'openland-web/fragments/chat/components/AttachConfirm';
import { CONTROLS_WIDTH } from './CallControls';
import { UploadingFile, LocalImage } from 'openland-engines/messenger/types';

const TEXT_MIN_HEIGHT = 34;
const TEXT_MIN_WIDTH = 50;
const TEXT_LINE_HEIGHT = 24;
const YOUTUBE_REGEX = /.*(youtube\.com|youtu\.be)\/.+/i;

let VolumeSpaceContainerStyle = css`
    width: 100%;
    height: 100vh;
    overflow: scroll;
`;

let VolumeSpaceInnerContainerStyle = css`
    position: relative;
    width: 3000px;
    height: 3000px;
    z-index: 1;

    --bluePrint-bgColor: #1C1F29;
    --bluePrint-dotColor: #313545;
    --bluePrint-dot-size: 1px;
    --bluePrint-dot-space: 56px;

    // background-color: var(--bluePrint-bgColor);
    // background-size: var(--bluePrint-dot-space) var(--bluePrint-dot-space);
    // background-image: radial-gradient(circle, var(--bluePrint-dotColor) var(--bluePrint-dot-size), rgba(0, 0, 0, 0) var(--bluePrint-dot-size));
`;
let VolumeSpaceInnerContainerBackground = css`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: var(--spaceBackgroundPrimary);
`;
let VolumeSpaceDrawContainerStyle = css`
    transform: translate3d(0, 0, 0);
    position: absolute;
    width: 3000px;
    height: 3000px;
    top: 0;
    left: 0;
    pointer-events: none;
`;

let VolumeSpaceDrawListener = css`
    position: absolute;
    width: 3000px;
    height: 3000px;
    top: 0;
    left: 0;
`;
let AvatarItemStyle = css`
    will-change: transform;
   
    position: absolute;
    pointer-events: none;
`;
let AvatarMovableStyle = css`
    cursor: move;
    pointer-events: inherit;
    transition: none;
`;
let NoPointerEvents = css`
    pointer-events: none;
`;

let VolumeSpaceVideoStyle = css`
    position: relative;
    width: 72px;
    height: 72px;
    border-radius: 72px;
    background-color: var(--foregroundSecondary);
`;

let resizeDotStyles = css`
    position: absolute;
    padding: 2px;
    width: 12px;
    height: 12px;
    pointer-events: all;
    z-index: 11;

    &::after {
        content: '';
        box-sizing: border-box;
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 2px;
        border: 1px solid #4DA6FF;
        background-color: var(--foregroundContrast);
    }
`;

let PeerImageContainer = css`
    will-change: transform;

    display: flex;
    overflow: visible;
    position: absolute;
    padding: 2px;
    border-radius: 6px;
    border: 1px solid transparent;
`;

let ImageStyle = css`
    width: 100%;
    height: 100%;
    border-radius: 6px;
`;

let PeerTextContainer = css`
    will-change: transform;

    border-radius: 6px;
    border: 1px solid transparent;
    padding: 4px;

    pointer-events: none;
    display: flex;
    overflow: visible;
    position: absolute;
`;

let PeerObjectContainerEditable = css`
    transition: border 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99);

    &:hover, &:focus-within {
        border: 1px solid #4DA6FF;

        .${resizeDotStyles} {
            opacity: 1;
        }
    }
    .${resizeDotStyles} {
        transition: opacity 200ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
        opacity: 0;
    }
`;

let PointerEventsInherit = css`
    pointer-events: inherit;
`;

let TextAreaStyle = css`
    pointer-events: none;
    cursor: default;
    width: 100%;
    height: 100%;
    resize: none;
    font-size: 17px;
    font-weight: 600;
    line-height: ${TEXT_LINE_HEIGHT}px;

    &::placeholder {
        color: rgba(255, 255, 255, 0.56);
        font-size: 17px;
        font-weight: 600;
        line-height: ${TEXT_LINE_HEIGHT}px;
    }
`;

let YtbPartyStyle = css`
    pointer-events: inherit;
    width: 100%;
    height: 100%;
    opacity: 1 !important;
`;

let PointerStyle = css`
    width: 24px;
    height: 24px;
    border-radius: 24px;
    border: 2px solid #fff;
`;

let PointerContainerStyle = css`
    position: absolute;
    will-change: transform;

    color: #fff;
    pointer-events: none;
    text-align: center;
`;

let TransitionTransform = css`
    transition: transform linear 50ms;
`;
let isSafari = canUseDOM && ((window as any).safari !== undefined);

type CursorState = {
    action: 'none' | 'draw' | 'erase',
    color?: string,
};

const VolumeSpaceAvatar = React.memo((props: Conference_conference_peers & { videoTrack: AppMediaStreamTrack | null, space: MediaSessionVolumeSpace, selfRef?: React.RefObject<HTMLDivElement> }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    const isLocal = !!props.selfRef;
    React.useEffect(() => {
        // listen obj updates
        return props.space.peersVM.listenId(props.id, `peer_${props.id}`, peer => {
            if (containerRef.current) {
                let scale = peer.coords[2] / 2 + 0.5;
                containerRef.current.style.transform = `translate(${peer.coords[0]}px, ${peer.coords[1]}px) scale3d(${scale}, ${scale}, ${scale})`;
            }
        });
    });
    return (
        <div className={cx(AvatarItemStyle, !isSafari && !isLocal && TransitionTransform, isLocal && AvatarMovableStyle)} ref={props.selfRef || containerRef}>
            {!props.videoTrack &&
                <div className={NoPointerEvents}>
                    <UAvatar
                        size='x-large'
                        id={props.user.id}
                        title={props.user.name}
                        photo={props.user.photo}
                    />
                </div>
            }
            {props.videoTrack && <VideoComponent track={(props.videoTrack as AppUserMediaTrackWeb).track} cover={true} mirror={isLocal} videoClass={VolumeSpaceVideoStyle} borderRadius={72} />}
        </div>
    );
});

////
// IMAGES
////

type Placement = 'tl' | 'tr' | 'bl' | 'br';

const resizeObject = (args: {
    placement: Placement,
    mouseCoords: number[],
    objCoords: number[],
    containerWH: number[],
}): { newCoords: number[], newContainerWH: number[] } => {
    const { placement, containerWH, mouseCoords, objCoords } = args;
    let newCoords = objCoords;
    let newContainerWH = containerWH;
    if (placement === 'tl') {
        newContainerWH = [Math.max(TEXT_MIN_WIDTH, objCoords[0] - mouseCoords[0] + containerWH[0]), Math.max(TEXT_MIN_HEIGHT, objCoords[1] - mouseCoords[1] + containerWH[1])];
        newCoords = [
            newContainerWH[0] <= TEXT_MIN_WIDTH ? objCoords[0] + containerWH[0] - newContainerWH[0] : mouseCoords[0],
            newContainerWH[1] <= TEXT_MIN_HEIGHT ? objCoords[1] + containerWH[1] - newContainerWH[1] : mouseCoords[1]
        ];
    }
    if (placement === 'tr') {
        newContainerWH = [Math.max(TEXT_MIN_WIDTH, mouseCoords[0] - objCoords[0]), Math.max(TEXT_MIN_HEIGHT, objCoords[1] - mouseCoords[1] + containerWH[1])];
        newCoords = [objCoords[0], newContainerWH[1] <= TEXT_MIN_HEIGHT ? objCoords[1] + containerWH[1] - newContainerWH[1] : mouseCoords[1]];
    }
    if (placement === 'bl') {
        newContainerWH = [Math.max(TEXT_MIN_WIDTH, objCoords[0] - mouseCoords[0] + containerWH[0]), Math.max(TEXT_MIN_HEIGHT, mouseCoords[1] - objCoords[1])];
        newCoords = [
            newContainerWH[0] <= TEXT_MIN_WIDTH ? objCoords[0] + containerWH[0] - newContainerWH[0] : mouseCoords[0],
            objCoords[1],
        ];
    }
    if (placement === 'br') {
        newContainerWH = [Math.max(TEXT_MIN_WIDTH, mouseCoords[0] - objCoords[0]), Math.max(TEXT_MIN_HEIGHT, mouseCoords[1] - objCoords[1])];
    }
    return ({ newCoords, newContainerWH });
};

const saveResizePointer = (args: { placement: Placement, coords: number[], containerWH: number[] }) => {
    const { placement, coords, containerWH } = args;
    if (placement === 'tl') {
        return [coords[0], coords[1]];
    }
    if (placement === 'tr') {
        return [coords[0] + containerWH[0], coords[1]];
    }
    if (placement === 'bl') {
        return [coords[0], coords[1] + containerWH[1]];
    }
    if (placement === 'br') {
        return [coords[0] + containerWH[0], coords[1] + containerWH[1]];
    }
    return undefined;
};

const PeerImage = React.memo((props: { peerId: string, peer?: Conference_conference_peers, imageId: string, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const imgRef = React.useRef<HTMLImageElement>(null);
    const resizeRefTL = React.useRef<HTMLDivElement>(null);
    const resizeRefTR = React.useRef<HTMLDivElement>(null);
    const resizeRefBL = React.useRef<HTMLDivElement>(null);
    const resizeRefBR = React.useRef<HTMLDivElement>(null);
    const focusedRef = React.useRef(false);
    const onMove = React.useCallback((coords: number[]) => {
        let img = props.space.imagesVM.getById(props.imageId);
        if (img) {
            props.space.update(img.id, { coords, type: 'image' });
        }
    }, []);

    const onJsDragStart = React.useCallback(() => {
        if (ref.current) {
            ref.current.focus({ preventScroll: true });
        }
    }, []);

    const onImageResize = (placement: Placement) => (coords: number[]) => {
        let img = props.space.imagesVM.getById(props.imageId);
        if (img) {
            let { newCoords, newContainerWH } = resizeObject({ placement, mouseCoords: coords, objCoords: img.coords, containerWH: img.containerWH });
            props.space.update(img.id, { coords: newCoords, containerWH: newContainerWH, type: 'image' });
        }
    };

    // worse access mgmt ever
    let canEdit = (props.peer?.user.isYou || !props.peersRef.current.find(peer => peer.id === props.peerId));
    if (canEdit) {
        useJsDrag(ref, {
            containerRef: ref,
            onMove,
            onStart: onJsDragStart,
            savedCallback: () => {
                let img = props.space.imagesVM.getById(props.imageId);
                return img?.coords;
            }
        });

        let targets: [Placement, React.RefObject<HTMLDivElement>][] = [
            ['tl', resizeRefTL],
            ['tr', resizeRefTR],
            ['bl', resizeRefBL],
            ['br', resizeRefBR],
        ];

        targets.forEach(([placement, target]) => {
            useJsDrag(target, {
                onMove: onImageResize(placement),
                onStart: onJsDragStart,
                savedCallback: () => {
                    let img = props.space.imagesVM.getById(props.imageId);
                    if (!img) {
                        return;
                    }
                    return saveResizePointer({ placement, coords: img.coords, containerWH: img.containerWH });
                }
            });
        });
    }
    React.useEffect(() => {

        return props.space.imagesVM.listenId(props.peerId, props.imageId, image => {
            if (ref.current && imgRef.current) {
                ref.current.style.transform = `translate(${image.coords[0]}px, ${image.coords[1]}px)`;

                const url = `https://ucarecdn.com/${image.fileId}/-/format/auto/-/`;

                const srcOps = uploadcareOptions({ width: image.imageWH[0], height: image.imageWH[1] });
                imgRef.current.style.background = `url("${url + srcOps[0]}")`;
                imgRef.current.style.backgroundSize = 'cover';
                imgRef.current.style.backgroundRepeat = 'no-repeat';
                imgRef.current.style.backgroundPosition = '50% 50%';
                // imgRef.current.src = url + srcOps[0];
                // imgRef.current.srcset = url + srcOps[1];

                ref.current.style.width = `${image.containerWH[0]}px`;
                ref.current.style.height = `${image.containerWH[1]}px`;
            }
        });
    }, []);

    const del = React.useCallback(() => {
        if (canEdit && focusedRef.current) {
            props.space.delete(props.imageId);
            return true;
        }
        return false;
    }, []);

    useShortcuts([
        { keys: ['Delete'], callback: del },
        { keys: ['Backspace'], callback: del },
    ]);

    const handleFocus = React.useCallback(() => {
        focusedRef.current = true;
    }, []);
    const handleBlur = React.useCallback(() => {
        focusedRef.current = false;
    }, []);
    return (
        <div
            ref={ref}
            tabIndex={-2}
            className={cx(PeerImageContainer, canEdit && PeerObjectContainerEditable)}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <div className={ImageStyle} ref={imgRef} />
            {canEdit && (
                <>
                    <div className={resizeDotStyles} style={{ left: '-6px', top: '-6px', cursor: 'nw-resize' }} ref={resizeRefTL} />
                    <div className={resizeDotStyles} style={{ right: '-6px', top: '-6px', cursor: 'ne-resize' }} ref={resizeRefTR} />
                    <div className={resizeDotStyles} style={{ left: '-6px', bottom: '-6px', cursor: 'sw-resize' }} ref={resizeRefBL} />
                    <div className={resizeDotStyles} style={{ right: '-6px', bottom: '-6px', cursor: 'se-resize' }} ref={resizeRefBR} />
                </>
            )}
        </div>
    );
});

const PeerText = React.memo((props: { peerId: string, peer?: Conference_conference_peers, textId: string, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const moveRef = React.useRef<HTMLDivElement>(null);
    const textRef = React.useRef<HTMLTextAreaElement>(null);
    const ytbContainerRef = React.useRef<HTMLDivElement>(null);
    const resizeRefTL = React.useRef<HTMLDivElement>(null);
    const resizeRefTR = React.useRef<HTMLDivElement>(null);
    const resizeRefBL = React.useRef<HTMLDivElement>(null);
    const resizeRefBR = React.useRef<HTMLDivElement>(null);
    const didResizeRef = React.useRef(false);
    const focusedRef = React.useRef(false);
    const textFocusedRef = React.useRef(false);
    const [ytbLink, setYtbLink] = React.useState<string>();
    const onMove = React.useCallback((coords: number[]) => {
        let t = props.space.simpleTextsVM.getById(props.textId);
        if (t) {
            props.space.update(t.id, { coords, type: 'simple_text' });
        }
    }, []);

    const onResize = (placement: Placement) => (coords: number[]) => {
        let t = props.space.simpleTextsVM.getById(props.textId);
        if (!t) {
            return;
        }
        let { newCoords, newContainerWH } = resizeObject({ placement, mouseCoords: coords, objCoords: t.coords, containerWH: t.containerWH });
        props.space.update(t.id, { coords: newCoords, containerWH: newContainerWH, type: 'simple_text' });
        didResizeRef.current = true;
    };
    const onJsDragStart = React.useCallback(() => {
        if (ytbContainerRef.current) {
            ytbContainerRef.current.style.pointerEvents = 'none';
        }
        if (ref.current) {
            ref.current.focus({ preventScroll: true });
        }
    }, []);
    const onJsDragStop = React.useCallback(() => {
        if (ytbContainerRef.current) {
            ytbContainerRef.current.style.pointerEvents = 'inherit';
        }
    }, []);

    const onTextChanged = React.useCallback((ev: React.ChangeEvent<HTMLTextAreaElement>) => {
        let t = props.space.simpleTextsVM.getById(props.textId);
        if (t) {
            if (YOUTUBE_REGEX.test(ev.currentTarget.value)) {
                let newContainerWH = [540, 320];
                props.space.update(t.id, { containerWH: newContainerWH, text: ev.target.value, type: 'simple_text' });
                return;
            }
            if (textRef.current && !didResizeRef.current) {
                let heightToScroll = textRef.current.scrollHeight - textRef.current.clientHeight;
                if (heightToScroll > 0) {
                    let newContainerWH = [t.containerWH[0], t.containerWH[1] + TEXT_LINE_HEIGHT];
                    props.space.update(t.id, { containerWH: newContainerWH, text: ev.target.value, type: 'simple_text' });
                    return;
                }
            }
            props.space.update(t.id, { text: ev.target.value, type: 'simple_text' });
        }
    }, [textRef.current]);

    // worse access mgmt ever
    let canEdit = (props.peer?.user.isYou || !props.peersRef.current.find(peer => peer.id === props.peerId));
    if (canEdit) {
        useJsDrag(moveRef, {
            containerRef: ref,
            onMove,
            onStart: onJsDragStart,
            onStop: onJsDragStop,
            savedCallback: () => {
                let text = props.space.simpleTextsVM.getById(props.textId);
                return text?.coords;
            }
        });

        let targets: [Placement, React.RefObject<HTMLDivElement>][] = [
            ['tl', resizeRefTL],
            ['tr', resizeRefTR],
            ['bl', resizeRefBL],
            ['br', resizeRefBR],
        ];

        targets.forEach(([placement, target]) => {
            useJsDrag(target, {
                onMove: onResize(placement),
                onStart: onJsDragStart,
                onStop: onJsDragStop,

                savedCallback: () => {
                    let text = props.space.simpleTextsVM.getById(props.textId);
                    if (!text) {
                        return;
                    }
                    return saveResizePointer({ placement, coords: text.coords, containerWH: text.containerWH });
                }
            });
        });
    }
    React.useEffect(() => {
        return props.space.simpleTextsVM.listenId(props.peerId, props.textId, text => {
            if (ref.current) {
                const justCreated = Date.now() - text.createdAt < 100;
                ref.current.style.transform = `translate(${text.coords[0]}px, ${text.coords[1]}px)`;
                if (textRef.current) {
                    textRef.current.value = text.text;
                    if (canEdit && justCreated) {
                        textRef.current.focus({ preventScroll: true });
                    }
                    textRef.current.style.color = text.color;
                    textRef.current.style.fontSize = `${text.fontSize}px`;
                }

                ref.current.style.width = `${text.containerWH[0]}px`;
                ref.current.style.height = `${text.containerWH[1]}px`;

                if (YOUTUBE_REGEX.test(text.text)) {
                    setYtbLink(text.text);
                }
            }
        });
    }, []);
    const deleteEmptyText = () => {
        if (textRef.current) {
            if (textRef.current.value.trim() === '') {
                props.space.delete(props.textId);
            }
        }
    };
    const handleTextFocus = React.useCallback(() => {
        textFocusedRef.current = true;
    }, []);
    const handleTextBlur = React.useCallback(() => {
        if (textRef.current) {
            textRef.current.style.pointerEvents = 'none';
        }
        if (moveRef.current) {
            moveRef.current.style.display = 'block';
        }
        textFocusedRef.current = false;
        deleteEmptyText();
    }, []);
    const clickedRef = React.useRef(false);
    const handleClick = () => {
        if (clickedRef.current && canEdit) {
            if (moveRef.current) {
                moveRef.current.style.display = 'none';
            }
            if (textRef.current) {
                textRef.current.focus({ preventScroll: true });
                textRef.current.style.pointerEvents = 'auto';
                textRef.current.style.cursor = 'text';
            }

            clickedRef.current = false;
            return;
        }

        clickedRef.current = true;
        setTimeout(() => {
            clickedRef.current = false;
        }, 300);
    };

    const del = React.useCallback(() => {
        if (canEdit && focusedRef.current && !textFocusedRef.current) {
            props.space.delete(props.textId);
            return true;
        }
        return false;
    }, [canEdit]);

    useShortcuts([
        { keys: ['Delete'], callback: del },
        { keys: ['Backspace'], callback: del },
    ]);
    const handleFocus = React.useCallback(() => {
        focusedRef.current = true;
    }, []);
    const handleBlur = React.useCallback(() => {
        focusedRef.current = false;
        deleteEmptyText();
    }, []);

    return (
        <div
            ref={ref}
            className={cx(
                PeerTextContainer,
                canEdit && PeerObjectContainerEditable,
                (canEdit || ytbLink) && PointerEventsInherit,
            )}
            tabIndex={-2}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
        >
            <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, zIndex: 10 }} ref={moveRef} />
            {!ytbLink && (
                <textarea
                    className={TextAreaStyle}
                    ref={textRef}
                    placeholder="Your text"
                    onChange={onTextChanged}
                    onFocus={handleTextFocus}
                    onBlur={handleTextBlur}
                />
            )}
            {ytbLink && <div ref={ytbContainerRef} className={YtbPartyStyle}><YoutubeParty key={ytbLink} link={ytbLink} scope={props.space.mediaSession.conversationId} /></div>}

            {canEdit && (
                <>
                    <div className={resizeDotStyles} style={{ left: '-6px', top: '-6px', cursor: 'nw-resize' }} ref={resizeRefTL} />
                    <div className={resizeDotStyles} style={{ right: '-6px', top: '-6px', cursor: 'ne-resize' }} ref={resizeRefTR} />
                    <div className={resizeDotStyles} style={{ left: '-6px', bottom: '-6px', cursor: 'sw-resize' }} ref={resizeRefBL} />
                    <div className={resizeDotStyles} style={{ right: '-6px', bottom: '-6px', cursor: 'se-resize' }} ref={resizeRefBR} />
                </>
            )}
        </div>
    );
});

const PeerObjects = React.memo((props: { peerId: string, peer?: Conference_conference_peers, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [imageIds, setImageIds] = React.useState<string[]>([]);
    let [textIds, setTextsIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        let d1 = props.space.imagesVM.listen(props.peerId, i => {
            setImageIds([...i.keys()]);
        });
        let d2 = props.space.simpleTextsVM.listen(props.peerId, i => {
            setTextsIds([...i.keys()]);
        });
        return () => {
            d1();
            d2();
        };
    }, []);
    return (
        <>
            {imageIds.map(e => <PeerImage key={`image_${e}`} peerId={props.peerId} peer={props.peer} imageId={e} space={props.space} peersRef={props.peersRef} />)}
            {textIds.map(e => <PeerText key={`text_${e}`} peerId={props.peerId} peer={props.peer} textId={e} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Objects = React.memo((props: { peers: Conference_conference_peers[], space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [peers, setPeers] = React.useState(new Map<string, Conference_conference_peers | undefined>());
    React.useEffect(() => {
        let ds: (() => void)[] = [];
        for (let k of Object.keys(props.space.storages)) {
            ds.push((props.space.storages[k] as VMMapMap<string, string, SpaceObject>).listenAllShallow((prs) => {
                setPeers(current => {
                    for (let pk of prs.keys()) {
                        current.set(pk, props.peers.find(p => p.id === pk));
                    }
                    return new Map(current);
                });
            }));
        }
        return (() => {
            ds.map(d => d());
        });
    }, []);
    return (
        <>
            {[...peers.entries()].map(([k, p]) => <PeerObjects key={k} peerId={k} peer={p} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

////
// DRAWINGS
////

const PeerPath = React.memo((props: { peerId: string, peer?: Conference_conference_peers, pathId: string, eraseDistance: number, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [strPath, setPath] = React.useState<string>();
    let [color, setColor] = React.useState<string>('white');
    let [size, setSize] = React.useState<number>(2);
    let eraseDistanceRef = React.useRef(props.eraseDistance);
    // let [points, setPoints] = React.useState<number[][]>([]);

    React.useEffect(() => {
        eraseDistanceRef.current = props.eraseDistance;
    }, [props.eraseDistance]);

    React.useEffect(() => {
        let path: Path | undefined;
        // worse access mgmt ever
        let d1 = (props.peer?.user.isYou || !props.peersRef.current.find(p => p.id === props.peerId)) && props.space.eraseVM.listen(coords => {
            if (path?.path.find((p, i, points) => {
                const nextP = points[i + 1];
                if (i === 0 && pointsDistance(p, coords) < eraseDistanceRef.current) {
                    return true;
                }
                if (nextP) {
                    return pointNearLine(coords, [p, nextP], eraseDistanceRef.current);
                } else {
                    return pointsDistance(p, coords) < eraseDistanceRef.current;
                }
            })) {
                console.warn('del!!');
                props.space.delete(path.id);
            }
        });

        let d2 = props.space.pathsVM.listenId(props.peerId, props.pathId, p => {
            path = p;
            // TODO: smoth process only new points
            setPath(bezierPath(p.path));
            // setPoints(p.path);
            setColor(p.color);
            setSize(p.size);
        });
        return () => {
            if (d1) {
                d1();
            }
            d2();
        };
    }, []);
    return (
        <>
            <path key={props.pathId} d={strPath} strokeWidth={size} stroke={color} stroke-linecap="round" fill="transparent" />
            {/* {points.map(x => <circle key={x[0] + x[1]} cx={x[0]} cy={x[1]} r={2} fill="red" />)} */}
        </>
    );
});

const PeerDrawing = React.memo((props: { peerId: string, peer?: Conference_conference_peers, eraseDistance: number, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [pathIds, setPathIds] = React.useState<string[]>([]);
    React.useEffect(() => {
        return props.space.pathsVM.listen(props.peerId, p => {
            setPathIds([...p.keys()]);
        });
    }, []);
    return (
        <>
            {pathIds.map(e => <PeerPath key={e} peerId={props.peerId} peer={props.peer} pathId={e} eraseDistance={props.eraseDistance} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Drawings = React.memo((props: { peers: Conference_conference_peers[], space: MediaSessionVolumeSpace, eraseDistance: number, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
    let [peers, setPeers] = React.useState(new Map<string, Conference_conference_peers | undefined>());
    React.useEffect(() => {
        return props.space.pathsVM.listenAllShallow(spacePeers => {
            let prs = new Map<string, Conference_conference_peers | undefined>();
            for (let k of spacePeers.keys()) {
                prs.set(k, props.peers.find(p => p.id === k));
            }
            setPeers(prs);
        });
    }, []);
    return (
        <>
            {[...peers.entries()].map(([k, p]) => <PeerDrawing key={k} peerId={k} peer={p} eraseDistance={props.eraseDistance} space={props.space} peersRef={props.peersRef} />)}
        </>
    );
});

const Pointer = React.memo((props: { peer: Conference_conference_peers, space: MediaSessionVolumeSpace }) => {
    let ref = React.useRef<HTMLDivElement>(null);
    let pointerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
        return props.space.pointerVM.listenId(props.peer.id, `pointer_${props.peer.id}`, p => {
            if (ref.current && pointerRef.current) {
                ref.current.style.position = 'absolute';
                ref.current.style.transform = `translate3d(${p.coords[0] - 12}px, ${p.coords[1] - 12}px, 0)`;

                pointerRef.current.style.backgroundColor = p.color || getPlaceholderColorRawById(props.peer.user.id).end;
            }
        });
    });
    return <div className={cx(PointerContainerStyle, !isSafari && TransitionTransform)} ref={ref}>
        <XView position="absolute" left={-200} right={-200} top={-24}  {...TextStyles.Detail} alignItems="center" justifyContent="center"><XView borderRadius={4} paddingHorizontal={3} paddingTop={2} paddingBottom={3} backgroundColor="var(--backgroundTertiaryTrans)">{props.peer.user.shortname || props.peer.user.name}</XView></XView>
        <div ref={pointerRef} className={PointerStyle} />
    </div>;
});

export const VolumeSpace = React.memo((props: { mediaSession: MediaSessionManager, peers: Conference_conference_peers[] }) => {
    let containerRef = React.useRef<HTMLDivElement>(null);
    let innerContainerRef = React.useRef<HTMLDivElement>(null);
    let drawListenerRef = React.useRef<HTMLDivElement>(null);
    let selfRef = React.useRef<HTMLDivElement>(null);
    let eraseCircleRef = React.useRef<SVGCircleElement>(null);
    let nonDrawContentRef = React.useRef<HTMLDivElement>(null);
    let [penSize, setPenSize] = React.useState(2);
    let penSizeRef = React.useRef<number>(2);
    let eraseDistance = penSize * 5;
    let peersRef = React.useRef(props.peers);
    peersRef.current = props.peers;
    let state = props.mediaSession.state.useValue();
    let [cursorState, setCursorState] = React.useState<CursorState>({ action: 'none' });

    let onMoveSelfStart = React.useCallback(() => {
        if (nonDrawContentRef.current) {
            nonDrawContentRef.current.style.pointerEvents = 'none';
        }
    }, []);

    let onMoveSelfStop = React.useCallback(() => {
        if (nonDrawContentRef.current) {
            nonDrawContentRef.current.style.pointerEvents = 'auto';
        }
    }, []);

    React.useEffect(() => {
        penSizeRef.current = penSize;
    }, [penSize]);

    useJsDrag(selfRef, { containerRef: selfRef, onMove: props.mediaSession.space.moveSelf, onStart: onMoveSelfStart, onStop: onMoveSelfStop, savedCallback: props.mediaSession.space.selfPeer?.coords }, [props.peers, state.sender.id]);
    React.useLayoutEffect(() => {
        // scroll to center
        if (containerRef.current) {
            let centerx = (3000 - containerRef.current.clientWidth) / 2;
            let centery = (3000 - containerRef.current.clientHeight) / 2;
            console.warn(containerRef.current.clientWidth, containerRef.current.clientHeight);
            console.warn(centerx, centery);
            containerRef.current.scrollBy(centerx, centery);
        }

        // create stars
        if (innerContainerRef.current) {
            makeStars(innerContainerRef.current);
        }

    }, []);

    React.useEffect(() => {
        if ((cursorState.action === 'erase') && drawListenerRef.current) {
            drawListenerRef.current.style.cursor = 'none';
        }
        let down = false;
        let path = new Path([], cursorState.action, penSizeRef.current);

        let lastScroll: number[] | undefined;
        let onScroll = () => {
            if (containerRef.current) {
                let currentScroll = [containerRef.current.scrollLeft, containerRef.current.scrollTop];
                let pointer = props.mediaSession.space.selfPointer;
                if (lastScroll && pointer) {
                    let d = [currentScroll[0] - lastScroll[0], currentScroll[1] - lastScroll[1]];
                    props.mediaSession.space.movePointer([pointer.coords[0] + d[0], pointer.coords[1] + d[1]]);
                }
                lastScroll = currentScroll;
            }
        };
        let onMove = (ev: MouseEvent) => {
            let coords: number[] = [ev.offsetX, ev.offsetY];
            props.mediaSession.space.movePointer(coords);
            if (cursorState.action === 'erase') {
                // erase
                if (down) {
                    props.mediaSession.space.erase(coords);
                }
                // move erase cursor
                if (eraseCircleRef.current) {
                    eraseCircleRef.current.style.transform = `translate(${ev.offsetX}px, ${ev.offsetY}px)`;
                }
            } else if (down) {
                // draw
                props.mediaSession.space.incrementPath(path, [coords]);
            }
        };
        let onStart = (ev: MouseEvent) => {
            // pevent actions on right click
            if (ev.button !== 0) {
                return;
            }

            down = true;
            if (cursorState.action === 'draw' && cursorState.color) {
                path = new Path([], cursorState.color, penSizeRef.current);
                props.mediaSession.space.addSpaceObject(path);
                // disable other object while drawing
                if (nonDrawContentRef.current) {
                    nonDrawContentRef.current.style.pointerEvents = 'none';
                }
            }
        };

        let onStop = () => {
            if (path.path.length < 4) {
                props.mediaSession.space.delete(path.id);
            }
            down = false;
            // enable other object after drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'auto';
            }
        };
        if (drawListenerRef.current) {
            drawListenerRef.current.addEventListener('mousedown', onStart, { passive: true });
            drawListenerRef.current!.addEventListener('mousemove', onMove, { passive: true });
            drawListenerRef.current.addEventListener('mouseup', onStop, { passive: true });

        }
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', onScroll, { passive: true });
        }

        // disable other object while drawing
        if (cursorState.action === 'erase') {
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'none';
            }
        }
        return () => {
            if (drawListenerRef.current) {
                drawListenerRef.current.removeEventListener('mousedown', onStart);
                drawListenerRef.current.removeEventListener('mousemove', onMove);
                drawListenerRef.current.removeEventListener('mouseup', onStop);
                drawListenerRef.current.style.cursor = 'auto';
            }
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', onScroll);
            }

            // enable other object after drawing
            if (nonDrawContentRef.current) {
                nonDrawContentRef.current.style.pointerEvents = 'auto';
            }
        };

    }, [cursorState]);

    let selectColor = React.useCallback((color: string) => {
        setCursorState({ action: 'draw', color });
        props.mediaSession.space.setColor(color);
    }, [props.mediaSession.space]);
    let selectPen = React.useCallback(() => {
        let color = props.mediaSession.space.colorVM.get();
        setCursorState({ action: 'draw', color });
    }, [props.mediaSession.space.colorVM.get()]);
    let closePen = React.useCallback(() => {
        setCursorState({ action: 'none' });
    }, []);
    let selectErase = React.useCallback(() => {
        setCursorState({ action: 'erase' });
    }, []);

    React.useEffect(() => {
        if (!drawListenerRef.current) {
            return;
        }
        if (cursorState.action === 'draw' || cursorState.action === 'erase') {
            drawListenerRef.current.style.pointerEvents = 'all';
        } else {
            drawListenerRef.current.style.pointerEvents = 'none';
        }
    }, [drawListenerRef.current, cursorState.action]);

    const addedObjectsRef = React.useRef<number[][]>([]);
    let getObjCoords = ({ width, height }: { width: number, height: number }): [number, number] => {
        if (!containerRef.current) {
            return [1500, 1500];
        }
        const bottomControlsHeight = 56;
        const { scrollTop, scrollLeft, clientWidth, clientHeight } = containerRef.current;
        let x = scrollLeft + (clientWidth - CONTROLS_WIDTH) / 2 - width / 2 + 9;
        let y = scrollTop + (clientHeight - bottomControlsHeight) / 2 - height / 2;
        while (addedObjectsRef.current.some(o => o[0] === x && o[1] === y)) {
            x += height / 2;
            y += height / 2;
        }
        return [x, y];
    };
    let addText = React.useCallback(() => {
        const width = 240;
        const height = TEXT_MIN_HEIGHT;
        let coords = getObjCoords({ width, height });
        let text = new SimpleText(coords, [width, height], '#fff', 20);
        props.mediaSession.space.addSpaceObject(text);
        addedObjectsRef.current.push(coords);
    }, []);

    let addImage = React.useCallback(({ file, localImage }: { file: UploadingFile | undefined, localImage?: LocalImage | undefined }) => {
        if (!localImage || !containerRef.current) {
            return;
        }
        let { width, height } = layoutMedia(localImage.width, localImage.height, 800, 800, 100, 100);
        let coords = getObjCoords({ width, height });
        let image = new Image(undefined, coords, [width, height], [width, height]);
        props.mediaSession.space.addImage(file, image);
    }, []);

    let addImages = React.useCallback((files: File[]) => {
        showAttachConfirm(files, res => res.map(addImage));
    }, []);

    useShortcuts({ keys: ['Control', 't'], callback: addText });

    return (
        <div className={VolumeSpaceContainerStyle} ref={containerRef}>

            <div className={VolumeSpaceInnerContainerStyle} ref={innerContainerRef}>
                <div className={VolumeSpaceInnerContainerBackground} />
                <div className={VolumeSpaceDrawListener} ref={drawListenerRef} />
                <div ref={nonDrawContentRef}>
                    <Objects peers={props.peers} space={props.mediaSession.space} peersRef={peersRef} />
                    <svg viewBox={'0 0 3000 3000'} className={VolumeSpaceDrawContainerStyle}>
                        <Drawings peers={props.peers} space={props.mediaSession.space} peersRef={peersRef} eraseDistance={eraseDistance} />
                        {cursorState.action === 'erase' && <circle cx={0} cy={0} r={eraseDistance} stroke="white" strokeWidth={1} ref={eraseCircleRef} fill="transparent" />}
                    </svg>

                    {props.peers.map(p => {
                        let videoTrack: AppMediaStreamTrack | null = null;
                        if (p.id === state.sender.id) {
                            videoTrack = state.sender.videoEnabled ? state.sender.videoTrack : null;
                        } else {
                            videoTrack = state.receivers[p.id]?.videoTrack || null;
                        }
                        return <VolumeSpaceAvatar
                            key={p.id}
                            {...p}
                            videoTrack={videoTrack}
                            space={props.mediaSession.space}
                            selfRef={p.id === state.sender.id ? selfRef : undefined}
                        />;
                    })}
                    {props.peers.filter(p => p.id !== state.sender.id).map(p => <Pointer key={'pointer_' + p.id} space={props.mediaSession.space} peer={p} />)}
                </div>
                <SpaceControls
                    isErasing={cursorState.action === 'erase'}
                    color={cursorState.color}
                    initialPenSize={penSize}
                    onPenSelect={selectPen}
                    onPenClose={closePen}
                    onColorChange={selectColor}
                    onEraseClick={selectErase}
                    onTextClick={addText}
                    onImageClick={addImages}
                    onPenSizeChange={setPenSize}
                />
            </div>

        </div >
    );
});