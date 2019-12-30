import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import Version from 'react-native-version-number';

const SettingsAboutComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        image: {
            width: 192,
            height: 192,
            resizeMode: 'cover'
        },
        title: {
            ...TextStyles.Title2,
            marginTop: -16,
            textAlign: 'center',
            color: theme.foregroundPrimary
        },
        subtitle: {
            ...TextStyles.Subhead,
            marginTop: 4,
            marginBottom: 32,
            textAlign: 'center',
            color: theme.foregroundTertiary
        },
        hero: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    const buildNumber = Version.appVersion;

    return (
        <SScrollView>
            <ZLinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]} fallbackColor={theme.gradient0to100Start} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.hero}>
                    <Image style={styles.image} source={require('assets/ic-app-icon-192.png')} />
                    <Text style={styles.title} allowFontScaling={false}>Openland</Text>
                    <Text style={styles.subtitle} allowFontScaling={false}>Version {buildNumber}</Text>
                </View>
            </ZLinearGradient>
            <View marginTop={16}>
                <ZListItem
                    leftIcon={require('assets/ic-info-24.png')}
                    text='About Openland'
                    small={true}
                    onPress={() => Linking.openURL('https://openland.com/about')}
                />
                <ZListItem
                    leftIcon={require('assets/ic-terms-24.png')}
                    text='Terms of service'
                    small={true}
                    onPress={() => Linking.openURL('https://openland.com/terms')}
                />
                <ZListItem
                    leftIcon={require('assets/ic-lock-24.png')}
                    text='Privacy policy'
                    small={true}
                    onPress={() => Linking.openURL('https://openland.com/privacy')}
                />
            </View>
        </SScrollView>
    );
});

export const SettingsAbout = withApp(SettingsAboutComponent, { navigationAppearance: 'small' });