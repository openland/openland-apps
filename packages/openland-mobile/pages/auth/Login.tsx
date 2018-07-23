import React from 'react';
import { View, Text, Button, StyleSheet, ProgressViewIOS, Alert, AsyncStorage } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildClient, saveClient } from '../../utils/apolloClient';
import { Auth0Client } from '../../index';

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
                    let client = buildClient(body.token);
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