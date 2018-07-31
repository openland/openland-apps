import * as React from 'react';
import { AsyncStorage, ScrollView } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { AppUpdateTracker, UpdateStatus, UpdateStatusCode } from '../../utils/UpdateTracker';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { AccountQuery } from 'openland-api/AccountQuery';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZQuery } from '../../components/ZQuery';
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
            <ZQuery query={AccountQuery}>
                {resp => {
                    return (
                        <ScrollView width="100%" height="100%" backgroundColor={AppStyles.backyardColor}>
                            <ZListItemHeader
                                photo={resp.data!!.me!!.picture}
                                id={resp.data!!.me!!.id}
                                title={resp.data!!.me!!.name}
                                subtitle={resp.data!!.organization!!.name}
                                path="SettingsProfile"
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
                                <ZListItem text="Log out" onPress={this.handleLogout} />
                            </ZListItemGroup>
                        </ScrollView>
                    );
                }}
            </ZQuery>
        );
    }
}

export const Settings = withApp(SettingsComponent, { noSafeWrapper: true });