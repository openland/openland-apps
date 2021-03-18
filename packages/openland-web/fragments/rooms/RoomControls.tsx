import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { TextStyles } from 'openland-web/utils/TextStyles';
import * as React from 'react';
import { XView } from 'react-mental';
import IcLeave from 'openland-icons/s/ic-leave-24.svg';
import IcAdd from 'openland-icons/s/ic-add-24.svg';
import IcSettings from 'openland-icons/s/ic-settings-24.svg';
import IcMicOn from 'openland-icons/s/ic-mic-on-36.svg';
import IcMicOff from 'openland-icons/s/ic-mic-off-36.svg';
import IcEdit from 'openland-icons/s/ic-edit-24.svg';
import IcHand from 'openland-icons/s/ic-hand-24.svg';
import { css, cx } from 'linaria';
import { VoiceChatParticipant, VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { SvgLoader } from 'openland-x/XLoader';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
// import { useClient } from 'openland-api/useClient';
import { showEditRoom } from './showEditRoom';
import { showRaisedHands } from './showRaisedHands';
import { showInviteToRoom } from './showInviteToRoom';

const RoomControlItem = React.memo((props: {
    icon: JSX.Element,
    text?: string,
    bgColor?: string,
    bgColorHover?: string,
    iconColor?: string,
    counter?: number,
    onClick?: (e: React.MouseEvent) => void,
}) => {
    const size = props.text ? 56 : 78;
    const iconSize = props.text ? 24 : 36;
    const bgColor = props.bgColor || 'var(--backgroundTertiaryTrans)';
    const bgColorHover = props.bgColorHover || 'var(--backgroundTertiaryHoverTrans)';
    const iconColor = props.iconColor || 'var(--foregroundSecondary)';

    return (
        <XView alignItems="center">
            <XView
                width={size}
                height={size}
                borderRadius="100%"
                justifyContent="center"
                alignItems="center"
                backgroundColor={bgColor}
                hoverBackgroundColor={bgColorHover}
                cursor="pointer"
                onClick={props.onClick}
            >
                <UIcon size={iconSize} icon={props.icon} color={iconColor} />
                {props.counter && props.counter > 0 ? (
                    <XView
                        position="absolute"
                        top={-2}
                        right={0}
                        backgroundColor="var(--backgroundPrimary)"
                        color="var(--foregroundPrimary)"
                        paddingHorizontal={4}
                        paddingVertical={1}
                        borderRadius={100}
                        {...TextStyles.Detail}
                    >
                        {props.counter > 9 ? `9+` : props.counter}
                    </XView>
                ) : null}
            </XView>
            {props.text && (
                <XView
                    marginTop={8}
                    color="var(--foregroundPrimary)"
                    justifyContent="center"
                    {...TextStyles.Label3}
                >
                    {props.text}
                </XView>
            )}
        </XView>
    );
});

const MuteButton = React.memo(({ isMuted, onMute, connecting }: {
    isMuted: boolean,
    connecting: boolean,
    onMute: () => void,
}) => {
    return (
        <RoomControlItem
            icon={connecting ? <SvgLoader size="large" contrast={true} /> : isMuted ? <IcMicOff /> : <IcMicOn />}
            bgColor={isMuted ? 'var(--tintOrange)' : 'var(--tintBlue)'}
            bgColorHover={isMuted ? 'var(--tintOrangeHover)' : 'var(--tintBlueHover)'}
            iconColor="var(--foregroundContrast)"
            onClick={onMute}
        />
    );
});

const RaiseHandButton = React.memo(({ raised, onRaise }: { raised: boolean, onRaise: () => void }) => {
    return (
        <RoomControlItem
            icon={(
                <ImgWithRetry
                    src="//cdn.openland.com/shared/rooms/raised-hand-36.png"
                    srcSet="//cdn.openland.com/shared/rooms/raised-hand-36@2x.png 2x, //cdn.openland.com/shared/rooms/raised-hand-36@3x.png 3x"
                />
            )}
            bgColor={raised ? 'var(--accentPositive)' : 'var(--backgroundTertiaryTrans)'}
            bgColorHover={raised ? 'var(--accentPositiveHover)' : 'var(--backgroundTertiaryHoverTrans)'}
            iconColor="var(--foregroundContrast)"
            onClick={onRaise}
        />
    );
});

const controlsStyle = css`
    flex-grow: 1;
    display: grid;
    justify-items: start;
    grid-template-columns: repeat(2, 56px) auto;
    column-gap: 56px;
`;

const controlsAdminStyle = css`
    grid-template-columns: repeat(3, 56px) auto;

    @media (max-width: 440px) {
        column-gap: 24px;
    }

    @media (max-width: 340px) {
        column-gap: 8px;
    }
`;

const SettingsMenu = React.memo((props: {
    ctx: UPopperController,
    roomId: string,
    title: string | null,
    raisedHands: VoiceChatParticipant[],
}) => {
    // const client = useClient();
    let popper = new UPopperMenuBuilder();

    popper
        .item({
            title: 'Edit room',
            icon: <IcEdit />,
            action: () => {
                showEditRoom({ roomId: props.roomId, title: props.title });
            },
        })
        .item({
            title: 'Raised hands',
            icon: <IcHand />,
            action: () => {
                showRaisedHands({ raisedHands: props.raisedHands, roomId: props.roomId });
            },
            counter: props.raisedHands.length,
        });
    // .item({
    //     title: 'Close room',
    //     icon: <IcLeave />,
    //     action: async () => {
    //         await client.mutateVoiceChatEnd({ id: props.roomId });
    //     },
    // });

    return popper.build(props.ctx, 220);
});

export const RoomControls = React.memo(({
    roomId,
    title,
    status,
    connecting,
    isMuted,
    handRaised,
    raisedHands,
    inviteLink,
    onMute,
    onLeave,
    onHandRaise,
}: {
    roomId: string,
    title: string | null,
    status?: VoiceChatParticipantStatus | null,
    connecting: boolean,
    isMuted: boolean,
    raisedHands: VoiceChatParticipant[],
    handRaised: boolean,
    inviteLink: string,
    onMute: () => void,
    onLeave: () => void,
    onHandRaise: () => void,
}) => {

    const [visible, show] = usePopper(
        {
            placement: 'top',
            hideOnLeave: true,
            borderRadius: 8,
            scope: 'room-settings',
            hideOnChildClick: true,
            hideOnClick: true,
        },
        (ctx) => (
            <SettingsMenu ctx={ctx} roomId={roomId} title={title} raisedHands={raisedHands} />
        ),
    );

    return (
        <XView
            paddingVertical={16}
            flexDirection="row"
            alignSelf="center"
            maxWidth={600}
            width="100%"
        >
            <div className={cx(controlsStyle, status === VoiceChatParticipantStatus.ADMIN && controlsAdminStyle)}>
                <RoomControlItem
                    text="Leave"
                    icon={<IcLeave />}
                    onClick={onLeave}
                />
                <RoomControlItem
                    text="Invite"
                    icon={<IcAdd />}
                    onClick={() => showInviteToRoom({ link: inviteLink })}
                />
                {status === VoiceChatParticipantStatus.ADMIN && (
                    <RoomControlItem
                        text="Settings"
                        icon={<IcSettings />}
                        counter={raisedHands.length}
                        bgColor={visible ? 'var(--backgroundTertiaryActiveTrans)' : undefined}
                        onClick={show}
                    />
                )}
                <div style={{ justifySelf: 'end' }}>
                    {status === VoiceChatParticipantStatus.LISTENER ? (
                        <RaiseHandButton raised={handRaised} onRaise={onHandRaise} />
                    ) : status === VoiceChatParticipantStatus.SPEAKER || status === VoiceChatParticipantStatus.ADMIN ? (
                        <MuteButton isMuted={isMuted} connecting={connecting} onMute={onMute} />
                    ) : null}
                </div>
            </div>
        </XView>
    );
});
