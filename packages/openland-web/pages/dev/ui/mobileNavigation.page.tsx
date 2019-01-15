import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { MainLayout } from '../../../components/MainLayout';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { DevDocsScaffold } from './components/DevDocsScaffold';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { SearchBox } from '../../../pages/main/directory/components/SearchBox';
import { SortPicker } from '../../../pages/main/directory/sortPicker';
import { CreateWrapIntoState } from './signin/utils';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XView } from 'react-mental';
import { NewButton } from '../../../pages/main/directory/components/Navigation';
import { Menu, MenuItem } from '../../../components/MainLayout';
import RoomIcon from 'openland-icons/dir-rooms.svg';
import PeopleIcon from 'openland-icons/dir-people.svg';
import OrganizationsIcon from 'openland-icons/dir-organizations.svg';
import CommunityIcon from 'openland-icons/dir-communities.svg';

const WrapIntoState = CreateWrapIntoState({
    root: {},
});

const layoutInitialState = {
    layoutState: {
        hasSearch: true,
        hasSorter: true,
    },
    sorterState: {
        title: 'All organizations',
        sortRule: {
            orderBy: 'orderBy',
            featured: true,
        },
    },
    searchState: {
        query: '',
        placeholder: 'Search organizations',
        sortRule: {
            orderBy: 'orderBy',
            featured: true,
        },
    },

    headerMode: 'menu',

    chatHeaderState: {
        avatar: 'Avatar',
        name: 'Name',
        organization: 'Organization',
        isOnline: true,
        isMute: false,
    },
};

function reducer(state: any, action: any) {
    switch (action.type) {
        case 'reset':
            return layoutInitialState;
        case 'decrement':
            return { count: state.count - 1 };
        default:
            return state;
    }
}

// TODO
// 0) navigation from all places to all (required mocking routing)
// 1) different searches stubs
// 3) animations
//   a. Side bar transition (bare no animation)
//   b. back from chat transition (bare no animation)
// 4) tabs example
// 5) for mobile
// <XView position="absolute" bottom={0}>
//  <XView>App Store</XView>
//  <XView>Google Play</XView>
// </XView>
// in bottom of directory
// https://app.zeplin.io/project/5adeed705408617dbfd15cc4/dashboard

const Layout = () => {
    const [state, dispatch] = React.useReducer(reducer, layoutInitialState);
    const documentParams = {
        title: 'Organizations Directory',
    };
    const haveScaffold = false;

    const onSearchBoxQueryChange = () => {
        //
    };

    const onSorterPick = () => {
        //
    };

    const onBackButtonClick = () => {
        //
    };

    const { sorterState, searchState, layoutState, headerMode, chatHeaderState } = state;

    const layoutBody = (
        <MainLayout>
            <MainLayout.Menu>
                <Menu isMain={true} route="chats">
                    <MenuItem title="Feed" path="/feed" />
                    <MenuItem title="Chats" path="/chats" />
                    <MenuItem title="Directory" path="/directory" />
                </Menu>
                {headerMode === 'chat' && (
                    <XView backgroundColor="white" flexDirection="row">
                        <XView width={10} onClick={onBackButtonClick}>
                            {'<'}
                        </XView>
                        <XView>{chatHeaderState.avatar}</XView>
                        <XView flexDirection="column">
                            <XView flexDirection="row">
                                <XView>{chatHeaderState.name}</XView>
                                <XView>{chatHeaderState.organization}</XView>
                            </XView>
                            <XView>Online: {chatHeaderState.isOnline}</XView>
                        </XView>
                        <XView>Bell: {chatHeaderState.isMute}</XView>
                        <XView>Three dots</XView>
                    </XView>
                )}
                <Menu
                    title="Directory"
                    route="Rooms"
                    leftContent={<div>burger</div>}
                    rightContent={<NewButton />}
                >
                    <MenuItem path="/directory" title="Rooms" icon={<RoomIcon />} />
                    <MenuItem path="/directory/people" title="People" icon={<PeopleIcon />} />
                    <MenuItem
                        path="/directory/organizations"
                        title="Organizations"
                        icon={<OrganizationsIcon />}
                    />
                    <MenuItem
                        path="/directory/communities"
                        title="Communities"
                        icon={<CommunityIcon />}
                    />
                </Menu>
            </MainLayout.Menu>
            <MainLayout.Content>
                <XVertical separator={0}>
                    {layoutState.hasSearch && (
                        <SearchBox
                            value={searchState.query}
                            placeholder={searchState.placeholder}
                            onChange={onSearchBoxQueryChange}
                        />
                    )}

                    {layoutState.hasSorter && (
                        <XSubHeader
                            title={sorterState.title}
                            right={<SortPicker sort={sorterState.sortRule} onPick={onSorterPick} />}
                            paddingBottom={12}
                        />
                    )}
                </XVertical>
            </MainLayout.Content>
        </MainLayout>
    );

    return (
        <>
            {documentParams && <XDocumentHead {...documentParams} />}
            {haveScaffold ? (
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        {layoutBody}
                    </Scaffold.Content>
                </Scaffold>
            ) : (
                <>{layoutBody}</>
            )}
        </>
    );
};

export default withApp('UI Framework - Mobile Navigation', 'viewer', props => {
    return (
        <DevDocsScaffold title="Mobile Navigation">
            <XContent>
                <WrapIntoState>
                    {({ branch, ...branchProps }: any) => {
                        return <Layout />;
                    }}
                </WrapIntoState>
            </XContent>
        </DevDocsScaffold>
    );
});
