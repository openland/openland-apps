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
                                <ZListItemGroup header={null} footer="Send your personal link to friends in any messenger to stay connected in Openland">
                                    <ZListItem
                                        appearance="default"
                                        text="Ask for help"
                                        onPress={() => this.props.router.pushAndReset('Conversation', { 'flexibleId': 'mJMk3EkbzBs7dyPBPp9Bck0pxn' })}
                                    />
                                    <ZListItem
                                        appearance="default"
                                        text="Rate the App"
                                        onPress={() => {
                                            Rate.rate({
                                                AppleAppID: '1435537685',
                                                GooglePackageName: 'com.openland.app'
                                            }, () => { /**/ });
                                        }}
                                    />
                                    <ZListItem
                                        appearance="default"
                                        text="Invite friends"
                                        onPress={() => Share.share({ message: 'https://openland.com' })}
                                    />
                                </ZListItemGroup>
                                <ZListItemGroup header="Settings" footer="Adjust sound and vibration settings for notifications that you get when you’re using the app">
                                    <ZListItem text="Notifications" path="SettingsNotifications" />
                                </ZListItemGroup>
                                <ZListItemGroup header="Organizations" actionRight={{ title: 'Show all', onPress: () => this.props.router.push('SettingsOrganizations') }} divider={false}>
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
                                {__DEV__ && (
                                    <ZListItemGroup header="Dev Tools">
                                        <ZListItem text="Typography" path="DevTypography" />
                                        <ZListItem text="Components" path="DevComponents" />
                                        <ZListItem text="Navigation" path="DevNavigation" />
                                        <ZListItem text="Loader" path="DevLoader" />
                                        <ZListItem text="Log out" onPress={this.handleLogout} />
                                    </ZListItemGroup>
                                )}
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