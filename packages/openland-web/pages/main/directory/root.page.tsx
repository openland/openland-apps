import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold, CreateOrganization, CreateChannel } from '../../../components/Scaffold';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { XIcon } from 'openland-x/XIcon';
import { XTag } from 'openland-x/XTag';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';
import { AutocompletePopper } from './autocompletePopper';
import { SortPicker } from './sortPicker';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader, XSubHeaderLink, XSubHeaderRight } from 'openland-x/XSubHeader';
import { SearchSelect, SearchSelectProps } from './components/SearchSelect';
import { OrganizationCard } from './components/OrganizationCard';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import SearchIcon from './icons/ic-search-small.svg';
import {
    RootWrapper,
    Sidebar,
    SidebarHeader,
    SidebarItemWrapper,
    SidebarItemBody,
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
import { withTopCategories } from '../../../api/withTopCategories';

export interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

interface OrganizationCardsProps {
    onPick: (q: SearchCondition) => void;
    onPageChange: (q: SearchCondition) => void;
    variables: { query?: string, sort?: string };
    onSearchReset?: React.MouseEventHandler<any>;
    tagsCount: (n: number) => void;
}

const OrganizationCards = withExploreOrganizations((props) => {
    if (!(props.data && props.data.items)) {
        return null;
    }
    return (
        <>
            {(props as any).tagsCount(props.data.items.pageInfo.itemsCount)}
            {!props.error && props.data && props.data.items && props.data.items.edges.length > 0 && (
                <>
                    {props.data.items.edges.map((i, j) => (
                        <OrganizationCard key={'_org_card_' + i.node.id} item={i.node} onPick={(props as any).onPick} />))
                    }
                    <PagePagination pageInfo={props.data.items.pageInfo} onPageChange={(props as any).onPageChange} />
                </>
            )}
            {(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0) && (
                <EmptySearchBlock text="No organization matches your search" />
            )}
        </>
    );
}) as React.ComponentType<OrganizationCardsProps>;

interface OrganizationsProps {
    featuredFirst: boolean;
    orderBy: string;
    conditions: SearchCondition[];
    onPick: (q: SearchCondition) => void;
    onSearchReset?: React.MouseEventHandler<any>;
    tagsCount: (n: number) => void;
}

class Organizations extends React.PureComponent<OrganizationsProps> {
    queryhash?: number;
    scrollRef?: any;
    buildQuery = (clauses: any[], operator: '$and' | '$or'): any | null => {
        if (clauses.length === 0) {
            return undefined;
        } else if (clauses.length === 1) {
            return clauses[0];
        } else {
            let clause = {};
            clause[operator] = clauses;
            return clause;
        }
    }

    groupByType = (conditions: SearchCondition[]) => {
        return conditions.reduce(
            (res, x) => {
                (res[x.type] = res[x.type] || []).push(x);
                return res;
            },
            {}
        );
    }

    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    }

    handleScrollRef = (el: any) => {
        this.scrollRef = el;
    }

    scrolTop = () => {
        if (this.scrollRef) {
            this.scrollRef.scrollTo(0, 0);
        }
    }

    render() {
        let clauses: any[] = [];
        let groups: { [type: string]: SearchCondition[] } = this.groupByType(this.props.conditions);
        let hits = [];
        for (let type of Object.keys(groups)) {
            let group = groups[type];

            let groupedValues: ({ type: string, value: string })[] = [];

            clauses.push(this.buildQuery(
                [...group.map((c: SearchCondition) => {
                    if (Array.isArray(c.value)) {
                        c.value.map((v: string) => {
                            groupedValues.push({
                                type: c.type,
                                value: v
                            });
                        });

                        return undefined;
                    } else {
                        let clause = {};
                        clause[c.type] = c.value;
                        return clause;
                    }
                }).filter((c: any) => c !== undefined),
                ...groupedValues.map((c: { type: string, value: string }) => {
                    let clause = {};
                    clause[c.type] = c.value;
                    return clause;
                })],
                '$or'));

            hits.push({
                category: 'directory_' + type, tags: group.map((c: SearchCondition) => c.value).reduce(
                    (res, x) => {
                        if (Array.isArray(x)) {
                            (res as string[]).push(...x);
                        } else {
                            (res as string[]).push(x);
                        }
                        return res;
                    },
                    []
                )
            });
        }

        let q = this.buildQuery(clauses, '$and');
        let sort = [{ [this.props.orderBy]: { order: 'desc' } }];
        if (this.props.featuredFirst) {
            sort.unshift({ ['featured']: { order: 'desc' } });
        }

        return (
            <Results contentContainerRef={this.handleScrollRef}>
                <OrganizationCards
                    onPick={this.props.onPick}
                    onSearchReset={this.props.onSearchReset}
                    tagsCount={this.tagsCount}
                    variables={{
                        query: q ? JSON.stringify(q) : undefined,
                        sort: JSON.stringify(sort),
                    }}
                    onPageChange={this.scrolTop}
                />
            </Results>

        );
    }
}

class ConditionsRender extends React.Component<{ conditions: SearchCondition[], removeCallback: (conditon: SearchCondition) => void }> {
    render() {
        return (
            <>
                {this.props.conditions.map((condition, i) => (
                    <XTag
                        key={condition.type + '_' + condition.value + i}
                        text={condition.label}
                        size="large"
                        rounded={true}
                        color={condition.type === 'name' ? 'gray' : 'default'}
                        icon="x-close"
                        onIconClick={() => this.props.removeCallback(condition)}
                    />
                ))}
            </>
        );
    }
}

const MultiStateRegions = TextDirectoryData.locationPicker.MultiStateRegions;
const States = TextDirectoryData.locationPicker.States;
const MetropolitanAreas = TextDirectoryData.locationPicker.MetropolitanAreas;
const Cities = TextDirectoryData.locationPicker.Cities;
const LocationOptions = [
    ...Cities.map(v => ({ label: v, value: v })),
    ...MetropolitanAreas.map(v => ({ label: v, value: v })),
    ...States.map(v => ({ label: v, value: v })),
    ...MultiStateRegions.map(v => ({ label: v, value: v })),
];

const CategoryOptions: any[] = [];

TextDirectoryData.categoryPicker.catalog.map(function (v: any) {
    v.options.map(function (o: any) {
        CategoryOptions.push(o);
    });
});

interface RootComponentState {
    searchText: string;
    conditions: SearchCondition[];
    sort: { orderBy: string, featured: boolean };
    orgCount: number;
    showFilters: boolean;
    shownSelect: number;
    pageTitle: string;
}

const CategoryPicker = withTopCategories((props) => (
    <SearchSelect
        title={(props as any).title}
        conditionType={(props as any).conditionType}
        onPick={(props as any).onPick}
        options={[...props.data.topCategories].reverse().map(c => ({ label: c, value: c }))}
        onShow={(props as any).onShow}
        shown={(props as any).shown}
        noResultsText={(props as any).noResultsText}
    />
)) as React.ComponentType<SearchSelectProps>;

class RootComponent extends React.Component<XWithRouter, RootComponentState> {
    input?: any;
    organizationListRef = React.createRef<Organizations>();

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: '',
            conditions: [],
            sort: { orderBy: 'createdAt', featured: true },
            orgCount: 0,
            showFilters: false,
            shownSelect: 1,
            pageTitle: 'Organizations Directory'
        };
    }

    handlePageTitle = (title?: string) => {
        this.setState({
            pageTitle: title || 'Organizations Directory'
        });
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        let val = (e.target as any).value as string;
        this.setState({
            searchText: val
        });
    }

    changeSort = (sort: { orderBy: string, featured: boolean }) => {
        this.setState({ sort: sort });
    }

    addCondition = (condition: SearchCondition, reload?: boolean) => {
        // prevent empty search
        if (condition.value !== undefined && condition.value.length === 0) {
            return;
        }
        let res = [...this.state.conditions];
        let same = res.filter(c => c.type === condition.type && c.value === condition.value)[0];
        if (!same) {
            res.push(condition);
        }
        this.resetPage();
        this.setState({ conditions: res, searchText: '' });

        this.props.router.replaceQueryParams({ clauses: JSON.stringify(res), page: undefined });

        if (this.organizationListRef.current) {
            this.organizationListRef.current.scrolTop();
        }
    }

    replaceConditions = (condition: SearchCondition) => {
        let res: any[] = [];
        res.push(condition);
        this.resetPage();
        this.setState({ conditions: res, searchText: '' });
    }

    removeCondition = (condition: SearchCondition) => {
        let res = [...this.state.conditions.filter(c => (c.type !== condition.type) || (condition.value !== undefined && c.value !== condition.value))];
        this.resetPage();
        this.setState({
            conditions: res
        });
    }

    resetPage = () => {
        this.props.router.replaceQueryParams({ page: undefined });
        this.props.router.replaceQueryParams({ clauses: undefined });
    }

    reset = () => {
        this.resetPage();
        this.setState({ conditions: [] });
    }

    keydownHandler = (e: any) => {
        if (e.target !== this.input) {
            return;
        }
        if (e.code === 'Backspace' && this.state.searchText === '') {
            e.preventDefault();
            this.removeCondition(this.state.conditions[this.state.conditions.length - 1]);
        }
    }

    searchButtonHandler = (e: any) => {
        this.addCondition({ type: 'name', label: this.state.searchText, value: this.state.searchText });
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
        if (this.props.router.query.clauses !== undefined) {
            this.routerParser();
        }
    }

    componentWillReceiveProps(nextProps: XWithRouter) {
        if (nextProps.router.query.clauses) {
            let clauses: SearchCondition[] = JSON.parse(nextProps.router.query.clauses);
            this.setState({
                conditions: clauses,
                searchText: ''
            });
        } else {
            this.setState({
                conditions: [],
                searchText: ''
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    onSearchFocus = (e: any) => {
        this.input = e.target;
        this.setState({
            showFilters: true
        });
    }

    tagsCount = (n: number) => {
        return this.setState({
            orgCount: n
        });
    }

    routerParser = () => {
        let clauses: SearchCondition[] = JSON.parse(this.props.router.query.clauses);

        this.setState({ conditions: clauses, searchText: '' });
    }

    render() {
        const { searchText, conditions, orgCount } = this.state;
        let oid = this.props.router.routeQuery.organizationId;

        return (
            <>
                <XDocumentHead title={this.state.pageTitle} />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <RootWrapper>
                            <Sidebar>
                                <SidebarHeader>Directory</SidebarHeader>
                                <XVertical separator={0}>
                                    <SidebarItemWrapper active={true}>
                                        <SidebarItemHeadLink
                                            path="/directory"
                                            title="Organizations"
                                            icon="organizations"
                                        />
                                        <SidebarItemBody>
                                            <CategoryPicker
                                                title="Category"
                                                conditionType="organizationType"
                                                onPick={this.addCondition}
                                                options={CategoryOptions}
                                                onShow={() => this.setState({ shownSelect: 1 })}
                                                shown={this.state.shownSelect === 1}
                                                noResultsText={'Press Enter to add "{0}" category'}
                                            />
                                            <SearchSelect
                                                title="Location"
                                                conditionType="location"
                                                onPick={this.addCondition}
                                                options={LocationOptions}
                                                onShow={() => this.setState({ shownSelect: 2 })}
                                                shown={this.state.shownSelect === 2}
                                                noResultsText={'Press Enter to add "{0}" location'}
                                            />
                                        </SidebarItemBody>
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
                                    <SidebarItemWrapper>
                                        <SidebarItemHeadLink
                                            path="/directory/people"
                                            title="People"
                                            icon="people"
                                        />
                                    </SidebarItemWrapper>
                                </XVertical>
                            </Sidebar>
                            <Container>
                                {!oid && (
                                    <XVertical separator={0}>
                                        <SearchRow>
                                            <SearchFormWrapper alignItems="center" justifyContent="space-between" separator={5}>
                                                <SearchFormContent separator={4} flexGrow={1}>
                                                    <SearchIcon />
                                                    <ConditionsRender conditions={this.state.conditions} removeCallback={this.removeCondition} />
                                                    <AutocompletePopper
                                                        router={this.props.router}
                                                        target={
                                                            <SearchInput
                                                                onFocus={this.onSearchFocus}
                                                                autoFocus={true}
                                                                value={searchText}
                                                                onChange={this.handleSearchChange}
                                                                placeholder={TextDirectory.searchInputPlaceholder}
                                                            />
                                                        }
                                                        onPick={this.addCondition}
                                                        query={searchText}
                                                        value={searchText}
                                                        onInputChange={this.handleSearchChange}
                                                    />
                                                </SearchFormContent>
                                                <XHorizontal separator={2}>
                                                    {this.state.conditions.length > 0 && (
                                                        <ResetButton onClick={this.reset}>{TextDirectory.buttonReset}</ResetButton>
                                                    )}
                                                    <XButton
                                                        text={TextDirectory.buttonSearch}
                                                        style="primary"
                                                        enabled={!!(this.state.searchText) || this.state.conditions.length > 0}
                                                        onClick={this.searchButtonHandler}
                                                    />
                                                </XHorizontal>
                                            </SearchFormWrapper>
                                        </SearchRow>
                                        {(this.state.conditions.length <= 0) && (
                                            <XSubHeader title="All organizations">
                                                <XSubHeaderLink query={{ field: 'createOrganization', value: 'true' }}>
                                                    <XIcon icon="add" />
                                                    New organization
                                                </XSubHeaderLink>
                                                <XSubHeaderRight>
                                                    <SortPicker sort={this.state.sort} onPick={this.changeSort} />
                                                </XSubHeaderRight>
                                            </XSubHeader>
                                        )}
                                        {(this.state.conditions.length > 0) && (orgCount > 0) && (
                                            <XSubHeader title="Organizations" counter={orgCount}>
                                                <XSubHeaderRight>
                                                    <SortPicker sort={this.state.sort} onPick={this.changeSort} />
                                                </XSubHeaderRight>
                                            </XSubHeader>
                                        )}
                                        {(this.state.conditions.length > 0) && (orgCount <= 0) && (
                                            <XSubHeader title="No results" />
                                        )}
                                        <Organizations
                                            ref={this.organizationListRef}
                                            featuredFirst={this.state.sort.featured}
                                            orderBy={this.state.sort.orderBy}
                                            conditions={conditions}
                                            onPick={this.replaceConditions}
                                            onSearchReset={this.reset}
                                            tagsCount={this.tagsCount}
                                        />
                                    </XVertical>
                                )}
                                {oid && <OrganizationProfile organizationId={oid} onBack={() => this.props.router.push('/directory')} handlePageTitle={this.handlePageTitle} onDirectory={true} />}
                            </Container>

                            <CreateOrganization />
                            <CreateChannel />
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