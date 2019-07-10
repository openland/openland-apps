import * as React from 'react';
import { XView } from 'react-mental';
import { Navigation } from 'openland-web/components/Navigation';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { NewOptionsButton } from 'openland-web/components/NewOptionsButton';
import { withApp } from 'openland-web/components/withApp';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XText, Mode } from 'openland-web/components/XText';
import { withUserInfo } from 'openland-web/components/UserInfo';
import AppearanceIcon from 'openland-icons/appearance_icon.svg';
import DownloadAppsIcon from 'openland-icons/download_apps_icon.svg';
import NotificationsIcon from 'openland-icons/notifications_icon.svg';
import InviteFriendsIcon from 'openland-icons/invite_friends_icon.svg';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { useClient } from 'openland-web/utils/useClient';
import { tabs } from './tabs';

const Section = ({ title, children }: { title: string; children: any }) => {
    return (
        <XView paddingHorizontal={16} flexGrow={1}>
            <XView color={'#171B1F'} marginBottom={20}>
                <XText mode={Mode.TitleTwo}>{title}</XText>
            </XView>
            {children}
        </XView>
    );
};

const SettingsItem = ({ text, icon }: { text: string; icon: any }) => {
    return (
        <XView flexDirection="row">
            <XView marginRight={19}>{icon}</XView>
            <XText mode={Mode.BodyRegular}>{text}</XText>
        </XView>
    );
};

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

export default withApp('Apps', 'viewer', () => {
    let isMobile = React.useContext(IsMobileContext);
    const client = useClient();
    const myOrganizations = client.useMyOrganizations();

    const tab = tabs.account;

    return (
        <Navigation
            fullHeight
            title={isMobile ? 'title' : 'Account'}
            swapFragmentsOnMobile
            menuRightContent={<NewOptionsButton />}
            menuChildrenContent={
                <XView flexGrow={1}>
                    <UserProfile />
                    <XView marginBottom={44} paddingHorizontal={16} flexDirection="row">
                        <InviteFriendsIcon />
                        <XView marginLeft={18}>Invite Friends</XView>
                    </XView>
                    <XView marginBottom={43}>
                        <Section title="Settings">
                            <XView marginBottom={29}>
                                <SettingsItem icon={<NotificationsIcon />} text="Notifications" />
                            </XView>
                            <XView marginBottom={29}>
                                <SettingsItem icon={<AppearanceIcon />} text="Appearence" />
                            </XView>
                            <SettingsItem icon={<DownloadAppsIcon />} text="Download Apps" />
                        </Section>
                    </XView>

                    <Section title="Organizations">
                        <XScrollView3 useDefaultScroll flexGrow={1} flexShrink={1} flexBasis={0}>
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
                        </XScrollView3>
                    </Section>
                </XView>
            }
            secondFragment={
                <XView
                    flexGrow={1}
                    height={isMobile ? undefined : '100%'}
                    position="relative"
                    flexShrink={1}
                >
                    <XScrollView3 flexGrow={1} flexShrink={1}>
                        <XView flexGrow={1} flexShrink={1}>
                            <React.Suspense
                                fallback={
                                    <XView flexGrow={1} flexShrink={0}>
                                        <XLoader loading={true} />
                                    </XView>
                                }
                            >
                                {tabs.profile === tab && <div>profile</div>}
                                {tabs.appearance === tab && <div>appearance</div>}
                                {tabs.downloadApps === tab && <div>downloadApps</div>}
                                {tabs.notifications === tab && <div>notifications</div>}
                            </React.Suspense>
                        </XView>
                    </XScrollView3>
                </XView>
            }
        />
    );
});
