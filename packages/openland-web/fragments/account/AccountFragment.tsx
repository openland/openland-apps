import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { ThemeLightBlue } from 'openland-y-utils/themes';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';

import NotificationsIcon from 'openland-icons/notifications_icon.svg';
import InviteFriendsIcon from 'openland-icons/invite_friends_icon.svg';
import EditProfileIcon from 'openland-icons/ic-edit-profile.svg';
import AppearanceIcon from './icons/appearance_icon.svg';
import DownloadIcon from './icons/download_icon.svg';

import { InviteFriendsFragment } from 'openland-web/pages/main/mail/inviteFriends.page';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XText, Mode } from 'openland-web/components/XText';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';

const UserProfileCard = withUserInfo(({ user }) => {
    if (user) {
        return (
            <XView
                cursor="pointer"
                // onClick={() => controller.push(<UserProfile userId={user.id} hideBack />)}
                hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
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
                        cursor="pointer"
                        width={32}
                        height={32}
                        borderRadius={32}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                        onClick={e => {
                            e.stopPropagation();
                            // controller.push(
                            //     <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                            //         <ProfileTab />
                            //     </XScrollView3>,
                            // );
                        }}
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

const OrganizationItem = ({
    id,
    image,
    text,
    isPrimary,
}: {
    id: string;
    image: any;
    text: string;
    isPrimary?: boolean;
}) => {
    return (
        <XView
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            hoverBackgroundColor={ThemeLightBlue.backgroundPrimaryHover}
            cursor="pointer"
            height={56}
            paddingHorizontal={16}
            path={`/${id}`}
        >
            <XView flexDirection="row" alignItems="center">
                <XAvatar2 size={40} src={image} title={text} id={id} />
                <XView marginLeft={16} alignItems="center" flexDirection="row">
                    <XText mode={Mode.BodyRegular}>{text}</XText>
                </XView>
            </XView>
            {isPrimary && 'Primary'}
        </XView>
    );
};

export const Organizations = React.memo(() => {
    const client = useClient();
    const myOrganizations = client.useMyOrganizations();
    return (
        <>
            {myOrganizations.myOrganizations.map((organization, key) => {
                return (
                    <OrganizationItem
                        key={key}
                        id={organization.id}
                        image={organization.photo}
                        text={organization.name}
                        isPrimary={organization.isPrimary}
                    />
                );
            })}
        </>
    );
});

export const AccountFragment = React.memo(() => {
    const showInvites = React.useCallback(() => {
        showModalBox({ fullScreen: true }, (ctx) => (
            <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                <InviteFriendsFragment asModalContent modalContext={ctx} />
            </XScrollView3>
        ));
    }, []);

    const showApps = React.useCallback(() => {
        showModalBox({ fullScreen: true }, () => (
            <NativeAppsModal
                title="Get Openland apps"
                text="Openland is better experience as a mobile and desktop app. Install your app now."
                hideLogo={true}
            />
        ));
    }, []);

    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Account
                </XView>
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0} flexDirection="column">
                <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
                    <UserProfileCard />
                    <UListItem
                        text="Invite Friends"
                        icon={<InviteFriendsIcon />}
                        onClick={showInvites}
                    />
                    <UListHeader text="Settings" />
                    <UListItem
                        text="Notifications"
                        icon={<NotificationsIcon />}
                        path="/settings/notifications"
                    />
                    <UListItem
                        text="Appearance"
                        icon={<AppearanceIcon />}
                        path="/settings/appearance"
                    />
                    <UListItem
                        text="Download Apps"
                        icon={<DownloadIcon />}
                        onClick={showApps}
                    />

                    <UListHeader text="Organizations" />
                    <XView position="relative" flexDirection="column">
                        <React.Suspense fallback={<XLoader loading={true} />}>
                            <Organizations />
                        </React.Suspense>
                    </XView>
                </XScrollView3>
            </XView>
        </XView>
    );
});
