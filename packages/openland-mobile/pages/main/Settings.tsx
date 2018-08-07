import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { AppUpdateTracker, UpdateStatus, UpdateStatusCode } from '../../utils/UpdateTracker';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { AccountQuery } from 'openland-api/AccountQuery';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZQuery } from '../../components/ZQuery';
import { ZScrollView } from '../../components/ZScrollView';
import { AppStyles } from '../../styles/AppStyles';

function convertStatus(status: UpdateStatus) {
    switch (status.status) {
        case UpdateStatusCode.UP_TO_DATE:
            return 'Up to date';
        case UpdateStatusCode.CHECKING_FOR_UPDATES:
            return 'Checking...';
        case UpdateStatusCode.DOWNLOADING:
            return 'Updating...';
        case UpdateStatusCode.UPDATED:
            return 'Update downloaded. Press to restart app.';
        case UpdateStatusCode.DISABLED:
            return 'Disabled';
        default:
            return 'Error';
    }
}

class SettingsComponent extends React.Component<NavigationInjectedProps, { status: UpdateStatus }> {

    state = {
        status: AppUpdateTracker.status
    };

    handleLogout = () => {
        (async () => {
            AsyncStorage.clear();
            AppUpdateTracker.restartApp();
        })();
    }

    handleRestart = () => {
        if (this.state.status.status === UpdateStatusCode.UPDATED) {
            AppUpdateTracker.updateApp();
        }
    }

    handleReboot = () => {
        AppUpdateTracker.restartApp();
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
            <ZScrollView>
                <ZQuery query={AccountQuery}>
                    {resp => {
                        return (
                            <>
                                <ZListItemHeader
                                    photo={resp.data!!.me!!.picture}
                                    id={resp.data!!.me!!.id}
                                    title={resp.data!!.me!!.name}
                                    subtitle={resp.data!!.organization!!.name}
                                    path="SettingsProfile"
                                    action="Edit profile"
                                />
                                <ZListItemGroup header="Settings">
                                    <ZListItem text="Notifications" path="SettingsNotifications" />
                                </ZListItemGroup>
                                <ZListItemGroup header="Application">
                                    <ZListItem text="Engine" description={AppUpdateTracker.status.bundleVersion} />
                                    {this.state.status.status === UpdateStatusCode.UPDATED && <ZListItem text="Update downloaded. Press to restart app." onPress={this.handleRestart} />}
                                    {this.state.status.status !== UpdateStatusCode.UPDATED && <ZListItem text="Updates" description={convertStatus(this.state.status)} />}
                                </ZListItemGroup>
                                <ZListItemGroup header="Dev Tools">
                                    <ZListItem text="Typography" path="DevTypography" />
                                    <ZListItem text="Components" path="DevComponents" />
                                    <ZListItem text="Navigation" path="DevNavigation" />
                                    <ZListItem text="Loader" path="DevLoader" />
                                    <ZListItem text="Reboot" onPress={this.handleReboot} />
                                    <ZListItem text="Log out" onPress={this.handleLogout} />
                                </ZListItemGroup>
                            </>
                        );
                    }}
                </ZQuery>
            </ZScrollView>
        );
    }
}

export const Settings = withApp(SettingsComponent, { noSafeWrapper: true, isInTab: true, navigationStyle: 'small' });