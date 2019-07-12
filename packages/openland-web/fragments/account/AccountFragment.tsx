import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { useController } from 'openland-unicorn/components/UnicornController';
import { Notifications } from './Notifications';
import { AppearanceTab } from './AppearanceTab';
import { NativeAppsModal } from 'openland-web/components/NativeAppsModal';
import AppearanceIcon from 'openland-icons/appearance_icon.svg';
import DownloadAppsIcon from 'openland-icons/download_apps_icon.svg';
import NotificationsIcon from 'openland-icons/notifications_icon.svg';
import InviteFriendsIcon from 'openland-icons/invite_friends_icon.svg';
import { showModalBox } from 'openland-x/showModalBox';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { InviteFriendsFragment } from 'openland-web/pages/main/mail/inviteFriends.page';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XText, Mode } from 'openland-web/components/XText';
import { AppsFragment } from '../apps/AppsFragment';

const UserProfile = withUserInfo(({ user, onClick }: any) => {
    if (user) {
        return (
            <XView
                as="a"
                onClick={onClick}
                path={`/settings/profile`}
                height={70}
                width="100%"
                flexShrink={0}
                flexDirection="column"
                hoverTextDecoration="none"
                color="#000"
            >
                <XView
                    paddingHorizontal={20}
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
        <XView flexDirection="row" justifyContent="space-between">
            <XView flexDirection="row">
                <XAvatar2 size={40} src={image} title={text} id={id} />
                <XView marginLeft={16}>
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
    let controller = useController();
    return (
        <XScrollView3 flexGrow={1} flexShrink={1} flexBasis={0} minHeight={0}>
            <UserProfile />
            <UListItem
                text="Invite Friends"
                icon={<InviteFriendsIcon />}
                onClick={() => {
                    showModalBox({ fullScreen: true }, (ctx) => (
                        <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll>
                            <InviteFriendsFragment asModalContent modalContext={ctx} />
                        </XScrollView3>
                    ));
                }}
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
                icon={<DownloadAppsIcon />}
                onClick={() => {
                    controller.push(<NativeAppsModal />);
                }}
            />
            <UListItem
                text="Apps"
                icon={<DownloadAppsIcon />}
                onClick={() => {
                    controller.push(<AppsFragment />);
                }}
            />
            <UListHeader text="Organizations" />

            <XView position="relative" flexDirection="column">
                <React.Suspense fallback={<XLoader loading={true} />}>
                    <Organizations />
                </React.Suspense>
            </XView>
        </XScrollView3>
    );
});