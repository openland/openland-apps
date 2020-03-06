import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, Image, Platform } from 'react-native';
import { SRouter } from 'react-native-s/SRouter';
import { getMessenger } from '../../../utils/messenger';
import { TypingType, RoomTiny_room_SharedRoom, RoomTiny_room_PrivateRoom } from 'openland-api/spacex.types';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getChatOnlinesCount } from 'openland-y-utils/getChatOnlinesCount';
import { useClient } from 'openland-api/useClient';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { useLastSeen } from 'openland-y-utils/LastSeen';
import { TextStyles, CompensationAlpha } from 'openland-mobile/styles/AppStyles';
import Lottie from 'lottie-react-native';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';

const styles = StyleSheet.create({
    title: {
        ...TextStyles.Label2,
        flexShrink: 1
    } as TextStyle,
    subTitle: {
        ...TextStyles.Caption,
    } as TextStyle,
});

const SharedChatHeaderContent = XMemo<{ room: RoomTiny_room_SharedRoom, typing?: string, theme: ThemeGlobal }>((props) => {
    const { room, typing, theme } = props;
    const [onlineCount, setOnlineCount] = React.useState<number>(0);

    getChatOnlinesCount(room.id, useClient(), (count) => setOnlineCount(count));

    let title = room.title;
    let accent = false;
    let subtitle = '';

    if (room.kind === 'INTERNAL') {
        subtitle = 'Organization';
    } else if (room.kind === 'GROUP' || room.kind === 'PUBLIC') {
        subtitle = room.membersCount + (room.membersCount === 1 ? ' member' : ' members');
    }

    if (typing) {
        accent = true;
        subtitle = typing;
    }

    const highlightGroup = room.kind === 'GROUP' && !room.isPremium;

    return (
        <View flexDirection="column" alignItems="flex-start" alignSelf="center" justifyContent="center" pointerEvents="box-none" height={44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                {highlightGroup && (
                    <Image
                        alignSelf="center"
                        opacity={CompensationAlpha}
                        source={require('assets/ic-lock-16.png')}
                        style={{ tintColor: theme.accentPositive, marginRight: 4, width: 16, height: 16 }}
                    />
                )}
                {room.isPremium && <View marginRight={8} marginTop={Platform.OS === 'ios' ? 0 : 1} marginBottom={Platform.OS === 'ios' ? 0 : -1} alignSelf="center"><PremiumBadge /></View>}
                <Text style={[styles.title, { color: highlightGroup ? theme.accentPositive : theme.foregroundPrimary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                {room.settings.mute && (
                    <Image
                        alignSelf="center"
                        source={require('assets/ic-muted-16.png')}
                        style={{ tintColor: theme.foregroundQuaternary, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
            </View>
            <Text style={[styles.subTitle, { color: accent ? theme.accentPrimary : theme.foregroundSecondary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                {subtitle}
                {onlineCount > 0 && (!typing) && (<Text style={{ color: theme.accentPrimary }} allowFontScaling={false}>{'  '}{onlineCount} online</Text>)}
            </Text>
        </View>
    );
});

const PrivateChatHeaderContent = XMemo<{ room: RoomTiny_room_PrivateRoom, typing?: string, typingType?: string, theme: ThemeGlobal }>((props) => {
    const { room, typing, theme, typingType } = props;

    let [subtitle, accent] = useLastSeen(room.user);

    let title = room.user.name;

    if (typing) {
        accent = true;

        switch (typingType) {
            case TypingType.TEXT: subtitle = 'typing'; break;
            case TypingType.FILE: subtitle = 'sending a file'; break;
            case TypingType.PHOTO: subtitle = 'sending a photo'; break;
            case TypingType.STICKER: subtitle = 'picking a sticker'; break;
            case TypingType.VIDEO: subtitle = 'uploading a video'; break;
            default: subtitle = 'typing'; break;
        }
    }

    return (
        <View flexDirection="column" alignItems="flex-start" alignSelf="center" justifyContent="center" pointerEvents="box-none" height={44} minWidth={0} flexBasis={0} flexShrink={1} flexGrow={1}>
            <View flexDirection="row">
                <Text style={[styles.title, { color: theme.foregroundPrimary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>{title}</Text>
                {room.settings.mute && (
                    <Image
                        alignSelf="center"
                        source={require('assets/ic-muted-16.png')}
                        style={{ tintColor: theme.foregroundQuaternary, marginLeft: 4, width: 16, height: 16 }}
                    />
                )}
            </View>

            <View flexDirection="row" alignItems="center">

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

        </View>
    );
});

const ChatHeaderContent = XMemo<{ conversationId: string, router: SRouter, typing?: string, typingType?: string }>((props) => {
    let theme = React.useContext(ThemeContext);
    let room = getClient().useRoomTiny({ id: props.conversationId });

    let sharedRoom = room.room!.__typename === 'SharedRoom' ? room.room as RoomTiny_room_SharedRoom : null;
    let privateRoom = room.room!.__typename === 'PrivateRoom' ? room.room as RoomTiny_room_PrivateRoom : null;

    if (sharedRoom) {
        return <SharedChatHeaderContent room={sharedRoom} typing={props.typing} theme={theme} />;
    }

    if (privateRoom) {
        return <PrivateChatHeaderContent room={privateRoom} typing={props.typing} typingType={props.typingType} theme={theme} />;
    }

    return null;
});

export class ChatHeader extends React.PureComponent<{ conversationId: string, router: SRouter }, { typing?: string, typingType?: string }> {

    disposeSubscription?: () => any;

    constructor(props: any) {
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
