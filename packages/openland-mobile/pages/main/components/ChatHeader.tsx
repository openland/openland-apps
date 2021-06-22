import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, Image, Platform } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { TypingType, RoomChat_room_SharedRoom, RoomChat_room_PrivateRoom } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { useClient } from 'openland-api/useClient';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { useLastSeen } from 'openland-y-utils/LastSeen';
import { TextStyles, CompensationAlpha } from 'openland-mobile/styles/AppStyles';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import Lottie from 'lottie-react-native';
import { useText } from 'openland-mobile/text/useText';

const styles = StyleSheet.create({
    title: {
        ...TextStyles.Label2,
        flexShrink: 1
    } as TextStyle,
    subTitle: {
        ...TextStyles.Caption,
    } as TextStyle,
});

const SharedChatHeaderContent = React.memo((props: { room: RoomChat_room_SharedRoom, typing?: string, typingType?: string, theme: ThemeGlobal, muted: boolean }) => {
    const { room, typing, typingType, theme } = props;
    const [onlineCount, setOnlineCount] = React.useState<number>(0);
    const { t } = useText();

    getChatOnlinesCount(room.id, useClient(), (count) => setOnlineCount(count));

    let title = room.title;
    let accent = false;
    let subtitle = '';

    if (room.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (room.kind === 'GROUP' || room.kind === 'PUBLIC') {
        subtitle = room.membersCount + ' ' + t('member', { count: room.membersCount });
    }

    if (typing) {
        accent = true;
        subtitle = typing;
    }

    const highlightGroup = room.kind === 'GROUP' && !room.isPremium;

    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignSelf: 'center',
                justifyContent: 'center',
                height: 44,
                minWidth: 0,
                flexBasis: 0,
                flexShrink: 1,
                flexGrow: 1
            }}
            pointerEvents="box-none"
        >
            <View style={{ flexDirection: 'row' }}>
                {highlightGroup && (
                    <Image
                        source={require('assets/ic-lock-16.png')}
                        style={{ alignSelf: 'center', opacity: CompensationAlpha, tintColor: theme.accentPositive, marginRight: 4, width: 16, height: 16 }}
                    />
                )}
                {room.isPremium && <View style={{ marginRight: 8, marginTop: Platform.OS === 'ios' ? 0 : 1, marginBottom: Platform.OS === 'ios' ? 0 : -1, alignSelf: 'center' }}><PremiumBadge /></View>}
                <Text style={[styles.title, { color: highlightGroup ? theme.accentPositive : theme.foregroundPrimary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                {room.featured && theme.displayFeaturedIcon && (
                    <Image
                        source={require('assets/ic-verified-16.png')}
                        style={{ alignSelf: 'center', tintColor: '#3DA7F2' /* special: verified/featured color */, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
                {props.muted && (
                    <Image
                        source={require('assets/ic-muted-16.png')}
                        style={{ alignSelf: 'center', tintColor: theme.foregroundQuaternary, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {typing && typingType === TypingType.TEXT && (
                    <Lottie
                        loop={true}
                        autoPlay={true}
                        resizeMode="contain"
                        source={require('assets/animations/typing.json')}
                        style={{
                            width: 16,
                            height: 16,
                            marginRight: 8,
                            marginTop: 0.3,
                        }}
                        colorFilters={[{
                            keypath: "1",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }, {
                            keypath: "2",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }, {
                            keypath: "3",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }]}
                    />
                )}

                {/* sticker typing */}
                {typing && typingType === TypingType.STICKER && (
                    <Lottie
                        loop={true}
                        autoPlay={true}
                        resizeMode="contain"
                        source={require('assets/animations/stickerTyping.json')}
                        style={{
                            width: 16,
                            height: 16,
                            marginRight: 8,
                            marginTop: 0.3,
                        }}
                        colorFilters={[{
                            keypath: "1",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }, {
                            keypath: "2",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }]}
                    />
                )}

                {/* file typing */}
                {typing && typingType !== TypingType.TEXT && typingType !== TypingType.STICKER && (
                    <Lottie
                        loop={true}
                        autoPlay={true}
                        resizeMode="contain"
                        source={require('assets/animations/fileTyping.json')}
                        style={{
                            width: 16,
                            height: 16,
                            marginRight: 8,
                            marginTop: 0.3,
                        }}
                        colorFilters={[{
                            keypath: "1",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }, {
                            keypath: "2",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }, {
                            keypath: "Mask",
                            color: accent ? theme.accentPrimary : theme.foregroundSecondary
                        }]}
                    />
                )}
                <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                    {subtitle}
                    {onlineCount > 0 && (!typing) && (
                        <Text style={{ color: theme.accentPrimary }} allowFontScaling={false}>
                            {'  '}{onlineCount} {t('online', 'online')}
                        </Text>
                    )}
                </Text>
            </View>
        </View>
    );
});

const PrivateChatHeaderContent = React.memo((props: { room: RoomChat_room_PrivateRoom, typing?: string, typingType?: string, theme: ThemeGlobal, muted: boolean }) => {
    const { room, typing, theme, typingType } = props;
    const { t } = useText();
    let [subtitle, accent] = useLastSeen(room.user);

    let title = room.user.name;

    if (typing) {
        accent = true;

        const typingsByType: { [k in TypingType]: string } = {
            [TypingType.TEXT]: t('typing', 'typing'),
            [TypingType.FILE]: t('typingFile', 'sending a file'),
            [TypingType.PHOTO]: t('typingPhoto', 'sending a photo'),
            [TypingType.STICKER]: t('typingSticker', 'picking a sticker'),
            [TypingType.VIDEO]: t('typingVideo', 'uploading a video'),
        };

        subtitle = typingType && typingsByType[typingType] || t('typing', 'typing');
    }

    const isSavedMessages = room.user.id === getMessenger().engine.user.id;

    return (
        <View
            style={{
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignSelf: 'center',
                justifyContent: 'center',
                height: 44,
                minWidth: 0,
                flexBasis: 0,
                flexShrink: 1,
                flexGrow: 1
            }}
            pointerEvents="box-none"
        >
            <View style={{ flexDirection: 'row' }}>
                <Text style={[styles.title, { color: theme.foregroundPrimary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{isSavedMessages ? 'Saved messages' : title}</Text>
                {!!(room.user.systemBadge && !isSavedMessages) && <View style={{ marginLeft: 8, marginTop: Platform.OS === 'ios' ? 0 : 1, marginBottom: Platform.OS === 'ios' ? 0 : -1, alignSelf: 'center' }}><PremiumBadge /></View>}
                {props.muted && (
                    <Image
                        source={require('assets/ic-muted-16.png')}
                        style={{ alignSelf: 'center', tintColor: theme.foregroundQuaternary, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
            </View>

            {!isSavedMessages && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    {/* default typing */}
                    {typing && typingType === TypingType.TEXT && (
                        <Lottie
                            loop={true}
                            autoPlay={true}
                            resizeMode="contain"
                            source={require('assets/animations/typing.json')}
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 8,
                                marginTop: 0.3,
                            }}
                            colorFilters={[{
                                keypath: "1",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }, {
                                keypath: "2",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }, {
                                keypath: "3",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }]}
                        />
                    )}

                    {/* sticker typing */}
                    {typing && typingType === TypingType.STICKER && (
                        <Lottie
                            loop={true}
                            autoPlay={true}
                            resizeMode="contain"
                            source={require('assets/animations/stickerTyping.json')}
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 8,
                                marginTop: 0.3,
                            }}
                            colorFilters={[{
                                keypath: "1",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }, {
                                keypath: "2",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }]}
                        />
                    )}

                    {/* file typing */}
                    {typing && typingType !== TypingType.TEXT && typingType !== TypingType.STICKER && (
                        <Lottie
                            loop={true}
                            autoPlay={true}
                            resizeMode="contain"
                            source={require('assets/animations/fileTyping.json')}
                            style={{
                                width: 16,
                                height: 16,
                                marginRight: 8,
                                marginTop: 0.3,
                            }}
                            colorFilters={[{
                                keypath: "1",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }, {
                                keypath: "2",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }, {
                                keypath: "Mask",
                                color: accent ? theme.accentPrimary : theme.foregroundSecondary
                            }]}
                        />
                    )}

                    <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]} allowFontScaling={false}>{subtitle}</Text>
                </View>
            )}

        </View>
    );
});

const ChatHeaderContent = React.memo((props: { conversationId: string, router: SRouter, typing?: string, typingType?: string, muted: boolean }) => {
    let theme = React.useContext(ThemeContext);
    let room = getClient().useRoomChat({ id: props.conversationId });

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room as RoomChat_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room as RoomChat_room_PrivateRoom : null;

    if (sharedRoom) {
        return <SharedChatHeaderContent room={sharedRoom} typing={props.typing} typingType={props.typingType} theme={theme} muted={props.muted} />;
    }

    if (privateRoom) {
        return <PrivateChatHeaderContent room={privateRoom} typing={props.typing} typingType={props.typingType} theme={theme} muted={props.muted} />;
    }

    return null;
});

export class ChatHeader extends React.PureComponent<{ conversationId: string, router: SRouter, muted: boolean }, { typing?: string, typingType?: string }> {

    disposeSubscription?: () => any;

    constructor(props: { conversationId: string, router: SRouter, muted: boolean }) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        this.disposeSubscription = getMessenger().engine.getTypings(this.props.conversationId).subcribe(
            (t, _, typingType) => this.setState({ typing: t, typingType })
        );
    }

    componentWillUnmount() {
        if (this.disposeSubscription) {
            this.disposeSubscription();
        }
    }

    render() {
        return (
            <React.Suspense fallback={null}>
                <ChatHeaderContent {...this.props} typing={this.state.typing} typingType={this.state.typingType} />
            </React.Suspense>
        );
    }
}
