import * as React from 'react';
import { AsyncStorage, Share, TouchableHighlight, View, Image, Text } from 'react-native';
import { withApp } from '../../components/withApp';
import { AppUpdateTracker, UpdateStatus, UpdateStatusCode } from '../../utils/UpdateTracker';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZQuery } from '../../components/ZQuery';
import { ZListItemFooter } from '../../components/ZListItemFooter';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { PageProps } from '../../components/PageProps';
import { AccountSettingsQuery } from 'openland-api/AccountSettingsQuery';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { XPStyles } from 'openland-xp/XPStyles';

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
                <SHeader title="Settings" />
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
                            <SScrollView>
                                <ZListItemHeader
                                    photo={resp.data!!.me!!.picture}
                                    id={resp.data!!.me!!.id}
                                    title={resp.data!!.me!!.name}
                                    subtitle={primary.name}
                                    path="SettingsProfile"
                                    action="Edit profile"
                                />
                                <ZListItemGroup header="Invite someone" footer="Help us grow Openland community">
                                    <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ title: 'Join Openland! - Messaging for smart people', message: 'Join Openland! - Messaging for smart people https://www.openland.com' })} />
                                </ZListItemGroup>
                                <ZListItemGroup header="Organizations" actionRight={{ title: 'Show all', onPress: () => this.props.router.push('SettingsOrganizations') }}>
                                    <ZListItem
                                        text={primary.name}
                                        leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                                        description="Primary"
                                        onPress={() => this.props.router.push('ProfileOrganization', { id: primary.id })}
                                        navigationIcon={true}
                                    />
                                    {secondaryFiltered.map((v) => (
                                        <ZListItem
                                            key={v.id}
                                            text={v.name}
                                            leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                                            onPress={() => this.props.router.push('ProfileOrganization', { id: v.id })}
                                            navigationIcon={true}
                                        />
                                    ))}
                                    <TouchableHighlight underlayColor={XPStyles.colors.selectedListItem} onPress={() => this.props.router.push('NewOrganization')}>
                                        <View flexDirection="row" height={60} alignItems="center" >
                                            <View marginLeft={16} marginRight={16} width={40} height={40} borderRadius={20} borderWidth={1} borderColor={XPStyles.colors.brand} justifyContent="center" alignItems="center">
                                                <Image source={require('assets/ic-add.png')} />
                                            </View>
                                            <Text style={{ color: '#4747ec', fontWeight: '500', fontSize: 16 }}>New organization</Text>

                                        </View>
                                    </TouchableHighlight>
                                </ZListItemGroup>
                                <ZListItemGroup header="Settings" footer="Adjust sound and vibration settings for notifications that you get when you’re using the app">
                                    <ZListItem text="Notifications" path="SettingsNotifications" />
                                    {__DEV__ && <ZListItem text="Phone" description={'verify phone'} path="PhoneVerify" />}
                                </ZListItemGroup>
                                <ZListItemGroup header="Application">
                                    <ZListItem text="Engine" description={AppUpdateTracker.status.bundleVersion} />
                                    {this.state.status.status === UpdateStatusCode.UPDATED && <ZListItem text="Update downloaded. Press to restart app." onPress={this.handleRestart} />}
                                    {this.state.status.status !== UpdateStatusCode.UPDATED && <ZListItem text="Updates" description={convertStatus(this.state.status)} />}
                                </ZListItemGroup>
                                {__DEV__ && (
                                    <ZListItemGroup header="Dev Tools">
                                        <ZListItem text="Typography" path="DevTypography" />
                                        <ZListItem text="Components" path="DevComponents" />
                                        <ZListItem text="Navigation" path="DevNavigation" />
                                        <ZListItem text="Loader" path="DevLoader" />
                                        <ZListItem text="Reboot" onPress={this.handleReboot} />
                                        <ZListItem text="Log out" onPress={this.handleLogout} />
                                    </ZListItemGroup>
                                )}
                                <ZListItemFooter />
                                <ZListItemFooter />
                            </SScrollView>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const Settings = withApp(SettingsComponent, { navigationAppearance: 'small-hidden' });