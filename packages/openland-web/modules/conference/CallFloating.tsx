import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { css } from 'linaria';

const FloatCOntainer = css`
    display: flex;
    position: absolute;
    bottom: 50vh;
    right: 20px;
    z-index: 2;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    background-color: #32bb78;
    flex-direction: row;
    padding: 8px;
    border-radius: 48px;
    transition: max-width 250ms cubic-bezier(.29, .09, .24, .99);
    overflow: hidden;
    max-width: 48px;
    &:hover {
        max-width: 100vw;
       
    }
`;

const CallFloatingInner = React.memo((props: { id: string, private: boolean }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.id },
        { fetchPolicy: 'network-only' },
    );
    if (!data) {
        return null;
    }

    let res = (<XView height={0} alignSelf="stretch" >
        <TalkWatchComponent id={data.conference.id} />
        {data.conference.peers.length !== 0 && (
            <>
                <div className={FloatCOntainer} >
                    <div style={{ display: 'flex', flexDirection: 'row-reverse' }} >
                        {data.conference.peers.map(v => (
                            <React.Fragment key={v.id}>
                                <XView flexDirection="row">
                                    <UAvatar
                                        size="small"
                                        id={v.user.id}
                                        title={v.user.name}
                                        photo={v.user.photo}
                                    />
                                </XView>
                                <XView width={8} />
                            </React.Fragment>
                        ))}
                        {callState.conversationId === props.id && (
                            <>
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
                            </>
                        )}
                        {callState.conversationId !== props.id && (
                            <XButton
                                style="success"
                                text={callState.conversationId ? 'Leave' : 'Join'}
                                onClick={
                                    callState.conversationId
                                        ? () => calls.leaveCall()
                                        : () =>
                                            calls.joinCall(props.id, props.private)
                                }
                            />
                        )}
                    </div>
                </div>
            </>
        )}

    </XView>);
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
