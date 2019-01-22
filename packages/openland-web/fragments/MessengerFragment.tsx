import * as React from 'react';
import { MessengerRootComponent } from './MessengerRootComponent';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { Room_room_SharedRoom, Room_room_PrivateRoom, Room, UserShort } from 'openland-api/Types';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../components/messenger/MessagesStateContext';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { ChatHeaderView } from './chat/ChatHeaderView';
import { XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { withRoom } from '../api/withRoom';
import { withUserInfo } from '../components/UserInfo';
import { withQueryLoader } from '../components/withQueryLoader';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { ForwardPlaceholder } from './chat/ForwardPlaceholder';

export interface MessengerComponentProps {
    id: string;
}

interface MessengerComponentLoaderProps {
    variables: { id: string };
    state: MessagesStateContextProps;
    user: UserShort;
    loading: boolean;
    data: Room;
}

const ChatHeaderViewLoader = withRoom(withQueryLoader(
    withUserInfo(({ user, data, loading }: MessengerComponentLoaderProps) => {
        if (!data || !data.room || loading) {
            if (loading) {
                return <XLoader loading={true} />;
            }
            return <div />;
        }

        return (
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                height={55}
                paddingLeft={20}
                paddingRight={20}
            >
                <ChatHeaderView room={data.room} me={user} />
            </XView>
        );
    }),
) as any) as React.ComponentType<{
    variables: { id: string };
    state: MessagesStateContextProps;
}>;

const MessengerComponentLoader = withRoom(withQueryLoader(
    withUserInfo(({ state, data, loading, variables }: MessengerComponentLoaderProps) => {
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

                    <ChatHeaderViewLoader variables={variables} state={state} />

                    <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                    <TalkBarComponent conversationId={data.room.id} />

                    <XView
                        alignItems="center"
                        flexGrow={1}
                        flexBasis={0}
                        minHeight={0}
                        flexShrink={1}
                    >
                        <MessengerRootComponent
                            objectName={title}
                            objectId={
                                sharedRoom
                                    ? sharedRoom.organization
                                        ? sharedRoom.organization.id
                                        : sharedRoom.id
                                    : privateRoom
                                    ? privateRoom.user.id
                                    : undefined
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
                            conversationId={data.room!.id}
                            conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                        />
                    </XView>
                </XView>
            </>
        );
    }),
) as any) as React.ComponentType<{
    variables: { id: string };
    state: MessagesStateContextProps;
}>;

export const MessengerFragment = ({ id }: MessengerComponentProps) => (
    <MessagesStateContext.Consumer>
        {(state: MessagesStateContextProps) => (
            <MessengerComponentLoader variables={{ id }} state={state} />
        )}
    </MessagesStateContext.Consumer>
);
