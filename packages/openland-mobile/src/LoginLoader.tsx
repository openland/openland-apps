import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';

export class LoginLoader extends React.Component<NavigationInjectedProps> {
    componentDidMount() {
        (async () => {
            const userToken = await AsyncStorage.getItem('openland-token');
            this.props.navigation.navigate(userToken ? 'App' : 'Login');
        })();
    }
    render() {
        return null;
    }
}