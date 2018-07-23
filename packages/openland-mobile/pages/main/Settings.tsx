import * as React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { Query } from 'react-apollo';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { AccountQuery } from 'openland-api';

// const MeQuery = gql`
//     query Me {
//         me {
//             id
//             name
//         }
//     }
// `;

class SettingsComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Settings',
    };

    handleLogout = () => {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View>
                <Query query={AccountQuery.document}>
                    {data => {
                        console.log(data);
                        return (<Text>{data.data.me && data.data.me.name} Hello!</Text>);
                    }}
                </Query>
                <Button title="Log out" onPress={this.handleLogout} />
            </View>
        );
    }
}

export const Settings = withApp(SettingsComponent);