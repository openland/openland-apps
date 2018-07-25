import * as React from 'react';
import { View, Text, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { ProfileQuery } from 'openland-api';
import { YQuery } from 'openland-y-graphql/YQuery';
import { ZLoader } from '../../components/ZLoader';
import { AppUpdateTracker, UpdateStatus, UpdateStatusCode } from '../../utils/UpdateTracker';
// import { CodePushStatus } from '../../routes';

function convertStatus(status: UpdateStatus) {
    switch (status.status) {
        case UpdateStatusCode.UP_TO_DATE:
            return 'App is up to date';
        case UpdateStatusCode.CHECKING_FOR_UPDATES:
            return 'Checking for updates...';
        case UpdateStatusCode.DOWNLOADING:
            return 'Downloading update...';
        case UpdateStatusCode.UPDATED:
            return 'Update downloaded. Press to restart app.';
        case UpdateStatusCode.DISABLED:
            return 'Updates disabled';
        default:
            return 'Unknown error. Press to try again.';
    }
}

class SettingsComponent extends React.Component<NavigationInjectedProps, { status: UpdateStatus }> {
    static navigationOptions = {
        title: 'Settings',
    };

    state = {
        status: AppUpdateTracker.status
    };

    handleLogout = () => {
        AsyncStorage.clear();
    }

    handleRestart = () => {
        if (this.state.status.status === UpdateStatusCode.UPDATED) {
            AppUpdateTracker.updateApp();
        }
    }

    handleStatus = (status: UpdateStatus) => {
        this.setState({ status });
    }

    componentDidMount() {
        AppUpdateTracker.watch(this.handleStatus);
    }

    componentWillUnmount() {
        AppUpdateTracker.unwatch(this.handleStatus);
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
                <Text>{AppUpdateTracker.status.bundleVersion}</Text>
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