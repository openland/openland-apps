import * as React from 'react';
import { css, cx } from 'linaria';
import { XView } from 'react-mental';

import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { SvgLoader } from 'openland-x/XLoader';
import { TextLabel2 } from 'openland-web/utils/TextStyles';

import IcMuted from 'openland-icons/s/ic-speaker-off-16.svg';
import CrownIcon from 'openland-icons/ic-crown-4.svg';

import { RoomUserMenu } from './RoomUserMenu';

const userNameStyle = cx(
    TextLabel2,
    css`
        /* width: 100%; */
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--foregroundPrimary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    `,
);

const userNameTalkingStyle = css`
    color: #248bf2;
`;

const adminIconStyle = css`
    height: 18px;
    margin-right: 6px;

    & svg * {
        fill: var(--tintOrange);
    }
`;

const ellipsis = css`
    overflow: hidden;
    text-overflow: ellipsis;
`;

const stateIconStyle = css`
    display: flex;
    position: absolute;
    bottom: 4px;
    right: 0px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: var(--backgroundPrimary);
    justify-content: center;
    align-items: center;
`;

const speakerAvatarSizes = {
    size: 80,
    placeholder: 36,
    dotSize: 0,
    dotPosition: 0,
    dotBorderWidth: 0,
};

const listenerAvatarSizes = {
    size: 64,
    placeholder: 26,
    dotSize: 0,
    dotPosition: 0,
    dotBorderWidth: 0,
};

const roomUserContainer = css`
    flex-grow: 0;
    flex-shrink: 0;
    align-items: center;
    padding: 8px;
    margin: 0 10px;
    width: 110px;

    &:hover {
        background-color: var(--backgroundTertiaryTrans);
        border-radius: 8px;
        cursor: pointer;

        .${stateIconStyle} {
            background-color: var(--backgroundPrimaryHover);
        }
    }
`;

const roomUserContainerVisible = css`
    background-color: var(--backgroundTertiaryTrans);
    border-radius: 8px;
`;

const listenerStyle = css`
    width: 100px;
    margin-left: 3px;
    margin-right: 4px;
`;

interface RoomUserProps {
    id: string;
    name: string;
    photo: string | null;
    roomId: string;
    userStatus: VoiceChatParticipantStatus;
    selfStatus?: VoiceChatParticipantStatus;
    selfId?: string;
    state?: 'talking' | 'loading' | 'muted';
}

export const RoomUser = React.memo((props: RoomUserProps) => {
    const { id, name, photo, state, roomId, userStatus, selfStatus, selfId } = props;
    const isSelf = selfId === id;
    const [visible, show, hide] = usePopper(
        {
            placement: 'bottom-start',
            hideOnLeave: false,
            borderRadius: 8,
            scope: 'room-user',
            hideOnChildClick: true,
            hideOnClick: true,
            updatedDeps: userStatus,
        },
        (ctx) => (
            <RoomUserMenu
                ctx={ctx}
                roomId={roomId}
                userId={id}
                status={userStatus}
                selfStatus={selfStatus}
                isSelf={isSelf}
            />
        ),
    );
    const isAdmin = userStatus === VoiceChatParticipantStatus.ADMIN;
    const isSpeaker = userStatus === VoiceChatParticipantStatus.SPEAKER;
    const isListener = userStatus === VoiceChatParticipantStatus.LISTENER;
    const handleClick = (e: React.MouseEvent) => {
        if (visible) {
            hide();
        } else {
            show(e);
        }
    };
    return (
        <div
            className={cx(
                roomUserContainer,
                visible && roomUserContainerVisible,
                isListener && listenerStyle,
            )}
            onClick={handleClick}
        >
            <XView
                borderWidth={2}
                borderColor={state === 'talking' ? '#248BF2' : 'transparent'}
                padding={4}
                borderRadius={100}
                alignItems="center"
                justifyContent="center"
                marginBottom={6}
            >
                <UAvatar
                    customSizes={isSpeaker || isAdmin ? speakerAvatarSizes : listenerAvatarSizes}
                    id={id}
                    photo={photo}
                />
                {(state === 'muted' || state === 'loading') && (
                    <div className={stateIconStyle}>
                        {state === 'muted' ? (
                            <UIcon size={16} icon={<IcMuted />} color="var(--foregroundTertiary)" />
                        ) : state === 'loading' ? (
                            <SvgLoader size="small" contrast={true} />
                        ) : null}
                    </div>
                )}
            </XView>
            <div className={cx(userNameStyle, state === 'talking' && userNameTalkingStyle)}>
                {isAdmin && (
                    <div className={adminIconStyle}>
                        <CrownIcon />
                    </div>
                )}
                <div className={cx(TextLabel2, ellipsis)}>{name}</div>
            </div>
        </div>
    );
});
