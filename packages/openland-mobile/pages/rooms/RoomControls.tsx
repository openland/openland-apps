import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Share, Platform, Clipboard, LayoutChangeEvent } from 'react-native';
import { VoiceChatParticipantStatus, VoiceChatParticipant_user } from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import Toast from 'openland-mobile/components/Toast';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { TintBlue, TintOrange } from 'openland-y-utils/themes/tints';
import { showRaisedHands } from './RaisedHands';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';

const showRoomInvite = ({ link, theme }: { link: string, theme: ThemeGlobal }) => {
    const handleShare = () => {
        Share.share(
            Platform.select({
                ios: { url: link },
                android: { message: link },
                default: { message: link },
            }),
        );
    };
    const handleCopy = () => {
        Clipboard.setString(link);
        Toast.showCopied();
    };
    const builder = new ActionSheetBuilder();
    builder
        .title('Invite friends')
        .view(() => (
            <View
                style={{
                    borderRadius: 12,
                    backgroundColor: theme.backgroundTertiaryTrans,
                    paddingHorizontal: 16,
                    paddingVertical: 13,
                    marginHorizontal: 16,
                    marginBottom: 8,
                }}
            >
                <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary }}>{link}</Text>
            </View>
        ))
        .action('Copy link', handleCopy, false, require('assets/ic-copy-24.png'))
        .action('Share link', handleShare, false, require('assets/ic-share-24.png'))
        .show();
};

const ControlItem = React.memo((props: {
    theme: ThemeGlobal,
    text?: string,
    icon: NodeRequire | string,
    iconColor?: string,
    bgColor: string,
    counter?: number,
    disabled?: boolean,
    loading?: boolean,
    faded?: boolean,
    onPress?: () => void
}) => {
    const { theme, text, icon, loading, iconColor, bgColor, counter, disabled, faded, onPress } = props;
    const size = text ? 56 : 78;
    const iconSize = text ? 24 : 36;
    let iconContent = loading ? (
        <LoaderSpinner color={iconColor} size="x-large" />
    ) : typeof icon === 'string' ? (
        <Text style={{ fontSize: iconSize, color: iconColor }}>{icon}</Text>
    ) : (
        <Image source={icon} style={{ width: iconSize, height: iconSize, tintColor: iconColor }} />
    );
    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPress}
                disabled={disabled}
                style={{ width: size, height: size, marginBottom: 8, position: 'relative', opacity: faded ? 0.4 : 1 }}
            >
                <View style={{ backgroundColor: bgColor, width: size, height: size, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    {iconContent}
                </View>
                {counter ? (
                    <View
                        style={{
                            position: "absolute",
                            top: -3,
                            right: 0,
                            borderRadius: 100,
                            backgroundColor: theme.foregroundTertiary,
                            paddingHorizontal: 4,
                            paddingVertical: 2,
                            borderWidth: 1,
                            borderColor: theme.backgroundSecondary,
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        <Text
                            style={{
                                color: theme.foregroundContrast,
                                ...TextStyles.Detail,
                                textAlign: 'center'
                            }}
                        >
                            {counter}
                        </Text>
                    </View>
                ) : null}
            </TouchableOpacity>
            {text
                ? <Text style={{ ...TextStyles.Label3, color: theme.foregroundPrimary, textAlign: 'center' }}>{text}</Text>
                : null
            }
        </View>
    );
});

const ControlMute = React.memo((props: { theme: ThemeGlobal, disabled?: boolean, connecting: boolean, muted: boolean, onPress: () => void }) => {
    const { theme, muted, connecting, disabled, onPress } = props;

    return (
        <ControlItem
            theme={theme}
            icon={(muted || disabled) ? require('assets/ic-mute-glyph-36.png') : require('assets/ic-microphone-36.png')}
            iconColor={theme.foregroundContrast}
            bgColor={(muted || disabled) ? TintOrange.primary : TintBlue.primary}
            disabled={disabled}
            faded={disabled}
            loading={connecting}
            onPress={onPress}
        />
    );
});

const RaiseModalView = React.memo(({ onCancel, onConfirm }: { onCancel: () => void, onConfirm: () => Promise<void> }) => {
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
                <Image source={require('assets/ic-raise-back-hand-36.png')} style={{ width: 42, height: 42 }} />
            </View>
            <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, textAlign: 'center', marginBottom: 6 }}>Raise hand?</Text>
            <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', marginHorizontal: 32, marginBottom: 32 }}>
                Room admins will see that{'\u00A0'}you{'\u00A0'}want{'\u00A0'}to{'\u00A0'}speak
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
                <ZButton style="secondary" size="large" title="Maybe later" onPress={onCancel} />
                <ZButton style="positive" size="large" title="Raise hand 🖐" action={onConfirm} />
            </View>
        </>
    );
});

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
        }
    });
};

const ControlRaiseHand = React.memo((props: { theme: ThemeGlobal, raised: boolean, roomId: string }) => {
    const { theme, raised, roomId } = props;
    const client = useClient();
    const handlePress = React.useCallback(async () => {
        if (raised) {
            await client.mutateVoiceChatRaiseHand({ id: roomId, raised: false });
            await client.refetchVoiceChatControls({ id: roomId });
            return;
        }
        showRaiseHandModal(
            async () => {
                await client.mutateVoiceChatRaiseHand({ id: roomId, raised: true });
                await client.refetchVoiceChatControls({ id: roomId });
            }
        );
    }, [raised, roomId]);

    return (
        <ControlItem
            theme={theme}
            icon={raised ? require('assets/ic-raised-hand-36.png') : require('assets/ic-raise-back-hand-36.png')}
            bgColor={raised ? theme.accentPositive : theme.backgroundTertiaryTrans}
            onPress={handlePress}
        />
    );
});

interface ControlRaisedHandsCountProps {
    theme: ThemeGlobal;
    raisedCount?: number;
    raisedHandUsers: VoiceChatParticipant_user[];
    roomId: string;
}

const ControlRaisedHandsCount = React.memo((props: ControlRaisedHandsCountProps) => {
    const { theme, raisedCount, raisedHandUsers, roomId } = props;

    return (
        <ControlItem
            theme={theme}
            icon={require('assets/ic-hand-24.png')}
            iconColor={theme.foregroundSecondary}
            text="Raised"
            bgColor={theme.backgroundTertiaryTrans}
            counter={raisedCount}
            onPress={() => showRaisedHands(raisedHandUsers, roomId)}
        />
    );
});

interface RoomControlsProps {
    id: string;
    theme: ThemeGlobal;
    onLeave: () => void;
    onLayout: (e: LayoutChangeEvent) => void;
    muted: boolean;
    connecting: boolean;
    onMutePress: () => void;
    raisedHandUsers: VoiceChatParticipant_user[];
}

export const RoomControls = React.memo((props: RoomControlsProps) => {
    const { theme, id, muted, connecting, onLeave, onLayout, onMutePress, raisedHandUsers } = props;
    const client = useClient();
    const meParticipant = client.useVoiceChatControls({ id }, { fetchPolicy: 'cache-and-network' })?.voiceChat.me;
    const role = meParticipant?.status;
    const roleButtons = role === VoiceChatParticipantStatus.ADMIN ? (
        <>
            <ControlRaisedHandsCount theme={theme} raisedCount={raisedHandUsers.length} raisedHandUsers={raisedHandUsers} roomId={id} />
            <ControlMute muted={muted} connecting={connecting} theme={theme} onPress={onMutePress} />
        </>
    ) : role === VoiceChatParticipantStatus.SPEAKER ? <ControlMute muted={muted} connecting={connecting} theme={theme} onPress={onMutePress} />
        : role === VoiceChatParticipantStatus.LISTENER ? <ControlRaiseHand theme={theme} raised={!!meParticipant?.handRaised} roomId={id} /> : null;

    const handleLeave = React.useCallback(() => {
        onLeave();
    }, [onLeave]);

    return (
        <View style={{ paddingTop: 16, paddingHorizontal: 16, flexDirection: 'row', justifyContent: 'space-around' }} onLayout={onLayout}>
            <ControlItem
                theme={theme}
                text="Leave"
                icon={require('assets/ic-door-leave-24.png')}
                iconColor={theme.accentNegative}
                bgColor={theme.type === 'Light' ? 'rgba(242, 48, 81, 0.12)' : 'rgba(242, 48, 81, 0.16)'}
                onPress={handleLeave}
            />
            <ControlItem
                theme={theme}
                text="Invite"
                icon={require('assets/ic-add-glyph-24.png')}
                iconColor={theme.foregroundSecondary}
                bgColor={theme.backgroundTertiaryTrans}
                onPress={() => showRoomInvite({ theme, link: meParticipant ? `https://openland.com/${meParticipant.user.shortname || meParticipant?.user.id}` : 'Try again' })}
            />
            {roleButtons}
        </View>
    );
});
