import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UListItem, SelectableText } from 'openland-web/components/unicorn/UListItem';

import LeaveIcon from 'openland-icons/s/ic-leave-24.svg';
import NotificationsIcon from 'openland-icons/s/ic-notifications-24.svg';
import EmailIcon from 'openland-icons/s/ic-mail-24.svg';
import InviteFriendsIcon from 'openland-icons/s/ic-invite-24.svg';
import EditProfileIcon from 'openland-icons/s/ic-edit-24.svg';
import AppearanceIcon from 'openland-icons/s/ic-appearance-24.svg';
import DownloadIcon from 'openland-icons/s/ic-download-24.svg';

import { withUserInfo } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { showCreateOrganization } from '../org/showCreateOrganization';
import { showLogoutConfirmation } from './LogoutFragment';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';

const UserProfileCard = withUserInfo(({ user }) => {
    if (user) {
        return (
            <XView
                cursor="pointer"
                path={`/${user.shortname || user.id}`}
                color="var(--foregroundPrimary)"
                hoverBackgroundColor="var(--backgroundPrimaryHover)"
                selectedBackgroundColor="var(--accentPrimary)"
                selectedHoverBackgroundColor="var(--accentPrimaryHover)"
                selectedColor="var(--foregroundInverted)"
                flexDirection="row"
                paddingHorizontal={16}
                paddingVertical={12}
                alignItems="center"
                linkSelectable={true}
                marginBottom={8}
            >
                <UAvatar size="large" photo={user.photo} title={user.name} id={user.id} marginRight={16} />
                <XView flexGrow={1}>
                    <XView {...TextStyles.Title2}>
                        {user.name}
                    </XView>
                    <SelectableText
                        {...TextStyles.Body}
                        color="var(--foregroundSecondary)"
                        selectedColor="var(--foregroundInverted)"
                    >
                        {user.email}
                    </SelectableText>
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
        <>
            {myOrganizations.sort((a, b) => a.isPrimary ? 1 : 0).map((organization, key) => {
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
        </>
    );
});

export const AccountFragment = React.memo(() => (
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
                    path="/settings/profile"
                />
                <UListItem
                    title="Invite friends"
                    icon={<InviteFriendsIcon />}
                    path="/settings/invites"
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
                <UListItem
                    title="Download apps"
                    icon={<DownloadIcon />}
                    path="/settings/download"
                />

                <UListGroup
                    header="Organizations"
                    action={{
                        title: 'New',
                        onClick: () => showCreateOrganization('organization'),
                    }}
                >
                    <React.Suspense fallback={<XLoader loading={true} />}>
                        <Organizations />
                    </React.Suspense>
                </UListGroup>
            </XScrollView3>
        </XView>
    </XView>
));
