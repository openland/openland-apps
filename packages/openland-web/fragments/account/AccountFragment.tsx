import * as React from 'react';
import { XView } from 'react-mental';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { ThemeDefault } from 'openland-y-utils/themes';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';

import LeaveIcon from 'openland-icons/ic-leave.svg';
import NotificationsIcon from 'openland-icons/notifications_icon.svg';
import InviteFriendsIcon from 'openland-icons/invite_friends_icon.svg';
import EditProfileIcon from 'openland-icons/ic-edit-profile.svg';
import AppearanceIcon from './icons/appearance_icon.svg';
import DownloadIcon from './icons/download_icon.svg';

import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';

const UserProfileCard = withUserInfo(({ user }) => {
    if (user) {
        return (
            <XView
                cursor="pointer"
                path="/settings/profile"
                hoverBackgroundColor={ThemeDefault.backgroundPrimaryHover}
                height={70}
                width="100%"
                flexShrink={0}
                flexDirection="column"
                hoverTextDecoration="none"
                color="#000"
            >
                <XView
                    paddingHorizontal={16}
                    paddingTop={16}
                    paddingBottom={13}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height={69}
                >
                    <XView flexDirection="row" height="100%">
                        <XAvatar2 size={40} src={user.photo} title={user.name} id={user.id} />
                        <XView marginLeft={16}>
                            <XView
                                fontSize={15}
                                fontWeight="600"
                                lineHeight={1.33}
                                color="#000"
                                marginBottom={1}
                            >
                                {user.name}
                            </XView>
                            <XView
                                fontSize={14}
                                lineHeight={1.43}
                                color="rgba(0, 0, 0, 0.5)"
                                marginBottom={1}
                            >
                                {user.email}
                            </XView>
                        </XView>
                    </XView>
                    <XView
                        width={24}
                        height={24}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <EditProfileIcon />
                    </XView>
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
            {myOrganizations.map((organization, key) => {
                const { id, photo, name, isPrimary, shortname } = organization;

                return (
                    <UListItem
                        key={'organization-' + id}
                        avatar={{ photo, id, title: name }}
                        title={name}
                        textRight={isPrimary ? 'Primary' : undefined}
                        path={shortname ? '/' + shortname : '/' + id}
                    />
                );
            })}
        </>
    );
});

export const AccountFragment = React.memo(() => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingLeft={16}
                paddingRight={4}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeDefault.foregroundPrimary}
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0} >
                    Account
                </XView>
                <UIconButton icon={<LeaveIcon />} path="/auth/logout" size="large" />
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0} flexDirection="column">
                <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                    <UserProfileCard />
                    <UListItem
                        title="Invite Friends"
                        icon={<InviteFriendsIcon />}
                        path="/settings/invites"
                    />
                    <UListHeader text="Settings" />
                    <UListItem
                        title="Notifications"
                        icon={<NotificationsIcon />}
                        path="/settings/notifications"
                    />
                    <UListItem
                        title="Appearance"
                        icon={<AppearanceIcon />}
                        path="/settings/appearance"
                    />
                    <UListItem
                        title="Download Apps"
                        icon={<DownloadIcon />}
                        path="/settings/download"
                    />

                    <UListGroup header="Organizations">
                        <React.Suspense fallback={<XLoader loading={true} />}>
                            <Organizations />
                        </React.Suspense>
                    </UListGroup>
                </XScrollView3>
            </XView>
        </XView>
    );
});
