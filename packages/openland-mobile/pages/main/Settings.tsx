import * as React from 'react';
import { Share, View, Image } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListHero } from '../../components/ZListHero';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import Rate from 'react-native-rate';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useClient } from 'openland-api/useClient';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { trackEvent } from 'openland-mobile/analytics';

let useOnlineState = () => {
    let [status, setStatus] = React.useState(useClient().engine.status);
    let client = useClient();
    React.useEffect(() => {
        return client.engine.watchStatus((s) => {
            setStatus(s);
        });
    }, []);
    return status;
};

export const handleGlobalInvitePress = async () => {
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
};

let SettingsContent = ((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const resp = getClient().useAccountSettings({ fetchPolicy: 'cache-and-network' });

    if (resp.me === null) {
        return null;
    }

    const primary = resp.me.primaryOrganization;
    const secondary = resp.organizations.filter((v) => v.id !== (primary && primary.id)).sort((a, b) => a.name.localeCompare(b.name));
    const status = useOnlineState();
    const wallet = getClient().useMyWallet({ suspense: false });

    return (
        <SScrollView>
            <ZListHero
                photo={resp.me.photo}
                id={resp.me.id}
                title={resp.me.name}
                subtitle={resp.me.email}
                path="ProfileUser"
                pathParams={{ id: resp.me.id }}
            />
            <ZListItem
                leftIconColor={theme.tintPurple}
                leftIcon={require('assets/ic-edit-glyph-24.png')}
                text="Edit profile"
                path="SettingsProfile"
            />
            <ZListItem
                leftIconColor={theme.tintOrange}
                leftIcon={require('assets/ic-invite-glyph-24.png')}
                text="Invite friends"
                onPress={handleGlobalInvitePress}
            />
            <ZListGroup header="Billing">
                <ZListItem
                    leftIconColor={theme.tintPurple}
                    leftIcon={require('assets/ic-wallet-glyph-24.png')}
                    text="Wallet"
                    path="Wallet"
                    rightElement={wallet && wallet.myWallet.isLocked ? (
                        <Image source={require('assets/ic-failure-16.png')} style={{ tintColor: theme.accentNegative }} />
                    ) : undefined}
                />
                <ZListItem
                    leftIconColor={theme.tintPink}
                    leftIcon={require('assets/ic-subscriptions-glyph-24.png')}
                    text="Subscriptions"
                    path="Subscriptions"
                />
            </ZListGroup>

            <ZListGroup header="Settings">
                <ZListItem
                    leftIconColor={theme.tintBlue}
                    leftIcon={require('assets/ic-notifications-glyph-24.png')}
                    text="Notifications"
                    path="SettingsNotifications"
                />
                <ZListItem
                    leftIconColor={theme.tintGreen}
                    leftIcon={require('assets/ic-mail-glyph-24.png')}
                    text="Email preferences"
                    path="SettingsEmail"
                />
                <ZListItem
                    leftIconColor={theme.tintRed}
                    leftIcon={require('assets/ic-appearance-glyph-24.png')}
                    text="Appearance"
                    path="SettingsAppearance"
                />
            </ZListGroup>
            <ZListGroup header="About">
                <ZListItem
                    leftIconColor={theme.tintOrange}
                    leftIcon={require('assets/ic-star-glyph-24.png')}
                    text="Rate the app"
                    onPress={() => {
                        Rate.rate({
                            AppleAppID: '1435537685',
                            GooglePackageName: 'com.openland.app'
                        }, () => { /**/ });
                    }}
                />
                <ZListItem
                    leftIconColor={theme.tintCyan}
                    leftIcon={require('assets/ic-help-glyph-24.png')}
                    text="Ask for help"
                    onPress={() => props.router.push('Conversation', { flexibleId: '9KkDvyowQgcYAn0WvYgXFrdqAp' })}
                />
                <ZListItem
                    leftIconColor={theme.tintBlue}
                    leftIcon={require('assets/ic-info-glyph-24.png')}
                    text="About us"
                    path="SettingsAbout"
                />
            </ZListGroup>

            <ZListGroup header="Organizations" actionRight={{ title: 'New', onPress: () => props.router.push('NewOrganization') }}>
                {primary && <ZListItem
                    text={primary.name}
                    leftAvatar={{ photo: primary.photo, id: primary.id, title: primary.name }}
                    description="Primary"
                    onPress={() => props.router.push('ProfileOrganization', { id: primary!.id })}
                />}
                {secondary.map((v) => (
                    <ZListItem
                        key={v.id}
                        text={v.name}
                        leftAvatar={{ photo: v.photo, id: v.id, title: v.name }}
                        onPress={() => props.router.push('ProfileOrganization', { id: v.id })}
                    />
                ))}
            </ZListGroup>
            {NON_PRODUCTION && (
                <ZListGroup header={null}>
                    <ZListItem text="Feed" path="Feed" />
                    <ZListItem text="Developer Menu" path="Dev" />
                </ZListGroup>
            )}

            <View height={32} />
        </SScrollView>
    );
});

class SettingsComponent extends React.Component<PageProps> {

    render() {
        return (
            <>
                <SHeader title="Account" />
                <SettingsContent {...this.props} />
            </>
        );
    }
}

export const Settings = withApp(SettingsComponent);
Settings.displayName = 'Settings';