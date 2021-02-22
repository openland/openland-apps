import * as React from 'react';
import { ModalProps } from 'react-native-fast-modal';
import { useClient } from 'openland-api/useClient';
import { SRouter } from 'react-native-s/SRouter';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
// import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import Toast from 'openland-mobile/components/Toast';
// import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
// import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { View, Text, TouchableOpacity, Image, Share, Platform, Clipboard, LayoutChangeEvent } from 'react-native';
import { VoiceChatParticipantStatus } from 'openland-api/spacex.types';
import { TintBlue, TintOrange } from 'openland-y-utils/themes/tints';
// import { getMessenger } from 'openland-mobile/utils/messenger';
// import { MediaSessionState } from 'openland-engines/media/MediaSessionState';

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
    onPress?: () => void
}) => {
    const { theme, text, icon, iconColor, bgColor, counter, disabled, onPress } = props;
    const size = text ? 56 : 78;
    const iconSize = text ? 24 : 36;
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPress}
                disabled={disabled}
                style={{ width: size, height: size, marginBottom: 8, position: 'relative' }}
            >
                <View style={{ backgroundColor: bgColor, width: size, height: size, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    {typeof icon === 'string' ? (
                        <Text style={{ fontSize: iconSize, color: iconColor }}>{icon}</Text>
                    ) : (
                            <Image source={icon} style={{ width: iconSize, height: iconSize, tintColor: iconColor }} />
                        )}
                </View>
                {counter ? (
                    <View
                        style={{
                            position: "absolute",
                            top: -3,
                            right: -10,
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

const ControlMute = React.memo((props: { theme: ThemeGlobal, disabled?: boolean, muted: boolean, onPress: () => void }) => {
    const { theme, muted, disabled, onPress } = props;

    return (
        <ControlItem
            theme={theme}
            icon={muted ? require('assets/ic-mute-glyph-36.png') : require('assets/ic-microphone-36.png')}
            iconColor={theme.foregroundContrast}
            bgColor={muted ? TintOrange.primary : TintBlue.primary}
            disabled={disabled}
            onPress={onPress}
        />
    );
});

// const RaiseModalView = React.memo(({ onCancel, onConfirm }: { onCancel: () => void, onConfirm: () => Promise<void> }) => {
//     const theme = useTheme();

//     return (
//         <>
//             <View
//                 style={{
//                     backgroundColor: theme.backgroundTertiaryTrans,
//                     width: 96,
//                     height: 96,
//                     borderRadius: 100,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     alignSelf: 'center',
//                     marginBottom: 16,
//                 }}
//             >
//                 <Text style={{ fontSize: 42 }}>🤚</Text>
//             </View>
//             <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, textAlign: 'center', marginBottom: 6 }}>Raise hand?</Text>
//             <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', marginHorizontal: 32, marginBottom: 32 }}>
//                 Room admins will see that{'\u00A0'}you{'\u00A0'}want{'\u00A0'}to{'\u00A0'}speak
//             </Text>
//             <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16 }}>
//                 <ZButton style="secondary" size="large" title="Maybe later" onPress={onCancel} />
//                 <ZButton style="positive" size="large" title="Raise hand 🖐" action={onConfirm} />
//             </View>
//         </>
//     );
// });

// const showRaiseHandModal = (onConfirm: () => Promise<void>) => {
//     showBottomSheet({
//         cancelable: true,
//         view: ({ hide }) => {
//             return (
//                 <RaiseModalView
//                     onCancel={hide}
//                     onConfirm={async () => {
//                         await onConfirm();
//                         hide();
//                     }}
//                 />
//             );
//         }
//     });
// };

// const ControlRaiseHand = React.memo((props: { theme: ThemeGlobal, raised: boolean, roomId: string }) => {
//     const { theme, raised, roomId } = props;
//     const client = useClient();
//     const handlePress = React.useCallback(async () => {
//         if (raised) {
//             await client.mutateVoiceChatRaiseHand({ id: roomId, raised: false });
//             client.refetchVoiceChatControls({ id: roomId });
//             return;
//         }
//         showRaiseHandModal(
//             async () => {
//                 await client.mutateVoiceChatRaiseHand({ id: roomId, raised: true });
//                 await client.refetchVoiceChatControls({ id: roomId });
//             }
//         );
//     }, [raised, roomId]);

//     return (
//         <ControlItem
//             theme={theme}
//             icon={raised ? '🖐' : '🤚'}
//             bgColor={raised ? theme.accentPositive : theme.incomingBackgroundPrimary}
//             disabled={raised}
//             onPress={handlePress}
//         />
//     );
// });

// interface ControlRaisedHandsCountProps {
//     theme: ThemeGlobal;
//     raisedCount?: number;
//     router: SRouter;
//     modalCtx: ModalProps;
// }

// const ControlRaisedHandsCount = React.memo((props: ControlRaisedHandsCountProps) => {
//     const { theme, raisedCount } = props;
//     const handlePress = React.useCallback(() => {
//         props.router.push('RaisedHands');
//         props.modalCtx.hide();
//     }, [props.router]);

//     return (
//         <ControlItem
//             theme={theme}
//             icon={require('assets/ic-hand-24.png')}
//             iconColor={theme.foregroundSecondary}
//             text="Raised"
//             bgColor={theme.backgroundTertiaryTrans}
//             counter={raisedCount}
//             onPress={handlePress}
//         />
//     );
// });

interface RoomControlsProps {
    id: string;
    theme: ThemeGlobal;
    onLeave: () => void;
    onLayout: (e: LayoutChangeEvent) => void;
    router: SRouter;
    muted: boolean;
    onMutePress: () => void;
    modalCtx: ModalProps;
}

export const RoomControls = React.memo((props: RoomControlsProps) => {
    const { theme, id, muted, modalCtx, onLeave, onLayout, onMutePress } = props;
    const client = useClient();
    const meParticipant = client.useVoiceChatControls({ id }, { fetchPolicy: 'cache-and-network' })?.voiceChat.me;
    const role = meParticipant?.status;
    // const roleButtons = role === VoiceChatParticipantStatus.ADMIN ? (
    //     <>
    //         <ControlRaisedHandsCount theme={theme} raisedCount={0} router={router} modalCtx={modalCtx} />
    //         <ControlMute muted={muted} theme={theme} onPress={onMutePress} />
    //     </>
    // ) : role === VoiceChatParticipantStatus.SPEAKER ? <ControlMute muted={muted} theme={theme} onPress={onMutePress} />
    //         : role === VoiceChatParticipantStatus.LISTENER ? <ControlRaiseHand theme={theme} raised={!!meParticipant?.handRaised} roomId={id} /> : null;
    const roleButtons = (
        <ControlMute
            muted={muted}
            theme={theme}
            disabled={role === VoiceChatParticipantStatus.SPEAKER || role === VoiceChatParticipantStatus.ADMIN}
            onPress={onMutePress}
        />
    );

    const handleLeave = React.useCallback(() => {
        onLeave();
        modalCtx.hide();
    }, [onLeave]);

    return (
        <View style={{ paddingTop: 16, paddingHorizontal: 38, flexDirection: 'row', justifyContent: 'space-between' }} onLayout={onLayout}>
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
                onPress={() => showRoomInvite({ theme, link: meParticipant ? `https://openland.com/${meParticipant.user.shortname || meParticipant?.id}` : 'Try again' })}
            />
            {roleButtons}
        </View>
    );
});
