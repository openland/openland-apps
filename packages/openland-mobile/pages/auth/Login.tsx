import React from 'react';
import { View, StyleSheet, Image, ViewStyle } from 'react-native';
import RNRestart from 'react-native-restart';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import { API_HOST } from 'openland-y-utils/api';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    } as ViewStyle,
    logoWrapper: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    buttons: {
        paddingTop: 16,
        paddingBottom: 32,
        paddingHorizontal: 32,
        maxWidth: 424,
        alignSelf: 'center',
        width: '100%'
    } as ViewStyle,
});

class LoginComponent extends React.Component<PageProps, { initing: boolean, loading: boolean }> {
    state = {
        initing: false,
        loading: false
    };

    handleGoogleAuth = async () => {
        trackEvent('root_signup_google_action');

        try {
            this.setState({ loading: true });
            GoogleSignin.configure({
                webClientId: '1095846783035-rpgtqd3cbbbagg3ik0rc609olqfnt6ah.apps.googleusercontent.com',
            });
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            var uploaded = await fetch('https://' + API_HOST + '/auth/google/getAccessToken', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken: userInfo.idToken })
            });

            if (uploaded.ok) {
                let body = await uploaded.json();

                if (body.ok) {
                    await AppStorage.setToken(body.accessToken);
                    RNRestart.Restart();
                    return;
                }
            }

            // TODO: Better error
            Alert.alert('Unable to authenticate');
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED || error.code === statusCodes.IN_PROGRESS) {
                // user cancelled the login flow or operation (e.g. sign in) is in progress already
            } else {
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
                <SHeader hidden={true} />
                <ASSafeAreaView style={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.logoWrapper}>
                            <Image source={require('assets/logo-unicorn.png')} style={{ width: 130, height: 155 }} />
                            <Image source={require('assets/logotype.png')} style={{ width: 186, height: 38, marginTop: 28 }} />
                        </View>

                        <View style={styles.buttons}>
                            <ZRoundedButton
                                title="Sign in with Google"
                                loading={this.state.loading}
                                onPress={this.handleGoogleAuth}
                                size="large"
                            />
                            <View height={16} />
                            <ZRoundedButton
                                title="Continue with Email"
                                enabled={!this.state.loading}
                                onPress={this.handleEmailPress}
                                style="secondary"
                                size="large"
                            />
                        </View>
                    </View>
                </ASSafeAreaView>
            </ZTrack>
        );
    }
}

export const Login = withApp(LoginComponent, { navigationAppearance: 'small-hidden' });