import * as React from 'react';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-web/utils/useClient';
import { ChatInfo } from 'openland-web/fragments/chat/types';

export const TalkBarComponent = (props: { chat: ChatInfo }) => {
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    let client = useClient();
    let data = client.useWithoutLoaderConference(
        { id: props.chat.id },
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
                        {callState.conversationId === props.chat.id && (
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
                        {callState.conversationId !== props.chat.id && (
                            <XButton
                                style="success"
                                text={callState.conversationId ? 'Leave' : 'Join'}
                                onClick={
                                    callState.conversationId
                                        ? () => calls.leaveCall()
                                        : () =>
                                            calls.joinCall(props.chat.id, props.chat.__typename === 'PrivateRoom', props.chat.__typename === 'PrivateRoom' ? { id: props.chat.user.id, title: props.chat.user.name, picture: props.chat.user.photo } : props.chat)
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
