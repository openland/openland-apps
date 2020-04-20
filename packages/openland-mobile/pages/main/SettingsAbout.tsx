import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import Version from 'react-native-version-number';
import { SRouterContext } from 'react-native-s/SRouterContext';

const styles = StyleSheet.create({
    image: {
        width: 192,
        height: 192,
        resizeMode: 'cover'
    },
    title: {
        ...TextStyles.Title2,
        marginTop: -16,
        textAlign: 'center'
    },
    subtitle: {
        ...TextStyles.Subhead,
        marginTop: 4,
        marginBottom: 32,
        textAlign: 'center'
    },
    hero: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

const SettingsAboutComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext)!;

    const buildNumber = Version.appVersion;

    return (
        <SScrollView>
            <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]}>
                <View style={styles.hero}>
                    <Image style={styles.image} source={require('assets/ic-app-icon-192.png')} />
                    <Text style={[styles.title, { color: theme.foregroundPrimary }]} allowFontScaling={false}>Openland</Text>
                    <Text style={[styles.subtitle, { color: theme.foregroundTertiary }]} allowFontScaling={false}>Version {buildNumber}</Text>
                </View>
            </LinearGradient>
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
                <ZListItem
                    leftIcon={require('assets/ic-copyright-24.png')}
                    text='Licenses'
                    small={true}
                    onPress={() => router.push('SettingsLicenses')}
                />
            </View>
        </SScrollView>
    );
});

export const SettingsAbout = withApp(SettingsAboutComponent, { navigationAppearance: 'small' });