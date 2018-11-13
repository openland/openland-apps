import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExplorePeople } from '../../../api/withExplorePeople';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader } from 'openland-x/XSubHeader';
import { SortPicker } from './sortPicker';
import { ProfileCard } from './components/ProfileCard';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import {
    RootWrapper,
    Sidebar,
    Container,
    Results
} from './components/Layout';
import { UserProfile } from '../profile/UserProfileComponent';
import { SearchBox } from './components/SearchBox';
import { XContentWrapper } from 'openland-x/XContentWrapper';

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
                <XContentWrapper withPaddingBottom={true}>
                    {props.data.items.edges.map((i, j) => (
                        <ProfileCard key={'_org_card_' + i.node.id} item={i.node} onPick={(props as any).onPick} />))
                    }
                    <PagePagination pageInfo={props.data.items.pageInfo} currentRoute="/directory/people" />
                </XContentWrapper>
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
                    query: this.props.searchText
                }}
            />
        );
    }
}

interface RootComponentState {
    query: string;
    sort: {
        orderBy: string,
        featured: boolean
    };
    orgCount: number;
    pageTitle: string;
}

class RootComponent extends React.Component<XWithRouter, RootComponentState> {
    input?: any;

    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: {
                orderBy: 'createdAt',
                featured: true
            },
            orgCount: 0,
            pageTitle: 'People Directory'
        };
    }

    handlePageTitle = (title?: string) => {
        this.setState({
            pageTitle: title || 'People Directory'
        });
    }

    onQueryChange = (q: string) => {
        this.resetPage();
        this.setState({
            query: q
        });
    }

    changeSort = (sort: { orderBy: string, featured: boolean }) => {
        this.setState({
            sort: sort
        });
    }

    resetPage = () => {
        this.props.router.replaceQueryParams({ page: undefined });
    }

    tagsCount = (n: number) => {
        this.setState({ orgCount: n });
    }

    routerParser = () => {
        this.setState({
            query: ''
        });
    }

    render() {
        const { orgCount } = this.state;
        let uid = this.props.router.routeQuery.userId;

        return (
            <>
                <XDocumentHead title={this.state.pageTitle} />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <RootWrapper>
                            <Sidebar active="people" />
                            <Container>
                                {!uid && (
                                    <XVertical separator={0}>
                                        <SearchBox
                                            value={this.state.query}
                                            onChange={this.onQueryChange}
                                            placeholder="Search people"
                                        />
                                        <Results>
                                            {(this.state.query.length <= 0) && (
                                                <XSubHeader
                                                    title="All people"
                                                    right={<SortPicker sort={this.state.sort} onPick={this.changeSort} withoutFeatured={true} />}
                                                />
                                            )}
                                            {(this.state.query.length > 0) && (orgCount > 0) && (
                                                <XSubHeader
                                                    title="People"
                                                    counter={orgCount}
                                                    right={<SortPicker sort={this.state.sort} onPick={this.changeSort} withoutFeatured={true} />}
                                                />
                                            )}
                                            <Communities
                                                featuredFirst={this.state.sort.featured}
                                                searchText={this.state.query}
                                                orderBy={this.state.sort.orderBy}
                                                tagsCount={this.tagsCount}
                                            />
                                        </Results>
                                    </XVertical>
                                )}
                                {uid && <UserProfile userId={uid} handlePageTitle={this.handlePageTitle} onDirectory={true} />}
                            </Container>
                        </RootWrapper>
                    </Scaffold.Content>
                </Scaffold>
            </>
        );
    }
}

export default withApp('Directory', 'viewer', withRouter((props) => {
    return <RootComponent router={props.router} />;
}));