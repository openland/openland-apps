import * as React from 'react';
import { MessengerRootComponent } from './MessengerRootComponent';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import {
    MessagesStateContext,
    MessagesStateContextProps,
} from '../components/messenger/components/MessagesStateContext';
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

const MessengerComponentLoader = withRoom(withQueryLoader(
    withUserInfo((props: { state: any; user: any; loading: boolean; data: any }) => {
        const state = props.state;
        const user = props.user;

        if (!props.data || props.loading) {
            if (props.loading) {
                return <XLoader loading={true} />;
            }
            return <div />;
        }

        let sharedRoom: Room_room_SharedRoom | null =
            props.data.room!.__typename === 'SharedRoom' ? (props.data.room as any) : null;
        let privateRoom: Room_room_PrivateRoom | null =
            props.data.room!.__typename === 'PrivateRoom' ? (props.data.room as any) : null;

        // WTF?
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

                    <XView
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        height={55}
                        paddingLeft={20}
                        paddingRight={20}
                    >
                        <ChatHeaderView room={props.data.room!} me={user!} />
                    </XView>
                    <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                    <TalkBarComponent conversationId={props.data.room!.id} />

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
                            conversationId={props.data.room!.id}
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

export const MessengerFragment = (props: MessengerComponentProps) => (
    <MessagesStateContext.Consumer>
        {(state: MessagesStateContextProps) => (
            <MessengerComponentLoader variables={{ id: props.id }} state={state} />
        )}
    </MessagesStateContext.Consumer>
);
