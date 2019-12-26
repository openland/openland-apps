import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { View, Text, StyleSheet, Image, Linking, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZLinearGradient } from 'openland-mobile/components/visual/ZLinearGradient.native';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import DeviceInfo from 'react-native-device-info';

interface ItemProps {
    path: string;
    icon: ImageSourcePropType;
    children: string;
}

const Item = React.memo((props: ItemProps) => {
    const theme = React.useContext(ThemeContext);

    const styles = StyleSheet.create({
        text: {
            ...TextStyles.Body,
            color: theme.foregroundPrimary
        },
        icon: {
            tintColor: theme.foregroundSecondary
        }
    });

    return (
        <TouchableOpacity onPress={() => Linking.openURL(props.path)}>
            <View flexDirection="row" alignItems="center" paddingLeft={16} paddingRight={16} paddingTop={12} paddingBottom={12}>
                <View marginRight={16}>
                    <Image source={props.icon} style={styles.icon} />
                </View>
                <Text allowFontScaling={false} style={styles.text}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
});

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

    const buildNumber = DeviceInfo.getBuildNumber();

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
                <Item path="https://openland.com/about" icon={require('assets/ic-info-24.png')}>About Openland</Item>
                <Item path="https://openland.com/terms" icon={require('assets/ic-terms-24.png')}>Terms of service</Item>
                <Item path="https://openland.com/privacy" icon={require('assets/ic-lock-24.png')}>Privacy policy</Item>
            </View>
        </SScrollView>
    );
});

export const SettingsAbout = withApp(SettingsAboutComponent, { navigationAppearance: 'small' });