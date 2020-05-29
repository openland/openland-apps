import React from 'react';
import { View, StyleSheet, Image, Text, ViewStyle, Platform, Dimensions } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    } as ViewStyle,
    logoWrapper: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 60,
    } as ViewStyle,
    buttons: {
        paddingHorizontal: 16,
        maxWidth: 424,
        alignSelf: 'center',
        width: '100%',
    } as ViewStyle,
});

const Logo = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View style={styles.logoWrapper}>
            <Image
                fadeDuration={0}
                source={
                    theme.type === 'Light'
                        ? require('assets/ic-logo-240.png')
                        : require('assets/ic-logo-dark-240.png')
                }
                style={{ width: 240, height: 240 }}
            />
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Body,
                    textAlign: 'center',
                    color: theme.foregroundSecondary,
                }}
            >
                The best place to find and build {'\n'} inspiring communities
            </Text>
        </View>
    );
});

interface ButtonProps {
    onPhonePress: () => void;
    onMailPress: () => void;
}

const Buttons = React.memo((props: ButtonProps) => {
    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const defaultIosPadding = isXGen ? 0 : 16;

    return (
        <View style={styles.buttons} paddingBottom={isIos ? defaultIosPadding : 16}>
            <ZButton title="Continue with Phone" onPress={props.onPhonePress} size="large" />
            <View height={16} />
            <ZButton
                title="Continue with Email"
                onPress={props.onMailPress}
                style="secondary"
                size="large"
            />
        </View>
    );
});

const LoginComponent = React.memo((props: PageProps) => {
    const handlePhonePress = () => {
        props.router.push('AuthStart', { phone: true });
    };

    const handleEmailPress = () => {
        props.router.push('AuthStart');
    };

    return (
        <ZTrack event="root_view">
            <ASSafeAreaView style={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <Logo />
                    <Buttons onPhonePress={handlePhonePress} onMailPress={handleEmailPress} />
                </View>
            </ASSafeAreaView>
        </ZTrack>
    );
});

export const Login = withApp(LoginComponent, { navigationAppearance: 'small-hidden' });
