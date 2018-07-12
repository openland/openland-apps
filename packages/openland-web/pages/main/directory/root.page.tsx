import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withExploreOrganizations } from '../../../api/withExploreOrganizations';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XButton } from 'openland-x/XButton';
import { XAvatar } from 'openland-x/XAvatar';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { LocationPicker } from './locationPicker';
import { CategoryPicker } from './categoryPicker';
import { XText } from 'openland-x/XText';
import { XTag } from 'openland-x/XTag';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { InterestPicker } from './interestPicker';
import { withOrganizationFollow } from '../../../api/withOrganizationFollow';
import { XMutation } from 'openland-x/XMutation';
import { TextDirectory } from 'openland-text/TextDirectory';
import { XLink } from 'openland-x/XLink';

const Root = Glamorous(XVertical)({
    minHeight: '100%',
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const HeaderWrapper = Glamorous.div({
    backgroundColor: '#fff',
    backgroundImage: 'url(/static/directory-head@2x.png)',
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center center',
    borderBottom: '1px solid rgba(220, 222, 228, 0.4)',
    padding: '42px 40px 40px',
});

const HeaderContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 952,
    margin: 'auto'
});

const HeaderTitle = Glamorous.div({
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: 0.4,
    color: '#1f3449',
    marginBottom: 16
});

const HeaderText = Glamorous.div({
    opacity: 0.8,
    fontSize: 15,
    lineHeight: '20px',
    letterSpacing: 0.35,
    color: '#1f3449',
});

const Header = () => (
    <HeaderWrapper>
        <HeaderContent>
            <div>
                <HeaderTitle>{TextDirectory.headerTitle}</HeaderTitle>
                <HeaderText>{TextDirectory.headerText}</HeaderText>
            </div>
            <XButton path="/createOrganization" text={TextDirectory.headerButtonAddOrganization} />
        </HeaderContent>
    </HeaderWrapper>
);

const XCardStyled = Glamorous(XCard)({
    borderRadius: 5,
    overflow: 'hidden'
});

interface OrganizationCardProps {
    item: {
        id: string,
        name: string,
        photo: string | null,
        location: string | null,
        interests: string[] | null,
        organizationType: string[] | null,
        isMine: boolean,
        followed: boolean,
    };
}

const OrganizationCardWrapper = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '20px 18px 20px 24px',
    '&:last-child': {
        borderBottom: 'none'
    }
});

const OrganizationWrapper = Glamorous(XHorizontal)({
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
});

const OrganizationTitleWrapper = Glamorous.div({
    display: 'flex',
    padding: '6px 0',
});

const OrganizationInterests = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#1f3449',
    opacity: 0.5,
    marginBottom: 6
});

const OrganizationTags = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
});

const OrganizationToolsWrapper = Glamorous(XHorizontal)({
    paddingTop: 4
});

export interface SearchCondition {
    type: 'name' | 'location' | 'organizationType' | 'interest';
    value: string | string[];
    label: string;
}

const OrganizationFollowBtn = withOrganizationFollow((props) => {
    return (
        <XMutation mutation={props.followOrganization} variables={{ organizationId: (props as any).organizationId, follow: !(props as any).followed }}>
            <XButton
                style={(props as any).followed ? 'ghost' : 'default'}
                text={(props as any).followed ? TextDirectory.buttonFollowing : TextDirectory.buttonFollow}
                icon={(props as any).followed ? 'check' : undefined}
            />
        </XMutation>
    );
}) as React.ComponentType<{ organizationId: string, followed: boolean }>;

const OrganizationCard = (props: OrganizationCardProps) => (
    <OrganizationCardWrapper>
        <XHorizontal justifyContent="space-between" separator={12}>
            <XLink path={'/o/' + props.item.id}>
                <OrganizationAvatar
                    cloudImageUuid={props.item.photo!!}
                    size={100}
                    placeholderFontSize={80}
                    border="1px solid rgba(164,169,177,0.2)"
                    style="organization"
                />
            </XLink>
            <OrganizationWrapper>
                <OrganizationInfoWrapper>
                    <OrganizationTitleWrapper>
                        <OrganizationTitle path={'/o/' + props.item.id}>{props.item.name}</OrganizationTitle>
                        <OrganizationLocation>{props.item.location}</OrganizationLocation>
                    </OrganizationTitleWrapper>

                    {props.item.interests && (<OrganizationInterests>{props.item.interests.join(' • ')}</OrganizationInterests>)}
                    {props.item.organizationType && (
                        <OrganizationTags>
                            {props.item.organizationType.map((tag) => (
                                <XTag key={props.item.id + tag} text={tag} />
                            ))}
                        </OrganizationTags>
                    )}
                </OrganizationInfoWrapper>
                <OrganizationToolsWrapper>
                    {props.item.isMine && <XButton style="ghost" text={TextDirectory.labelYourOrganization} enabled={false} />}
                    {!props.item.isMine && <OrganizationFollowBtn followed={props.item.followed} organizationId={props.item.id} />}
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
                            </>
                        )}
                    />
                </OrganizationToolsWrapper>
            </OrganizationWrapper>
        </XHorizontal>
    </OrganizationCardWrapper>
);

const OrganizationCounter = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    fontSize: 15,
    lineHeight: '20px',
    letterSpacing: 0.6,
    color: 'rgba(31, 52, 73, 0.5)',
    padding: '20px 5px 20px 24px',
});

const OrganizationCards = withExploreOrganizations((props) => {
    console.warn(props);
    return (
        <>
            {!props.error && props.data && props.data.items && props.data.items.edges.length > 0 && (
                <XCardStyled>
                    <OrganizationCounter>{TextDirectory.counterOrganizations(props.data.items.pageInfo.itemsCount)}</OrganizationCounter>
                    {props.data.items.edges.map((i, j) => (
                        <OrganizationCard key={i.node.id + j} item={i.node} />))
                    }
                </XCardStyled>
            )}
          
            {/* {(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0) && <XText>{TextDirectory.emptyResults}</XText>} */}
        </>
    );
});

class Organizations extends React.Component<{ conditions: SearchCondition[] }> {

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

    render() {
        let clauses: any[] = [];
        let groups = this.groupByType(this.props.conditions);
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
        }
        let q = this.buildQuery(clauses, '$and');

        return (
            <div>
                <OrganizationCards
                    variables={{
                        query: q ? JSON.stringify(q) : undefined
                    }}
                />
            </div>
        );
    }
}

const ConditionRenderWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
    padding: '0 4px 16px 24px'
});

const SearchForm = Glamorous(XHorizontal)({
    padding: '15px 14px 5px 24px'
});

const SearchInput = Glamorous.input({
    height: 32,
    lineHeight: '34px',
    flexGrow: 1
});

const SearchPickers = Glamorous(XHorizontal)({
    borderTop: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#f9fafb',
    padding: '10px 14px 10px 10px',
});

const LIVESEARCH = false;
class ConditionsRender extends React.Component<{ conditions: SearchCondition[], removeCallback: (conditon: SearchCondition) => void }> {
    render() {
        return (
            <ConditionRenderWrapper>
                {this.props.conditions.map((condition) => (
                    <XTag
                        key={condition.type + '_' + condition.value}
                        text={condition.label}
                        size="large"
                        color="primary"
                        icon="close"
                        onIconClick={() => this.props.removeCallback(condition)}
                    />
                ))}
                {this.props.conditions.length === 0 && <XTag text={TextDirectory.searchConditionAll} size="large" color="primary" />}
            </ConditionRenderWrapper>
        );
    }
}

const ResetButton = Glamorous(XButton)({
    backgroundColor: 'none'
});

class SearchComponent extends React.Component<{}, { searchText: string, conditions: SearchCondition[] }> {
    constructor(props: any) {
        super(props);

        this.state = {
            searchText: '',
            conditions: []
        };
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        let val = (e.target as any).value as string;
        if (LIVESEARCH) {
            this.setState({
                conditions: val.length > 0 ? [{ label: val, value: val, type: 'name' }] : [],
                searchText: val
            });
        } else {
            this.setState({
                searchText: val
            });
        }
    }

    addCondition = (condition: SearchCondition) => {
        if (condition.value !== undefined && condition.value.length === 0) {
            return;
        }
        let res = [...this.state.conditions];
        let same = res.filter(c => c.type === condition.type && c.value === condition.value)[0];
        if (!same) {
            res.push(condition);
        }
        this.setState({ conditions: res, searchText: '' });
    }

    removeCondition = (condition: SearchCondition) => {
        let res = [...this.state.conditions.filter(c => (c.type !== condition.type) || (condition.value !== undefined && c.value !== condition.value))];
        this.setState({
            conditions: res
        });
    }

    reset = () => {
        this.setState({ conditions: [] });
    }

    keydownHandler = (e: any) => {
        if (LIVESEARCH) {
            return;
        }
        if (e.keyCode === 13) {
            this.addCondition({ type: 'name', label: this.state.searchText, value: this.state.searchText });
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

    render() {

        const { searchText, conditions } = this.state;
        return (
            <XVertical>
                <XCardStyled>
                    <SearchForm>
                        <SearchInput
                            value={searchText}
                            autoFocus={true}
                            onChange={this.handleSearchChange}
                            placeholder={TextDirectory.searchInputPlaceholder}
                        />

                        <XButton text={TextDirectory.buttonSearch} onClick={this.searchButtonHandler} />
                    </SearchForm>
                    {!LIVESEARCH && (
                        <>
                            <ConditionsRender conditions={this.state.conditions} removeCallback={this.removeCondition} />
                            <SearchPickers separator="none">
                                <LocationPicker onPick={this.addCondition} />
                                <CategoryPicker onPick={this.addCondition} />
                                <InterestPicker onPick={this.addCondition} />
                                <XVertical alignItems="flex-end" flexGrow={1}>
                                    <ResetButton text={TextDirectory.buttonReset} style="flat" enabled={this.state.conditions.length > 0} onClick={this.reset} />
                                </XVertical>
                            </SearchPickers>
                        </>
                    )}
                </XCardStyled>
                <Organizations conditions={conditions} />
            </XVertical>
        );
    }
}

const ContentWrapper = Glamorous.div({
    padding: '0 40px'
});

const MainContent = Glamorous.div({
    maxWidth: 952,
    margin: 'auto'
});

export default withApp('Directory', 'viewer', (props) => {
    return (
        <>
            <XDocumentHead title="directory" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <Root separator={14}>
                        <Header />
                        <ContentWrapper>
                            <MainContent>
                                <SearchComponent />
                            </MainContent>
                        </ContentWrapper>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});