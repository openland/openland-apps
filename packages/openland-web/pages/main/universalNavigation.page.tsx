import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withApp } from 'openland-web/components/withApp';
import { withRouter } from 'openland-x-routing/withRouter';
import { Menu, MenuItem } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs } from './mail/tabs';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { withRoom } from 'openland-web/api/withRoom';
import { withUserInfo } from 'openland-web/components/UserInfo';
import { MessagesStateContextProps } from 'openland-web/components/messenger/MessagesStateContext';
import { ChatHeaderView } from 'openland-web/fragments/chat/ChatHeaderView';
import { XLoader } from 'openland-x/XLoader';
import { MainLayout } from 'openland-web/components/MainLayout';
import { Room, UserShort } from 'openland-api/Types';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { PopperOptionsButton } from 'openland-web/pages/main/directory/components/PopperOptionsButton';
import { XMenuItem } from 'openland-x/XMenuItem';
import { TextDirectory } from 'openland-text/TextDirectory';
import { UserProfile } from 'openland-web/pages/main/profile/UserProfileComponent';
import { XVertical } from 'openland-x-layout/XVertical';
import { SearchBox } from 'openland-web/pages/main/directory/components/SearchBox';
import { SortPicker } from 'openland-web/pages/main/directory/sortPicker';
import { XSubHeader } from 'openland-x/XSubHeader';
import { PeopleCards } from 'openland-web/pages/main/directory/people.page';

// 1) directory navigation
// 2) tabs navigation, espessally empty/non empty tab
// 3) search

const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

const containerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 344px;
    flex-shrink: 0;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #ececec;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
`;

const DesktopDialogContainer = ({ children }: { children: any }) => (
    <div className={containerStyle}>{children}</div>
);
interface MessengerComponentLoaderProps {
    variables: { id: string };
    state?: MessagesStateContextProps;
    user: UserShort;
    loading: boolean;
    data: Room;
}

const ChatHeaderViewLoader = withRoom(withQueryLoader(
    withUserInfo(({ user, data, loading }: MessengerComponentLoaderProps) => {
        if (!data || !data.room || loading) {
            if (loading) {
                return <XLoader loading={true} />;
            }
            return <div />;
        }

        return (
            <XView
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                height={55}
                paddingLeft={20}
                paddingRight={20}
            >
                <ChatHeaderView room={data.room} me={user} />
            </XView>
        );
    }),
) as any) as React.ComponentType<{
    variables: { id: string };
    state?: MessagesStateContextProps;
}>;

type PageInnerProps = {
    firstFragment: any;
    secondFragment: any;
    tab: string;
    conversationId: string | null | undefined;
    oid: string | null | undefined;
    uid: string | null | undefined;
    cid: string | null | undefined;
};

const MobilePageInner = ({ tab, firstFragment, secondFragment }: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
        >
            {tab === tabs.empty ? (
                <XView width="100%">
                    <Menu
                        title={'Messages'}
                        rightContent={
                            <AddButton
                                style="light"
                                path="/mail/new"
                                text="New"
                                icon={<PlusIcon />}
                                size="small"
                            />
                        }
                    />
                    {firstFragment}
                </XView>
            ) : (
                <XView flexDirection="column" flexGrow={1}>
                    <ChatHeaderViewLoader variables={{ id: 'Jlb4AOJBWEc5MvaQWkjLhlALo0' }} />
                    <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                    {secondFragment}
                </XView>
            )}
        </XView>
    );
};

const DesktopPageInner = ({ firstFragment, secondFragment }: PageInnerProps) => {
    return (
        <XView
            flexDirection="row"
            flexGrow={1}
            flexShrink={0}
            overflow="hidden"
            alignItems="stretch"
            height="100%"
            width="100%"
        >
            <DesktopDialogContainer>
                <Menu
                    title={'Messages'}
                    rightContent={
                        <AddButton
                            style="light"
                            path="/mail/new"
                            text="New"
                            icon={<PlusIcon />}
                            size="small"
                        />
                    }
                />
                {firstFragment}
            </DesktopDialogContainer>
            <XView flexDirection="column" flexGrow={1}>
                <ChatHeaderViewLoader variables={{ id: 'Jlb4AOJBWEc5MvaQWkjLhlALo0' }} />
                <XView height={1} backgroundColor="rgba(220, 222, 228, 0.45)" />
                {secondFragment}
            </XView>
        </XView>
    );
};

const PageInner = AdaptiveHOC({
    DesktopComponent: DesktopPageInner,
    MobileComponent: MobilePageInner,
    fullWidth: true,
});

const DirectoryNavigation = ({ route }: { route: string }) => (
    <Menu
        title={route}
        rightContent={
            <PopperOptionsButton
                icon={<PlusIcon />}
                title={TextDirectory.create.title}
                content={
                    <>
                        <XMenuItem
                            query={{
                                field: 'createOrganization',
                                value: 'true',
                            }}
                            icon="x-dropdown-organization"
                        >
                            {TextDirectory.create.organization}
                        </XMenuItem>
                        <XMenuItem
                            query={{ field: 'createRoom', value: 'true' }}
                            icon="x-dropdown-room"
                        >
                            {TextDirectory.create.room}
                        </XMenuItem>
                        <XMenuItem
                            query={{
                                field: 'createOrganization',
                                value: 'community',
                            }}
                            icon="x-dropdown-community"
                        >
                            {TextDirectory.create.community}
                        </XMenuItem>
                    </>
                }
            />
        }
    >
        <MenuItem path="/directory" title="Rooms" icon={<RoomIcon />} />
        <MenuItem path="/directory/people" title="People" icon={<PeopleIcon />} />
        <MenuItem
            path="/directory/organizations"
            title="Organizations"
            icon={<OrganizationsIcon />}
        />
        <MenuItem path="/directory/communities" title="Communities" icon={<CommunityIcon />} />
        <XWithRole role="feature-non-production">
            <MenuItem path="/directory/explore" title="Explore" icon={<CommunityIcon />} />
        </XWithRole>
    </Menu>
);

const DirectoryContent = () => {
    let uid = false ? 'Jl1k97keDvsLjdwXPRKytboAyq' : null;

    const [orgCount, setOrgCount] = React.useState(0);
    const [query, setQuery] = React.useState('');
    const [sort, setSort] = React.useState({
        orderBy: 'createdAt',
        featured: true,
    });

    const tagsCount = (n: number) => {
        if (orgCount !== n) {
            setOrgCount(n);
        }
    };

    return (
        <>
            {!uid && (
                <XVertical separator={0} height="100%">
                    <SearchBox value={query} onChange={setQuery} placeholder="Search people" />
                    {query.length <= 0 && (
                        <XSubHeader
                            title="All people"
                            right={
                                <SortPicker sort={sort} onPick={setSort} withoutFeatured={true} />
                            }
                        />
                    )}
                    {query.length > 0 && orgCount > 0 && (
                        <XSubHeader
                            title="People"
                            counter={orgCount}
                            right={
                                <SortPicker sort={sort} onPick={setSort} withoutFeatured={true} />
                            }
                        />
                    )}
                    <PeopleCards
                        tagsCount={tagsCount}
                        variables={{
                            query,
                        }}
                    />
                </XVertical>
            )}
            {uid && <UserProfile userId={uid} onDirectory={true} />}
        </>
    );
};

export default withApp(
    'Mail',
    'viewer',
    withRouter(
        withQueryLoader(() => {
            const isChat = false;
            const tab = tabs.chat;

            return (
                <>
                    <XDocumentHead title={'pageTitle'} />
                    <Scaffold>
                        <Scaffold.Content padding={false} bottomOffset={false}>
                            <XView
                                flexDirection="row"
                                flexGrow={1}
                                flexShrink={0}
                                overflow="hidden"
                                alignItems="stretch"
                                height="100%"
                                width="100%"
                            >
                                {isChat ? (
                                    <PageInner
                                        tab={tab}
                                        firstFragment={<XView color="red">firstFragment</XView>}
                                        secondFragment={<XView color="blue">secondFragment</XView>}
                                    />
                                ) : (
                                    <MainLayout>
                                        <MainLayout.Menu>
                                            <DirectoryNavigation route="Rooms" />
                                        </MainLayout.Menu>
                                        <MainLayout.Content>
                                            <MainLayout.Content>
                                                <DirectoryContent />
                                            </MainLayout.Content>
                                        </MainLayout.Content>
                                    </MainLayout>
                                )}
                            </XView>
                        </Scaffold.Content>
                    </Scaffold>
                </>
            );
        }),
    ),
);
