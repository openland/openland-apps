import * as React from 'react';
import { useTalkWatch } from './useTalkWatch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { RoomChat_room, RoomChat_room_SharedRoom } from 'openland-api/spacex.types';
import { useVideoCallModal } from './CallModal';
import { UTopBar } from 'openland-web/components/unicorn/UTopBar';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import MicIcon from 'openland-icons/s/ic-mic-24.svg';
import ChevronIcon from 'openland-icons/s/ic-chevron-16.svg';
import { useJoinRoom } from 'openland-web/fragments/rooms/joinRoom';

const getSubtitle = (users: { name: string }[]) => {
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
            {users[0].name}, {users[1].name} and{' '}{users.length - 2} others
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

    let sharedRoom = chat.__typename === 'SharedRoom' ? chat as RoomChat_room_SharedRoom : null;

    let data = client.useConferenceMeta(
        { id: sharedRoom?.activeVoiceChat?.id || chat.id },
        { fetchPolicy: 'network-only', suspense: false },
    );
    const openVideoModal = useVideoCallModal({ chatId: chat.id });
    const callDisabled = props.chat.__typename === 'PrivateRoom' && !!currentSession && currentSession.callType === 'voice-chat';
    const isVoiceChat = data?.conference.parent?.__typename === 'VoiceChat';

    const joinCall = () => {
        calls.joinCall(chat.id, 'call');
        openVideoModal();
    };

    const onJoinClick = React.useCallback(() => {
        if (isVoiceChat) {
            joinRoom(sharedRoom!.activeVoiceChat!.id);
        } else if (currentSession && currentSession.conversationId) {
            openVideoModal();
        } else {
            joinCall();
        }
    }, [chat, isVoiceChat]);

    useTalkWatch(data && data.conference.id);
    if (!data) {
        return null;
    }

    const subtitle = getSubtitle(data.conference.peers.map(peer => peer.user));
    const title = isVoiceChat ? '' : 'Call';
    const rightText = isVoiceChat ? 'Join room' : 'Join';

    const showBar = data.conference.peers.length !== 0;
    return showBar ? (
        <UTopBar
            type="positive"
            leftIcon={isVoiceChat ? <MicIcon /> : <PhoneIcon />}
            title={title}
            subtitle={subtitle}
            rightText={rightText}
            disabled={callDisabled}
            rightIcon={<ChevronIcon />}
            onClick={onJoinClick}
        />
    ) : null;
};
