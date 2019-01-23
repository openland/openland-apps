import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExploreCommunities } from '../../../api/withExploreCommunities';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MainLayout } from '../../../components/MainLayout';
import { XVertical } from 'openland-x-layout/XVertical';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader } from 'openland-x/XSubHeader';
import { SortPicker } from './sortPicker';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { DirectoryNavigation } from './components/Navigation';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { SearchBox } from './components/SearchBox';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XCommunityCard } from 'openland-x/cards/XCommunityCard';

interface CommunitiesCardsProps {
    variables: { query?: string; sort?: string };
    tagsCount: (n: number) => void;
}

export const CommunitiesCards = withExploreCommunities(props => {
    if (!(props.data && props.data.items)) {
        return null;
    }

    let noData =
        props.error ||
        props.data === undefined ||
        props.data.items === undefined ||
        props.data.items === null ||
        props.data.items.edges.length === 0;

    (props as any).tagsCount(noData ? 0 : props.data.items.pageInfo.itemsCount);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {props.data.items.edges.map((i, j) => (
                        <XCommunityCard key={'_org_card_' + i.node.id} community={i.node} />
                    ))}
                    <PagePagination
                        pageInfo={props.data.items.pageInfo}
                        currentRoute="/directory/communities"
                    />
                </XContentWrapper>
            )}
            {noData && <EmptySearchBlock text="No community matches your search" />}
        </>
    );
}) as React.ComponentType<CommunitiesCardsProps>;

interface CommunitiesProps {
    featuredFirst: boolean;
    orderBy: string;
    tagsCount: (n: number) => void;
    query: string;
}

class Communities extends React.PureComponent<CommunitiesProps> {
    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    };

    render() {
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];
        if (this.props.featuredFirst) {
            sort.unshift({ ['featured']: { order: 'desc' } });
        }

        return (
            <CommunitiesCards
                tagsCount={this.tagsCount}
                variables={{
                    query: this.props.query,
                    sort: JSON.stringify(sort),
                }}
            />
        );
    }
}

interface RootComponentState {
    query: string;
    sort: { orderBy: string; featured: boolean };
    orgCount: number;
}

class RootComponent extends React.Component<XWithRouter, RootComponentState> {
    input?: any;

    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: { orderBy: 'createdAt', featured: true },
            orgCount: 0,
        };
    }

    onQueryChange = (q: string) => {
        this.resetPage();
        this.setState({ query: q });
    };

    changeSort = (sort: { orderBy: string; featured: boolean }) => {
        this.setState({ sort: sort });
    };

    resetPage = () => {
        this.props.router.replaceQueryParams({ page: undefined });
        this.props.router.replaceQueryParams({ clauses: undefined });
    };

    reset = () => {
        this.resetPage();
        this.setState({ query: '' });
    };

    componentDidMount() {
        if (this.props.router.query.clauses !== undefined) {
            this.routerParser();
        }
    }

    tagsCount = (n: number) => {
        this.setState({ orgCount: n });
    };

    routerParser = () => {
        this.setState({ query: '' });
    };

    render() {
        const { orgCount } = this.state;
        let oid = this.props.router.routeQuery.organizationId;

        return (
            <>
                <XDocumentHead title="Communities Directory" />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <MainLayout>
                            <MainLayout.Menu>
                                <DirectoryNavigation route="Communities" />
                            </MainLayout.Menu>
                            <MainLayout.Content>
                                {!oid && (
                                    <XVertical separator={0}>
                                        <SearchBox
                                            value={this.state.query}
                                            onChange={this.onQueryChange}
                                            placeholder="Search communities"
                                        />
                                        {this.state.query.length <= 0 && (
                                            <XSubHeader
                                                title="All communities"
                                                right={
                                                    <SortPicker
                                                        sort={this.state.sort}
                                                        onPick={this.changeSort}
                                                    />
                                                }
                                            />
                                        )}
                                        {this.state.query.length > 0 && orgCount > 0 && (
                                            <XSubHeader
                                                title="Communities"
                                                counter={orgCount}
                                                right={
                                                    <SortPicker
                                                        sort={this.state.sort}
                                                        onPick={this.changeSort}
                                                    />
                                                }
                                            />
                                        )}
                                        <Communities
                                            featuredFirst={this.state.sort.featured}
                                            query={this.state.query}
                                            orderBy={this.state.sort.orderBy}
                                            tagsCount={this.tagsCount}
                                        />
                                    </XVertical>
                                )}
                                {oid && (
                                    <OrganizationProfile organizationId={oid} onDirectory={true} />
                                )}
                            </MainLayout.Content>
                        </MainLayout>
                    </Scaffold.Content>
                </Scaffold>
            </>
        );
    }
}

export default withApp(
    'Directory',
    'viewer',
    withRouter(props => {
        return <RootComponent router={props.router} />;
    }),
);
