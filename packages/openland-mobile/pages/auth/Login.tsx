import React from 'react';
import { View, StyleSheet, Image, ViewStyle, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { Auth0Client } from 'openland-mobile/utils/auth0Client';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { ASSafeAreaView } from 'react-native-async-view/ASSafeAreaView';

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
            let res = await Auth0Client.webAuth.authorize({
                scope: 'openid profile email',
                audience: 'https://statecraft.auth0.com/userinfo',
                connection: 'google-oauth2',
            });
            let idToken = res.idToken;
            let accessToken = res.accessToken;

            var uploaded = await fetch('https://api.openland.com/v2/auth', {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + idToken,
                    'x-openland-access-token': accessToken
                }
            });

            if (uploaded.ok) {
                let body = await uploaded.json();
                if (body.ok) {
                    await AppStorage.setToken(body.token);
                    RNRestart.Restart();
                    return;
                }
            }

            // TODO: Better error
            Alert.alert('Unable to authenticate');
        } catch (e) {
            if (e.error) {
                if (e.error === 'a0.session.user_cancelled') {
                    return;
                }
            }

            Alert.alert(e.message + '\n' + JSON.stringify(e));
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