import * as React from 'react';
import { css, cx } from 'linaria';
import { Conference_conference_peers } from 'openland-api/spacex.types';
import { MediaSessionVolumeSpace } from 'openland-engines/legacy/MediaSessionVolumeSpace';
import { useJsDrag } from './CallFloating';
import { uploadcareOptions } from 'openland-y-utils/MediaLayout';
import { useShortcuts } from 'openland-x/XShortcuts/useShortcuts';
import { YoutubeParty } from './YoutubeParty';

export const TEXT_MIN_HEIGHT = 34;
export const TEXT_MIN_WIDTH = 50;
export const TEXT_LINE_HEIGHT = 24;
export const YOUTUBE_REGEX = /.*(youtube\.com|youtu\.be)\/.+/i;

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
    cursor: pointer;

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

        // iframe doesn't bubble events, moving ytb currently is disabled
        // useJsDrag(ytbContainerRef, {
        //     containerRef: ref,
        //     onMove,
        //     onStart: onJsDragStart,
        //     onStop: onJsDragStop,
        //     savedCallback: () => {
        //         let text = props.space.simpleTextsVM.getById(props.textId);
        //         return text?.coords;
        //     }
        // }, [ytbContainerRef.current]);

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
        if (clickedRef.current && textRef.current && canEdit) {
            clickedRef.current = false;
            if (moveRef.current) {
                moveRef.current.style.display = 'none';
            }
            if (textRef.current) {
                textRef.current.focus({ preventScroll: true });
                textRef.current.style.pointerEvents = 'auto';
                textRef.current.style.cursor = 'text';
            }
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
            {!ytbLink && <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, zIndex: 10 }} ref={moveRef} />}
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
            {ytbLink && (
                <div ref={ytbContainerRef} className={YtbPartyStyle}>
                    <YoutubeParty key={ytbLink} link={ytbLink} scope={props.space.mediaSession.conversationId} />
                </div>
            )}

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

export const PeerObjects = React.memo((props: { peerId: string, peer?: Conference_conference_peers, space: MediaSessionVolumeSpace, peersRef: React.MutableRefObject<Conference_conference_peers[]> }) => {
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
