import * as React from 'react';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { OrganizationProfile } from '../profile/components/OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XCommunityCard } from 'openland-x/cards/XCommunityCard';
import { DiscoverNavigation, ComponentWithSort } from './components/DiscoverNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { withApp } from 'openland-web/components/withApp';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
interface CommunitiesCardsProps {
    variables: { query?: string; sort?: string };
    tagsCount: (n: number) => void;
    notFoundText: string;
}

export const CommunitiesCards = (props: CommunitiesCardsProps) => {
    const client = useClient();

    const data = client.useWithoutLoaderExploreCommunity(props.variables);

    if (!(data && data.items)) {
        return null;
    }

    let noData =
        data === undefined ||
        data.items === undefined ||
        data.items === null ||
        data.items.edges.length === 0;

    props.tagsCount(noData ? 0 : data.items.pageInfo.itemsCount);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {data.items.edges
                        .sort((a, b) => b.node.membersCount - a.node.membersCount)
                        .map(i => (
                            <XCommunityCard key={'_org_card_' + i.node.id} community={i.node} />
                        ))}
                    <PagePagination
                        pageInfo={data.items.pageInfo}
                        currentRoute="/discover/communities"
                    />
                </XContentWrapper>
            )}
            {noData && (
                <EmptySearchBlock text={`We couldn't find anything for "${props.notFoundText}"`} />
            )}
        </>
    );
};

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    return myPath.split(substring)[1];
};

const getCommunityProfile = (path: string) => getId(path, '/directory/c/');

const SearchOrganizationProfileComponent = XMemo(({ id }: { id: string }) => (
    <OrganizationProfile organizationId={id} onDirectory={true} />
));

const CardsComponent = ComponentWithSort({ Component: CommunitiesCards });

export default withApp('Communities', 'viewer', () => {
    const { path } = React.useContext(XRouterContext) as XRouter;
    const router = React.useContext(XRouterContext) as XRouter;
    const page = router.routeQuery.page;

    return (
        <DiscoverNavigation
            id={getCommunityProfile(path)}
            title="Communities"
            ProfileComponent={SearchOrganizationProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder="Search communities"
            noQueryText="Featured communities"
            hasQueryText="Communities"
            withoutFeatured
            page={page}
            defaultSortOption="membersCount"
            sortOptions={{
                label: 'Sort by',
                values: [{ label: 'Members count', value: 'membersCount' }],
            }}
        />
    );
});
