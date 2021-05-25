import * as React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    LayoutChangeEvent,
} from 'react-native';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TintBlue, TintOrange } from 'openland-y-utils/themes/tints';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { showRoomSettings } from './RoomSettings';
import { ReportCallErrorType } from 'openland-mobile/utils/voiceChatErrorNotifier';
import { showRoomInvite } from './showRoomInvite';
// import { RoomDonationBar } from './RoomDonationBar';

const ControlItem = React.memo(
    (props: {
        theme: ThemeGlobal;
        text?: string;
        icon: NodeRequire | string;
        iconColor?: string;
        bgColor: string;
        counter?: number;
        disabled?: boolean;
        loading?: boolean;
        faded?: boolean;
        onPress?: () => void;
    }) => {
        const {
            theme,
            text,
            icon,
            loading,
            iconColor,
            bgColor,
            counter,
            disabled,
            faded,
            onPress,
        } = props;
        const size = text ? 56 : 78;
        const iconSize = text ? 24 : 36;
        let iconContent = loading ? (
            <LoaderSpinner color={iconColor} size="x-large" />
        ) : typeof icon === 'string' ? (
            <Text style={{ fontSize: iconSize, color: iconColor }}>{icon}</Text>
        ) : (
            <Image
                source={icon}
                style={{ width: iconSize, height: iconSize, tintColor: iconColor }}
            />
        );
        return (
            <View style={{ alignItems: 'center' }}>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={onPress}
                    disabled={disabled}
                    style={{
                        width: size,
                        height: size,
                        marginBottom: 8,
                        position: 'relative',
                        opacity: faded ? 0.4 : 1,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: bgColor,
                            width: size,
                            height: size,
                            borderRadius: 100,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {iconContent}
                    </View>
                    {counter ? (
                        <View
                            style={{
                                position: 'absolute',
                                top: -3,
                                right: 0,
                                borderRadius: 100,
                                backgroundColor: theme.backgroundPrimary,
                                paddingHorizontal: 4,
                                paddingVertical: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                            }}
                        >
                            <Text
                                style={{
                                    color: theme.foregroundPrimary,
                                    ...TextStyles.Detail,
                                    textAlign: 'center',
                                }}
                            >
                                {counter}
                            </Text>
                        </View>
                    ) : null}
                </TouchableOpacity>
                {text ? (
                    <Text
                        style={{
                            ...TextStyles.Label3,
                            color: theme.foregroundPrimary,
                            textAlign: 'center',
                        }}
                    >
                        {text}
                    </Text>
                ) : null}
            </View>
        );
    },
);

const ControlMute = React.memo(
    (props: {
        theme: ThemeGlobal;
        disabled?: boolean;
        connecting: boolean;
        muted: boolean;
        onPress: () => void;
    }) => {
        const { theme, muted, connecting, disabled, onPress } = props;

        return (
            <ControlItem
                theme={theme}
                icon={
                    muted || disabled
                        ? require('assets/ic-mute-glyph-36.png')
                        : require('assets/ic-microphone-36.png')
                }
                iconColor={theme.foregroundContrast}
                bgColor={muted || disabled ? TintOrange.primary : TintBlue.primary}
                disabled={disabled}
                faded={disabled}
                loading={!muted && connecting}
                onPress={onPress}
            />
        );
    },
);

const RaiseModalView = React.memo(
    ({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => Promise<void> }) => {
        const theme = useTheme();

        return (
            <>
                <View
                    style={{
                        backgroundColor: theme.backgroundTertiaryTrans,
                        width: 96,
                        height: 96,
                        borderRadius: 100,
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        marginBottom: 16,
                    }}
                >
                    <Image
                        source={require('assets/reactions/ic-reaction-raised-36.png')}
                        style={{ width: 42, height: 42 }}
                    />
                </View>
                <Text
                    style={{
                        ...TextStyles.Title2,
                        color: theme.foregroundPrimary,
                        textAlign: 'center',
                        marginBottom: 6,
                    }}
                >
                    Raise hand?
                </Text>
                <Text
                    style={{
                        ...TextStyles.Body,
                        color: theme.foregroundSecondary,
                        textAlign: 'center',
                        marginHorizontal: 32,
                        marginBottom: 32,
                    }}
                >
                    Room admins will see that{'\u00A0'}you{'\u00A0'}want{'\u00A0'}to{'\u00A0'}speak
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: 16,
                    }}
                >
                    <ZButton
                        style="secondary"
                        size="large"
                        title="Maybe later"
                        onPress={onCancel}
                    />
                    <ZButton
                        style="positive"
                        size="large"
                        title="Raise hand 🖐"
                        action={onConfirm}
                    />
                </View>
            </>
        );
    },
);

const showRaiseHandModal = (onConfirm: () => Promise<void>) => {
    showBottomSheet({
        cancelable: true,
        view: ({ hide }) => {
            return (
                <RaiseModalView
                    onCancel={hide}
                    onConfirm={async () => {
                        await onConfirm();
                        hide();
                    }}
                />
            );
        },
    });
};

const ControlRaiseHand = React.memo(
    (props: { theme: ThemeGlobal; raised: boolean; roomId: string }) => {
        const { theme, raised, roomId } = props;
        const client = useClient();
        const handlePress = React.useCallback(async () => {
            if (raised) {
                await client.mutateVoiceChatRaiseHand({ id: roomId, raised: false });
                await client.refetchVoiceChatControls({ id: roomId });
                return;
            }
            showRaiseHandModal(async () => {
                await client.mutateVoiceChatRaiseHand({ id: roomId, raised: true });
                await client.refetchVoiceChatControls({ id: roomId });
            });
        }, [raised, roomId]);

        return (
            <ControlItem
                theme={theme}
                icon={require('assets/reactions/ic-reaction-raised-36.png')}
                bgColor={raised ? theme.accentPositive : theme.backgroundTertiaryTrans}
                onPress={handlePress}
            />
        );
    },
);

interface RoomSettingsButtonProps {
    theme: ThemeGlobal;
    raisedCount: number;
    roomId: string;
    roomTitle: string | null;
    roomMessage: string | null;
    status: VoiceChatParticipantStatus | undefined;
    reportUserError: (type: ReportCallErrorType) => void;
}

const RoomSettingsButton = React.memo((props: RoomSettingsButtonProps) => {
    const { theme, raisedCount, roomId, status, roomTitle, reportUserError, roomMessage } = props;

    return (
        <ControlItem
            theme={theme}
            icon={require('assets/ic-settings-24.png')}
            iconColor={theme.foregroundSecondary}
            text="Settings"
            bgColor={theme.backgroundTertiaryTrans}
            counter={status === VoiceChatParticipantStatus.ADMIN ? raisedCount : undefined}
            onPress={() => showRoomSettings({
                roomId,
                roomTitle,
                roomMessage,
                raisedHandCount: raisedCount,
                theme,
                status,
                reportUserError
            })}
        />
    );
});

interface RoomControlsProps {
    id: string;
    title: string | null;
    message: string | null;
    theme: ThemeGlobal;
    showInviteButton: boolean;
    handRaised: boolean;
    selfStatus: VoiceChatParticipantStatus | undefined;
    onLeave: () => void;
    onLayout: (e: LayoutChangeEvent) => void;
    muted: boolean;
    connecting: boolean;
    onMutePress: () => void;
    reportUserError: (type: ReportCallErrorType) => void;
    raisedHandUsers: number;
}

const getButtons = (props: RoomControlsProps) => {
    const { theme, id, title, message, muted, selfStatus, showInviteButton, handRaised, connecting, onLeave, onMutePress, raisedHandUsers, reportUserError } = props;

    const leaveBtn = (
        <ControlItem
            key="leave-btn"
            theme={theme}
            text="Leave"
            icon={require('assets/ic-leave-24.png')}
            iconColor={theme.foregroundSecondary}
            bgColor={theme.backgroundTertiaryTrans}
            onPress={onLeave}
        />
    );
    const inviteBtn = showInviteButton ? (
        <ControlItem
            theme={theme}
            key="invite-btn"
            text="Invite"
            icon={require('assets/ic-add-24.png')}
            iconColor={theme.foregroundSecondary}
            bgColor={theme.backgroundTertiaryTrans}
            onPress={() =>
                showRoomInvite({
                    theme,
                    roomId: id,
                })
            }
        />
    ) : null;

    let buttons: (JSX.Element | null)[] = [
        leaveBtn,
        <RoomSettingsButton
            key="settings-btn"
            theme={theme}
            raisedCount={raisedHandUsers}
            roomTitle={title}
            roomMessage={message}
            roomId={id}
            status={selfStatus}
            reportUserError={reportUserError}
        />,
        inviteBtn
    ];

    if (selfStatus === VoiceChatParticipantStatus.ADMIN || selfStatus === VoiceChatParticipantStatus.SPEAKER) {
        buttons.push(
            <ControlMute
                muted={muted}
                connecting={connecting}
                theme={theme}
                onPress={onMutePress}
            />
        );
    } else if (selfStatus === VoiceChatParticipantStatus.LISTENER) {
        buttons.push(<ControlRaiseHand theme={theme} raised={handRaised} roomId={id} />);
    }

    return buttons.filter(x => x);
};

export const RoomControls = React.memo((props: RoomControlsProps) => {
    const { onLayout } = props;

    const buttons = getButtons(props);
    return (
        <View onLayout={onLayout} style={{ paddingTop: 16 }}>
            {/* <RoomDonationBar /> */}
            <View
                style={{
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    justifyContent: buttons.length >= 4 ? 'space-between' : 'space-around'
                }}
            >
                {buttons}
            </View>
        </View>
    );
});
