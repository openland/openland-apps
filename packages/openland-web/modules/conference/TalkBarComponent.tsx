import * as React from 'react';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { useTalkWatch } from './useTalkWatch';
import { XView } from 'react-mental';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { useClient } from 'openland-api/useClient';
import { ChatInfo } from 'openland-web/fragments/chat/types';
import { Conference_conference_peers, Conference_conference_peers_user } from 'openland-api/spacex.types';
import { useStreamManager, MediaSessionManager } from 'openland-engines/media/MediaSessionManager';
import { css, cx } from 'linaria';
import { showVideoCallModal } from './CallModal';
import { UTopBar } from 'openland-web/components/unicorn/UTopBar';
import PhoneIcon from 'openland-icons/s/ic-call-24.svg';
import ChevronIcon from 'openland-icons/s/ic-chevron-16.svg';
import { OthersPopper } from 'openland-web/fragments/chat/messenger/message/content/OthersPopper';

const animatedAvatarStyle = css`
    transition: filter 350ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
`;

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

interface CallPeerProps {
    peer: Conference_conference_peers;
    mediaSessionManager?: MediaSessionManager;
}

export const CallPeer = (props: CallPeerProps) => {
    let callState = React.useContext(MessengerContext).calls.useState();
    const avatarRef = React.useRef<HTMLDivElement>(null);
    const mediaStream = useStreamManager(props.mediaSessionManager, props.peer.id);
    const isMe =
        props.peer.id === (props.mediaSessionManager && props.mediaSessionManager.getPeerId());
    // animate while speaking
    React.useEffect(() => {
        let d: (() => void) | undefined;
        if (props.mediaSessionManager) {
            d = props.mediaSessionManager.analizer.subscribePeer(props.peer.id, (v) => {
                if (avatarRef.current) {
                    avatarRef.current.className = (cx(v && activeAvatarStyle));
                }
            });
        }
        return d;
    }, [props.mediaSessionManager, props.peer.id]);

    // mark non connected
    React.useEffect(() => {
        if (!mediaStream || isMe) {
            return;
        }
        mediaStream.listenIceState((s) => {
            if (avatarRef.current) {
                avatarRef.current.style.filter = `grayscale(${
                    callState.conversationId && ['connected', 'completed'].indexOf(s) === -1
                        ? 100
                        : 0
                    }%)`;
            }
        });
        return () => {
            if (avatarRef.current) {
                avatarRef.current.style.filter = '';
            }
        };
    }, [mediaStream, callState.conversationId]);

    return (
        <>
            <XView flexDirection="row">
                <div className={animatedAvatarStyle} ref={avatarRef}>
                    <UAvatar
                        size="small"
                        id={props.peer.user.id}
                        title={props.peer.user.name}
                        photo={props.peer.user.photo}
                    />
                </div>
            </XView>
            <XView width={8} />
        </>
    );
};

const getSubtitle = (users: Conference_conference_peers_user[]) => {
    return users.length === 0 ? ''
        : users.length === 1 ? users[0].name
        : users.length === 2 ? `${users[0].name} and ${users[1].name}`
        : users.length === 3 ? `${users[0].name}, ${users[1].name} and ${users[2].name}`
        : (
            <span>
                {users[0].name}, {users[1].name} and <OthersPopper users={users.slice(2)}>{users.length - 2} others</OthersPopper>
            </span>
        );
};

export const TalkBarComponent = (props: { chat: ChatInfo }) => {
    let messenger = React.useContext(MessengerContext);
    let calls = messenger.calls;
    let callState = calls.useState();
    let client = useClient();
    let data = client.useConference(
        { id: props.chat.id },
        { fetchPolicy: 'network-only', suspense: false },
    );

    useTalkWatch(data && data.conference.id);
    if (!data) {
        return null;
    }

    const subtitle = getSubtitle(data.conference.peers.map(peer => peer.user));

    const joinCall = () => {
        calls.joinCall(
            props.chat.id,
            props.chat.__typename === 'PrivateRoom',
            props.chat.__typename === 'PrivateRoom'
                ? {
                    id: props.chat.user.id,
                    title: props.chat.user.name,
                    picture: props.chat.user.photo,
                }
                : {
                    id: props.chat.id,
                    title: props.chat.title,
                    picture: props.chat.photo,
                },
        );
        showVideoCallModal({ calls, chatId: props.chat.id, client, messenger });
    };

    return data.conference.peers.length !== 0 ? (
        <UTopBar
            type="positive"
            leftIcon={<PhoneIcon />}
            title="Call"
            subtitle={subtitle}
            rightText="Join"
            rightIcon={<ChevronIcon />}
            onClick={callState.conversationId
                ? () => showVideoCallModal({ calls, chatId: props.chat.id, client, messenger })
                : joinCall}
        />
    ) : null;
};
