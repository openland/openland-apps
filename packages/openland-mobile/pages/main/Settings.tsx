import * as React from 'react';
import { Share, Platform } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItemHeader } from '../../components/ZListItemHeader';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import Rate from 'react-native-rate';
import { CenteredHeader } from './components/CenteredHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useClient } from 'openland-mobile/utils/useClient';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { trackEvent } from 'openland-mobile/analytics';

let useOnlineState = () => {
    let [status, setStatus] = React.useState(useClient().client.status);
    React.useEffect(() => {
        return useClient().client.watchStatus((s) => {
            setStatus(s);
        })
    }, [])
    return status;
}

let SettingsContent = ((props: PageProps) => {

    let theme = React.useContext(ThemeContext);

    let resp = getClient().useAccountSettings({ fetchPolicy: 'cache-and-network' });
    if (resp.me === null) {
        return null
    }
    let primary = resp.me.primaryOrganization;
    let secondary = resp.organizations.filter((v) => v.id !== (primary && primary.id));
    secondary.sort((a, b) => a.name.localeCompare(b.name));
    let secondaryFiltered = [];
    for (let i = 0; i < secondary.length && i < 2; i++) {
        secondaryFiltered.push(secondary[i]);
    }
    let status = useOnlineState();

    const handleGlobalInvitePress = React.useCallback(async () => {
        startLoader();

        try {
            const inviteCode = await getClient().queryAccountAppInvite({ fetchPolicy: 'network-only' });
            const inviteLink = 'https://openland.com/invite/' + inviteCode.invite;

            trackEvent('invite_link_action', {
                invite_type: 'Openland',
                action_type: 'link_shared'
            });

            Share.share({ message: inviteLink });
        } catch (e) {
            console.warn(e);
        } finally {
            stopLoader();
        }
    }, []);

    return (
        <SScrollView>
            <ZListItemHeader
                photo={resp.me!!.photo}
                id={resp!!.me!!.id}
                userId={resp!!.me!!.id}
                title={resp!!.me!!.name}
                subtitle={status.status === 'connected' ? 'online' : 'connecting...'}
                subtitleColor={status.status === 'connected' ? theme.accentColor : undefined}
                path="SettingsProfile"
                action="Edit profile"
            />
            <ZListItemGroup header="Settings" divider={false}>
                <ZListItem
                    leftIconColor={theme.settingsAppearanceIcon}
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-appearance-24.png') : require('assets/ic-appearance-fill-24.png')}
                    text="Appearance"
                    path="SettingsAppearance"
                />
                <ZListItem
                    leftIconColor={theme.settingsNotificationIcon}
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-fill-24.png')}
                    text="Notifications"
                    path="SettingsNotifications"
                />
            </ZListItemGroup>
            <ZListItemGroup header="Support" divider={false}>
                <ZListItem
                    leftIconColor={theme.settingsInviteIcon}
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-link-24.png') : require('assets/ic-invite-fill-24.png')}
                    appearance="default"
                    text="Invite friends"
                    onPress={handleGlobalInvitePress}
                />
                {/* <ZListItem
                    leftIconColor={theme.settingsHelpIcon}
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-help-24.png') : require('assets/ic-help-fill-24.png')}
                    appearance="default"
                    text="Ask for help"
                    onPress={() => props.router.pushAndReset('Conversation', { 'flexibleId': 'mJMk3EkbzBs7dyPBPp9Bck0pxn' })}
                /> */}
                <ZListItem
                    leftIconColor={theme.settingsRateIcon}
                    leftIcon={Platform.OS === 'android' ? require('assets/ic-rate-24.png') : require('assets/ic-rate-fill-24.png')}
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
            {(NON_PRODUCTION) && (
                <ZListItemGroup header={null} divider={false}>
                    <ZListItem text="Developer Menu" path="Dev" />
                </ZListItemGroup>
            )}
        </SScrollView>
    );
});

class SettingsComponent extends React.Component<PageProps> {

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
Settings.displayName = 'Settings';