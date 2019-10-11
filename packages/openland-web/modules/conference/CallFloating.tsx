import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { css } from 'linaria';
import { debounce } from 'openland-y-utils/timer';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';

const FloatContainerClass = css`
    display: none;
    position: absolute;
    top: 0;
    z-index: 2;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: #32bb78;
    flex-direction: row;
    padding: 8px;
    border-radius: 48px;
    transition: max-width 250ms cubic-bezier(.29, .09, .24, .99), opacity 250ms cubic-bezier(.29, .09, .24, .99);
    overflow: hidden;
    max-width: 48px;
    opacity: 0.56;
    &:hover {
        max-width: 360px;
        opacity: 1;
    }
`;

const TargetClass = css`
    display: flex;
    flex-shrink: 0;
    cursor: move;
`;

const useJsDrag = (targetRef: React.RefObject<HTMLDivElement>, containerRef: React.RefObject<HTMLDivElement>, contentRef: React.RefObject<HTMLDivElement>) => {
    const saveLastShift = React.useCallback(debounce((shift: number[]) => {
        window.localStorage.setItem('call_floating_shift', JSON.stringify(shift));
    }, 500), []);

    React.useLayoutEffect(() => {
        const container = containerRef.current;
        const target = targetRef.current;
        const content = contentRef.current;
        let dragging = false;
        let saved = window.localStorage.getItem('call_floating_shift');
        let positionShift = saved ? JSON.parse(saved) : [window.innerWidth / 2 - 48, window.innerHeight / 2];
        let prev: number[] | undefined;

        let lastDrag = 0;

        const checkPostion = () => {
            // limit shift with screen bounds
            if (Math.abs(positionShift[0]) > window.innerWidth / 2) {
                positionShift[0] = (window.innerWidth) / 2 * Math.sign(positionShift[0]);
            }
            positionShift[1] = Math.min(window.innerHeight - 48, Math.max(0, positionShift[1]));

            // swap layout for left/right part of screen
            if (container && content) {
                if (positionShift[0] > 0) {
                    container.style.right = 'calc(50% - 24px)';
                    container.style.left = null;
                    content.style.flexDirection = 'row-reverse';
                } else {
                    container.style.right = null;
                    container.style.left = 'calc(50% - 24px)';
                    content.style.flexDirection = 'row';
                }
            }
        };

        const onDragStart = (ev: MouseEvent | TouchEvent) => {
            if (ev instanceof MouseEvent) {
                ev.preventDefault();
            }
            ev.stopPropagation();
            dragging = true;
        };
        const onDragStop = (ev: MouseEvent) => {
            if (ev instanceof MouseEvent) {
                ev.preventDefault();
            }
            ev.stopPropagation();
            dragging = false;
            prev = undefined;
        };
        const onDrag = (ev: MouseEvent | TouchEvent) => {
            ev.stopPropagation();
            if (!dragging) {
                return;
            }
            lastDrag = Date.now();
            let current: number[] = [];
            if (ev instanceof MouseEvent) {
                current = [ev.x, ev.y];
            } else {
                let touch = ev.touches.item(0);
                if (touch) {
                    current = [touch.clientX, touch.clientY];
                }
            }
            if (prev) {
                let moveDelta = [current[0] - prev[0], current[1] - prev[1]];
                positionShift = [positionShift[0] + moveDelta[0], positionShift[1] + moveDelta[1]];
                checkPostion();

                saveLastShift(positionShift);
                if (container) {
                    container.style.transform = `translate(${positionShift[0]}px, ${positionShift[1]}px)`;
                }
            }
            prev = current;
        };

        checkPostion();
        if (container && target) {
            target.addEventListener("mousedown", onDragStart);
            target.addEventListener("mouseup", onDragStop);
            window.addEventListener("mouseup", onDragStop);
            window.addEventListener("mousemove", onDrag, { passive: true });

            target.addEventListener("touchstart", onDragStart);
            target.addEventListener("touchend", onDragStop);
            target.addEventListener("touchcancel", onDragStop);
            window.addEventListener("touchmove", onDrag, { passive: true });

            container.style.display = 'flex';
            container.style.transform = `translate(${positionShift[0]}px, ${positionShift[1]}px)`;
        }

        return () => {
            if (target) {
                target.removeEventListener("mousedown", onDragStart);
                target.removeEventListener("mouseup", onDragStop);
                window.removeEventListener("mouseup", onDragStop);
                window.removeEventListener("mousemove", onDrag);

                target.removeEventListener("touchstart", onDragStart);
                target.removeEventListener("touchend", onDragStop);
                target.removeEventListener("touchcancel", onDragStop);
                window.removeEventListener("touchmove", onDrag);
            }
        };
    }, []);
};

const CallFloatingComponent = React.memo((props: { id: string, private: boolean }) => {
    const isMobile = useIsMobile();
    const [forceOpen, setForceOpen] = React.useState(false);
    const targetRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const contentRef = React.useRef<HTMLDivElement>(null);
    useJsDrag(targetRef, containerRef, contentRef);
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();

    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.id },
        { fetchPolicy: 'network-only' },
    );

    const onClick = React.useCallback(() => {
        if (isMobile) {
            if (containerRef.current) {
                containerRef.current.style.opacity = forceOpen ? '1' : '0.56';
                containerRef.current.style.maxWidth = forceOpen ? '360px' : '48px';
            }
            setForceOpen(!forceOpen);
        }
    }, [forceOpen]);
    return data && <div className={FloatContainerClass} ref={containerRef} onClick={onClick}>
        <div style={{ display: 'flex', flexDirection: 'row' }} ref={contentRef}>

            {callState.avatar &&
                <div className={TargetClass} ref={targetRef}>
                    <UAvatar
                        size="small"
                        id={callState.avatar.id}
                        title={callState.avatar.title}
                        photo={callState.avatar.picture}
                    />
                </div>}
            <XView width={8} />
            <XButton
                flexShrink={0}
                style="success"
                text={callState.mute ? 'Unmute' : 'Mute'}
                onClick={() => calls.setMute(!callState.mute)}
            />
            <XView width={8} />
            <XButton
                flexShrink={0}
                style="success"
                text={
                    callState.status === 'connecting' ? 'Connecting' : 'Leave'
                }
                onClick={() => calls.leaveCall()}
            />
        </div>
    </div>;
});

const CallFloatingInner = React.memo((props: { id: string, private: boolean }) => {
    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.id },
        { fetchPolicy: 'network-only' },
    );
    if (!data) {
        return null;
    }

    let res = (
        <>
            <TalkWatchComponent id={data.conference.id} />
            {data.conference.peers.length !== 0 && (
                <CallFloatingComponent id={props.id} private={props.private} />
            )}
        </>
    );
    return ReactDOM.createPortal(res, document.body);
});

export const CallFloating = React.memo(() => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    if (!callState.conversationId) {
        return null;
    }
    return <CallFloatingInner id={callState.conversationId} private={!!callState.private} />;
});
