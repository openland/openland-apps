import * as React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';

// const MeQuery = gql`
//     query Me {
//         me {
//             id
//             name
//         }
//     }
// `;

class MessagesComponent extends React.Component<NavigationInjectedProps> {
    static navigationOptions = {
        title: 'Messages',
    };
    
    handleLogout = () => {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View>
                <Text>Hello world!</Text>
            </View>
        );
    }
}

export const Messages = withApp(MessagesComponent);