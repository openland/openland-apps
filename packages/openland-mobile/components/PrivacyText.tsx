import * as React from 'react';
import { Linking, Text, View } from 'react-native';

import { ThemeContext } from '../themes/ThemeContext';
import { TextStyles } from '../styles/AppStyles';
import { useText } from 'openland-mobile/text/useText';

const TermsLink = React.memo(({ children }: { children?: any }) => {
    return (
        <Text
            style={{ ...TextStyles.Label3 }}
            onPress={() => Linking.openURL('https://openland.com/terms')}
        >
            {children}
        </Text>
    );
});

const PrivacyLink = React.memo(({ children }: { children?: any }) => {
    return (
        <Text
            style={{ ...TextStyles.Label3 }}
            onPress={() => Linking.openURL('https://openland.com/privacy')}
        >
            {children}
        </Text>
    );
});

export const PrivacyText = React.memo(() => {
    const theme = React.useContext(ThemeContext);
    const { Trans } = useText();

    return (
        <View
            style={{
                padding: 16,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                maxWidth: 310
            }}
        >
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Caption,
                    textAlign: 'center',
                    color: theme.foregroundTertiary,
                }}
            >
                <Trans
                    i18nKey="privacyStatement"
                    defaults="By creating an account you are accepting our <TermsLink>Terms of service</TermsLink> and <PrivacyLink>Privacy policy</PrivacyLink>"
                    components={{ TermsLink: <TermsLink />, PrivacyLink: <PrivacyLink /> }}
                />
            </Text>
        </View>
    );
});
