import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold, CreateOrganization } from '../../../components/Scaffold';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { LocationPicker } from './locationPicker';
import { CategoryPicker } from './categoryPicker';
import { XTag } from 'openland-x/XTag';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { InterestPicker } from './interestPicker';
import { withOrganizationFollow } from '../../../api/withOrganizationFollow';
import { XMutation } from 'openland-x/XMutation';
import { TextDirectory } from 'openland-text/TextDirectory';
import { withOrganizationPublishedAlter } from '../../../api/withOrganizationPublishedAlter';
import { AutocompletePopper } from './autocompletePopper';
import { SortPicker } from './sortPicker';
import { Query } from '../../../../../node_modules/react-apollo';
import { HitsPopularQuery } from 'openland-api/HitsPopularQuery';
import { withHitsAdd } from '../../../api/withHItsAdd';
import { doSimpleHash } from 'openland-y-utils/hash';
import { makeActionable } from 'openland-x/Actionable';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';

const Root = Glamorous(XVertical)({
    minHeight: '100%',
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const ContentWrapper = Glamorous.div({
    padding: '0 40px'
});

const MainContent = Glamorous.div({
    maxWidth: 1280,
    margin: 'auto'
});

const HeaderWrapper = Glamorous.div({
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40
});

const HeaderContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 1280,
    margin: 'auto'
});

const HeaderTitle = Glamorous.div({
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 0.4,
    color: '#1f3449',
    cursor: 'pointer'
});

const HeaderCounter = Glamorous(XHorizontal)({
    marginTop: 4
});

const OrganizationCounter = Glamorous.div({
    fontSize: 18,
    letterSpacing: -0.2,
    color: '#99a2b0',
});

const Header = (props: { orgCount: number, tagsCount: number, reset: () => void }) => (
    <HeaderWrapper>
        <HeaderContent>
            <XHorizontal alignItems="center" separator={6}>
                <HeaderTitle onClick={props.reset}>{TextDirectory.headerTitle}</HeaderTitle>
                <HeaderCounter separator={4}>
                    <img src="/static/X/ic-arrow-rignt.svg" />
                    {props.tagsCount !== 0
                        ?
                        <OrganizationCounter>{TextDirectory.counterOrganizations(props.orgCount)}</OrganizationCounter>
                        : <OrganizationCounter>All organizations</OrganizationCounter>
                    }
                </HeaderCounter>
            </XHorizontal>
            <XButton style="ghost" query={{ field: 'createOrganization', value: 'true' }} text={TextDirectory.headerButtonAddOrganization} />
            <CreateOrganization />
        </HeaderContent>
    </HeaderWrapper>
);

const TopTagsWrapper = Glamorous(XVertical)({
    borderRadius: 5,
    backgroundColor: '#ffffff',
    border: 'solid 1px rgba(220, 222, 228, 0.4)',
    padding: 24,
});

const TopTagsScrollable = Glamorous(XVertical)({
    maxHeight: 'calc(100vh - 20px)',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch',
    position: 'sticky',
    top: 10,
});

const TopTagsTitle = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: 0.6,
    color: '#334562'
});

const TopSearchCategory = Glamorous.div({
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: -0.2,
    color: '#334562'
});

const TopSearchTags = Glamorous(XHorizontal)({
    flexWrap: 'wrap',
    '& > div': {
        marginRight: 8
    }
});

const CategoriesTitleMap = {
    directory_location: 'Location',
    directory_organizationType: 'Organization category',
    directory_interest: 'Channels',
};

const CategoriesTypeMap = {
    directory_location: 'location',
    directory_organizationType: 'organizationType',
    directory_interest: 'interest',
};

class TopTags extends React.Component<{ onPick: (q: SearchCondition) => void }> {

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
    }

    onClick = (category: { type: any, value: string, label: string }) => {
        this.onPick({ type: category.type, value: category.value, label: category.label });
    }

    render() {
        return (
            <XVertical flexGrow={1} flexShrink={0} width={320} maxWidth={320}>
                <TopTagsScrollable>
                    <TopTagsWrapper separator={12} flexShrink={0}>
                        <TopTagsTitle>Top searches</TopTagsTitle>
                        <Query query={HitsPopularQuery.document} variables={{ categories: ['directory_interest', 'directory_organizationType', 'directory_location'] }} >
                            {data =>
                                ((data.data && data.data.hitsPopular) || []).map((val: { category: string, tags: string[] }, i: number) => (
                                    <XVertical separator={9} key={i + '_container_' + val.category}>
                                        <TopSearchCategory key={i + '_title_' + val.category}>
                                            {CategoriesTitleMap[val.category] || val.category}
                                        </TopSearchCategory>
                                        <TopSearchTags separator={0} key={i + '_tags_' + val.category}>
                                            {val.tags.filter((tag, iter) => iter < 5).map((tag, iter) => (
                                                <XTag
                                                    key={'top_search_' + iter + val}
                                                    color="primary"
                                                    text={tag}
                                                    size="large"
                                                    onClick={() => this.onClick({
                                                        type: CategoriesTypeMap[val.category],
                                                        value: tag,
                                                        label: tag
                                                    })}
                                                />
                                            ))}
                                        </TopSearchTags>
                                    </XVertical>
                                ))}
                        </Query>
                    </TopTagsWrapper>
                </TopTagsScrollable>
            </XVertical>
        );
    }
}

const XCardStyled = Glamorous(XCard)({
    borderRadius: 5,
    overflow: 'hidden'
});

const OrganizationCardWrapper = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '20px 18px 20px 24px',
    '&:last-child': {
        borderBottom: 'none'
    }
});

const OrganizationContentWrapper = Glamorous(XHorizontal)({
    flexGrow: 1,
    marginLeft: 8
});

const OrganizationInfoWrapper = Glamorous.div({
    flexGrow: 1
});

const OrganizationAvatar = Glamorous(XAvatar)({
    cursor: 'pointer'
});

const OrganizationTitle = Glamorous(XLink)({
    height: 22,
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    color: '#1f3449',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%'
});

const OrganizationLocation = Glamorous.div({
    fontSize: 14,
    letterSpacing: -0.2,
    color: '#1f3449',
    opacity: 0.5,
    margin: '2px 0 -2px 20px',
    cursor: 'pointer'
});

const OrganizationTitleWrapper = Glamorous.div({
    display: 'flex',
    padding: '6px 0',
});

const OrganizationTypesText = Glamorous.div(props => ({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#1f3449',
    opacity: 0.5,
    marginBottom: 6,
    cursor: 'pointer'
}));

const OrganizationToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 4
});

export interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

class OrganizationTypes extends React.Component<{ orgTypes: string[], onPick: (q: SearchCondition) => void }> {
    render() {
        [...this.props.orgTypes.filter((e, i) => i <= 2),
        ...(this.props.orgTypes.length > 3
            ? ['+ ' + String(this.props.orgTypes.length - 3) + ' more']
            : [])].join(' • ');
        let elements = [];
        for (let orgType of this.props.orgTypes.filter((e, i) => i <= 2)) {
            elements.push(<OrganizationTypesText onClick={() => this.props.onPick({ type: 'organizationType', value: orgType, label: orgType })}>{orgType}</OrganizationTypesText>);
            elements.push(<OrganizationTypesText>{'•'}</OrganizationTypesText>);
        }
        elements.pop();
        if (this.props.orgTypes.length > 3) {
            elements.push(<OrganizationTypesText>{'•'}</OrganizationTypesText>);
            elements.push(<OrganizationTypesText>{'+ ' + String(this.props.orgTypes.length - 3) + ' more'}</OrganizationTypesText>);
        }
        return (
            <XHorizontal separator={2}>{elements}</XHorizontal>
        );
    }
}

const OrganizationFollowBtn = withOrganizationFollow((props) => (
    <XMutation
        mutation={props.followOrganization}
        variables={{ organizationId: (props as any).organizationId, follow: !(props as any).followed }}
    >
        <XButton
            iconOpacity={0.4}
            style={(props as any).followed ? 'ghost' : 'default'}
            text={(props as any).followed ? TextDirectory.buttonFollowing : TextDirectory.buttonFollow}
            icon={(props as any).followed ? 'check' : undefined}
        />
    </XMutation>
)) as React.ComponentType<{ organizationId: string, followed: boolean }>;

const AlterOrgPublishedButton = withOrganizationPublishedAlter((props) => (
    <XButton
        text={(props as any).published ? 'Hide from search' : 'Publish'}
        style="flat"
        action={async () => props.alterPublished({
            variables: {
                organizationId: (props as any).orgId,
                published: !(props as any).published
            }
        })}
    />
)) as React.ComponentType<{ orgId: string, published: boolean }>;

interface OrganizationCardProps {
    item: {
        id: string,
        name: string,
        photo: string | null,
        locations: string[] | null,
        interests: string[] | null,
        organizationType: string[] | null,
        isMine: boolean,
        followed: boolean,
        published: boolean,
        editorial: boolean,
    };
    onPick: (q: SearchCondition) => void;
}

const OrganizationCardTypeWrapper = Glamorous(XHorizontal)({
    flexWrap: 'wrap',
    '& > div': {
        marginRight: 8
    }
});

const OrganizationCard = (props: OrganizationCardProps) => {
    const tagsCounter = (data: string[]) => {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
            if (i === 2) {
                arr.push({ label: `+ ${data.length - 2} more`, value: undefined });
                break;
            }
            arr.push({ label: data[i], value: data[i] });
        }
        return arr;
    };
    return (
        <OrganizationCardWrapper>
            <XHorizontal justifyContent="space-between" separator={12}>
                <XLink path={'/o/' + props.item.id}>
                    <OrganizationAvatar
                        cloudImageUuid={props.item.photo!!}
                        size="s-large"
                        style="organization"
                    />
                </XLink>
                <OrganizationContentWrapper>
                    <OrganizationInfoWrapper>
                        <OrganizationTitleWrapper>
                            <OrganizationTitle path={'/o/' + props.item.id}>{props.item.name}</OrganizationTitle>
                            <OrganizationLocation onClick={() => props.onPick({ type: 'location', value: (props.item.locations || [])[0], label: (props.item.locations || [])[0] })}>{(props.item.locations || [])[0]}</OrganizationLocation>
                        </OrganizationTitleWrapper>
                        {props.item.organizationType && (
                            <OrganizationTypes orgTypes={props.item.organizationType} onPick={props.onPick} />
                        )}
                        {props.item.interests && (
                            <OrganizationCardTypeWrapper separator={0}>
                                {tagsCounter(props.item.interests).map((tag) => (
                                    <XTag
                                        key={props.item.id + tag}
                                        text={tag.label}
                                        onClick={tag.value ? () => props.onPick({ type: 'interest', value: tag.value!!, label: tag.label }) : undefined}
                                    />
                                ))}
                            </OrganizationCardTypeWrapper>
                        )}
                    </OrganizationInfoWrapper>
                    <OrganizationToolsWrapper>
                        {props.item.isMine &&
                            <XButton style="ghost" text={TextDirectory.labelYourOrganization} enabled={false} />}
                        {!props.item.isMine &&
                            <OrganizationFollowBtn followed={props.item.followed} organizationId={props.item.id} />}
                        {!props.item.isMine && !props.item.editorial &&
                            <XButton style="primary" path={'/mail/' + props.item.id} text={TextDirectory.labelSendMessage} />}

                        <XOverflow
                            placement="bottom-end"
                            content={(
                                <>
                                    <XOverflow.Item href={'/o/' + props.item.id}>{TextDirectory.buttonViewProfile}</XOverflow.Item>

                                    {props.item.isMine && (
                                        <XWithRole role="admin" orgPermission={true}>
                                            <XOverflow.Item href="/settings/organization">{TextDirectory.buttonEdit}</XOverflow.Item>
                                        </XWithRole>
                                    )}

                                    {!props.item.isMine && (
                                        <XWithRole role={['super-admin', 'editor']}>
                                            <XOverflow.Item href={'/settings/organization/' + props.item.id}>{TextDirectory.buttonEdit}</XOverflow.Item>
                                        </XWithRole>
                                    )}

                                    <XWithRole role={['super-admin', 'editor']}>
                                        <AlterOrgPublishedButton orgId={props.item.id} published={props.item.published} />
                                    </XWithRole>
                                </>
                            )}
                        />
                    </OrganizationToolsWrapper>
                </OrganizationContentWrapper>
            </XHorizontal>
        </OrganizationCardWrapper>
    );
};

const EmptySearchWrapper = Glamorous(XVertical)({
    paddingTop: 85,
    paddingBottom: 85
});

const EmptySearchBlockTitle = Glamorous.div({
    fontSize: 18,
    letterSpacing: -0.2,
    color: '#334562'
});

class EmptySearchBlock extends React.Component<{ onPick: (q: SearchCondition) => void, onSearchReset?: React.MouseEventHandler<any> }> {

    onPick = (q: SearchCondition) => {
        this.props.onPick(q);
    }

    onClick = (category: { type: any, value: string, label: string }) => {
        this.onPick({ type: category.type, value: category.value, label: category.label });
    }

    render() {
        return (
            <XCardStyled>
                <EmptySearchWrapper separator={12} alignItems="center">
                    <XVertical separator={9}>
                        <img src="/static/X/directory-empty.svg" />
                        <EmptySearchBlockTitle>No results found</EmptySearchBlockTitle>
                    </XVertical>
                    <XButton text="See all organizations" style="ghost" onClick={this.props.onSearchReset} />
                </EmptySearchWrapper>
            </XCardStyled>
        );
    }
}

interface OrganizationCardsProps {
    onPick: (q: SearchCondition) => void;
    variables: { query?: string, sort?: string };
    onSearchReset?: React.MouseEventHandler<any>;
    tagsCount: (n: number) => void;
}

const PaginationWrapper = Glamorous(XHorizontal)({
    paddingTop: 16,
    paddingBottom: 16
});

const PaginationButton = Glamorous(XLink)<{ current?: boolean, disable?: boolean, }>(props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    minWidth: 24,
    height: 24,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '20px',
    letterSpacing: -0.2,
    textAlign: 'center',
    color: props.current ? '#fff' : '#5c6a81',
    backgroundColor: props.current ? '#5c6a81' : '#f3f3f5',
    cursor: (props.disable || props.current) ? 'default' : undefined,
    pointerEvents: (props.disable || props.current) ? 'none' : undefined,
    '&:hover': {
        backgroundColor: '#654bfa',
        color: '#fff'
    },
    '& > i': {
        fontSize: 20,
        color: props.disable ? '#c1c7cf' : undefined
    },
    '&.arrow': {
        width: 24,
        maxWidth: 24
    }
}));

const PaginationDotted = Glamorous.div({
    width: 18,
    height: 24,
    color: '#c1c7cf',
    textAlign: 'center',
    lineHeight: '25px',
    fontSize: 25,
    fontWeight: 500,
    letterSpacing: -0.1
});

interface PagePaginationProps {
    pageInfo: {
        hasNextPage: boolean;
        itemsCount: number;
        pagesCount: number;
        currentPage: number;
        openEnded: boolean;
    };
}

class PagePagination extends React.Component<PagePaginationProps> {
    constructor(props: PagePaginationProps) {
        super(props);
    }
    PaginationFunc = (pagesCount: number, currentPage: number) => {
        let delta = 2;
        let left = currentPage - delta;
        let right = currentPage + delta + 1;
        let range = [];
        let rangeWithDots = [];
        let l;

        for (let i = 1; i <= pagesCount; i++) {
            if (i === 1 || i === pagesCount || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(
                        <PaginationButton key={'pag_' + i} current={(i + 1) === currentPage} path={'/directory?page=' + (i + 1).toString() + '#'}>
                            {i + 1}
                        </PaginationButton>
                    );
                } else if (i - l !== 1) {
                    rangeWithDots.push(<PaginationDotted>...</PaginationDotted>);
                }
            }
            rangeWithDots.push(
                <PaginationButton key={'pag_' + i} current={i === currentPage} path={'/directory?page=' + i.toString() + '#'}>
                    {i}
                </PaginationButton>
            );
            l = i;
        }

        return rangeWithDots;
    }

    render() {

        const {
            hasNextPage,
            pagesCount,
            currentPage,
        } = this.props.pageInfo;
        if (pagesCount < 2) {
            return null;
        }
        return (
            <PaginationWrapper justifyContent="flex-end" alignSelf="center" separator={4}>
                <PaginationButton
                    className="arrow left"
                    path={'/directory?page=' + (currentPage - 1).toString() + '#'}
                    disable={currentPage === 1}
                >
                    <XIcon icon="keyboard_arrow_left" />
                </PaginationButton>
                {this.PaginationFunc(pagesCount + 1, currentPage)}
                <PaginationButton
                    className="arrow right"
                    path={'/directory?page=' + (currentPage + 1).toString() + '#'}
                    disable={hasNextPage === false}
                >
                    <XIcon icon="keyboard_arrow_right" />
                </PaginationButton>
            </PaginationWrapper>
        );
    }
}

const OrganizationCards = withExploreOrganizations((props) => {
    if (!(props.data && props.data.items)) {
        return null;
    }
    return (
        <XVertical>
            {(props as any).tagsCount(props.data.items.pageInfo.itemsCount)}
            {!props.error && props.data && props.data.items && props.data.items.edges.length > 0 && (
                <XCardStyled>
                    {props.data.items.edges.map((i, j) => (
                        <OrganizationCard key={i.node.id + j} item={i.node} onPick={(props as any).onPick} />))
                    }
                    <PagePagination pageInfo={props.data.items.pageInfo} />
                </XCardStyled>
            )}
            {(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0) && (
                <EmptySearchBlock onPick={(props as any).onPick} onSearchReset={(props as any).onSearchReset} />
            )}
        </XVertical>
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

let queryhash: number | undefined;
const HitAdd = withHitsAdd((props) => {

    let newQueryHash = doSimpleHash(JSON.stringify((props as any).hits));
    let changed = queryhash !== newQueryHash;

    queryhash = newQueryHash;
    if (changed) {
        props.addHit({ variables: { hits: (props as any).hits } });
    }
    return null;
}) as React.ComponentType<{ hits: any }>;

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
            <XVertical flexGrow={1}>
                <OrganizationCards
                    onPick={this.props.onPick}
                    onSearchReset={this.props.onSearchReset}
                    tagsCount={this.tagsCount}
                    variables={{
                        query: q ? JSON.stringify(q) : undefined,
                        sort: JSON.stringify(sort),
                    }}
                />
                <HitAdd hits={hits} />
            </XVertical>
        );
    }
}

const SearchRoot = Glamorous(XCard)({
    borderRadius: 5,
    overflow: 'hidden'
});

const SearchFormWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

const SearchFormContent = Glamorous(XHorizontal)({
    display: 'flex',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 10
});

const SearchInput = Glamorous.input({
    height: '100%',
    minHeight: 40,
    paddingLeft: 5,
    lineHeight: 1.43,
    flexGrow: 1,
    '::placeholder': {
        fontWeight: 500,
        color: '#99A2B0'
    }
});

const SearchPickersWrapper = Glamorous(XHorizontal)<{ hiden: boolean }>(props => ({
    transition: 'all .2s',
    height: props.hiden === true ? 53 : 0
}));

const SearchPickers = Glamorous(XHorizontal)({
    borderTop: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#FAFBFC',
    padding: '10px 0px 10px 10px',
});

const SortContainer = Glamorous(XHorizontal)({
    borderTop: '1px solid rgba(220, 222, 228, 0.45)',
    borderLeft: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#f9fafb',
    padding: '10px 10px 10px 10px',
});

class ConditionsRender extends React.Component<{ conditions: SearchCondition[], removeCallback: (conditon: SearchCondition) => void }> {
    render() {
        return (
            <>
                {this.props.conditions.map((condition) => (
                    <XTag
                        key={condition.type + '_' + condition.value}
                        text={condition.label}
                        size="large"
                        color={condition.type === 'name' ? 'gray' : 'primary'}
                        icon="close"
                        onIconClick={() => this.props.removeCallback(condition)}
                    />
                ))}
                {this.props.conditions.length === 0 &&
                    <XTag text={TextDirectory.searchConditionAll} size="large" color="primary" />}
            </>
        );
    }
}

interface RootComponentState {
    searchText: string;
    conditions: SearchCondition[];
    sort: { orderBy: string, featured: boolean };
    orgCount: number;
    showFilters: boolean;
}

const ResetButton = Glamorous(XButton)({
    color: '#99a2b0'
});

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

    addCondition = (condition: SearchCondition) => {
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
        this.props.router.replaceQueryParams({page: undefined});
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

    render() {

        const { searchText, conditions, orgCount } = this.state;
        return (
            <Root separator={14}>
                <Header orgCount={orgCount} tagsCount={this.state.conditions.length} reset={this.reset} />
                <ContentWrapper>
                    <MainContent>
                        <XVertical>
                            <SearchRoot>
                                <SearchFormWrapper alignItems="center" justifyContent="space-between" separator={5}>
                                    <SearchFormContent separator={4} flexGrow={1}>
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

                                    <XHorizontal separator={5}>
                                        {this.state.conditions.length > 0 &&
                                            <ResetButton text={TextDirectory.buttonReset} style="flat" onClick={this.reset} />}
                                        <XButton
                                            text={TextDirectory.buttonSearch}
                                            style="primary"
                                            enabled={!!(this.state.searchText) || this.state.conditions.length > 0}
                                            onClick={this.searchButtonHandler}
                                        />
                                    </XHorizontal>
                                </SearchFormWrapper>
                                <SearchPickersWrapper separator={0} hiden={this.state.showFilters}>
                                    <SearchPickers separator="none" flexGrow={1}>
                                        <Query query={HitsPopularQuery.document} variables={{ categories: ['directory_interest', 'directory_organizationType', 'directory_location'] }} fetchPolicy="network-only">
                                            {data => {
                                                return (
                                                    <>
                                                        <InterestPicker onPick={this.addCondition} top={((data.data && data.data.hitsPopular) || []).filter((c: { category: string, tags: string[] }) => c.category === 'directory_interest')[0]} />
                                                        <LocationPicker onPick={this.addCondition} />
                                                        <CategoryPicker onPick={this.addCondition} />
                                                    </>
                                                );
                                            }}
                                        </Query>

                                    </SearchPickers>
                                    <SortContainer>
                                        <SortPicker sort={this.state.sort} onPick={this.changeSort} />
                                    </SortContainer>
                                </SearchPickersWrapper>
                            </SearchRoot>
                            <XHorizontal>
                                <Organizations
                                    featuredFirst={this.state.sort.featured}
                                    orderBy={this.state.sort.orderBy}
                                    conditions={conditions}
                                    onPick={this.replaceConditions}
                                    onSearchReset={this.reset}
                                    tagsCount={this.tagsCount}
                                />
                                <TopTags onPick={this.addCondition} />
                            </XHorizontal>
                        </XVertical>
                    </MainContent>
                </ContentWrapper>
            </Root >
        );
    }
}

export default withApp('Directory', 'viewer', withRouter((props) => {
    return (
        <>
            <XDocumentHead title="Organization directory" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <RootComponent router={props.router} />
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));