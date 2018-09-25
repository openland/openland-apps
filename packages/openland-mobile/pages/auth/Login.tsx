import React from 'react';
import { View, Text, StyleSheet, Alert, AsyncStorage, Image, ViewStyle, TextStyle, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Auth0Client } from '../../index';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { SSafeAreaView } from 'react-native-s/SSafeArea';

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
        height: 48,
        width: 335,
        backgroundColor: '#4747ec',
        color: '#fff',
        borderRadius: 12
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
    footer: {
        color: '#000',
        opacity: 0.6,
        fontSize: 12,
        width: '100%',
        textAlign: 'center'
    } as TextStyle
});

export class Login extends React.Component<{}, { initing: boolean, loading: boolean }> {

    state = {
        initing: false,
        loading: false
    };

    handlePress = async () => {
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
            Alert.alert(e.message + '\n' + JSON.stringify(e));
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%' }}>
                <SSafeAreaView style={styles.container}>
                    <View style={{ width: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                        <View style={{ width: '100%', marginTop: 32, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row' }}><Image source={require('assets/logo.png')} style={{ width: 60, height: 38 }} /><Text style={{ fontSize: 42, lineHeight: 48, marginTop: -6, marginLeft: -24 }}>Openland</Text></View>
                            <Text style={{ marginTop: 16, marginBottom: 32, fontSize: 18 }}>New era of professional networking</Text>
                        </View>
                    </View>
                    <View flexDirection="column" style={{ marginTop: 8, marginBottom: 12 }}>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonTitle}>{!this.state.loading && 'Start networking'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text>— or —</Text>
                    <View flexDirection="column" style={{ marginTop: 12 }}>
                        <TouchableOpacity onPress={this.handlePress} disabled={this.state.loading}>
                            <View style={styles.button}>
                                <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                    {!this.state.loading && <Image source={require('assets/ic-google.png')} />}
                                </View>
                                <Text style={styles.buttonTitle}>{!this.state.loading && 'Login with Google'}</Text>
                                <View style={{ width: 70, height: 70 }}>
                                    {}
                                </View>
                                {this.state.loading && <View style={{ position: 'absolute' }}><ActivityIndicator /></View>}
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View flexDirection="column" style={{ marginTop: 8 }}>
                        <TouchableOpacity>
                            <View style={styles.button}>
                                <Text style={styles.buttonTitle}>{!this.state.loading && 'Login with Email'}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </SSafeAreaView>
            </View>
        );
    }
}