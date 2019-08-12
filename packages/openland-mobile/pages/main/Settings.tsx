import * as React from 'react';
import { Share } from 'react-native';
import { withApp } from '../../components/withApp';
import { ZListItem } from '../../components/ZListItem';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListHero } from '../../components/ZListHero';
import { PageProps } from '../../components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import Rate from 'react-native-rate';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { useClient } from 'openland-mobile/utils/useClient';
import { NON_PRODUCTION } from '../Init';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { trackEvent } from 'openland-mobile/analytics';
import { showReachInfo } from 'openland-mobile/components/ZReach';

let useOnlineState = () => {
    let [status, setStatus] = React.useState(useClient().client.status);
    React.useEffect(() => {
        return useClient().client.watchStatus((s) => {
            setStatus(s);
        });
    }, []);
    return status;
};

let SettingsContent = ((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const resp = getClient().useAccountSettings({ fetchPolicy: 'cache-and-network' });

    if (resp.me === null) {
        return null;
    }

    const me = resp.me;
    const primary = resp.me.primaryOrganization;
    const secondary = resp.organizations.filter((v) => v.id !== (primary && primary.id));
    secondary.sort((a, b) => a.name.localeCompare(b.name));
    const secondaryFiltered = [];
    for (let i = 0; i < secondary.length && i < 2; i++) {
        secondaryFiltered.push(secondary[i]);
    }
    const status = useOnlineState();

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

    const handleScorePress = React.useCallback(() => {
        showReachInfo(me.audienceSize, theme);
    }, [me.audienceSize, theme]);

    return (
        <SScrollView>
            <ZListHero
                photo={resp.me.photo}
                id={resp.me.id}
                title={resp!!.me!!.name}
                subtitle={status.status === 'connected' ? 'online' : 'connecting...'}
                subtitleColor={status.status === 'connected' ? theme.accentPrimary : undefined}
                score={(me.audienceSize > 0) ? {
                    value: me.audienceSize,
                    onPress: handleScorePress
                } : undefined}
                iconRight={{
                    src: require('assets/ic-edit-24.png'),
                    path: 'SettingsProfile'
                }}
            />
            <ZListItem
                leftIconColor={theme.tintOrange}
                leftIcon={require('assets/ic-invite-fill-24.png')}
                text="Invite friends"
                onPress={handleGlobalInvitePress}
            />
            <ZListGroup header="Settings">
                <ZListItem
                    leftIconColor={theme.tintBlue}
                    leftIcon={require('assets/ic-notifications-fill-24.png')}
                    text="Notifications"
                    path="SettingsNotifications"
                />
                <ZListItem
                    leftIconColor={theme.tintRed}
                    leftIcon={require('assets/ic-appearance-fill-24.png')}
                    text="Appearance"
                    path="SettingsAppearance"
                />
                <ZListItem
                    leftIconColor={theme.tintPurple}
                    leftIcon={require('assets/ic-rate-fill-24.png')}
                    text="Rate the App"
                    onPress={() => {
                        Rate.rate({
                            AppleAppID: '1435537685',
                            GooglePackageName: 'com.openland.app'
                        }, () => { /**/ });
                    }}
                />
            </ZListGroup>
            <ZListGroup header="Support">
                <ZListItem
                    leftIconColor={theme.tintCyan}
                    leftIcon={require('assets/ic-help-fill-24.png')}
                    text="Ask for help"
                    onPress={() => props.router.push('Conversation', { flexibleId: '9KkDvyowQgcYAn0WvYgXFrdqAp' })}
                />
            </ZListGroup>

            <ZListGroup header="Organizations" actionRight={{ title: '+ New', onPress: () => props.router.push('NewOrganization') }}>
                {primary && <ZListItem
                    text={primary.name}
                    leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                    description="Primary"
                    onPress={() => props.router.push('ProfileOrganization', { id: primary!.id })}
                />}
                {secondary.map((v) => (
                    <ZListItem
                        key={v.id}
                        text={v.name}
                        leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                        onPress={() => props.router.push('ProfileOrganization', { id: v.id })}
                    />
                ))}
            </ZListGroup>
            {(NON_PRODUCTION) && (
                <ZListGroup header={null}>
                    <ZListItem text="Developer Menu" path="Dev" />
                </ZListGroup>
            )}
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