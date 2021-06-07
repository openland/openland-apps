import * as React from 'react';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { Image, Text } from 'react-native';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useText } from 'openland-mobile/text/useText';

export const NotificationCenterEmpty = React.memo(() => {
    let theme = React.useContext(ThemeContext);
    let { t } = useText();

    return (
        <ASSafeAreaView
            style={{
                flexGrow: 1,
                paddingHorizontal: 48,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Image
                source={
                    theme.type === 'Light'
                        ? require('assets/art-notifications-off.png')
                        : require('assets/art-notifications-off-dark.png')
                }
                style={{ width: 320, height: 200, marginBottom: 30 }}
            />
            <Text
                style={{
                    ...TextStyles.Title2,
                    color: theme.foregroundPrimary,
                    textAlign: 'center',
                    marginBottom: 4,
                }}
                allowFontScaling={false}
            >
                {t('noNotifications', 'No notifications yet')}
            </Text>
            <Text
                style={{
                    ...TextStyles.Body,
                    color: theme.foregroundSecondary,
                    textAlign: 'center',
                }}
                allowFontScaling={false}
            >
                {t('noNotificationsDescripiton', 'Comments in threads you are involved in will be right here')}
            </Text>
        </ASSafeAreaView>
    );
});