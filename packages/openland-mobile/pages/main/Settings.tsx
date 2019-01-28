import * as React from 'react';
import { AsyncStorage, Share, Platform } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import RNRestart from 'react-native-restart';
import Rate from 'react-native-rate';
import { CenteredHeader } from './components/CenteredHeader';
import { getClient } from 'openland-mobile/utils/apolloClient';

let SettingsContent = React.memo<PageProps>((props) => {
    let resp = getClient().useAccountSettings();
    console.log('resp');
    let primary = resp.me!.primaryOrganization;
    let secondary = resp.organizations.filter((v) => v.id !== (primary && primary.id));
    secondary.sort((a, b) => a.name.localeCompare(b.name));
    let secondaryFiltered = [];
    for (let i = 0; i < secondary.length && i < 2; i++) {
        secondaryFiltered.push(secondary[i]);
    }
    return (
        <SScrollView>
            <ZListItemHeader
                photo={resp.me!!.photo}
                id={resp!!.me!!.id}
                title={resp!!.me!!.name}
                subtitle={primary ? primary.name : undefined}
                path="SettingsProfile"
                action="Edit profile"
            />
            <ZListItemGroup header="Settings" divider={false}>
                <ZListItem
                    leftIcon={require('assets/ic-notifications-24.png')}
                    text="Notifications"
                    path="SettingsNotifications"
                />
            </ZListItemGroup>
            <ZListItemGroup header="Support" divider={false}>
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
                    onPress={() => props.router.pushAndReset('Conversation', { 'flexibleId': 'mJMk3EkbzBs7dyPBPp9Bck0pxn' })}
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
            <ZListItemGroup header="Organizations" divider={false} actionRight={{ title: '+ New', onPress: () => props.router.push('NewOrganization') }}>
                {primary && <ZListItem
                    text={primary.name}
                    leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                    description="Primary"
                    onPress={() => props.router.push('ProfileOrganization', { id: primary!.id })}
                    navigationIcon={true}
                />}
                {secondary.map((v) => (
                    <ZListItem
                        key={v.id}
                        text={v.name}
                        leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                        onPress={() => props.router.push('ProfileOrganization', { id: v.id })}
                        navigationIcon={true}
                    />
                ))}
            </ZListItemGroup>
        </SScrollView>
    );
});

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

                <SettingsContent {...this.props} />
            </>
        );
    }
}

export const Settings = withApp(SettingsComponent, { navigationAppearance: 'small-hidden' });