import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildNativeClient, saveClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger } from '../../utils/messenger';
import { ZLoader } from '../../components/ZLoader';

export class LoginLoader extends React.Component<NavigationInjectedProps> {
    componentDidMount() {
        (async () => {
            let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
            if (userToken) {
                let client = buildNativeClient(userToken);
                let res = await client.client.query<any>({
                    query: AccountQuery.document
                });
                if (!res.data.me) {
                    userToken = undefined;
                } else {
                    let messenger = buildMessenger(client, res.data.me);
                    setMessenger(messenger);
                    saveClient(client);
                }
            }
            this.props.navigation.navigate(userToken ? 'App' : 'Login');
        })();
    }
    render() {
        return <ZLoader />;
    }
}