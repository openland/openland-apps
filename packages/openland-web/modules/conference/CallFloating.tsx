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

const FloatCOntainer = css`
    display: none;
    position: absolute;
    top: 0;
    right: 20px;
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
        max-width: 50vw;
        opacity: 1;
    }
`;

const useJsDrag = (containerRef: React.RefObject<HTMLDivElement>) => {

    const saveLastShift = React.useCallback(debounce((shift: number[]) => {
        window.localStorage.setItem('call_floating_shift', JSON.stringify(shift));
    }, 500), []);

    React.useLayoutEffect(() => {
        console.warn(containerRef);
        const container = containerRef.current;
        let dragging = false;
        let saved = window.localStorage.getItem('call_floating_shift');
        let shift = saved ? JSON.parse(saved) : [0, window.innerHeight / 2];
        let prev: number[] | undefined;

        let lastDrag = 0;

        const onClick = (ev: MouseEvent) => {
            if (dragging || Date.now() - lastDrag < 300) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        };
        const onDragStart = (ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            dragging = true;
        };
        const onDragStop = (ev: MouseEvent) => {
            ev.preventDefault();
            ev.stopPropagation();
            dragging = false;
            prev = undefined;
        };
        const onDrag = (ev: MouseEvent) => {
            ev.stopPropagation();
            if (!dragging) {
                return;
            }
            lastDrag = Date.now();
            let current = [ev.x, ev.y];
            if (prev) {
                let delta = [current[0] - prev[0], current[1] - prev[1]];
                shift = [shift[0] + delta[0], shift[1] + delta[1]];
                saveLastShift(shift);
                if (container) {
                    container.style.transform = `translate(${shift[0]}px, ${shift[1]}px)`;
                }
            }
            prev = current;
        };
        if (container) {
            container.addEventListener("mousedown", onDragStart);
            container.addEventListener("mouseup", onDragStop);
            window.addEventListener("mouseup", onDragStop);
            container.addEventListener("click", onClick);
            window.addEventListener("mousemove", onDrag, { passive: true });

            container.style.display = 'flex';
            container.style.transform = `translate(${shift[0]}px, ${shift[1]}px)`;
        }

        return () => {
            if (container) {
                container.removeEventListener("mousedown", onDragStart);
                container.removeEventListener("mouseup", onDragStop);
                window.removeEventListener("mouseup", onDragStop);
                container.removeEventListener("click", onClick);
                window.removeEventListener("mousemove", onDrag);
            }
        };
    }, []);
};

const CallFloatingComponent = React.memo((props: { id: string, private: boolean }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    useJsDrag(ref);
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();

    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.id },
        { fetchPolicy: 'network-only' },
    );
    return data && <div className={FloatCOntainer} ref={ref}>
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }} >

            {callState.avatar &&
                <UAvatar
                    marginLeft={8}
                    size="small"
                    id={callState.avatar.id}
                    title={callState.avatar.title}
                    photo={callState.avatar.picture}
                />}
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
