import React from 'react';
import { View, StyleSheet, Image, Text, ViewStyle, Platform, Linking } from 'react-native';
import RNRestart from 'react-native-restart';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import Alert from 'openland-mobile/components/AlertBlanket';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { API_HOST } from 'openland-y-utils/api';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { AppStorage as Storage } from 'openland-y-runtime-native/AppStorage';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    } as ViewStyle,
    logoWrapper: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 45,
    } as ViewStyle,
    buttons: {
        paddingTop: 16,
        paddingHorizontal: 16,
        maxWidth: 424,
        alignSelf: 'center',
        width: '100%',
    } as ViewStyle,
    privacy: {
        paddingTop: 16,
        paddingBottom: 16,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
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

const PrivacyText = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View style={styles.privacy}>
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Caption,
                    textAlign: 'center',
                    color: theme.foregroundTertiary,
                }}
            >
                By creating an account you are accepting our
                {'\n'}
                <Text
                    style={{ ...TextStyles.Label3 }}
                    onPress={() => Linking.openURL('https://openland.com/terms')}
                >
                    Terms of service
                </Text>{' '}
                and{' '}
                <Text
                    style={{ ...TextStyles.Label3 }}
                    onPress={() => Linking.openURL('https://openland.com/privacy')}
                >
                    Privacy policy
                </Text>
            </Text>
        </View>
    );
});

class LoginComponent extends React.Component<PageProps, { initing: boolean; loading: boolean }> {
    state = {
        initing: false,
        loading: false,
    };

    handleGoogleAuth = async () => {
        trackEvent('root_signup_google_action');

        try {
            this.setState({ loading: true });
            GoogleSignin.configure({
                webClientId:
                    '1095846783035-rpgtqd3cbbbagg3ik0rc609olqfnt6ah.apps.googleusercontent.com',
                iosClientId:
                    '1095846783035-mp5t7jtqvocp6rfr696rot34r4qfobum.apps.googleusercontent.com',
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            let uploaded = await fetch('https://' + API_HOST + '/auth/google/getAccessToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: userInfo.idToken }),
            });

            if (uploaded.ok) {
                let body = await uploaded.json();

                if (body.ok) {
                    await AppStorage.setToken(body.accessToken);
                    // hotfix, spacex cache reset needed
                    await Storage.writeKey('user_refetch_needed', true);
                    RNRestart.Restart();
                    return;
                }
            }

            // TODO: Better error
            Alert.alert('Unable to authenticate');
        } catch (error) {
            if (
                error.code === statusCodes.SIGN_IN_CANCELLED ||
                error.code === statusCodes.IN_PROGRESS
            ) {
                // user cancelled the login flow or operation (e.g. sign in) is in progress already
            } else if (Platform.OS === 'ios') {
                // can't handle cancel with latest GoogleSignIn lib - just ignore all error for now
                // https://github.com/googlesamples/google-services/issues/426
            } else {
                console.warn(JSON.stringify(error));
                Alert.alert(error.message);
            }
        } finally {
            this.setState({ loading: false });
        }
    }

    handleEmailPress = () => {
        this.props.router.push('EmailStart');
    }

    render() {
        return (
            <ZTrack event="root_view">
                <ASSafeAreaView style={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <Logo />
                        <View style={styles.buttons}>
                            <ZButton
                                title="Continue with Google"
                                loading={this.state.loading}
                                onPress={this.handleGoogleAuth}
                                size="large"
                            />
                            <View height={16} />
                            <ZButton
                                title="Continue with Email"
                                enabled={!this.state.loading}
                                onPress={this.handleEmailPress}
                                style="secondary"
                                size="large"
                            />
                        </View>
                        <PrivacyText />
                    </View>
                </ASSafeAreaView>
            </ZTrack>
        );
    }
}

export const Login = withApp(LoginComponent, { navigationAppearance: 'small-hidden' });
