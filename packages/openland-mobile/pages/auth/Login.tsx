import React from 'react';
import { View, Text, StyleSheet, Alert, AsyncStorage, Image, ViewStyle, TextStyle, TouchableOpacity, StatusBar } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildNativeClient, saveClient } from '../../utils/apolloClient';
import { Auth0Client } from '../../index';
import { AccountQuery } from 'openland-api/AccountQuery';
import { buildMessenger, setMessenger } from '../../utils/messenger';
import { ZLoader } from '../../components/ZLoader';
import { AppStyles } from '../../styles/AppStyles';
import { isAndroid } from '../../utils/isAndroid';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 400,
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
        width: 335,
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: 5
    } as ViewStyle,
    buttonTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        height: 18,
        flexGrow: 1,
        textAlign: 'center'
    } as TextStyle,
    footer: {
        color: '#fff',
        opacity: 0.6,
        fontSize: 12,
        width: '100%',
        textAlign: 'center'
    } as TextStyle
});

export class Login extends React.Component<NavigationInjectedProps, { initing: boolean, loading: boolean }> {

    state = {
        initing: false,
        loading: false
    };

    handlePress = async () => {
        try {
            this.setState({ loading: true });
            if (!isAndroid) {
                StatusBar.setBarStyle('dark-content');
            }
            let res = await Auth0Client.webAuth.authorize({
                scope: 'openid profile email',
                audience: 'https://statecraft.auth0.com/userinfo',
                connection: 'google-oauth2',
            });
            if (!isAndroid) {
                StatusBar.setBarStyle('light-content');
            }

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
                    let client = buildNativeClient(body.token);
                    let meq = await client.client.query<any>({
                        query: AccountQuery.document
                    });
                    if (!meq.data.me) {
                        throw Error('Unknown error');
                    }
                    let messenger = buildMessenger(client, meq.data.me);
                    setMessenger(messenger);
                    saveClient(client);
                    this.props.navigation.navigate('App');
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
            if (!isAndroid) {
                StatusBar.setBarStyle('light-content');
            }
        }
    }

    render() {
        return (
            <View style={{ backgroundColor: AppStyles.primaryColor, width: '100%', height: '100%' }}>
                <Image source={require('assets/img-back.png')} style={{ width: '100%', height: '100%', opacity: this.state.initing ? 0 : 1 }} fadeDuration={0} onLoadEnd={() => this.setState({ initing: false })} />
                {!this.state.initing && (
                    <View style={styles.container}>
                        {/* {this.state.loading && <ZLoader />} */}
                        <Text style={styles.title}>Welcome to Openland!</Text>
                        <View flexDirection="column" style={{ marginTop: 35 }}>
                            <TouchableOpacity onPress={this.handlePress} disabled={this.state.loading}>
                                <View style={styles.button}>
                                    <View style={{ width: 70, height: 70, justifyContent: 'center', alignItems: 'center' }}>
                                        {!this.state.loading && <Image source={require('assets/ic-google.png')} />}
                                    </View>
                                    <Text style={styles.buttonTitle}>{!this.state.loading && 'Login with Google'}</Text>
                                    <View style={{ width: 70, height: 70 }}>
                                        {}
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {this.state.loading && <ZLoader transparent={true} />}
                        </View>
                        <View style={{ flexGrow: 1 }} />
                        <View flexDirection="column" paddingBottom={20} alignItems="center">
                            <Text style={styles.footer}>By creating an account you are accepting our</Text>
                            <Text style={styles.footer}>Terms of Service and Privacy Policy</Text>
                        </View>
                    </View>
                )}
            </View>
        );
    }
}