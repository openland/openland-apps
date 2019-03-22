import * as React from 'react';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';

export const TalkBarComponent = (props: { conversationId: string }) => {
    const apollo = React.useContext(YApolloContext)!;
    let calls = React.useContext(MessengerContext).calls;
    let callState = calls.useState();
    return (
        <XView height={0} alignSelf="stretch">
            <YQuery query={ConferenceQuery} variables={{ id: props.conversationId }}>
                {data => {
                    if (data.loading) {
                        return null;
                    }

                    if (data.data!.conference.peers.length === 0) {
                        return (
                            <>
                                <TalkWatchComponent
                                    apollo={apollo!}
                                    id={data.data!.conference.id}
                                />
                            </>
                        );
                    }
                    return (
                        <>
                            <XView
                                position="absolute"
                                top={0}
                                left={0}
                                right={0}
                                zIndex={1}
                                flexShrink={0}
                                paddingTop={8}
                                paddingBottom={8}
                                alignItems="center"
                                justifyContent="center"
                                backgroundColor="#32bb78"
                                flexDirection="row"
                            >
                                {data.data!.conference.peers.map(v => (
                                    <React.Fragment key={v.id}>
                                        <XView flexDirection="row">
                                            <XAvatar
                                                size="m-small"
                                                style="user"
                                                objectId={v.user.id}
                                                objectName={v.user.name}
                                                online={false}
                                                cloudImageUuid={v.user.picture || undefined}
                                            />
                                            {/* <span>{v.connection && v.connection.state}</span> */}
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
                                                callState.status === 'connecting'
                                                    ? 'Connecting'
                                                    : 'Leave'
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
                                                : () => calls.joinCall(props.conversationId)
                                        }
                                    />
                                )}
                            </XView>
                            )}
                            <TalkWatchComponent apollo={apollo!} id={data.data!.conference.id} />
                        </>
                    );
                }}
            </YQuery>
        </XView>
    );
};
