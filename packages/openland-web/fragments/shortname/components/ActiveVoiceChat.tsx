import React from 'react';
import { XView, XViewRouterContext } from 'react-mental';
import { css } from 'linaria';
import { VoiceChatWithSpeakers } from 'openland-api/spacex.types';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';

import IcListener from 'openland-icons/s/ic-listener-16.svg';
import IcSpeaker from 'openland-icons/s/ic-speaker-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { useJoinRoom } from 'openland-web/fragments/rooms/joinRoom';

interface CurrentVoiceChatProps {
    currentVoiceChat: VoiceChatWithSpeakers;
}

const iconClass = css`
  flex-grow: 0;
  margin-left: 6px;
`;

const dotDivider = css`
  width: 3px;
  height: 3px;
  border-radius: 3px;
  background-color: var(--foregroundTertiary);
  margin: 0 8px;
`;

export const ActiveVoiceChat = React.memo<CurrentVoiceChatProps>(props => {
    const { id, title, speakers, speakersCount, listenersCount } = props.currentVoiceChat;
    const router = React.useContext(XViewRouterContext)!;
    const joinRoom = useJoinRoom();

    const firstSpeakers = speakers.slice(0, 5);

    return (
        <UListGroup header={title!}>
            <XView
                flexDirection="row"
                justifyContent="space-between"
                paddingHorizontal={16}
                marginTop={5}
                alignItems="center"
                color="var(--foregroundTertiary)"
                {...TextStyles.Body}
            >
                <XView flexDirection="row" alignItems="center">
                    {firstSpeakers.map(item => (
                        <UAvatar
                            id={item.user.id}
                            size="small"
                            key={item.user.id}
                            photo={item.user.photo}
                            marginRight={8}
                            onClick={() => router.navigate(`/${item.user.id}`)}
                        />
                    ))}
                    <XView flexDirection="row" marginLeft={12} alignItems="center">
                        {speakersCount}
                        <UIcon
                            icon={<IcSpeaker />}
                            className={iconClass}
                            color="var(--foregroundTertiary)"
                        />
                        {listenersCount > 0 && (
                            <>
                                <div className={dotDivider} />
                                {listenersCount}
                                <UIcon
                                    icon={<IcListener />}
                                    className={iconClass}
                                    color="var(--foregroundTertiary)"
                                />
                            </>
                        )}
                    </XView>
                </XView>
                <UButton
                    text="Join room"
                    style="success"
                    size="large"
                    shape="round"
                    paddingVertical={6}
                    paddingHorizontal={16}
                    id="joinRoom"
                    onClick={() => {
                        joinRoom(id);
                    }}
                />
            </XView>
        </UListGroup>
    );
});