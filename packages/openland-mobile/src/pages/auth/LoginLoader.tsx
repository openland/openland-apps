import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildClient, saveClient } from '../../utils/apolloClient';

export class LoginLoader extends React.Component<NavigationInjectedProps> {
    componentDidMount() {
        (async () => {
            const userToken = await AsyncStorage.getItem('openland-token');
            if (userToken) {
                let client = buildClient(userToken);
                saveClient(client);
            }
            this.props.navigation.navigate(userToken ? 'App' : 'Login');
        })();
    }
    render() {
        return null;
    }
}