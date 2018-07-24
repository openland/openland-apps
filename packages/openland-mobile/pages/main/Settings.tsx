import * as React from 'react';
import CodePush from 'react-native-code-push';
import { View, Text, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ProfileQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ZLoader } from '../../components/ZLoader';
import { CodePushStatus } from '../../routes';

function convertStatus(status: number | null | undefined) {
    if (status === undefined) {
        return 'Checking for updates...';
    }
    if (status === null) {
        return 'App is up to date';
    }
    switch (status) {
        case 0:
            return 'Checking for updates...';
        case 2:
        case 7:
        case 3:
            return 'Downloading update...';
        case 5:
        case 4:
            return 'App is up to date';
        case 1:
        case 6:
            return 'Update downloaded. Press to restart app.';
        default:
            return 'Unknown status (' + status + ')';
    }
}

class SettingsComponent extends React.Component<NavigationInjectedProps, { status: number | null | undefined }> {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        status: CodePushStatus.status
    };

    handleLogout = () => {
        AsyncStorage.clear();
    }

    handleRestart = () => {
        if (this.state.status === 6 || this.state.status === 1) {
            CodePush.restartApp(true);
        }
    }

    componentDidMount() {
        CodePushStatus.watch((status) => {
            this.setState({ status: status });
        });
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
                {/* {this.state.status === CodePush.SyncStatus.} */}
                <Button title="Log out" onPress={this.handleLogout} />
                <TouchableOpacity onPress={this.handleRestart}>
                    <View style={{ height: 44, backgroundColor: 'grey' }}>
                        <Text>{convertStatus(this.state.status)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

export const Settings = withApp(SettingsComponent);