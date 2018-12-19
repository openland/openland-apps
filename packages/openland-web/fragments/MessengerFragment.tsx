import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { withRoom } from '../api/withRoom';
import { withQueryLoader } from '../components/withQueryLoader';
import { MessengerRootComponent } from './MessengerRootComponent';
import { XMenuItemWrapper } from 'openland-x/XMenuItem';
import { XCheckbox } from 'openland-x/XCheckbox';
import { withChannelSetFeatured } from '../api/withChannelSetFeatured';
import { RoomsInviteComponent } from './RoomsInviteComponent';
import { withChannelSetHidden } from '../api/withChannelSetHidden';
import { Room_room_SharedRoom, Room_room_PrivateRoom } from 'openland-api/Types';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { MessagesStateContext, MessagesStateContextProps } from '../components/messenger/components/MessagesStateContext';
import { withUserInfo, UserInfoContext } from '../components/UserInfo';
import { TalkBarComponent } from 'openland-web/pages/main/mail/components/conference/TalkBarComponent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { ChatHeaderView } from './chat/ChatHeaderView';
import { XView } from 'react-mental';
import { FrowardPlaceholder } from './chat/ForwardPlaceholder';

class SwitchComponent extends React.Component<
    {
        mutation: any;
        roomId: string;
        val: boolean;
        fieldName: string;
        fieldTitle?: string;
    },
    { val: boolean }
    > {
    constructor(props: any) {
        super(props);
        this.state = { val: props.val };
    }

    render() {
        return (
            <XMenuItemWrapper>
                <XVertical>
                    <XCheckbox
                        label={this.props.fieldTitle || this.props.fieldName}
                        value={this.state.val ? 'featured' : 'unfeatured'}
                        trueValue="featured"
                        onChange={() => {
                            this.props.mutation({
                                variables: {
                                    roomId: this.props.roomId,
                                    [this.props.fieldName]: !this.props.val,
                                },
                            });
                            this.setState({
                                val: !this.state.val,
                            });
                        }}
                    />
                </XVertical>
            </XMenuItemWrapper>
        );
    }
}

export const RoomSetFeatured = withChannelSetFeatured(props => (
    <SwitchComponent
        mutation={props.setFeatured}
        val={(props as any).val}
        fieldName={'featured'}
        fieldTitle={'Featured'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

export const RoomSetHidden = withChannelSetHidden(props => (
    <SwitchComponent
        mutation={props.setHidden}
        val={(props as any).val}
        fieldName={'listed'}
        fieldTitle={'Listed'}
        roomId={(props as any).roomId}
    />
)) as React.ComponentType<{ val: boolean; roomId: string }>;

let MessengerComponentLoader = withRoom(withQueryLoader((props => {
    if (!props.data) {
        return <div />;
    }

    let user = React.useContext(UserInfoContext);

    let sharedRoom: Room_room_SharedRoom | null =
        props.data.room!.__typename === 'SharedRoom' ? (props.data.room as any) : null;
    let privateRoom: Room_room_PrivateRoom | null =
        props.data.room!.__typename === 'PrivateRoom' ? (props.data.room as any) : null;

    // WTF?
    if (
        sharedRoom &&
        sharedRoom.kind !== 'INTERNAL' &&
        sharedRoom.membership !== 'MEMBER'
    ) {
        if (sharedRoom.kind === 'PUBLIC') {
            return <RoomsInviteComponent room={sharedRoom} />;
        } else {
            return <XPageRedirect path="/mail" />;
        }
    }
    let title = sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '';

    let messagesState = (props as any).state as MessagesStateContextProps;
    let placeholder = messagesState.useForwardPlaceholder;
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
                {placeholder && <FrowardPlaceholder state={messagesState} />}

                <XView
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="center"
                    height={56}
                    paddingLeft={20}
                    paddingRight={20}
                >
                    <ChatHeaderView room={props.data.room!} me={user!.user!} />
                </XView>
                <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                <TalkBarComponent conversationId={(sharedRoom || privateRoom)!.id} />

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
}))) as React.ComponentType<{
    variables: { id: string };
    state: MessagesStateContextProps;
}>;

interface MessengerComponentProps {
    id: string;
}

export const MessengerFragment = (props: MessengerComponentProps) => (
    <MessagesStateContext.Consumer>
        {(state: MessagesStateContextProps) => (
            <MessengerComponentLoader variables={{ id: props.id }} state={state} />
        )}
    </MessagesStateContext.Consumer>
);
