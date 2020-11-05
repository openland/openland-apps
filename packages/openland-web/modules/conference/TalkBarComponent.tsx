import * as React from 'react';
import { useTalkWatch } from './useTalkWatch';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { Conference_conference_peers_user, RoomChat_room } from 'openland-api/spacex.types';
import { css } from 'linaria';
import { useVideoCallModal } from './CallModal';
import { UTopBar } from 'openland-web/components/unicorn/UTopBar';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import ChevronIcon from 'openland-icons/s/ic-chevron-16.svg';
import { OthersPopper } from 'openland-web/fragments/chat/messenger/message/content/OthersPopper';

export const activeAvatarStyle = css`
    ::after{
        content: '';
        position: absolute;
        top:-2px;
        left:-2px;
        width: 32px;
        height: 32px;
        border: 2px solid white;
        border-radius: 32px;
    }
`;

const getSubtitle = (users: Conference_conference_peers_user[]) => {
    return users.length === 0 ? ''
        : users.length === 1 ? users[0].name
            : users.length === 2 ? `${users[0].name} and ${users[1].name}`
                : users.length === 3 ? `${users[0].name}, ${users[1].name} and ${users[2].name}`
                    : (
                        <span>
                            {users[0].name}, {users[1].name} and <OthersPopper users={users.slice(2)} noStyling={true}>{users.length - 2} others</OthersPopper>
                        </span>
                    );
};

export const TalkBarComponent = (props: { chat: RoomChat_room }) => {
    let messenger = React.useContext(MessengerContext);
    let calls = messenger.calls;
    let currentSession = calls.useCurrentSession();
    let client = useClient();
    let data = client.useConference(
        { id: props.chat.id },
        { fetchPolicy: 'network-only', suspense: false },
    );
    const openVideoModal = useVideoCallModal({ chatId: props.chat.id });

    const joinCall = () => {
        calls.joinCall(props.chat.id);
        openVideoModal();
    };

    useTalkWatch(data && data.conference.id);
    if (!data) {
        return null;
    }

    const subtitle = getSubtitle(data.conference.peers.map(peer => peer.user));
    return data.conference.peers.length !== 0 ? (
        <UTopBar
            type="positive"
            leftIcon={<PhoneIcon />}
            title="Call"
            subtitle={subtitle}
            rightText="Join"
            rightIcon={<ChevronIcon />}
            onClick={currentSession && currentSession.conversationId ? openVideoModal : joinCall}
        />
    ) : null;
};
