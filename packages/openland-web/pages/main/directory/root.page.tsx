import '../../init';
import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XButton } from 'openland-x/XButton';
import { XIcon } from 'openland-x/XIcon';
import { XTag } from 'openland-x/XTag';
import { TextDirectory, TextDirectoryData } from 'openland-text/TextDirectory';
import { AutocompletePopper } from './autocompletePopper';
import { SortPicker } from './sortPicker';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { XSubHeader, XSubHeaderLink, XSubHeaderRight } from 'openland-x/XSubHeader';
import { SearchSelect } from './components/SearchSelect';
import { OrganizationCard } from './components/OrganizationCard';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { 
    RootWrapper,
    Sidebar,
    SidebarHeader,
    SidebarList,
    SidebarItem,
    SidebarItemBody,
    Container,
    SearchRow,
    Results,
    ContentView,
    SearchFormWrapper,
    SearchFormContent,
    SearchFormIcon,
    SearchInput,
    ResetButton,
    OrganizationsSidebarItemHead,
    CommunitiesSidebarItemHead
} from './components/Layout';

export interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

interface OrganizationCardsProps {
    onPick: (q: SearchCondition) => void;
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
                    <PagePagination pageInfo={props.data.items.pageInfo} />
                </>
            )}
            {(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0) && (
                <EmptySearchBlock />
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
            <OrganizationCards
                onPick={this.props.onPick}
                onSearchReset={this.props.onSearchReset}
                tagsCount={this.tagsCount}
                variables={{
                    query: q ? JSON.stringify(q) : undefined,
                    sort: JSON.stringify(sort),
                }}
            />
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
                        icon="close"
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
}

class RootComponent extends React.Component<XWithRouter, RootComponentState> {
    input?: any;

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: '',
            conditions: [],
            sort: { orderBy: 'createdAt', featured: true },
            orgCount: 0,
            showFilters: false
        };
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        let val = (e.target as any).value as string;
        this.resetPage();
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

        this.props.router.replaceQueryParams({ clauses: JSON.stringify(res) });
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
        if (e.code === 'Enter') {
            e.preventDefault();

            this.addCondition({ type: 'name', label: this.state.searchText, value: this.state.searchText });
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

        return (
            <RootWrapper>
                <Sidebar>
                    <SidebarHeader>Directory</SidebarHeader>
                    <SidebarList>
                        <SidebarItem active={true}>
                            <OrganizationsSidebarItemHead />
                            <SidebarItemBody>
                                <SearchSelect
                                    title="Category"
                                    conditionType="organizationType"
                                    onPick={this.addCondition}
                                    options={CategoryOptions}
                                    initialShown={true}
                                />
                                <SearchSelect
                                    title="Locations"
                                    conditionType="location"
                                    onPick={this.addCondition}
                                    options={LocationOptions}
                                />
                            </SidebarItemBody>
                        </SidebarItem>
                        <SidebarItem>
                            <CommunitiesSidebarItemHead />
                        </SidebarItem>
                    </SidebarList>
                </Sidebar>
                <Container>
                    <ContentView>
                        <SearchRow>
                            <SearchFormWrapper alignItems="center" justifyContent="space-between" separator={5}>
                                <SearchFormContent separator={4} flexGrow={1}>
                                    <SearchFormIcon icon="search" />
                                    <ConditionsRender conditions={this.state.conditions} removeCallback={this.removeCondition} />
                                    <AutocompletePopper
                                        target={
                                            <SearchInput
                                                onFocus={this.onSearchFocus}
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
                                    {this.state.conditions.length > 0 &&
                                        <ResetButton text={TextDirectory.buttonReset} style="flat" onClick={this.reset} />}
                                    <XButton
                                        text={TextDirectory.buttonSearch}
                                        style="primary-sky-blue"
                                        size="r-default"
                                        enabled={!!(this.state.searchText) || this.state.conditions.length > 0}
                                        onClick={this.searchButtonHandler}
                                    />
                                </XHorizontal>
                            </SearchFormWrapper>
                        </SearchRow>
                        {(this.state.conditions.length <= 0) && (
                            <XSubHeader title="All organizations">
                                <XSubHeaderLink>
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
                        <Results>
                            <Organizations
                                featuredFirst={this.state.sort.featured}
                                orderBy={this.state.sort.orderBy}
                                conditions={conditions}
                                onPick={this.replaceConditions}
                                onSearchReset={this.reset}
                                tagsCount={this.tagsCount}
                            />
                        </Results>
                    </ContentView>
                </Container>
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