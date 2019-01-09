import * as React from 'react';
import { AsyncStorage, Share, TouchableHighlight, View, Image, Text, Platform } from 'react-native';
import { withApp } from '../../components/withApp';
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
import RNRestart from 'react-native-restart';
import { SHeaderView } from 'react-native-s/SHeaderView';
import { CenteredHeader } from './components/CenteredHeader';

class SettingsComponent extends React.Component<PageProps> {

    handleLogout = () => {
        (async () => {
            AsyncStorage.clear();
            RNRestart.Restart();
        })();
    }

    render() {
        return (
            <>
                {Platform.OS === 'ios' && (
                    <SHeader title="Settings" />
                )}
                {Platform.OS === 'android' && (
                    <CenteredHeader title="Settings" /> 
                )}

                <ZQuery query={AccountSettingsQuery}>
                    {resp => {
                        let primary = resp.data.me!.primaryOrganization;
                        let secondary = resp.data.organizations.filter((v) => v.id !== (primary && primary.id));
                        secondary.sort((a, b) => a.name.localeCompare(b.name));
                        let secondaryFiltered = [];
                        for (let i = 0; i < secondary.length && i < 2; i++) {
                            secondaryFiltered.push(secondary[i]);
                        }
                        return (
                            <SScrollView>
                                <ZListItemHeader
                                    photo={resp.data!!.me!!.photo}
                                    id={resp.data!!.me!!.id}
                                    title={resp.data!!.me!!.name}
                                    subtitle={primary ? primary.name : undefined}
                                    path="SettingsProfile"
                                    action="Edit profile"
                                />
                                <ZListItemGroup header="Invite someone" footer="Help us grow Openland community">
                                    <ZListItem appearance="action" text="Share link" onPress={() => Share.share({ title: 'Join Openland! - Messaging for smart people', message: 'Join Openland! - Messaging for smart people https://www.openland.com' })} />
                                </ZListItemGroup>
                                <ZListItemGroup header="Organizations" actionRight={{ title: 'Show all', onPress: () => this.props.router.push('SettingsOrganizations') }}>
                                    {primary && <ZListItem
                                        text={primary.name}
                                        leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                                        description="Primary"
                                        onPress={() => this.props.router.push('ProfileOrganization', { id: primary!.id })}
                                        navigationIcon={true}
                                    />}
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
                                {/* <ZListItemGroup header="Application">
                                    <ZListItem text="Engine" description={AppUpdateTracker.status.bundleVersion} />
                                    {this.state.status.status === UpdateStatusCode.UPDATED && <ZListItem text="Update downloaded. Press to restart app." onPress={this.handleRestart} />}
                                    {this.state.status.status !== UpdateStatusCode.UPDATED && <ZListItem text="Updates" description={convertStatus(this.state.status)} />}
                                </ZListItemGroup> */}
                                {__DEV__ && (
                                    <ZListItemGroup header="Dev Tools">
                                        <ZListItem text="Typography" path="DevTypography" />
                                        <ZListItem text="Components" path="DevComponents" />
                                        <ZListItem text="Navigation" path="DevNavigation" />
                                        <ZListItem text="Loader" path="DevLoader" />
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