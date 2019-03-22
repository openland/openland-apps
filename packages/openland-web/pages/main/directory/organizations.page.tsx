import * as React from 'react';
import { withExploreOrganizations } from 'openland-web/api/withExploreOrganizations';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { OrganizationProfile } from '../profile/components/OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XOrganizationCard } from 'openland-x/cards/XOrganizationCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XMemo } from 'openland-y-utils/XMemo';

interface OrganizationCardsProps {
    onPageChange?: () => void;
    variables: { query?: string; prefix?: string; sort?: string };
    tagsCount: (n: number) => void;
}

export const OrganizationCards = withExploreOrganizations(props => {
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
                        <XOrganizationCard key={'_org_card_' + i.node.id} organization={i.node} />
                    ))}
                    <PagePagination
                        currentRoute="/directory/organizations"
                        pageInfo={props.data.items.pageInfo}
                    />
                </XContentWrapper>
            )}
            {noData && <EmptySearchBlock text="No organization matches your search" />}
        </>
    );
}) as React.ComponentType<OrganizationCardsProps>;

interface OrganizationsProps {
    featuredFirst: boolean;
    orderBy: string;
    query: string;
    tagsCount: (n: number) => void;
}

export class Organizations extends React.PureComponent<OrganizationsProps> {
    tagsCount = (n: number) => {
        this.props.tagsCount(n);
    };

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

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    return myPath.split(substring)[1];
};

const getOrganizationProfile = (path: string) => getId(path, '/directory/o/');

const SearchOrganizationProfileComponent = XMemo(({ id }: { id: string }) => (
    <OrganizationProfile organizationId={id} onDirectory={true} />
));

export default () => {
    const { path } = React.useContext(XRouterContext) as XRouter;

    let CardsComponent = ComponentWithSort({ Component: OrganizationCards, queryToPrefix: true });
    return (
        <DirectoryNavigation
            id={getOrganizationProfile(path)}
            title={'Organizations'}
            ProfileComponent={SearchOrganizationProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search organizations'}
            noQueryText={'All organizations'}
            hasQueryText={'Organizations'}
        />
    );
};
