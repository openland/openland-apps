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
        {props.data.items.edges.length > 0 && props.data.items.edges.map((i, j) => (
            <OrganizationCard key={i.node.id + j} item={i.node} />
        ))}
    </>
));

const SearchInput = Glamorous.input({
    border: '1px solid #d4dae7',
    height: 40
});

function buildQuery(clauses: any[]): any | null {
    if (clauses.length === 0) {
        return null;
    } else if (clauses.length === 1) {
        return clauses[0];
    } else {
        return {
            '$and': clauses
        };
    }
}

class SearchComponent extends React.Component<{}, { searchText: string }> {

    searchRef: any | null = null;

    constructor(props: any) {
        super(props);

        this.state = {
            searchText: ''
        };
    }

    handleSearchRef = (ref: any | null) => {
        this.searchRef = ref;
    }

    handleSearchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        this.setState({
            searchText: (e.target as any).value as string
        });
    }

    render() {
        let clauses: any[] = [];
        clauses.push({ name: this.state.searchText });
        return (
            <>
                <SearchInput
                    value={this.state.searchText}
                    onChange={this.handleSearchChange}
                    innerRef={this.handleSearchRef}
                />
                <OrganizationCards
                    variables={{
                        query: JSON.stringify(buildQuery(clauses))
                    }}
                />
            </>
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