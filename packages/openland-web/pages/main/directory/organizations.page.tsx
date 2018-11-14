import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { XVertical } from 'openland-x-layout/XVertical';
import { SortPicker } from './sortPicker';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader } from 'openland-x/XSubHeader';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import {
    RootWrapper,
    Sidebar,
    Container,
    Results,
} from './components/Layout';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { SearchBox } from './components/SearchBox';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XOrganizationCard } from 'openland-x/cards/XOrganizationCard';

interface OrganizationCardsProps {
    onPageChange?: () => void;
    variables: { query?: string, prefix?: string, sort?: string };
    tagsCount: (n: number) => void;
}

const OrganizationCards = withExploreOrganizations((props) => {
    if (!(props.data && props.data.items)) {
        return null;
    }

    let noData = props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0;

    (props as any).tagsCount(noData ? 0 : props.data.items.pageInfo.itemsCount);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {props.data.items.edges.map((i, j) => (
                        <XOrganizationCard key={'_org_card_' + i.node.id} organization={i.node} />))
                    }
                    <PagePagination pageInfo={props.data.items.pageInfo} onPageChange={(props as any).onPageChange} />
                </XContentWrapper>
            )}
            {noData && (
                <EmptySearchBlock text="No organization matches your search" />
            )}
        </>
    );
}) as React.ComponentType<OrganizationCardsProps>;

interface OrganizationsProps {
    featuredFirst: boolean;
    orderBy: string;
    query: string;
    tagsCount: (n: number) => void;
}

class Organizations extends React.PureComponent<OrganizationsProps> {
    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    }

    render() {
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];
        if (this.props.featuredFirst) {
            sort.unshift({ ['featured']: { order: 'desc' } });
        }

        return (
            <OrganizationCards
                tagsCount={this.tagsCount}
                variables={{
                    prefix: this.props.query,
                    sort: JSON.stringify(sort),
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
    organizationListRef = React.createRef<Organizations>();

    constructor(props: any) {
        super(props);

        this.state = {
            query: '',
            sort: {
                orderBy: 'createdAt',
                featured: true
            },
            orgCount: 0,
            pageTitle: 'Organizations Directory'
        };
    }

    handlePageTitle = (title?: string) => {
        this.setState({
            pageTitle: title || 'Organizations Directory'
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

    onQueryChange = (q: string) => {
        this.resetPage();
        this.setState({
            query: q
        });
    }

    tagsCount = (n: number) => {
        return this.setState({
            orgCount: n
        });
    }

    render() {
        const { query, orgCount } = this.state;
        let oid = this.props.router.routeQuery.organizationId;

        return (
            <>
                <XDocumentHead title={this.state.pageTitle} />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <RootWrapper>
                            <Sidebar active="organizations" />
                            <Container>
                                {!oid && (
                                    <XVertical separator={0}>
                                        <SearchBox
                                            value={query}
                                            onChange={this.onQueryChange}
                                            placeholder="Search organizations"
                                        />
                                        <Results>
                                            {(query.length <= 0) && (
                                                <XSubHeader
                                                    title="All organizations"
                                                    right={<SortPicker sort={this.state.sort} onPick={this.changeSort} />}
                                                />
                                            )}
                                            {(query.length > 0) && (orgCount > 0) && (
                                                <XSubHeader
                                                    title="Organizations"
                                                    counter={orgCount}
                                                    right={<SortPicker sort={this.state.sort} onPick={this.changeSort} />}
                                                />
                                            )}
                                            <Organizations
                                                featuredFirst={this.state.sort.featured}
                                                orderBy={this.state.sort.orderBy}
                                                query={query}
                                                tagsCount={this.tagsCount}
                                            />
                                        </Results>
                                    </XVertical>
                                )}
                                {oid && <OrganizationProfile organizationId={oid} handlePageTitle={this.handlePageTitle} onDirectory={true} />}
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