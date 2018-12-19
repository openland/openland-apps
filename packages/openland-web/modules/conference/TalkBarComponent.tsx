import * as React from 'react';
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ConferenceQuery } from 'openland-api';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { TalkContext } from './TalkProviderComponent';
import { TalkWatchComponent } from './TalkWatchComponent';
import { XView } from 'react-mental';

// class TalkVideo extends React.Component<{ src: MediaStream }> {
//     ref = React.createRef<HTMLVideoElement>();
//     componentDidMount() {
//         let video = this.ref.current!;
//         video.muted = true;
//         video.autoplay = true;
//         video.setAttribute('playsinline', 'true');
//         video.controls = false;
//         video.srcObject = this.props.src;
//     }
//     render() {
//         return <video ref={this.ref} width={28} height={28} />;
//     }
// }

export const TalkBarComponent = (props: { conversationId: string }) => {
    const apollo = React.useContext(YApolloContext)!;
    let ctx = React.useContext(TalkContext);
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
                                                online={false}
                                                cloudImageUuid={
                                                    v.user.photo || undefined
                                                }
                                            />
                                            {/* <span>{v.connection && v.connection.state}</span> */}
                                        </XView>
                                        <XView width={8} />
                                    </React.Fragment>
                                ))}
                                {ctx.cid === props.conversationId && (
                                    <>
                                        <XButton
                                            style="success"
                                            text={ctx.muted ? 'Unmute' : 'Mute'}
                                            onClick={() => ctx.toggleMute()}
                                        />
                                        <XView width={8} />
                                        <XButton
                                            style="success"
                                            text={
                                                ctx.state === 'connecting'
                                                    ? 'Connecting'
                                                    : 'Leave'
                                            }
                                            onClick={() => ctx.leaveCall()}
                                        />
                                    </>
                                )}
                                {ctx.cid !== props.conversationId && (
                                    <XButton
                                        style="success"
                                        text={ctx.cid ? 'Leave' : 'Join'}
                                        onClick={
                                            ctx.cid
                                                ? () => ctx.leaveCall()
                                                : () =>
                                                    ctx.joinCall(
                                                        props.conversationId,
                                                    )
                                        }
                                    />
                                )}
                            </XView>
                            )}
                            <TalkWatchComponent
                                apollo={apollo!}
                                id={data.data!.conference.id}
                            />
                        </>
                    );
                }}
            </YQuery>
        </XView>
    );
};
