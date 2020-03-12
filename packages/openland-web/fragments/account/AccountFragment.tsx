import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UListItem, SelectableText } from 'openland-web/components/unicorn/UListItem';
import { emoji } from 'openland-y-utils/emoji';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import EmailIcon from 'openland-icons/s/ic-mail-24.svg';
import InviteFriendsIcon from 'openland-icons/s/ic-invite-24.svg';
import EditProfileIcon from 'openland-icons/s/ic-edit-24.svg';
import AppearanceIcon from 'openland-icons/s/ic-appearance-24.svg';
import AppsIcon from 'openland-icons/s/ic-apps-24.svg';
import InfoIcon from 'openland-icons/s/ic-info-24.svg';
import WalletIcon from 'openland-icons/s/ic-wallet-24.svg';
import SubscriptionsIcon from 'openland-icons/s/ic-subscriptions-24.svg';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-api/useClient';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showLogoutConfirmation } from './LogoutFragment';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { showCreatingOrgFragment } from 'openland-web/fragments/create/CreateEntityFragment';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UCounter } from 'openland-unicorn/UCounter';
import { useIsMobile } from '../../hooks/useIsMobile';

const UserProfileCard = withUserInfo(({ user, profile }) => {
    const isMobile = useIsMobile();
    if (user) {
        return (
            <XView
                cursor="pointer"
                path={isMobile ? '/account/me' : '/account'}
                color="var(--foregroundPrimary)"
                hoverBackgroundColor="var(--backgroundPrimaryHover)"
                selectedBackgroundColor="var(--accentMuted)"
                selectedHoverBackgroundColor="var(--accentMutedHover)"
                selectedColor="var(--foregroundContrast)"
                flexDirection="row"
                paddingHorizontal={16}
                paddingVertical={12}
                alignItems="center"
                linkSelectable={true}
                marginBottom={8}
            >
                <UAvatar
                    size="large"
                    photo={user.photo}
                    title={user.name}
                    id={user.id}
                    marginRight={16}
                />
                <XView flexGrow={1}>
                    <XView {...TextStyles.Title3}>{emoji(user.name)}</XView>
                    {profile && (
                        <SelectableText
                            {...TextStyles.Body}
                            color="var(--foregroundSecondary)"
                            selectedColor="var(--foregroundContrast)"
                        >
                            {profile.authEmail}
                        </SelectableText>
                    )}
                </XView>
            </XView>
        );
    } else {
        return null;
    }
});

export const Organizations = React.memo(() => {
    const client = useClient();
    const myOrganizations = client.useMyOrganizations().myOrganizations;

    return (
        <XView paddingBottom={56}>
            {myOrganizations.sort((a, b) => (a.isPrimary ? 1 : 0)).map((organization, key) => {
                const { id, photo, name, isPrimary, shortname } = organization;

                return (
                    <UListItem
                        key={'organization-' + id}
                        avatar={{ photo, id, title: name }}
                        title={name}
                        textRight={isPrimary ? 'Primary' : undefined}
                        path={`/${shortname || id}`}
                    />
                );
            })}
        </XView>
    );
});

const AccountCounter = React.memo(() => {
    const walletState = React.useContext(MessengerContext).wallet.state.useState();
    return <UCounter value={walletState.isLocked ? walletState.failingPaymentsCount : 0} />;
});

export const AccountFragment = React.memo(() => {
    const isVisible = useVisibleTab();
    React.useEffect(
        () => {
            if (isVisible) {
                trackEvent('navigate_account');
            }
        },
        [isVisible],
    );
    const walletState = React.useContext(MessengerContext).wallet.state.useState();

    return (
        <>
            <AccountCounter />
            <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
                <USideHeader title="Account">
                    <UIconButton icon={<LeaveIcon />} size="large" onClick={showLogoutConfirmation} />
                </USideHeader>
                <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0} flexDirection="column">
                    <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                        <UserProfileCard />
                        <UListItem
                            title="Edit profile"
                            icon={<EditProfileIcon />}
                            path="/account/profile"
                        />
                        <UListItem
                            title="Invite friends"
                            icon={<InviteFriendsIcon />}
                            path="/account/invites"
                        />

                        <UListGroup header="Billing">
                            <UListItem
                                title="Wallet"
                                icon={<WalletIcon />}
                                path="/wallet"
                                rightElement={walletState.isLocked ? (
                                    <XView marginRight={8}>
                                        <SelectableText 
                                            minWidth={22} 
                                            height={22} 
                                            borderRadius={11}
                                            alignItems="center"
                                            justifyContent="center"
                                            color="var(--foregroundInverted)" 
                                            backgroundColor="var(--accentNegative)" 
                                            selectedColor="var(--accentMuted)"
                                            selectedBackgroundColor="var(--foregroundInverted)"
                                            {...TextStyles.Label2}
                                        >
                                            {walletState.failingPaymentsCount}
                                        </SelectableText>
                                    </XView> 
                                ) : undefined}
                            />
                            <UListItem
                                title="Subscriptions"
                                icon={<SubscriptionsIcon />}
                                path="/subscriptions"
                            />
                        </UListGroup>

                        <UListGroup header="Settings">

                            <UListItem
                                title="Notifications"
                                icon={<NotificationsIcon />}
                                path="/account/notifications"
                            />
                            <UListItem
                                title="Email preferences"
                                icon={<EmailIcon />}
                                path="/account/email"
                            />
                            <UListItem
                                title="Appearance"
                                icon={<AppearanceIcon />}
                                path="/account/appearance"
                            />
                        </UListGroup>

                        <UListGroup header="Openland">
                            <UListItem
                                title="Install apps"
                                icon={<AppsIcon />}
                                path="/account/download"
                            />
                            <UListItem
                                title="About us"
                                icon={<InfoIcon />}
                                path="/account/about"
                            />
                        </UListGroup>

                        <UListGroup
                            header="Organizations"
                            action={{
                                title: 'New',
                                onClick: () => {
                                    showCreatingOrgFragment({ entityType: 'organization' });
                                    // router.navigate('/new/organization')
                                },
                            }}
                        >
                            <React.Suspense fallback={<XLoader loading={true} />}>
                                <Organizations />
                            </React.Suspense>
                        </UListGroup>
                    </XScrollView3>
                </XView>
            </XView>
        </>
    );
});
