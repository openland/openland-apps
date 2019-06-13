import * as React from 'react';
import { MessengerRootComponent } from './MessengerRootComponent';
import { InviteLandingComponent } from './InviteLandingComponent';
import {
    UserShort,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
    RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage,
    RoomChat_room,
    RoomChat_room_PrivateRoom,
    RoomChat_room_SharedRoom,
} from 'openland-api/Types';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../components/messenger/MessagesStateContext';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { UserInfoContext } from '../components/UserInfo';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { ForwardPlaceholder } from './chat/ForwardPlaceholder';
import { useClient } from 'openland-web/utils/useClient';
import { OpenlandClient } from 'openland-api/OpenlandClient';
import { IsActivePoliteContext } from 'openland-web/pages/main/mail/components/CacheComponent';
// import { MessengerWrongFragment } from 'openland-web/fragments/MessengerWrongFragment';

interface MessengerComponentLoaderProps {
    state: MessagesStateContextProps;
    user: UserShort;
    room: RoomChat_room | null;
}

const DocumentHeadTitleUpdater = ({ title }: { title: string }) => {
    const isActive = React.useContext(IsActivePoliteContext).useValue();

    if (!isActive) {
        return null;
    }

    return <XDocumentHead title={title} />;
};

class MessagengerFragmentInner extends React.PureComponent<
    MessengerComponentLoaderProps & { client: OpenlandClient; id: string }
> {
    onChatLostAccess = () => {
        this.props.client.refetchRoom({ id: this.props.id });
    };

    render() {
        const { state, room } = this.props;
        if (!room) {
            return <XLoader loading={true} />;
        }

        let sharedRoom: RoomChat_room_SharedRoom | null =
            room.__typename === 'SharedRoom' ? room : null;
        let privateRoom: RoomChat_room_PrivateRoom | null =
            room.__typename === 'PrivateRoom' ? room : null;
        let pinMessage:
            | Room_room_SharedRoom_pinnedMessage_GeneralMessage
            | RoomChat_room_PrivateRoom_pinnedMessage_GeneralMessage
            | null =
            sharedRoom &&
            sharedRoom.pinnedMessage &&
            sharedRoom.pinnedMessage.__typename === 'GeneralMessage'
                ? sharedRoom.pinnedMessage
                : null;

        if (privateRoom) {
            pinMessage =
                privateRoom &&
                privateRoom.pinnedMessage &&
                privateRoom.pinnedMessage.__typename === 'GeneralMessage'
                    ? privateRoom.pinnedMessage
                    : null;
        }

        if (sharedRoom && sharedRoom.kind !== 'INTERNAL' && sharedRoom.membership !== 'MEMBER') {
            if (sharedRoom.kind === 'PUBLIC') {
                return <InviteLandingComponent room={sharedRoom} />;
            } else {
                return <XPageRedirect path="/mail" />;
            }
        }
        let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';

        return (
            <>
                <DocumentHeadTitleUpdater title={title} />
                <XView
                    flexGrow={1}
                    flexShrink={1}
                    flexBasis={0}
                    minWidth={0}
                    minHeight={0}
                    alignSelf="stretch"
                    alignItems="stretch"
                >
                    {state.useForwardPlaceholder && <ForwardPlaceholder state={state} />}
                    <TalkBarComponent
                        conversationId={room.id}
                        isPrivate={room.__typename === 'PrivateRoom'}
                    />
                    <XView flexGrow={1} flexBasis={0} minHeight={0} flexShrink={1}>
                        <MessengerRootComponent
                            onChatLostAccess={this.onChatLostAccess}
                            pinMessage={pinMessage}
                            conversationId={room!.id}
                            conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                            room={room}
                        />
                    </XView>
                </XView>
            </>
        );
    }
}

export const MessengerFragment = React.memo<{ id: string }>(props => {
    const client = useClient();

    // let data = null;
    let data = client.useRoomChat({ id: props.id })!!;
    // let wrongRequest = false;
    // try {
    //     data = client.useRoomChat({ id: props.id })!!;
    // } catch (e) {
    //     wrongRequest = true;
    // }
    // if (wrongRequest) {
    //     return <MessengerWrongFragment />;
    // }
    const state: MessagesStateContextProps = React.useContext(MessagesStateContext);
    let ctx = React.useContext(UserInfoContext);
    const user = ctx!!.user!!;

    // useCheckPerf({ name: `MessengerFragment: ${props.id}` });

    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <MessagengerFragmentInner
                id={props.id}
                state={state}
                user={user}
                // room={data.room || null}
                room={data ? data.room : null}
                client={client}
            />
        </React.Suspense>
    );
});
