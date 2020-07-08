import * as React from 'react';
import { Share, View, Linking } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListHero } from '../../components/ZListHero';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import Rate from 'react-native-rate';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { trackEvent } from 'openland-mobile/analytics';
import { ZCounter } from 'openland-mobile/components/ZCounter';
import Toast from 'openland-mobile/components/Toast';
import { logout } from 'openland-mobile/utils/logout';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { ComponentRefContext } from './Home';

export const handleGlobalInvitePress = async () => {
    const loader = Toast.loader();
    loader.show();

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
        loader.hide();
    }
};

let SettingsContent = ((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const resp = getClient().useAccountSettings({ fetchPolicy: 'cache-and-network' });

    if (resp.me === null) {
        return null;
    }

    const wallet = getClient().useMyWallet({ suspense: false });
    const handleSignOut = React.useCallback(() => {
        AlertBlanket.builder()
            .title('Sign out from app')
            .message('Are you sure you want to sign out?')
            .button('Cancel', 'cancel')
            .action('Yes, I am sure', 'destructive', async () => {
                logout();
            })
            .show();
    }, []);

    const scrollRef = React.useContext(ComponentRefContext);

    return (
        <SScrollView scrollRef={scrollRef}>
            <ZListHero
                photo={resp.me.photo}
                id={resp.me.id}
                title={resp.me.name}
                subtitle={resp.myProfile?.authEmail}
                path="ProfileUser"
                pathParams={{ id: resp.me.id }}
            />
            <ZListItem
                leftIconColor={theme.tintBlue}
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
            <ZListItem
                leftIconColor={theme.tintCyan}
                leftIcon={require('assets/ic-community-glyph-24.png')}
                text="Communities"
                path="SettingsCommunities"
            />

            <ZListGroup header="Preferences">
                <ZListItem
                    leftIconColor={theme.tintGrey}
                    leftIcon={require('assets/ic-access-glyph-24.png')}
                    text="Account and privacy"
                    path="SettingsPrivacy"
                />
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

            <ZListGroup header="Billing">
                <ZListItem
                    leftIconColor={theme.tintPurple}
                    leftIcon={require('assets/ic-wallet-glyph-24.png')}
                    text="Wallet"
                    path="Wallet"
                    rightElement={wallet && wallet.myWallet.isLocked ? (
                        <ZCounter theme={theme} value={wallet.myWallet.failingPaymentsCount} size="medium" />
                    ) : undefined}
                />
                <ZListItem
                    leftIconColor={theme.tintPink}
                    leftIcon={require('assets/ic-subscriptions-glyph-24.png')}
                    text="Subscriptions"
                    path="Subscriptions"
                />
            </ZListGroup>

            <ZListGroup header="Openland">
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
                    leftIconColor={theme.tintGreen}
                    leftIcon={require('assets/ic-read-glyph-24.png')}
                    text="User guide"
                    onPress={() => Linking.openURL('https://notion.so/openland/Openland-User-Guide-2af553fb409a42c296651e708d5561f3')}
                />
                <ZListItem
                    leftIconColor={theme.tintCyan}
                    leftIcon={require('assets/ic-help-glyph-24.png')}
                    text="Help and feedback"
                    onPress={() => props.router.push('Conversation', { flexibleId: '9KkDvyowQgcYAn0WvYgXFrdqAp' })}
                />
                <ZListItem
                    leftIconColor={theme.tintBlue}
                    leftIcon={require('assets/ic-info-glyph-24.png')}
                    text="About us"
                    path="SettingsAbout"
                />
            </ZListGroup>

            <ZListGroup header="Other">
                <ZListItem
                    leftIconColor={theme.tintGrey}
                    leftIcon={require('assets/ic-leave-glyph-24.png')}
                    text="Sign out"
                    onPress={handleSignOut}
                />
            </ZListGroup>

            {NON_PRODUCTION && (
                <ZListGroup header={null}>
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
                <SHeader title="Settings" />
                <SettingsContent {...this.props} />
            </>
        );
    }
}

export const Settings = withApp(SettingsComponent);
Settings.displayName = 'Settings';