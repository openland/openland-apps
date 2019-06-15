import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { AppTheme } from 'openland-mobile/themes/themes';
import { XMemo } from 'openland-y-utils/XMemo';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { extractContent } from 'openland-mobile/messenger/components/AsyncMessageContentView';
import { Dimensions, Image } from 'react-native';
import { ZRelativeDateAsync } from 'openland-mobile/components/ZRelativeDateAsync';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { AsyncAvatar } from 'openland-mobile/messenger/components/AsyncAvatar';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { isPad } from 'openland-mobile/pages/Root';

interface NotificationCenterItemAsyncProps {
    item: NotificationsDataSourceItem;
    
    onPress?: (id: string, item: NotificationsDataSourceItem) => void;
    onLongPress?: (id: string, item: NotificationsDataSourceItem) => void;
}

const NotificationCenterItemAsyncRender = XMemo<NotificationCenterItemAsyncProps & { theme: AppTheme }>((props) => {
    const { theme, item } = props;
    const messenger = getMessenger();
    const maxWidth = Dimensions.get('screen').width - 32 - (isPad ? 320 : 0);

    const handlePress = React.useCallback(() => {
        if (props.onPress) {
            props.onPress(item.key, item);
        }
    }, [item.key]);

    const handleLongPress = React.useCallback(() => {
        if (props.onLongPress) {
            props.onLongPress(item.key, item);
        }
    }, [item.key]);

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
                        size={18}
                        src={item.senderPhoto}
                        placeholderKey={item.senderId}
                        placeholderTitle={item.senderName}
                    />

                    <ASText
                        fontSize={14}
                        lineHeight={18}
                        fontWeight={TextStyles.weight.medium}
                        color={theme.textColor}
                        marginLeft={8}
                    >
                        {item.senderName}
                    </ASText>
                </ASFlex>
            </ASFlex>

            <ASFlex marginBottom={6} backgroundPatch={{ source: lineBackgroundPatch.uri, scale: lineBackgroundPatch.scale, ...capInsets }} backgroundPatchTintColor={theme.accentColor}>
                <ASText
                    marginLeft={10}
                    fontSize={15}
                    lineHeight={18}
                    height={18}
                    numberOfLines={1}
                    color={theme.textLabelColor}
                    maxWidth={maxWidth - 10}
                >
                    {item.replyQuoteText}
                </ASText>
            </ASFlex>

            <ASFlex
                flexDirection="column"
                alignItems="stretch"
            >
                {topContent}
            </ASFlex>

            {bottomContent}

            <ASFlex marginTop={2}>
                <ZRelativeDateAsync
                    fontWeight={TextStyles.weight.medium}
                    fontSize={13}
                    lineHeight={20}
                    color={theme.textLabelColor}
                    date={item.date}
                />
            </ASFlex>
        </ASFlex>
    );
});

export const NotificationCenterItemAsync = XMemo<NotificationCenterItemAsyncProps>((props) => {
    let theme = useThemeGlobal();

    return <NotificationCenterItemAsyncRender theme={theme} {...props} />;
});