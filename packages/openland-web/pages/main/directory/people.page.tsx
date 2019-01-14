import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExplorePeople } from '../../../api/withExplorePeople';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { MainLayout } from '../../../components/MainLayout';
import { XVertical } from 'openland-x-layout/XVertical';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader } from 'openland-x/XSubHeader';
import { SortPicker } from './sortPicker';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { Navigation } from './components/Navigation';
import { UserProfile } from '../profile/UserProfileComponent';
import { SearchBox } from './components/SearchBox';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XUserCard } from 'openland-x/cards/XUserCard';

interface CommunitiesCardsProps {
    variables: { query?: string; sort?: string };
    tagsCount: (n: number) => void;
}

const CommunitiesCards = withExplorePeople(props => {
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
                        <XUserCard key={'_org_card_' + i.node.id} user={i.node} />
                    ))}
                    <PagePagination
                        pageInfo={props.data.items.pageInfo}
                        currentRoute="/directory/people"
                    />
                </XContentWrapper>
            )}
            {noData && <EmptySearchBlock text="No people matches your search" />}
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
    };

    render() {
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];

        return (
            <CommunitiesCards
                tagsCount={this.tagsCount}
                variables={{
                    query: this.props.searchText,
                }}
            />
        );
    }
}

interface RootComponentState {
    query: string;
    sort: {
        orderBy: string;
        featured: boolean;
    };
    orgCount: number;
}

class RootComponent extends React.Component<XWithRouter, RootComponentState> {
    input?: any;

    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: {
                orderBy: 'createdAt',
                featured: true,
            },
            orgCount: 0,
        };
    }

    onQueryChange = (q: string) => {
        this.resetPage();
        this.setState({
            query: q,
        });
    };

    changeSort = (sort: { orderBy: string; featured: boolean }) => {
        this.setState({
            sort: sort,
        });
    };

    resetPage = () => {
        this.props.router.replaceQueryParams({ page: undefined });
    };

    tagsCount = (n: number) => {
        this.setState({ orgCount: n });
    };

    routerParser = () => {
        this.setState({
            query: '',
        });
    };

    render() {
        const { orgCount } = this.state;
        let uid = this.props.router.routeQuery.userId;
        console.log(this.props.router);

        return (
            <>
                <XDocumentHead title="People Directory" />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <MainLayout>
                            <MainLayout.Menu>
                                <Navigation route="People" />
                            </MainLayout.Menu>
                            <MainLayout.Content>
                                {!uid && (
                                    <XVertical separator={0}>
                                        <SearchBox
                                            value={this.state.query}
                                            onChange={this.onQueryChange}
                                            placeholder="Search people"
                                        />
                                        {this.state.query.length <= 0 && (
                                            <XSubHeader
                                                title="All people"
                                                right={
                                                    <SortPicker
                                                        sort={this.state.sort}
                                                        onPick={this.changeSort}
                                                        withoutFeatured={true}
                                                    />
                                                }
                                            />
                                        )}
                                        {this.state.query.length > 0 &&
                                            orgCount > 0 && (
                                                <XSubHeader
                                                    title="People"
                                                    counter={orgCount}
                                                    right={
                                                        <SortPicker
                                                            sort={this.state.sort}
                                                            onPick={this.changeSort}
                                                            withoutFeatured={true}
                                                        />
                                                    }
                                                />
                                            )}
                                        <Communities
                                            featuredFirst={this.state.sort.featured}
                                            searchText={this.state.query}
                                            orderBy={this.state.sort.orderBy}
                                            tagsCount={this.tagsCount}
                                        />
                                    </XVertical>
                                )}
                                {uid && <UserProfile userId={uid} onDirectory={true} />}
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
