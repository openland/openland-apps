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

const Root = Glamorous(XVertical)({
    minHeight: '100%',
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const HeaderWrapper = Glamorous.div({
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(220, 222, 228, 0.4)',
    paddingTop: 38,
    paddingBottom: 40,
    paddingLeft: 40,
    paddingRight: 40
});

const HeaderContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 952,
    margin: 'auto'
});

const HeaderTitle = Glamorous.div({
    fontSize: 22,
    fontWeight: 500,
    letterSpacing: 0.7,
    color: '#334562',
    marginBottom: 11
});

const HeaderText = Glamorous.div({
    opacity: 0.8,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.53,
    letterSpacing: -0.1,
    color: '#334562',
});

const Header = () => (
    <HeaderWrapper>
        <HeaderContent>
            <div>
                <HeaderTitle>Organizations</HeaderTitle>
                <HeaderText>Search for new partnership to looking their listings updates</HeaderText>
            </div>
            <XButton path="/createOrganization" text="Add an organization" />
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
        location: string | null
    };
}

const OrganizationCardWrapper = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    backgroundColor: '#fff',
    padding: '20px 24px',
    '&:last-child': {
        borderBottom: 'none'
    }
});

const OrganizationTitleWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 'calc(100% - 48px)'
});

const OrganizationTitle = Glamorous.div({
    height: 22,
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.5,
    color: '#334562',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%'
});

const Text = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
});

interface SearchCondition {
    type: 'name' | 'location';
    value: string;
    label: string;
}

const OrganizationCard = (props: OrganizationCardProps) => (
    <OrganizationCardWrapper>
        <XHorizontal justifyContent="space-between" separator={12}>
            <XAvatar
                cloudImageUuid={props.item.photo!!}
                size="large"
                style="organization"
            />
            <XHorizontal flexGrow={1}>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: '100%' }}>
                    <XHorizontal justifyContent="space-between" alignItems="center">
                        <OrganizationTitleWrapper>
                            <OrganizationTitle>{props.item.name}</OrganizationTitle>
                            <Text>{props.item.location}</Text>
                        </OrganizationTitleWrapper>
                        <XOverflow
                            placement="bottom"
                            content={(
                                <>
                                    <XOverflow.Item href={'/o/' + props.item.id}>View profile</XOverflow.Item>
                                </>
                            )}
                        />
                    </XHorizontal>
                </div>
            </XHorizontal>
        </XHorizontal>
    </OrganizationCardWrapper>
);

const OrganizationCards = withExploreOrganizations(props => (
    <>
        {props.data && props.data.items && props.data.items.edges.length > 0 && props.data.items.edges.map((i, j) => (
            <OrganizationCard key={i.node.id + j} item={i.node} />
        ))}
        {props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0 && null}
    </>
));

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

    group = (conditions: SearchCondition[]) => {
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
        let groups = this.group(this.props.conditions);
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
        console.warn(q);

        console.warn(q ? JSON.stringify(q) : undefined);
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
        console.warn(this.state.conditions, condition);
        let res = [...this.state.conditions.filter(c => (c.type !== condition.type) || (condition.value !== undefined && c.value !== condition.value))];
        console.warn(res);
        this.setState({
            conditions: res
        });
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
        console.warn(conditions);
        return (
            <XVertical>
                <SearchInput
                    value={searchText}
                    autoFocus={true}
                    onChange={this.handleSearchChange}
                    placeholder={'Enter a keyword'}
                />
                {!LIVESEARCH && <ConditionsRender conditions={this.state.conditions} removeCallback={this.removeCondition} />}

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
                                <XVertical>
                                    <XCardStyled>
                                        <SearchComponent />
                                    </XCardStyled>
                                </XVertical>
                            </MainContent>
                        </ContentWrapper>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
});