import { useClient } from 'openland-api/useClient';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';
import Toast from 'openland-mobile/components/Toast';
import { withApp } from 'openland-mobile/components/withApp';
import { ZInput } from 'openland-mobile/components/ZInput';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Share, Platform, Clipboard } from 'react-native';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

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
                    backgroundColor: theme.backgroundTertiary,
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
    onPress?: () => void
}) => {
    const { theme, text, icon, iconColor, bgColor, counter, onPress } = props;
    const size = text ? 56 : 78;
    const iconSize = text ? 24 : 36;
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0.6}
                onPress={onPress}
                style={{ width: size, height: size, marginBottom: 8, position: 'relative' }}
            >
                <View style={{ backgroundColor: bgColor, width: size, height: size, borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
                    {typeof icon === 'string' ? (
                        <Text style={{ fontSize: iconSize, color: iconColor }}>{icon}</Text>
                    ) : (
                            <Image source={icon} style={{ width: iconSize, height: iconSize, tintColor: iconColor }} />
                        )}
                </View>
                {counter && (
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
                )}
            </TouchableOpacity>
            {text
                ? <Text style={{ ...TextStyles.Label3, color: theme.foregroundPrimary, textAlign: 'center' }}>{text}</Text>
                : null
            }
        </View>
    );
});

const ControlMute = React.memo((props: { theme: ThemeGlobal }) => {
    const { theme } = props;
    const [muted, setMuted] = React.useState(true);
    const toggleMute = React.useCallback(() => setMuted(x => !x), []);

    return (
        <ControlItem
            theme={theme}
            icon={muted ? require('assets/ic-mute-glyph-36.png') : require('assets/ic-microphone-36.png')}
            iconColor={theme.foregroundContrast}
            bgColor={muted ? theme.tintOrange : theme.tintBlue}
            onPress={toggleMute}
        />
    );
});

const ControlRaiseHand = React.memo((props: { theme: ThemeGlobal }) => {
    const { theme } = props;
    const [raised, setRaised] = React.useState(false);
    const toggleRaised = React.useCallback(() => setRaised(x => !x), []);

    return (
        <ControlItem
            theme={theme}
            icon={raised ? '🖐' : '🤚'}
            bgColor={raised ? theme.accentPositive : theme.incomingBackgroundPrimary}
            onPress={toggleRaised}
        />
    );
});

const ControlRaisedHandsCount = React.memo((props: { theme: ThemeGlobal, raisedCount?: number }) => {
    const { theme, raisedCount } = props;

    return (
        <ControlItem
            theme={theme}
            icon={require('assets/ic-hand-24.png')}
            iconColor={theme.foregroundSecondary}
            text="Raised"
            bgColor={theme.incomingBackgroundPrimary}
            counter={raisedCount}
        />
    );
});

const RoomControls = React.memo((props: { theme: ThemeGlobal, role?: 'member' | 'admin' | 'speaker' }) => {
    const { theme, role } = props;
    const client = useClient();
    const user = client.useProfile({ suspense: false })?.user;

    const roleButtons = role === 'admin' ? (
        <>
            <ControlRaisedHandsCount theme={theme} raisedCount={124} />
            <ControlMute theme={theme} />
        </>
    ) : role === 'speaker' ? <ControlMute theme={theme} />
            : <ControlRaiseHand theme={theme} />;

    return (
        <View style={{ marginTop: 20, paddingHorizontal: 38, flexDirection: 'row', justifyContent: 'space-between' }}>
            <ControlItem
                theme={theme}
                text="Leave"
                icon={require('assets/ic-door-leave-24.png')}
                iconColor={theme.accentNegative}
                bgColor="rgba(242, 48, 81, 0.12)"
            />
            <ControlItem
                theme={theme}
                text="Invite"
                icon={require('assets/ic-add-glyph-24.png')}
                iconColor={theme.foregroundSecondary}
                bgColor={theme.incomingBackgroundPrimary}
                onPress={() => showRoomInvite({ theme, link: user ? `https://openland.com/${user.shortname || user.id}` : 'Try again' })}
            />
            {roleButtons}
        </View>
    );
});

const CreateRoomComponent = React.memo(() => {
    const form = useForm();
    const nameField = useField('room.name', '', form);
    const theme = useTheme();

    return (
        <>
            <SHeader title="New room" />
            <SHeaderButton title="Start" onPress={() => {/* redirect to room */ }} />
            <KeyboardAvoidingScrollView>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <ZInput placeholder="Room name" field={nameField} autoFocus={true} noWrapper={true} />
                    <Text style={{ ...TextStyles.Caption, color: theme.foregroundTertiary, paddingHorizontal: 16, marginTop: 8 }}>
                        Tell everyone about the topic of conversation
                    </Text>
                </View>
                <RoomControls theme={theme} />
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const CreateRoom = withApp(CreateRoomComponent, { navigationAppearance: 'small' });
