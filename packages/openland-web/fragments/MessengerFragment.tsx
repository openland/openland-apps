import * as React from 'react';
import { MessengerRootComponent } from './MessengerRootComponent';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { MessagesStateContext } from '../components/messenger/components/MessagesStateContext';
import { UserInfoContext } from '../components/UserInfo';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { ChatHeaderView } from './chat/ChatHeaderView';
import { XView } from 'react-mental';
import { useQuery } from 'openland-web/components/useQuery';
import { RoomQuery } from 'openland-api';
import { XLoader } from 'openland-x/XLoader';
import { TalkBarComponent } from 'openland-web/modules/conference/TalkBarComponent';
import { ForwardPlaceholder } from './chat/ForwardPlaceholder';

export interface MessengerComponentProps {
    id: string;
}

export const MessengerFragment = (props: MessengerComponentProps) => {
    let q = useQuery(RoomQuery, { id: props.id });
    let state = React.useContext(MessagesStateContext);
    if (!q.data || q.loading) {
        if (q.loading) {
            return <XLoader loading={true} />;
        }
        return <div />;
    }

    let user = React.useContext(UserInfoContext);

    let sharedRoom: Room_room_SharedRoom | null =
        q.data.room!.__typename === 'SharedRoom' ? (q.data.room as any) : null;
    let privateRoom: Room_room_PrivateRoom | null =
        q.data.room!.__typename === 'PrivateRoom' ? (q.data.room as any) : null;

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
                    <ChatHeaderView room={q.data.room!} me={user!.user!} />
                </XView>
                <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                <TalkBarComponent conversationId={q.data.room!.id} />

                <XView alignItems="center" flexGrow={1} flexBasis={0} minHeight={0} flexShrink={1}>
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
                        conversationId={q.data.room!.id}
                        conversationType={sharedRoom ? sharedRoom.kind : 'PRIVATE'}
                    />
                </XView>
            </XView>
        </>
    );
};
