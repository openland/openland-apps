import * as React from 'react';
import { MessengerRootComponent } from './MessengerRootComponent';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import {
    Room_room_SharedRoom,
    Room_room_PrivateRoom,
    Room,
    UserShort,
    Room_room_SharedRoom_pinnedMessage_GeneralMessage,
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
import { YApolloContext } from 'openland-y-graphql/YApolloProvider';
import { OpenApolloClient } from 'openland-y-graphql/apolloClient';
import { useClient } from 'openland-web/utils/useClient';

export interface MessengerComponentProps {
    id: string;
    isActive: boolean;
}

interface MessengerComponentLoaderProps {
    isActive: boolean;
    state: MessagesStateContextProps;
    user: UserShort;
    loading: boolean;
    data: Room;
}

class MessagengerFragmentInner extends React.PureComponent<
    MessengerComponentLoaderProps & { apollo: OpenApolloClient }
> {
    onConversationLostAccess = () => {
        this.props.apollo.client.reFetchObservableQueries();
    };

    render() {
        const { state, data, loading, isActive } = this.props;
        if (!data || !data.room || loading) {
            if (loading) {
                return <XLoader loading={true} />;
            }
            return <div />;
        }

        let sharedRoom: Room_room_SharedRoom | null =
            data.room.__typename === 'SharedRoom' ? data.room : null;
        let privateRoom: Room_room_PrivateRoom | null =
            data.room.__typename === 'PrivateRoom' ? data.room : null;
        let pinMessage: Room_room_SharedRoom_pinnedMessage_GeneralMessage | null =
            sharedRoom &&
            sharedRoom.pinnedMessage &&
            sharedRoom.pinnedMessage.__typename === 'GeneralMessage'
                ? sharedRoom.pinnedMessage
                : null;

        if (sharedRoom && sharedRoom.kind !== 'INTERNAL' && sharedRoom.membership !== 'MEMBER') {
            if (sharedRoom.kind === 'PUBLIC') {
                return <RoomsInviteComponent room={sharedRoom} />;
            } else {
                return <XPageRedirect path="/mail" />;
            }
        }
        let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';

        return (
            <>
                <XDocumentHead title={title} />
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
                    <TalkBarComponent conversationId={data.room.id} />
                    <XView flexGrow={1} flexBasis={0} minHeight={0} flexShrink={1}>
                        <MessengerRootComponent
                            onConversationLostAccess={this.onConversationLostAccess}
                            isActive={isActive}
                            objectName={title}
                            objectId={
                                sharedRoom ? sharedRoom.id : privateRoom ? privateRoom.user.id : ''
                            }
                            cloudImageUuid={
                                (sharedRoom && sharedRoom.photo) ||
                                (privateRoom && privateRoom.user.photo) ||
                                undefined
                            }
                            organizationId={
                                sharedRoom && sharedRoom.organization
                                    ? sharedRoom.organization.id
                                    : null
                            }
                            pinMessage={pinMessage}
                            conversationId={data.room!.id}
                            conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                            room={data.room}
                        />
                    </XView>
                </XView>
            </>
        );
    }
}

export const MessengerFragment = (props: { id: string; isActive: boolean }) => {
    const client = useClient();

    const apollo = React.useContext(YApolloContext)!;

    let room = client.useWithoutLoaderRoom({ id: props.id })!!;
    const state: MessagesStateContextProps = React.useContext(MessagesStateContext);
    let ctx = React.useContext(UserInfoContext);
    const user = ctx!!.user!!;

    return (
        <MessagengerFragmentInner
            isActive={props.isActive}
            state={state}
            user={user}
            loading={false}
            data={room}
            apollo={apollo}
        />
    );
};
