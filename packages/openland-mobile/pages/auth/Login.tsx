import React from 'react';
import { View, Text, StyleSheet, Alert, AsyncStorage, Image, ViewStyle, TextStyle, TouchableOpacity, StatusBar, ActivityIndicator, Dimensions } from 'react-native';
import { Auth0Client } from '../../index';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SDevice } from 'react-native-s/SDevice';
import { SHeader } from 'react-native-s/SHeader';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    } as ViewStyle,
    title: {
        fontWeight: '500',
        color: '#fff',
        fontSize: 22,
        height: 26,
        lineHeight: 26
    } as TextStyle,
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        width: 315,
        backgroundColor: '#4747ec',
        color: '#fff',
        borderRadius: 28
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
        textAlignVertical: 'center'
    } as TextStyle,
    buttonTitleEmail: {
        color: '#000',
        height: 56,
    } as TextStyle,
    footer: {
        color: '#000',
        opacity: 0.6,
        fontSize: 12,
        width: '100%',
        textAlign: 'center'
    } as TextStyle
});

class LoginComponent extends React.Component<PageProps, { initing: boolean, loading: boolean }> {

    state = {
        initing: false,
        loading: false
    };

    handleGoogleAuth = async () => {
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
                    await AsyncStorage.setItem('openland-token', body.token);
                    AppUpdateTracker.restartApp();
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
        // (async () => {
        //     Auth0.requestEmailAuth('korshakov.stepan@gmail.com');
        // })();
    }

    render() {
        return (
            <>
                <SHeader hidden={true} />
                <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                    <Image source={require('assets/img-chat-1.png')} style={{ position: 'absolute', top: 0, left: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }} resizeMode="cover" />
                    <SSafeAreaView style={styles.container}>
                        <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                            <View style={{ width: '100%', marginTop: 32, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('assets/logo.png')} style={{ width: 200, height: 35 }} />
                                <Text style={{ marginTop: 16, marginBottom: 32, fontSize: 18, color: '#000', opacity: 0.7 }}>Messaging for smart people</Text>
                            </View>
                        </View>
                        <View flexDirection="column">
                            <TouchableOpacity onPress={this.handleGoogleAuth} disabled={this.state.loading}>
                                <View style={styles.button}>
                                    <View style={{ width: 56, height: 56, justifyContent: 'center', alignItems: 'center' }}>
                                        {!this.state.loading && <Image source={require('assets/ic-google-signup.png')} />}
                                    </View>
                                    <Text style={styles.buttonTitle}>{!this.state.loading && 'Sign in with Google'}</Text>
                                    <View style={{ width: 56, height: 56 }}>
                                        {}
                                    </View>
                                    {this.state.loading && <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color="#fff" /></View>}
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View flexDirection="column" style={{ marginTop: 15, marginBottom: 46 + SDevice.safeArea.bottom }}>
                            <TouchableOpacity onPress={this.handleEmailPress}>
                                <View style={[styles.button, styles.buttonEmail]}>
                                    <Text style={[styles.buttonTitle, styles.buttonTitleEmail]}>{'Continue with Email'}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </SSafeAreaView>
                </View>
            </>
        );
    }
}

export const Login = withApp(LoginComponent);