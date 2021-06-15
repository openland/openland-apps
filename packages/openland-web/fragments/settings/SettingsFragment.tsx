import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UListItem, SelectableText } from 'openland-web/components/unicorn/UListItem';
import { emoji } from 'openland-y-utils/emoji';
import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import AccessIcon from 'openland-icons/s/ic-access-24.svg';
import EmailIcon from 'openland-icons/s/ic-mail-24.svg';
import InviteFriendsIcon from 'openland-icons/s/ic-invite-24.svg';
import EditProfileIcon from 'openland-icons/s/ic-edit-24.svg';
import AppearanceIcon from 'openland-icons/s/ic-appearance-24.svg';
import AppsIcon from 'openland-icons/s/ic-apps-24.svg';
import InfoIcon from 'openland-icons/s/ic-info-24.svg';
import WalletIcon from 'openland-icons/s/ic-wallet-24.svg';
import SubscriptionsIcon from 'openland-icons/s/ic-subscriptions-24.svg';
import CommunitiesIcon from 'openland-icons/s/ic-community-2-24.svg';
import BookIcon from 'openland-icons/s/ic-read-24.svg';
import HelpIcon from 'openland-icons/s/ic-help-24.svg';
import { useClient } from 'openland-api/useClient';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showLogoutConfirmation } from './LogoutFragment';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UCounter } from 'openland-unicorn/UCounter';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { css } from 'linaria';
import { XWithRole } from 'openland-x-permissions/XWithRole';

const ellipsisText = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserProfileCard = React.memo(() => {
    const isMobile = useIsMobile();
    const client = useClient();
    const data = client.useAccount().me;
    if (data) {
        return (
            <XView
                cursor="pointer"
                path={isMobile ? '/settings/me' : '/settings'}
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
                    photo={data.photo}
                    id={data.id}
                    marginRight={16}
                />
                <XView flexGrow={1} flexShrink={1}>
                    <XView {...TextStyles.Title3}>
                        <span className={ellipsisText}>{emoji(data.name)}</span>
                    </XView>
                    {data.email && (
                        <SelectableText
                            {...TextStyles.Body}
                            color="var(--foregroundSecondary)"
                            selectedColor="var(--foregroundContrast)"
                        >
                            {data.email}
                        </SelectableText>
                    )}
                </XView>
            </XView>
        );
    } else {
        return null;
    }
});

const AccountCounter = React.memo(() => {
    const walletState = React.useContext(MessengerContext).wallet.state.useState();
    return <UCounter value={walletState.isLocked ? walletState.failingPaymentsCount : 0} />;
});

export const SettingsFragment = React.memo(() => {
    const isVisible = useVisibleTab();

    React.useEffect(() => {
        if (isVisible) {
            trackEvent('navigate_account');
        }
    }, [isVisible]);
    const walletState = React.useContext(MessengerContext).wallet.state.useState();

    return (
        <>
            <AccountCounter />
            <XView width="100%" height="100%" flexDirection="column" alignItems="stretch" backgroundColor="var(--backgroundPrimary)">
                <USideHeader title="Settings" />
                <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0} flexDirection="column">
                    <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                        <UserProfileCard />
                        <UListItem
                            title="Edit profile"
                            icon={<EditProfileIcon />}
                            path="/settings/profile"
                        />
                        <UListItem
                            title="Invite friends"
                            icon={<InviteFriendsIcon />}
                            path="/settings/invites"
                        />
                        <UListItem
                            title="Communities"
                            icon={<CommunitiesIcon />}
                            path="/settings/communities"
                        />
                        <UListGroup header="Preferences">
                            <UListItem
                                title="Account and privacy"
                                icon={<AccessIcon />}
                                path="/settings/privacy"
                            />
                            <UListItem
                                title="Notifications"
                                icon={<NotificationsIcon />}
                                path="/settings/notifications"
                            />
                            <UListItem
                                title="Email preferences"
                                icon={<EmailIcon />}
                                path="/settings/email"
                            />
                            <UListItem
                                title="Appearance"
                                icon={<AppearanceIcon />}
                                path="/settings/appearance"
                            />
                            <XWithRole role="super-admin">
                                <UListItem
                                    title="Cache"
                                    icon={<AppearanceIcon />}
                                    path="/settings/cache"
                                />
                            </XWithRole>
                        </UListGroup>
                        <UListGroup header="Billing">
                            <UListItem
                                title="Wallet"
                                icon={<WalletIcon />}
                                path="/wallet"
                                rightElement={
                                    walletState.isLocked ? (
                                        <XView marginRight={8}>
                                            <SelectableText
                                                minWidth={22}
                                                height={22}
                                                borderRadius={11}
                                                alignItems="center"
                                                justifyContent="center"
                                                color="var(--foregroundContrast)"
                                                backgroundColor="var(--accentNegative)"
                                                selectedColor="var(--accentMuted)"
                                                selectedBackgroundColor="var(--foregroundContrast)"
                                                {...TextStyles.Label3}
                                            >
                                                {walletState.failingPaymentsCount}
                                            </SelectableText>
                                        </XView>
                                    ) : undefined
                                }
                            />
                            <UListItem
                                title="Subscriptions"
                                icon={<SubscriptionsIcon />}
                                path="/subscriptions"
                            />
                        </UListGroup>
                        <UListGroup header="Openland">
                            <UListItem
                                title="Install apps"
                                icon={<AppsIcon />}
                                path="/settings/download"
                            />
                            <UListItem
                                title="User guide"
                                icon={<BookIcon />}
                                href="//notion.so/openland/Openland-User-Guide-2af553fb409a42c296651e708d5561f3"
                            />
                            <UListItem
                                title="Help and feedback"
                                icon={<HelpIcon />}
                                path="/mail/9KkDvyowQgcYAn0WvYgXFrdqAp"
                            />
                            <UListItem
                                title="About us"
                                icon={<InfoIcon />}
                                path="/settings/about"
                            />
                        </UListGroup>
                        <UListGroup header="Other">
                            <UListItem
                                title="Sign out"
                                icon={<LeaveIcon />}
                                onClick={showLogoutConfirmation}
                            />
                        </UListGroup>

                        <XView height={48} />
                    </XScrollView3>
                </XView>
            </XView>
        </>
    );
});
