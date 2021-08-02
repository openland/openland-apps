import * as React from 'react';
import { css } from 'linaria';

import { VoiceChatT } from 'openland-engines/VoiceChatEngine';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XLoader } from 'openland-x/XLoader';

import { RoomUser } from './RoomUser';

const listenersGridStyle = css`
    margin-left: -5px;
    margin-right: -11px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const loaderClass = css`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

export const RoomListeners = React.memo((props: { room: VoiceChatT }) => {
    return (
        <div className={listenersGridStyle}>
            {(props.room.listeners || []).map((listener, i) => (
                <RoomUser
                    key={listener.id}
                    id={listener.user.id}
                    name={listener.user.firstName}
                    photo={listener.user.photo}
                    roomId={props.room.id}
                    selfId={props.room.me?.user.id}
                    userStatus={VoiceChatParticipantStatus.LISTENER}
                    selfStatus={props.room.me?.status}
                />
            ))}
        </div>
    );
});

export const RoomListenersLoader = React.memo(() => {
    const messenger = React.useContext(MessengerContext);
    const { loading } = messenger.voiceChat.useListenersMeta();
    return loading ? (
        <div className={loaderClass}>
            <XLoader loading={true} />
        </div>
    ) : null;
});
