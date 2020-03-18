import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { View, Text, Linking, TouchableWithoutFeedback } from 'react-native';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const Link = React.memo((props: {path: string, children: any}) => {
    const theme = useTheme();
    const onPress = React.useCallback(() => {
        Linking.openURL(props.path);
    }, []);
    return (
        <TouchableWithoutFeedback onPress={onPress}>
                <Text style={{color: theme.accentPrimary}}>{props.children}</Text>
        </TouchableWithoutFeedback>
    );
});

const SettingsLicensesComponent = React.memo(() => {
    const theme = useTheme();
    return (
        <>
            <SHeader title="Licenses" />
            <SScrollView>
                <View paddingHorizontal={16} marginTop={16}>
                    <Text style={{...TextStyles.Body, color: theme.foregroundPrimary}}>
                        Product illustrations by <Link path="https://icons8.com/">Icons 8</Link>
                    </Text>
                    <Text style={{...TextStyles.Body, color: theme.foregroundPrimary, marginTop: 16}}>
                        Editors’ choice and collections covers by <Link path="https://freepik.com/stories">stories</Link> and <Link path="https://freepik.com/pikisuperstar">pikisuperstar</Link>
                    </Text>
                </View>
            </SScrollView>
        </>
    );
});
export const SettingsLicenses = withApp(SettingsLicensesComponent);