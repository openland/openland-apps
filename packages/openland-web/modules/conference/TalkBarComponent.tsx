import * as React from 'react';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';

export const TalkBarComponent = (props: { conversationId: string; isPrivate: boolean }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.conversationId },
        { fetchPolicy: 'network-only' },
    );
    if (!data) {
        return null;
    }
    return (
        <XView height={0} alignSelf="stretch">
            <TalkWatchComponent id={data.conference.id} />
            {data.conference.peers.length !== 0 && (
                <>
                    <XView
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={2}
                        flexShrink={0}
                        paddingTop={8}
                        paddingBottom={8}
                        alignItems="center"
                        justifyContent="center"
                        backgroundColor="#32bb78"
                        flexDirection="row"
                    >
                        {data.conference.peers.map(v => (
                            <React.Fragment key={v.id}>
                                <XView flexDirection="row">
                                    <XAvatar
                                        size="m-small"
                                        style="user"
                                        objectId={v.user.id}
                                        objectName={v.user.name}
                                        online={false}
                                        cloudImageUuid={v.user.photo || undefined}
                                    />
                                </XView>
                                <XView width={8} />
                            </React.Fragment>
                        ))}
                        {callState.conversationId === props.conversationId && (
                            <>
                                <XButton
                                    style="success"
                                    text={callState.mute ? 'Unmute' : 'Mute'}
                                    onClick={() => calls.setMute(!callState.mute)}
                                />
                                <XView width={8} />
                                <XButton
                                    style="success"
                                    text={
                                        callState.status === 'connecting' ? 'Connecting' : 'Leave'
                                    }
                                    onClick={() => calls.leaveCall()}
                                />
                            </>
                        )}
                        {callState.conversationId !== props.conversationId && (
                            <XButton
                                style="success"
                                text={callState.conversationId ? 'Leave' : 'Join'}
                                onClick={
                                    callState.conversationId
                                        ? () => calls.leaveCall()
                                        : () =>
                                              calls.joinCall(props.conversationId, props.isPrivate)
                                }
                            />
                        )}
                    </XView>
                    )}
                </>
            )}
        </XView>
    );
};
