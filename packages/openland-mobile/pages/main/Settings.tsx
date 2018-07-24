import * as React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ProfileQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ZLoader } from '../../components/ZLoader';

class SettingsComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Settings',
    };

    handleLogout = () => {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View width="100%" height="100%">
                <YQuery query={ProfileQuery}>
                    {resp => (<>
                        {resp.data && resp.data.profile && <Text>{resp.data.profile && resp.data.profile.firstName} Hello!</Text>}
                        {!(resp.data && resp.data.profile) && <ZLoader />}
                    </>)}
                </YQuery>
                <Button title="Log out" onPress={this.handleLogout} />
            </View>
        );
    }
}

export const Settings = withApp(SettingsComponent);