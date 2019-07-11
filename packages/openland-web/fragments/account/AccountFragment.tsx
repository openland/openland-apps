import * as React from 'react';
import { XView } from 'react-mental';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { useController } from 'openland-web/pages/unicorn/components/UnicornController';
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

export const AccountFragment = React.memo(() => {
    let controller = useController();
    return (
        <XView flexDirection="column">
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
            <UListItem
                text="Notifications"
                icon={<NotificationsIcon />}
                onClick={() => {
                    controller.push(<Notifications />);
                }}
            />
            <UListItem
                text="Appearance"
                icon={<AppearanceIcon />}
                onClick={() => {
                    controller.push(<AppearanceTab />);
                }}
            />
            <UListItem
                text="Download Apps"
                icon={<DownloadAppsIcon />}
                onClick={() => {
                    controller.push(<NativeAppsModal />);
                }}
            />
        </XView>
    );
});