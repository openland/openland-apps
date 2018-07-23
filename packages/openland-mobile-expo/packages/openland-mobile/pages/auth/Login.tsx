import React from 'react';
import { View, Text, Button, StyleSheet, ProgressViewIOS, Alert, AsyncStorage } from 'react-native';
import { AuthSession } from 'expo';
import qs from 'query-string';
import { NavigationInjectedProps } from 'react-navigation';
import { buildClient, saveClient } from '../../utils/apolloClient';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export class Login extends React.Component<NavigationInjectedProps, { loading: boolean }> {

    state = {
        loading: false
    };

    handlePress = async () => {
        try {
            this.setState({ loading: true });
            let nonce = 'asdasdasdasd'; // TODO: Better nonce
            let res = await AuthSession.startAsync({
                authUrl: 'https://auth.openland.com/authorize?' + qs.stringify({
                    connection: 'google-oauth2',
                    client_id: 'v3R2Rr6D4LzzcWKHf91jwKJyDnEm4L96',
                    response_type: 'token id_token',
                    scope: 'openid profile email',
                    nonce: nonce,
                    redirect_uri: AuthSession.getRedirectUrl()
                })
            });

            if (res.type === 'success') {
                // Yahoo
                // console.log(JSON.stringify(res.params));
                let idToken = res.params.id_token;
                let accessToken = res.params.access_token;
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
                        let client = buildClient(body.token);
                        saveClient(client);
                        this.props.navigation.navigate('App');
                        return;

                    }
                }
            }

            // TODO: Better error
            Alert.alert('Unable to authenticate');

            this.setState({ loading: false });
        } catch (e) {
            Alert.alert(e.message + '\n' + JSON.stringify(e));
        }
    }

    render() {
        console.log('render');
        return (
            <View style={styles.container}>
                {this.state.loading && <ProgressViewIOS style={{ position: 'absolute' }} />}
                <Text>Welcome to Openland4</Text>
                <View flexDirection="column">
                    <Button title="Login with Google" onPress={this.handlePress} />
                    <Button title="Test button" onPress={() => console.warn('Hello??!!')} />
                </View>
            </View>
        );
    }
}