import * as React from 'react';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import glamorous from 'glamorous';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkContext } from './TalkProviderComponent';
import { Subscription } from 'react-apollo';
import { TalkWatchComponent } from './TalkWatchComponent';

const Container = glamorous.div({ position: 'relative', width: '100%', height: '0px' });

const TalkBar = glamorous(XHorizontal)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '48px',
    backgroundColor: '#32bb78',
    zIndex: 1,
    flexShrink: 0
});

export const TalkBarComponent = (props: { conversationId: string }) => {
    return (
        <Container>
            <YApolloContext.Consumer>{(apollo) => (
                <YQuery query={ConferenceQuery} variables={{ id: props.conversationId }}>{data => {
                    if (data.loading) {
                        return null;
                    }

                    if (data.data!.conference.peers.length === 0) {
                        return (<>
                            <TalkWatchComponent apollo={apollo!} id={data.data!.conference.id} />
                        </>);
                    }

                    return (
                        <>
                            <TalkContext.Consumer>{ctx => (
                                <TalkBar alignItems="center" justifyContent="center">
                                    {data.data!.conference.peers.map((v) => (
                                        <XAvatar
                                            size="m-small"
                                            style="user"
                                            objectId={v.user.id}
                                            online={false}
                                            cloudImageUuid={v.user.photo || undefined}
                                        />
                                    ))}
                                    {ctx.cid === props.conversationId && (
                                        <>
                                            <XButton style="success" text={ctx.muted ? 'Unmute' : 'Mute'} onClick={() => ctx.toggleMute()} />
                                            <XButton style="success" text={ctx.state === 'connecting' ? 'Connecting' : 'Leave'} onClick={() => ctx.leaveCall()} />
                                        </>
                                    )}
                                    {ctx.cid !== props.conversationId && (
                                        <XButton style="success" text={ctx.cid ? 'Leave' : 'Join'} onClick={ctx.cid ? () => ctx.leaveCall() : () => ctx.joinCall(props.conversationId)} />
                                    )}
                                </TalkBar>
                            )}</TalkContext.Consumer>
                            <TalkWatchComponent apollo={apollo!} id={data.data!.conference.id} />
                        </>
                    );
                }}</YQuery>
            )}</YApolloContext.Consumer>
        </Container>
    );
};