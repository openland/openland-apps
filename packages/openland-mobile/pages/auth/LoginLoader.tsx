import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildNativeClient, saveClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger } from '../../utils/messenger';
import { ZLoader } from '../../components/ZLoader';
import { AppBadge } from 'openland-y-runtime/AppBadge';

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

            // Reset badge if not authenticated
            if (!userToken) {
                AppBadge.setBadge(0);
            }

            // Launch app or login sequence
            this.props.navigation.navigate(userToken ? 'App' : 'Login');
        })();
    }
    render() {
        return <ZLoader inverted={true} />;
    }
}