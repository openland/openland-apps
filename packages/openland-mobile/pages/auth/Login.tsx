import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TextStyle, TouchableOpacity, ActivityIndicator, Dimensions, Platform } from 'react-native';
import RNRestart from 'react-native-restart';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { SDevice } from 'react-native-s/SDevice';
import { AppStorage } from 'openland-mobile/utils/AppStorage';
import { Auth0Client } from 'openland-mobile/utils/auth0Client';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { trackEvent } from 'openland-mobile/analytics';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
    } as ViewStyle,
    logoWrapper: {
        height: '65%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    buttons: {
        height: '35%',
        justifyContent: 'center',
        alignItems: 'center'
    } as ViewStyle,
    buttonWrapper: {
        flexGrow: 1,
        maxWidth: 315,
        marginLeft: 28,
        marginRight: 28
    } as ViewStyle,
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#0084fe',
        color: '#fff',
        borderRadius: 28,
        flexGrow: 1,
    } as ViewStyle,
    buttonEmail: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dce0e7'
    } as ViewStyle,
    buttonTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
        height: 56,
        lineHeight: 56,
        flexGrow: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
    } as TextStyle,
    buttonTitleEmail: {
        color: '#000',
        height: 56,
    } as TextStyle,
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
                    // let client = buildNativeClient(body.token);
                    // let meq = await client.client.query<any>({
                    //     query: AccountQuery.document
                    // });
                    // if (!meq.data.me) {
                    //     throw Error('Unknown error');
                    // }
                    // let messenger = buildMessenger(client, meq.data.me);
                    // setMessenger(messenger);
                    // saveClient(client);
                    // this.props.navigation.navigate('App');
                    return;
                }
            }

            console.log(uploaded);

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
            <>
                <ZTrack event="root_view" />
                <SHeader hidden={true} />
                <View style={{ backgroundColor: '#fff', flex: 1, marginBottom: Platform.OS === 'android' ? SDevice.safeArea.bottom : undefined }}>
                    <Image source={require('assets/img-chat-1.jpg')} style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }} resizeMode="cover" />
                    <View style={styles.container}>
                        <View style={styles.logoWrapper}>
                            <Image source={require('assets/logo-unicorn.png')} style={{ marginTop: Platform.OS === 'ios' ? 50 : 0, width: 130, height: 155 }} />
                            <Image source={require('assets/logotype.png')} style={{ width: 186, height: 38, marginTop: 28 }} />
                        </View>

                        <View style={styles.buttons}>
                            <View flexDirection="row">
                                <TouchableOpacity onPress={this.handleGoogleAuth} disabled={this.state.loading} style={styles.buttonWrapper}>
                                    <View style={styles.button}>
                                        <View style={{ width: 56, height: 56, justifyContent: 'center', alignItems: 'center' }}>
                                            {!this.state.loading && <Image source={require('assets/ic-google-signup.png')} />}
                                        </View>
                                        <Text style={styles.buttonTitle} allowFontScaling={false}>{!this.state.loading && 'Sign in with Google'}</Text>
                                        <View style={{ width: 56, height: 56 }}>
                                            {}
                                        </View>
                                        {this.state.loading && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#fff" /></View>}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View flexDirection="row" style={{ marginTop: 15 }}>
                                <TouchableOpacity onPress={this.handleEmailPress} disabled={this.state.loading} style={styles.buttonWrapper}>
                                    <View style={[styles.button, styles.buttonEmail]}>
                                        <Text style={[styles.buttonTitle, styles.buttonTitleEmail]} allowFontScaling={false}>{'Continue with Email'}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </>
        );
    }
}

export const Login = withApp(LoginComponent);