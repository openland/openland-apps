import * as React from 'react';
import { AsyncStorage, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { buildNativeClient, saveClient } from '../../utils/apolloClient';
import { AccountQuery } from 'openland-api';
import { buildMessenger, setMessenger } from '../../utils/messenger';
import { ZLoader } from '../../components/ZLoader';
import { AppBadge } from 'openland-y-runtime/AppBadge';
import { AppStyles } from '../../styles/AppStyles';

export class LoginLoader extends React.Component<NavigationInjectedProps, { shouldDisplayLoader: boolean }> {
    constructor(props: NavigationInjectedProps) {
        super(props);
        this.state = {
            shouldDisplayLoader: false
        };
    }
    componentDidMount() {
        (async () => {
            let userToken: string | undefined = await AsyncStorage.getItem('openland-token');
            if (userToken) {
                this.setState({ shouldDisplayLoader: true });
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
        if (this.state.shouldDisplayLoader) {
            return <ZLoader inverted={true} />;
        } else {
            return (<View style={{ backgroundColor: AppStyles.primaryColor, width: '100%', height: '100%' }} />);
        }
    }
}