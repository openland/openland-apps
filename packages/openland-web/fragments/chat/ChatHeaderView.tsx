import * as React from 'react';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';
import { XButton } from 'openland-x/XButton';
import { Room_room_SharedRoom, Room_room_PrivateRoom, UserShort } from 'openland-api/Types';
import { MessagesStateContext } from 'openland-web/components/messenger/MessagesStateContext';
import { RoomEditModal } from './RoomEditModal';
import { RoomAddMemberModal } from './RoomAddMemberModal';
import { ChatForwardHeaderView } from './ChatForwardHeaderView';
import { TalkContext } from 'openland-web/modules/conference/TalkProviderComponent';
import { HeaderTitle } from './components/HeaderTitle';
import { HeaderSubtitle } from './components/HeaderSubtitle';
import { HeaderMuteButton } from './components/HeaderMuteButton';
import { HeaderLastSeen } from './components/HeaderLastSeen';
import { HeaderInviteButton } from './components/HeaderInviteButton';
import { HeaderMenu } from './components/HeaderMenu';
import { MobileSidebarContext } from '../../components/Scaffold/MobileSidebarContext';
import CloseChatIcon from 'openland-icons/ic-chat-back.svg';
import { HideOnMobile } from 'openland-web/components/Adaptive';

export interface ChatHeaderViewProps {
    room: Room_room_SharedRoom | Room_room_PrivateRoom;
    me: UserShort;
}

export const ChatHeaderView = React.memo<ChatHeaderViewProps>(props => {
    const state = React.useContext(MessagesStateContext);
    const { isMobile } = React.useContext(MobileSidebarContext);
    let room = props.room;

    if (state.useForwardHeader) {
        return <ChatForwardHeaderView roomId={room.id} me={props.me} />;
    }

    let sharedRoom = room.__typename === 'SharedRoom' ? (room as Room_room_SharedRoom) : null;
    let privateRoom = room.__typename === 'PrivateRoom' ? (room as Room_room_PrivateRoom) : null;

    let headerPath: string | undefined = undefined;
    let avatar = undefined;
    let title = undefined;
    let subtitle = undefined;
    let callButton = undefined;
    let inviteButton = undefined;
    let muteButton = undefined;
    let menu = undefined;

    if (sharedRoom) {
        avatar = (
            <XAvatar2
                size={36}
                src={sharedRoom.photo}
                title={sharedRoom.title}
                id={sharedRoom.id}
            />
        );

        title = <HeaderTitle value={sharedRoom.title} />;

        if (sharedRoom.kind === 'INTERNAL') {
            headerPath = '/mail/o/' + sharedRoom.organization!.id;
            subtitle = <HeaderSubtitle value="Organization" />;
        } else {
            headerPath = '/mail/p/' + sharedRoom.id;
            subtitle = (
                <HeaderSubtitle
                    value={
                        sharedRoom.membersCount +
                        (sharedRoom.membersCount === 1 ? ' member' : ' members')
                    }
                />
            );

            menu = <HeaderMenu room={sharedRoom} />;

            if (sharedRoom.kind === 'PUBLIC') {
                inviteButton = <HeaderInviteButton room={sharedRoom} />;
            }
        }
    }

    if (privateRoom) {
        headerPath = '/mail/u/' + privateRoom.user.id;
        avatar = (
            <XAvatar2
                size={36}
                src={privateRoom.user.photo}
                title={privateRoom.user.name}
                id={privateRoom.user.id}
            />
        );
        title = (
            <HeaderTitle
                value={privateRoom.user.name}
                path={'/mail/u/' + privateRoom.user.id}
                organization={privateRoom.user.primaryOrganization}
            />
        );
        subtitle = <HeaderLastSeen variables={{ userId: privateRoom.user.id }} />;
    }

    callButton = (
        <TalkContext.Consumer>
            {ctx =>
                ctx.cid !== room.id && (
                    <XView>
                        <XButton text="Call" onClick={() => ctx.joinCall(room.id)} />
                    </XView>
                )
            }
        </TalkContext.Consumer>
    );

    muteButton = <HeaderMuteButton settings={room.settings} roomId={room.id} />;

    return (
        <XView
            flexDirection="row"
            alignItems="center"
            maxWidth={950}
            width="100%"
            justifyContent="space-between"
            minWidth={0}
            flexShrink={1}
        >
            <XView flexDirection="row" flexGrow={1} minWidth={0} flexShrink={1} paddingRight={16}>
                {isMobile && (
                    <XView
                        as="a"
                        marginRight={20}
                        alignItems="center"
                        flexDirection="row"
                        path="/mail"
                    >
                        <CloseChatIcon />
                    </XView>
                )}
                <XView flexDirection="row" path={headerPath} alignItems="center">
                    {avatar}
                    <XView marginLeft={16} minWidth={0} flexShrink={1}>
                        {title}
                        <XView marginTop={4}>{subtitle}</XView>
                    </XView>
                </XView>
            </XView>

            <XHorizontal alignItems="center" separator={8}>
                {!isMobile && (
                    <>
                        {callButton}
                        {inviteButton}
                    </>
                )}

                <XHorizontal alignItems="center" separator={3}>
                    {muteButton}
                    <HideOnMobile>{menu}</HideOnMobile>
                </XHorizontal>
            </XHorizontal>

            {sharedRoom && (
                <>
                    <RoomAddMemberModal roomId={room.id} />
                    <RoomEditModal
                        title={sharedRoom.title}
                        description={sharedRoom.description}
                        photo={sharedRoom.photo}
                        socialImage={sharedRoom.socialImage}
                        roomId={sharedRoom.id}
                    />
                </>
            )}
        </XView>
    );
});
