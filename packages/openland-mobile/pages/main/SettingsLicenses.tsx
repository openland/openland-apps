import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { View, Text, Linking, TouchableWithoutFeedback } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { useText } from 'openland-mobile/text/useText';

const Link = React.memo((props: { path: string, children: any }) => {
    const theme = useTheme();
    const onPress = React.useCallback(() => {
        Linking.openURL(props.path);
    }, []);
    const textDecorationLine = theme.accentPrimary === theme.foregroundPrimary ? 'underline' : 'none';
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Text style={{ color: theme.accentPrimary, textDecorationLine }}>{props.children}</Text>
        </TouchableWithoutFeedback>
    );
});

const SettingsLicensesComponent = React.memo(() => {
    const theme = useTheme();
    const { t } = useText();
    return (
        <>
            <SHeader title={t('licenses')} />
            <SScrollView>
                <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
                    <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary }}>
                        {t('illustrationsBy', 'Product illustrations by')} <Link path="https://icons8.com/">Icons 8</Link>
                    </Text>
                    <Text style={{ ...TextStyles.Body, color: theme.foregroundPrimary, marginTop: 16 }}>
                        {t('collectionsCoversBy', 'Editors’ choice and collections covers by')} <Link path="https://freepik.com/stories">stories</Link> {t('and')} <Link path="https://freepik.com/pikisuperstar">pikisuperstar</Link>
                    </Text>
                </View>
            </SScrollView>
        </>
    );
});
export const SettingsLicenses = withApp(SettingsLicensesComponent);