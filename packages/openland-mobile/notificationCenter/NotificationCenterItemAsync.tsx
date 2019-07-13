import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { extractContent } from 'openland-mobile/messenger/components/AsyncMessageContentView';
import { Dimensions, Image } from 'react-native';
import { ZRelativeDateAsync } from 'openland-mobile/components/ZRelativeDateAsync';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { AsyncAvatar } from 'openland-mobile/messenger/components/AsyncAvatar';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { isPad } from 'openland-mobile/pages/Root';
import { RoomNano_SharedRoom } from 'openland-api/Types';
import { ASImage } from 'react-native-async-view/ASImage';
import { NotificationCenterHandlers } from './NotificationCenterHandlers';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

interface NotificationCenterItemAsyncProps {
    item: NotificationsDataSourceItem;
}

const NotificationCenterItemAsyncRender = XMemo<NotificationCenterItemAsyncProps & { theme: ThemeGlobal }>((props) => {
    const { theme, item } = props;
    const messenger = getMessenger();
    const maxWidth = Dimensions.get('screen').width - 32 - (isPad ? 320 : 0);

    const handlePress = React.useCallback(() => {
        NotificationCenterHandlers.handlePress(item.key, item);
    }, [item]);

    const handleLongPress = React.useCallback(() => {
        NotificationCenterHandlers.handleLongPress(item.key, item);
    }, [item]);

    const handleReplyPress = React.useCallback(() => {
        NotificationCenterHandlers.handleReplyPress(item.key, item);
    }, [item]);

    const { topContent, bottomContent } = extractContent({
        theme,
        message: item,
        onUserPress: messenger.handleUserClick,
        onGroupPress: messenger.handleGroupClick,
        onMediaPress: messenger.handleMediaClick,
        onDocumentPress: messenger.handleDocumentClick
    }, maxWidth);

    const lineBackgroundPatch = Image.resolveAssetSource(require('assets/chat-link-line-my.png'));
    const capInsets = { left: 3, right: 0, top: 1, bottom: 1 };

    const sharedRoom = item.room && item.room.__typename === 'SharedRoom' ? item.room as RoomNano_SharedRoom : undefined;

    return (
        <ASFlex
            onPress={handlePress}
            onLongPress={handleLongPress}
            marginTop={15}
            marginBottom={5}
            marginLeft={16}
            marginRight={16}
            flexDirection="column"
        >
            <ASFlex marginBottom={9}>
                <ASFlex onPress={() => messenger.handleUserClick(item.senderId)}>
                    <AsyncAvatar
                        size="x-small"
                        src={item.senderPhoto}
                        placeholderKey={item.senderId}
                        placeholderTitle={item.senderName}
                    />

                    <ASText
                        fontSize={14}
                        lineHeight={18}
                        fontWeight={TextStyles.weight.medium}
                        color={theme.foregroundPrimary}
                        marginLeft={8}
                    >
                        {item.senderName}
                    </ASText>
                </ASFlex>

                {sharedRoom && (
                    <>
                        <ASImage source={require('assets/ic-reply-comments-18.png')} marginTop={1} marginLeft={7} width={18} height={18} tintColor={theme.foregroundPrimary} />
                        <ASFlex onPress={() => messenger.handleConversationClick(sharedRoom.id)} marginLeft={7}>
                            <AsyncAvatar
                                size="x-small"
                                src={sharedRoom.photo}
                                placeholderKey={sharedRoom.id}
                                placeholderTitle={sharedRoom.title}
                            />

                            <ASText
                                fontSize={14}
                                lineHeight={18}
                                fontWeight={TextStyles.weight.medium}
                                color={theme.foregroundPrimary}
                                marginLeft={8}
                            >
                                {sharedRoom.title}
                            </ASText>
                        </ASFlex>
                    </>
                )}
            </ASFlex>

            {!!item.replyQuoteText && (
                <ASFlex marginBottom={6} backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={theme.accentPrimary}>
                    <ASText
                        marginLeft={10}
                        fontSize={15}
                        lineHeight={18}
                        height={18}
                        numberOfLines={1}
                        color={theme.foregroundPrimary}
                        maxWidth={maxWidth - 10}
                    >
                        {item.replyQuoteText}
                    </ASText>
                </ASFlex>
            )}

            <ASFlex
                flexDirection="column"
                alignItems="stretch"
            >
                {topContent}
            </ASFlex>

            {bottomContent}

            {item.notificationType !== 'unsupported' && (
                <ASFlex marginTop={2}>
                    <ZRelativeDateAsync
                        fontWeight={TextStyles.weight.medium}
                        fontSize={13}
                        lineHeight={20}
                        color={theme.foregroundSecondary}
                        date={item.date}
                    />

                    <ASFlex onPress={handleReplyPress} marginLeft={12} alignItems="center">
                        <ASImage source={require('assets/ic-reply-16.png')} marginTop={4} tintColor={theme.accentPrimary} width={16} height={16} opacity={0.7} />
                        <ASText
                            fontWeight={TextStyles.weight.medium}
                            color={theme.accentPrimary}
                            fontSize={13}
                            lineHeight={20}
                            marginLeft={6}
                        >
                            Reply
                        </ASText>
                    </ASFlex>
                </ASFlex>
            )}
        </ASFlex>
    );
});

export const NotificationCenterItemAsync = XMemo<NotificationCenterItemAsyncProps>((props) => {
    let theme = useThemeGlobal();

    return <NotificationCenterItemAsyncRender theme={theme} {...props} />;
});