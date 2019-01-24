import * as React from 'react';
import { AsyncStorage, Share, TouchableHighlight, View, Image, Text, Platform, Linking } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZQuery } from '../../components/ZQuery';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { PageProps } from '../../components/PageProps';
import { AccountSettingsQuery } from 'openland-api/AccountSettingsQuery';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { XPStyles } from 'openland-xp/XPStyles';
import RNRestart from 'react-native-restart';
import Rate from 'react-native-rate';
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
                                <ZListItemGroup header="Settings" divider={true}>
                                    <ZListItem
                                        leftIcon={require('assets/ic-notifications-24.png')}
                                        text="Notifications"
                                        path="SettingsNotifications"
                                    />
                                </ZListItemGroup>
                                <ZListItemGroup header="Support" divider={true}>
                                    <ZListItem
                                        leftIcon={require('assets/ic-link-24.png')}
                                        leftIconColor="#fe9400"
                                        appearance="default"
                                        text="Invite friends"
                                        onPress={() => Share.share({ message: 'https://openland.com' })}
                                    />
                                    <ZListItem
                                        leftIcon={require('assets/ic-help-24.png')}
                                        leftIconColor="#00bfff"
                                        appearance="default"
                                        text="Ask for help"
                                        onPress={() => this.props.router.pushAndReset('Conversation', { 'flexibleId': 'mJMk3EkbzBs7dyPBPp9Bck0pxn' })}
                                    />
                                    <ZListItem
                                        leftIcon={require('assets/ic-rate-24.png')}
                                        leftIconColor="#8a54ff"
                                        appearance="default"
                                        text="Rate the App"
                                        onPress={() => {
                                            Rate.rate({
                                                AppleAppID: '1435537685',
                                                GooglePackageName: 'com.openland.app'
                                            }, () => { /**/ });
                                        }}
                                    />
                                </ZListItemGroup>
                                <ZListItemGroup header="Organizations" divider={true} actionRight={{ title: '+ New', onPress: () => this.props.router.push('NewOrganization') }}>
                                    {/* <ZListItem leftIcon={require('assets/ic-add-24.png')} text="Create new" path="SettingsOrganizations" /> */}
                                    {primary && <ZListItem
                                        text={primary.name}
                                        leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                                        description="Primary"
                                        onPress={() => this.props.router.push('ProfileOrganization', { id: primary!.id })}
                                        navigationIcon={true}
                                    />}
                                    {secondary.map((v) => (
                                        <ZListItem
                                            key={v.id}
                                            text={v.name}
                                            leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                                            onPress={() => this.props.router.push('ProfileOrganization', { id: v.id })}
                                            navigationIcon={true}
                                        />
                                    ))}
                                    {/* {secondary.length > secondaryFiltered.length && (
                                        <ZListItem leftIcon={require('assets/ic-more-24.png')} text="View all" path="SettingsOrganizations" />
                                    )} */}
                                </ZListItemGroup>
                                {/* {__DEV__ && (
                                    <ZListItemGroup header="Dev Tools">
                                        <ZListItem text="Typography" path="DevTypography" />
                                        <ZListItem text="Components" path="DevComponents" />
                                        <ZListItem text="Navigation" path="DevNavigation" />
                                        <ZListItem text="Loader" path="DevLoader" />
                                        <ZListItem text="Log out" onPress={this.handleLogout} />
                                    </ZListItemGroup>
                                )} */}
                                {/* <ZListItemFooter />
                                <ZListItemFooter /> */}
                            </SScrollView>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}

export const Settings = withApp(SettingsComponent, { navigationAppearance: 'small-hidden' });