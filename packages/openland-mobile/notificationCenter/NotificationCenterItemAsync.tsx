import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { extractContent } from 'openland-mobile/messenger/components/AsyncMessageContentView';
import { Dimensions, Image } from 'react-native';
import { ZRelativeDateAsync } from 'openland-mobile/components/ZRelativeDateAsync';
import { FontStyles } from 'openland-mobile/styles/AppStyles';
import { AsyncAvatar } from 'openland-mobile/messenger/components/AsyncAvatar';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { isPad } from 'openland-mobile/pages/Root';
import { RoomNano_SharedRoom } from 'openland-api/spacex.types';
import { ASImage } from 'react-native-async-view/ASImage';
import { NotificationCenterHandlers } from './NotificationCenterHandlers';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { useText } from 'openland-mobile/text/useText';

interface NotificationCenterItemAsyncProps {
    item: NotificationsDataSourceItem;
}

const NotificationCenterItemAsyncRender = React.memo((props: NotificationCenterItemAsyncProps & { theme: ThemeGlobal, t: any }) => {
    const { theme, t, item } = props;
    const messenger = getMessenger();
    const maxWidth = Dimensions.get('screen').width - 32 - (isPad ? 320 : 0);

    const handlePress = React.useCallback(() => {
        NotificationCenterHandlers.handleReplyPress(item.key, item, false);
    }, [item]);

    const handleLongPress = React.useCallback(() => {
        NotificationCenterHandlers.handleLongPress(item.key, item);
    }, [item]);

    const handleReplyPress = React.useCallback(() => {
        NotificationCenterHandlers.handleReplyPress(item.key, item);
    }, [item]);

    const { topContent, bottomContent } = extractContent({
        theme,
        t,
        message: item,
        onUserPress: messenger.handleUserPress,
        onGroupPress: messenger.handleGroupPress,
        onOrganizationPress: messenger.handleOrganizationPress,
        onHashtagPress: messenger.handleHashtagPress,
        onMediaPress: messenger.handleMediaPress,
        onLongPress: handleLongPress,
        onDocumentPress: messenger.handleDocumentPress
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
                <ASFlex onPress={() => messenger.handleUserPress(item.sender.id)} alignItems="center">
                    <AsyncAvatar
                        size="xx-small"
                        photo={item.sender.photo}
                        id={item.sender.id}
                    />

                    <ASText
                        fontSize={14}
                        lineHeight={16}
                        fontWeight={FontStyles.Weight.Medium}
                        color={theme.foregroundPrimary}
                        marginLeft={8}
                    >
                        {item.sender.name}
                    </ASText>
                </ASFlex>

                {sharedRoom && (
                    <>
                        <ASImage source={require('assets/ic-reply-comments-18.png')} marginTop={1} marginLeft={7} width={18} height={18} tintColor={theme.foregroundPrimary} />
                        <ASFlex onPress={() => messenger.handleGroupPress(sharedRoom.id)} marginLeft={7}>
                            <AsyncAvatar
                                size="xx-small"
                                photo={sharedRoom.photo}
                                id={sharedRoom.id}
                            />

                            <ASText
                                fontSize={14}
                                lineHeight={16}
                                fontWeight={FontStyles.Weight.Medium}
                                color={theme.foregroundPrimary}
                                marginLeft={8}
                                numberOfLines={1}
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

            {item.notificationType === 'new_comment' && (
                <ASFlex marginTop={2}>
                    <ZRelativeDateAsync
                        fontSize={15}
                        lineHeight={20}
                        color={theme.foregroundTertiary}
                        date={item.date}
                    />

                    <ASFlex onPress={handleReplyPress} marginLeft={12} alignItems="center">
                        <ASText
                            fontWeight={FontStyles.Weight.Medium}
                            color={theme.foregroundTertiary}
                            fontSize={15}
                            lineHeight={20}
                            marginLeft={6}
                        >
                            {t('reply', 'Reply')}
                        </ASText>
                    </ASFlex>
                </ASFlex>
            )}
        </ASFlex>
    );
});

export const NotificationCenterItemAsync = React.memo((props: NotificationCenterItemAsyncProps) => {
    let theme = useThemeGlobal();
    let { t } = useText();

    return <NotificationCenterItemAsyncRender theme={theme} t={t} {...props} />;
});