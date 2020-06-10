import * as React from 'react';
import { TouchableHighlight, View, Text } from 'react-native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatDate } from 'openland-mobile/utils/formatDate';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { MessagesSearch_messagesSearch_edges_node } from 'openland-api/spacex.types';
import { getMessenger } from 'openland-mobile/utils/messenger';

interface GlobalSearchMessageProps {
    item: MessagesSearch_messagesSearch_edges_node;
    onPress: () => void;
}

export const GlobalSearchMessage = React.memo<GlobalSearchMessageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const messenger = getMessenger();
    const { chat, message } = props.item;
    const title = chat.__typename === 'PrivateRoom' ? chat.user.name : chat.title;
    const photo = chat.__typename === 'PrivateRoom' ? chat.user.photo : chat.photo;
    const highlightGroup = chat.__typename === 'PrivateRoom' ? false : chat.kind === 'GROUP';
    const date = parseInt(message.date, 10);
    const sender = message.sender.id === messenger.engine.user.id ? 'You' : message.sender.name;

    return (
        <TouchableHighlight activeOpacity={1} underlayColor={theme.backgroundPrimaryActive} onPress={props.onPress}>
            <View
                flexGrow={1}
                flexDirection="row"
            >
                <View marginLeft={16} marginTop={12} width={56} height={56}>
                    <ZAvatar
                        size="large"
                        photo={photo}
                        title={title}
                        id={chat.id}
                    />
                </View>
                <View marginLeft={16} marginRight={16} marginTop={8} marginBottom={8} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <View height={24} flexDirection="row">
                        <View flexDirection="row" flexGrow={1} flexShrink={1}>
                            {/* {highlightGroup && <View alignItems="center" marginRight={4} marginTop={4}><Image style={{ opacity: CompensationAlpha, tintColor: theme.accentPositive, width: 16, height: 16 }} source={require('assets/ic-lock-16.png')} /></View>} */}
                            <Text numberOfLines={1} allowFontScaling={false} ellipsizeMode="tail" style={{ ...TextStyles.Label1, color: highlightGroup ? theme.accentPositive : theme.foregroundPrimary }}>
                                {title}
                            </Text>
                        </View>
                        <View marginLeft={10} marginTop={2}>
                            <Text style={{ ...TextStyles.Caption, color: theme.foregroundTertiary }}>{formatDate(date)}</Text>
                        </View>
                    </View>
                    <View flexDirection="row" alignItems="stretch" height={40}>
                        <View flexGrow={1}>
                            <View flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                                <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} numberOfLines={2}>
                                    {sender}{': '}{message.fallback}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
});