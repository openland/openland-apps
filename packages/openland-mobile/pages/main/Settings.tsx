import * as React from 'react';
import { Share, View, Linking, Platform } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListHero } from '../../components/ZListHero';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { trackEvent } from 'openland-mobile/analytics';
import { ZCounter } from 'openland-mobile/components/ZCounter';
import Toast from 'openland-mobile/components/Toast';
import { logout } from 'openland-mobile/utils/logout';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { ComponentRefContext } from './Home';
import { rateApp } from './modals/RateApp';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { PremiumBadge } from 'openland-mobile/components/PremiumBadge';
import { useText } from 'openland-mobile/text/useText';

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

const SettingsContent = ((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const messenger = getMessenger();
    const { t } = useText();
    const me = messenger.engine.user;

    const wallet = getClient().useMyWallet({ suspense: false });
    const handleSignOut = React.useCallback(() => {
        AlertBlanket.builder()
            .title(t('signOutFromApp', 'Sign out from app'))
            .message(t('signOutDescription', 'Are you sure you want to sign out?'))
            .button(t('cancel', 'Cancel'), 'cancel')
            .action(t('yesSure', 'Yes, I am sure'), 'destructive', async () => {
                await client.mutateOnLogout();
                await logout();
            })
            .show();
    }, []);

    const scrollRef = React.useContext(ComponentRefContext);

    return (
        <SScrollView scrollRef={scrollRef}>
            <ZListHero
                photo={me.photo}
                id={me.id}
                title={me.name}
                subtitle={me.email}
                path="ProfileUser"
                pathParams={{ id: me.id }}
                titleIconRightElement={
                    !!me.systemBadge ? (
                        <View
                            style={{
                                marginLeft: 8,
                                marginTop: Platform.OS === 'ios' ? 2 : 4,
                                alignSelf: 'center',
                            }}
                        >
                            <PremiumBadge />
                        </View>
                    ) : undefined
                }
                verticalMargin="bottom"
            />
            <ZListItem
                leftIconColor={theme.tintPurple}
                leftIcon={require('assets/ic-edit-glyph-24.png')}
                text={t('editProfile', 'Edit profile')}
                path="SettingsProfile"
            />
            <ZListItem
                leftIconColor={theme.tintOrange}
                leftIcon={require('assets/ic-invite-glyph-24.png')}
                text={t('inviteFriends', 'Invite friends')}
                onPress={handleGlobalInvitePress}
            />
            <ZListItem
                leftIconColor={theme.tintCyan}
                leftIcon={require('assets/ic-community-glyph-24.png')}
                text={t('communities', 'Communities')}
                path="SettingsCommunities"
            />

            <ZListGroup header={t('preferences', 'Preferences')}>
                <ZListItem
                    leftIconColor={theme.tintGrey}
                    leftIcon={require('assets/ic-access-glyph-24.png')}
                    text={t('accountPrivacy', 'Account and privacy')}
                    path="SettingsPrivacy"
                />
                <ZListItem
                    leftIconColor={theme.tintBlue}
                    leftIcon={require('assets/ic-notifications-glyph-24.png')}
                    text={t('notifications', 'Notifications')}
                    path="SettingsNotifications"
                />
                <ZListItem
                    leftIconColor={theme.tintGreen}
                    leftIcon={require('assets/ic-mail-glyph-24.png')}
                    text={t('emailPreferences', 'Email preferences')}
                    path="SettingsEmail"
                />
                <ZListItem
                    leftIconColor={theme.tintRed}
                    leftIcon={require('assets/ic-appearance-glyph-24.png')}
                    text={t('appearance', 'Appearance')}
                    path="SettingsAppearance"
                />
            </ZListGroup>

            <ZListGroup header={t('billing', 'Billing')}>
                <ZListItem
                    leftIconColor={theme.tintPurple}
                    leftIcon={require('assets/ic-wallet-glyph-24.png')}
                    text={t('wallet', 'Wallet')}
                    path="Wallet"
                    rightElement={wallet && wallet.myWallet.isLocked ? (
                        <ZCounter theme={theme} value={wallet.myWallet.failingPaymentsCount} size="medium" />
                    ) : undefined}
                />
                <ZListItem
                    leftIconColor={theme.tintPink}
                    leftIcon={require('assets/ic-subscriptions-glyph-24.png')}
                    text={t('subscriptions', 'Subscriptions')}
                    path="Subscriptions"
                />
            </ZListGroup>

            <ZListGroup header="Openland">
                <ZListItem
                    leftIconColor={theme.tintOrange}
                    leftIcon={require('assets/ic-star-glyph-24.png')}
                    text={t('rateApp', 'Rate the app')}
                    onPress={() => rateApp({ preferInApp: false })}
                />
                <ZListItem
                    leftIconColor={theme.tintGreen}
                    leftIcon={require('assets/ic-read-glyph-24.png')}
                    text={t('userGuide', 'User guide')}
                    onPress={() => Linking.openURL('https://notion.so/openland/Openland-User-Guide-2af553fb409a42c296651e708d5561f3')}
                />
                <ZListItem
                    leftIconColor={theme.tintCyan}
                    leftIcon={require('assets/ic-help-glyph-24.png')}
                    text={t('helpAndFeedback', 'Help and feedback')}
                    onPress={() => props.router.push('Conversation', { flexibleId: '9KkDvyowQgcYAn0WvYgXFrdqAp' })}
                />
                <ZListItem
                    leftIconColor={theme.tintBlue}
                    leftIcon={require('assets/ic-info-glyph-24.png')}
                    text={t('aboutUs', 'About us')}
                    path="SettingsAbout"
                />
            </ZListGroup>

            <ZListGroup header={t('other', 'Other')}>
                <ZListItem
                    leftIconColor={theme.tintGrey}
                    leftIcon={require('assets/ic-leave-glyph-24.png')}
                    text={t('signOut', 'Sign out')}
                    onPress={handleSignOut}
                />
            </ZListGroup>

            {NON_PRODUCTION && (
                <ZListGroup header={null}>
                    <ZListItem text="Developer Menu" path="Dev" />
                </ZListGroup>
            )}

            <View style={{ height: 32 }} />
        </SScrollView>
    );
});

const SettingsComponent = React.memo((props: PageProps) => {
    const { t } = useText();
    return (
        <>
            <SHeader title={t('settings', 'Settings')} />
            <SettingsContent {...props} />
        </>
    );
});

export const Settings = withApp(SettingsComponent);
Settings.displayName = 'Settings';
