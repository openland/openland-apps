import * as React from 'react';
import { AsyncStorage, ScrollView, View, Text, Button } from 'react-native';
import { withApp } from '../../components/withApp';
import { NavigationInjectedProps } from 'react-navigation';
import { YQuery } from 'openland-y-graphql/YQuery';
import { AppUpdateTracker, UpdateStatus, UpdateStatusCode } from '../../utils/UpdateTracker';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZLoader } from '../../components/ZLoader';
import { ZListItemBase } from '../../components/ZListItemBase';
import { ZAvatar } from '../../components/ZAvatar';
import { AccountQuery } from 'openland-api/AccountQuery';
// import { CodePushStatus } from '../../routes';

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
            <YQuery query={AccountQuery}>
                {resp => {
                    if (resp.loading) {
                        return <ZLoader />;
                    }
                    return (
                        <ScrollView width="100%" height="100%">
                            <ZListItemBase path="SettingsProfile" height={80} backgroundColor="#fff">
                                <View width={80} height={80} alignItems="center" justifyContent="center">
                                    <ZAvatar src={resp.data!!.me!!.picture} size={60} />
                                </View>
                                <View flexGrow={1} flexBasis={0} justifyContent="center" marginLeft={5}>
                                    <Text style={{ height: 19, lineHeight: 19, marginBottom: 5, fontWeight: '500', fontSize: 16, color: '#181818' }} numberOfLines={1}>{resp.data!!.me!!.name}</Text>
                                    <Text style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 18, height: 18 }} numberOfLines={1}>{resp.data!!.organization!!.name}</Text>
                                </View>
                            </ZListItemBase>
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
                                <ZListItem text="Log out" onPress={this.handleLogout} />
                            </ZListItemGroup>
                        </ScrollView>
                    );
                }}
            </YQuery>
        );
    }
}

export const Settings = withApp(SettingsComponent);