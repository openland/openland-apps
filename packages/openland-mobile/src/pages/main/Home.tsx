import * as React from 'react';
import gql from 'graphql-tag';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { Query } from 'react-apollo';

const MeQuery = gql`
    query Me {
        me {
            id
            name
        }
    }
`;

export class Home extends React.Component {
    handleLogout = () => {
        AsyncStorage.clear();
    }

    render() {
        return (
            <View>
                <Query query={MeQuery}>
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