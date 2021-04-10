import * as React from 'react';
import { useTalkWatch } from './useTalkWatch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { UserSmall, RoomChat_room, RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { useVideoCallModal } from './CallModal';
import { UTopBar } from 'openland-web/components/unicorn/UTopBar';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import MicIcon from 'openland-icons/s/ic-mic-24.svg';
import ChevronIcon from 'openland-icons/s/ic-chevron-16.svg';
import { OthersPopper } from 'openland-web/fragments/chat/messenger/message/content/OthersPopper';
import { useJoinRoom } from 'openland-web/fragments/rooms/joinRoom';

const getSubtitle = (users: UserSmall[]) => {
    return users.length === 0 ? (
        ''
    ) : users.length === 1 ? (
        users[0].name
    ) : users.length === 2 ? (
        `${users[0].name} and ${users[1].name}`
    ) : users.length === 3 ? (
        `${users[0].name}, ${users[1].name} and ${users[2].name}`
    ) : (
        <span>
            {users[0].name}, {users[1].name} and{' '}
            <OthersPopper users={users.slice(2)} noStyling={true}>
                {users.length - 2} others
            </OthersPopper>
        </span>
    );
};

export const TalkBarComponent = (props: { chat: RoomChat_room }) => {
    const messenger = React.useContext(MessengerContext);
    const calls = messenger.calls;
    const currentSession = calls.useCurrentSession();
    const client = useClient();
    const joinRoom = useJoinRoom();
    const { chat } = props;
    const isActiveVoiceChat = chat.__typename === 'SharedRoom' && chat.activeVoiceChat?.active;

    let sharedRoom = chat.__typename === 'SharedRoom' ? chat as RoomChat_room_SharedRoom : null;

    let data = client.useConference(
        { id: sharedRoom?.activeVoiceChat?.id || chat.id },
        { fetchPolicy: 'network-only', suspense: false },
    );
    const openVideoModal = useVideoCallModal({ chatId: chat.id });
    const callDisabled = props.chat.__typename === 'PrivateRoom' && !!currentSession && currentSession.callType === 'voice-chat';

    const joinCall = () => {
        calls.joinCall(chat.id, 'call');
        openVideoModal();
    };

    const onJoinClick = React.useCallback(() => {
        if (isActiveVoiceChat) {
            joinRoom(sharedRoom!.activeVoiceChat!.id);
        } else if (currentSession && currentSession.conversationId) {
            openVideoModal();
        } else {
            joinCall();
        }
    }, [chat]);

    useTalkWatch(data && data.conference.id);
    if (!data) {
        return null;
    }

    let subtitle;
    if (isActiveVoiceChat) {
        subtitle = getSubtitle(sharedRoom!.activeVoiceChat!.speakers.map(speaker => speaker.user));
    } else {
        subtitle = getSubtitle(data.conference.peers.map(peer => peer.user));
    }
    const title = isActiveVoiceChat ? '' : 'Call';
    const rightText = isActiveVoiceChat ? 'Join room' : 'Join';

    const showBar = data.conference.peers.length !== 0 || isActiveVoiceChat;
    return showBar ? (
        <UTopBar
            type="positive"
            leftIcon={isActiveVoiceChat ? <MicIcon /> : <PhoneIcon />}
            title={title}
            subtitle={subtitle}
            rightText={rightText}
            disabled={callDisabled}
            rightIcon={<ChevronIcon />}
            onClick={onJoinClick}
        />
    ) : null;
};
