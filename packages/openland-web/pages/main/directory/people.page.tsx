import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExplorePeople } from '../../../api/withExplorePeople';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold, CreateOrganization, CreateChannel } from '../../../components/Scaffold';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { TextDirectory } from 'openland-text/TextDirectory';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader, XSubHeaderRight } from 'openland-x/XSubHeader';
import { SortPicker } from './sortPicker';
import { ProfileCard } from './components/ProfileCard';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import SearchIcon from './icons/ic-search-small.svg';
import {
    RootWrapper,
    Sidebar,
    SidebarHeader,
    SidebarItemWrapper,
    Container,
    SearchRow,
    Results,
    SearchFormWrapper,
    SearchFormContent,
    SearchInput,
    ResetButton,
    SidebarItemHeadLink
} from './components/Layout';
import { OrganizationProfile } from '../profile/ProfileComponent';
import { UserProfile } from '../profile/UserProfileComponent';

interface CommunitiesCardsProps {
    variables: { query?: string, sort?: string };
    tagsCount: (n: number) => void;
}

const CommunitiesCards = withExplorePeople((props) => {
    if (!(props.data && props.data.items)) {
        return null;
    }
    return (
        <>
            {(props as any).tagsCount(props.data.items.pageInfo.itemsCount)}
            {!props.error && props.data && props.data.items && props.data.items.edges.length > 0 && (
                <>
                    {props.data.items.edges.map((i, j) => (
                        <ProfileCard key={'_org_card_' + i.node.id} item={i.node} onPick={(props as any).onPick} />))
                    }
                    <PagePagination pageInfo={props.data.items.pageInfo} currentRoute="/directory/people" />
                </>
            )}
            {(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0) && (
                <EmptySearchBlock text="No people matches your search" />
            )}
        </>
    );
}) as React.ComponentType<CommunitiesCardsProps>;

interface CommunitiesProps {
    featuredFirst: boolean;
    orderBy: string;
    tagsCount: (n: number) => void;
    searchText: string;
}

class Communities extends React.PureComponent<CommunitiesProps> {
    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    }

    render() {
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];

        return (
            <CommunitiesCards
                tagsCount={this.tagsCount}
                variables={{
                    query: this.props.searchText,
                    sort: JSON.stringify(sort),
                }}
            />
        );
    }
}

interface RootComponentState {
    searchText: string;
    sort: { orderBy: string, featured: boolean };
    orgCount: number;
}

class RootComponent extends React.Component<XWithRouter, RootComponentState> {
    input?: any;

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: '',
            sort: { orderBy: 'createdAt', featured: true },
            orgCount: 0
        };
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        let val = (e.target as any).value as string;
        this.resetPage();
        this.setState({ searchText: val });
    }

    changeSort = (sort: { orderBy: string, featured: boolean }) => {
        this.setState({ sort: sort });
    }

    resetPage = () => {
        this.props.router.replaceQueryParams({ page: undefined });
        this.props.router.replaceQueryParams({ clauses: undefined });
    }

    reset = () => {
        this.resetPage();
        this.setState({ searchText: '' });
    }

    componentDidMount() {
        if (this.props.router.query.clauses !== undefined) {
            this.routerParser();
        }
    }

    tagsCount = (n: number) => {
        this.setState({ orgCount: n });
    }

    routerParser = () => {
        this.setState({ searchText: '' });
    }

    render() {
        const { orgCount } = this.state;
        let uid = this.props.router.routeQuery.userId;

        return (
            <RootWrapper>
                <Sidebar>
                    <SidebarHeader>Directory</SidebarHeader>
                    <XVertical separator={0}>
                        <SidebarItemWrapper>
                            <SidebarItemHeadLink
                                path="/directory"
                                title="Organizations"
                                icon="organizations"
                            />
                        </SidebarItemWrapper>
                        <SidebarItemWrapper>
                            <SidebarItemHeadLink
                                path="/directory/communities"
                                title="Communities"
                                icon="communities"
                            />
                        </SidebarItemWrapper>
                        <SidebarItemWrapper>
                            <SidebarItemHeadLink
                                path="/directory/channels"
                                title="Channels"
                                icon="channels"
                            />
                        </SidebarItemWrapper>
                        <SidebarItemWrapper active={true}>
                            <SidebarItemHeadLink
                                path="/directory/people"
                                title="People"
                                icon="people"
                            />
                        </SidebarItemWrapper>
                    </XVertical>
                </Sidebar>
                <Container>
                    {!uid && (
                        <XVertical separator={0}>
                            <SearchRow>
                                <SearchFormWrapper alignItems="center" justifyContent="space-between" separator={5}>
                                    <SearchFormContent separator={4} flexGrow={1}>
                                        <SearchIcon />
                                        <SearchInput
                                            value={this.state.searchText}
                                            onChange={this.handleSearchChange}
                                            placeholder="Search people"
                                        />
                                    </SearchFormContent>
                                    <XHorizontal separator={2}>
                                        {this.state.searchText.length > 0 && (
                                            <ResetButton onClick={this.reset}>{TextDirectory.buttonReset}</ResetButton>
                                        )}
                                        <XButton
                                            text={TextDirectory.buttonSearch}
                                            style="primary-sky-blue"
                                            size="r-default"
                                            enabled={!!this.state.searchText}
                                        />
                                    </XHorizontal>
                                </SearchFormWrapper>
                            </SearchRow>
                            {(this.state.searchText.length <= 0) && (
                                <XSubHeader title="All people">
                                    <XSubHeaderRight>
                                        <SortPicker sort={this.state.sort} onPick={this.changeSort} withoutFeatured={true} />
                                    </XSubHeaderRight>
                                </XSubHeader>
                            )}
                            {(this.state.searchText.length > 0) && (orgCount > 0) && (
                                <XSubHeader title="People" counter={orgCount}>
                                    <XSubHeaderRight>
                                        <SortPicker sort={this.state.sort} onPick={this.changeSort} withoutFeatured={true} />
                                    </XSubHeaderRight>
                                </XSubHeader>
                            )}
                            {(this.state.searchText.length > 0) && (orgCount <= 0) && (
                                <XSubHeader title="No results" />
                            )}
                            <Results>
                                <Communities
                                    featuredFirst={this.state.sort.featured}
                                    searchText={this.state.searchText}
                                    orderBy={this.state.sort.orderBy}
                                    tagsCount={this.tagsCount}
                                />
                            </Results>
                        </XVertical>
                    )}
                    {uid && <UserProfile userId={uid} onBack={() => this.props.router.push('/directory/people')} />}
                </Container>

                <CreateOrganization />
                <CreateChannel />
            </RootWrapper>
        );
    }
}

export default withApp('Directory', 'viewer', withRouter((props) => {
    return (
        <>
            <XDocumentHead title="Directory" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <RootComponent router={props.router} />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));