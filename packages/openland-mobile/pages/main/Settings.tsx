import * as React from 'react';
import { AsyncStorage } from 'react-native';
import { withApp } from '../../components/withApp';
import { AppUpdateTracker, UpdateStatus, UpdateStatusCode } from '../../utils/UpdateTracker';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZQuery } from '../../components/ZQuery';
import { ZListItemFooter } from '../../components/ZListItemFooter';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { ZScrollView } from '../../components/ZScrollView';
import { PageProps } from '../../components/PageProps';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { AccountSettingsQuery } from 'openland-api/AccountSettingsQuery';

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

class SettingsComponent extends React.Component<PageProps, { status: UpdateStatus }> {

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
            <>
                <FastHeader title="Settings" />
                <ZQuery query={AccountSettingsQuery}>
                    {resp => {
                        let primary = resp.data.organizations.find((v) => v.id === resp.data.primaryOrganization!!.id)!!;
                        let secondary = resp.data.organizations.filter((v) => v.id !== primary.id);
                        secondary.sort((a, b) => a.name.localeCompare(b.name));
                        let secondaryFiltered = [];
                        for (let i = 0; i < secondary.length && i < 2; i++) {
                            secondaryFiltered.push(secondary[i]);
                        }
                        return (
                            <ZScrollView>
                                <ZListItemHeader
                                    photo={resp.data!!.me!!.picture}
                                    id={resp.data!!.me!!.id}
                                    title={resp.data!!.me!!.name}
                                    subtitle={primary.name}
                                    path="SettingsProfile"
                                    action="Edit profile"
                                />
                                <ZListItemGroup header="Organizations">
                                    <ZListItem
                                        text={primary.name}
                                        leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                                        description="Primary"
                                        onPress={() => this.props.router.push('ProfileOrganization', { id: primary.id })}
                                        navigationIcon={true}
                                    />
                                    {secondaryFiltered.map((v) => (
                                        <ZListItem
                                            text={v.name}
                                            leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                                            onPress={() => this.props.router.push('ProfileOrganization', { id: v.id })}
                                            navigationIcon={true}
                                        />
                                    ))}
                                    {secondaryFiltered.length < secondary.length && <ZListItem text="More" path="SettingsOrganizations" />}
                                </ZListItemGroup>
                                <ZListItemGroup header="Settings" footer="Adjust sound and vibration settings for notifications that you get when you’re using the app">
                                    <ZListItem text="Notifications" path="SettingsNotifications" />
                                </ZListItemGroup>
                                <ZListItemGroup header="Application">
                                    <ZListItem text="Engine" description={AppUpdateTracker.status.bundleVersion} />
                                    {this.state.status.status === UpdateStatusCode.UPDATED && <ZListItem text="Update downloaded. Press to restart app." onPress={this.handleRestart} />}
                                    {this.state.status.status !== UpdateStatusCode.UPDATED && <ZListItem text="Updates" description={convertStatus(this.state.status)} />}
                                </ZListItemGroup>
                                {/* <ZListItemGroup header="Dev Tools">
                                        <ZListItem text="Typography" path="DevTypography" />
                                        <ZListItem text="Components" path="DevComponents" />
                                        <ZListItem text="Navigation" path="DevNavigation" />
                                        <ZListItem text="Loader" path="DevLoader" />
                                        <ZListItem text="Reboot" onPress={this.handleReboot} />
                                        <ZListItem text="Log out" onPress={this.handleLogout} />
                                    </ZListItemGroup>
                                    <ZListItemFooter /> */}
                                <ZListItemFooter />
                            </ZScrollView>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const Settings = withApp(SettingsComponent, { navigationAppearance: 'small-hidden' });