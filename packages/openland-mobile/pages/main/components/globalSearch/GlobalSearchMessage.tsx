import * as React from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';
import { TextStyles, CompensationAlpha } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { MessagesSearch_messagesSearch_edges_node } from 'openland-api/spacex.types';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { useText } from 'openland-mobile/text/useText';
import DateTimeFormatter from 'openland-y-runtime/DateTimeFormatter';

interface GlobalSearchMessageProps {
    item: MessagesSearch_messagesSearch_edges_node;
    onPress: () => void;
}

export const GlobalSearchMessage = React.memo<GlobalSearchMessageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const messenger = getMessenger();
    const { t } = useText();
    const { chat, message } = props.item;
    const isSavedMessages = chat.__typename === 'PrivateRoom' && chat.user.id === messenger.engine.user.id;
    const title = isSavedMessages ? t('savedMessages', 'Saved messages') : (chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title);
    const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;
    const highlightGroup = chat.__typename === 'PrivateRoom' ? false : chat.kind === 'GROUP';
    const featured = chat.__typename === 'SharedRoom' && chat.featured;
    const date = parseInt(message.date, 10);
    const sender = isSavedMessages ? '' : (message.sender.id === messenger.engine.user.id ? t('you', 'You') : message.sender.name) + ': ';

    return (
        <TouchableHighlight activeOpacity={1} underlayColor={theme.backgroundPrimaryActive} onPress={props.onPress}>
            <View style={{ flexGrow: 1, flexDirection: 'row' }}>
                <View style={{ marginLeft: 16, marginTop: 12, width: 56, height: 56 }}>
                    <ZAvatar
                        size="large"
                        photo={photo}
                        id={chat.id}
                        savedMessages={isSavedMessages}
                    />
                </View>
                <View style={{ marginLeft: 16, marginRight: 16, marginTop: 8, marginBottom: 8, flexDirection: 'column', flexGrow: 1, flexBasis: 0, alignItems: 'stretch' }}>
                    <View style={{ height: 24, flexDirection: 'row' }}>
                        {highlightGroup && <View style={{ alignItems: 'center', marginRight: 4, marginTop: 4 }}><Image style={{ opacity: CompensationAlpha, tintColor: theme.accentPositive, width: 16, height: 16 }} source={require('assets/ic-lock-16.png')} /></View>}

                        <View style={{ flexDirection: 'row', flexGrow: 1, flexShrink: 1 }}>
                            <Text numberOfLines={1} allowFontScaling={false} ellipsizeMode="tail" style={{ ...TextStyles.Label1, color: highlightGroup ? theme.accentPositive : theme.foregroundPrimary }}>
                                {title}
                            </Text>
                            {featured && theme.displayFeaturedIcon && (
                                <Image
                                    source={require('assets/ic-verified-16.png')}
                                    style={{ tintColor: '#3DA7F2', width: 16, height: 16, flexShrink: 0, marginLeft: 4, marginTop: 2, alignSelf: 'center' }}
                                />
                            )}
                        </View>
                        <View style={{ marginLeft: 10, marginTop: 3 }}>
                            <Text style={{ ...TextStyles.Caption, color: theme.foregroundTertiary }} allowFontScaling={false}>{DateTimeFormatter.formatDate(date)}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'stretch', height: 40 }}>
                        <View style={{ flexGrow: 1 }}>
                            <View style={{ flexDirection: 'column', alignItems: 'stretch', flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} numberOfLines={2} allowFontScaling={false} ellipsizeMode="tail">
                                    {sender}{message.fallback}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
});