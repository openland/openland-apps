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

const OrganizationTitle = Glamorous.div({
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
    value: string;
    label: string;
}

const OrganizationFollowBtn = withOrganizationFollow((props) => {
    return (
        <XMutation mutation={props.followOrganization} variables={{organizationId: (props as any).organizationId, follow: !(props as any).followed}}>
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
            <XAvatar
                cloudImageUuid={props.item.photo!!}
                size={100}
                placeholderFontSize={80}
                border="1px solid rgba(164,169,177,0.2)"
                style="organization"
            />
            <OrganizationWrapper>
                <OrganizationInfoWrapper>
                    <OrganizationTitleWrapper>
                        <OrganizationTitle>{props.item.name}</OrganizationTitle>
                        <OrganizationLocation>{props.item.location}</OrganizationLocation>
                    </OrganizationTitleWrapper>

                    {props.item.interests && (<OrganizationInterests>{props.item.interests.join(' • ')}</OrganizationInterests>)}
                    {props.item.organizationType && (
                        <OrganizationTags>
                            {props.item.organizationType.map((tag) => (
                                <XTag key={props.item.id + tag} title={tag} />
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
            {!props.error && props.data && props.data.items && props.data.items.edges.length > 0 && <OrganizationCounter>{TextDirectory.counterOrganizations(props.data.items.pageInfo.itemsCount)}</OrganizationCounter>}
            {!props.error && props.data && props.data.items && props.data.items.edges.length > 0 && props.data.items.edges.map((i, j) => (
                <OrganizationCard key={i.node.id + j} item={i.node} />
            ))}
            {(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0) && <XText>{TextDirectory.emptyResults}</XText>}
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
            clauses.push(this.buildQuery(
                [...group.map((c: SearchCondition) => {
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

const SearchInput = Glamorous.input({
    border: '1px solid #d4dae7',
    height: 40,
    flexGrow: 1
});

const ConditionRenderWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap'
});

const Tag = Glamorous.div({
    display: 'flex',
    maxWidth: '100%',
    height: 30,
    borderRadius: 4,
    backgroundColor: '#edf3fe',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '30px',
    color: '#4285f4',
    padding: '0px 9px 1px',
    marginRight: 10,
    marginTop: 4,
    marginBottom: 4,
});

const LIVESEARCH = false;
class ConditionsRender extends React.Component<{ conditions: SearchCondition[], removeCallback: (conditon: SearchCondition) => void }> {
    render() {
        return (
            <ConditionRenderWrapper>
                {this.props.conditions.map((condition) => (
                    <Tag key={condition.type + '_' + condition.value}>
                        {condition.label}
                        <div
                            onClick={() => this.props.removeCallback(condition)}
                            style={{ marginLeft: 5, color: 'red', cursor: 'pointer' }}
                        >
                            clear
                        </div>
                    </Tag>
                ))}
                {this.props.conditions.length === 0 && <Tag>All organizations</Tag>}
            </ConditionRenderWrapper>
        );
    }
}

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
                    <SearchInput
                        value={searchText}
                        autoFocus={true}
                        onChange={this.handleSearchChange}
                        placeholder={'Enter a keyword'}
                    />
                    {!LIVESEARCH && (
                        <>
                            <ConditionsRender conditions={this.state.conditions} removeCallback={this.removeCondition} />
                            <XHorizontal >
                                <LocationPicker onPick={this.addCondition} />
                                <CategoryPicker onPick={this.addCondition} />
                                <InterestPicker onPick={this.addCondition} />
                                <XVertical alignItems="flex-end" flexGrow={1}>
                                    <XButton text="Reset" onClick={this.reset} />
                                </XVertical>
                            </XHorizontal>

                        </>
                    )}
                </XCardStyled>

                <XCardStyled>
                    <Organizations conditions={conditions} />
                </XCardStyled>
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