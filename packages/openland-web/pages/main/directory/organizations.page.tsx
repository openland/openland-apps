import * as React from 'react';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { OrganizationProfile } from '../profile/components/OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XOrganizationCard } from 'openland-x/cards/XOrganizationCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
import { withApp } from 'openland-web/components/withApp';

interface OrganizationCardsProps {
    onPageChange?: () => void;
    variables: { query?: string; prefix?: string; sort?: string };
    tagsCount: (n: number) => void;
    notFoundText: string;
}

export const OrganizationCards = (props: OrganizationCardsProps) => {
    const client = useClient();

    const data = client.useExploreOrganizations(props.variables, {
        fetchPolicy: 'network-only',
    });

    if (!data.items) {
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
                    {data.items.edges.map((i, j) => (
                        <XOrganizationCard key={'_org_card_' + i.node.id} organization={i.node} />
                    ))}
                    <PagePagination
                        currentRoute="/directory/organizations"
                        pageInfo={data.items.pageInfo}
                    />
                </XContentWrapper>
            )}
            {noData && (
                <EmptySearchBlock text={`We couldn't find anything for ${props.notFoundText}`} />
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

const getOrganizationProfile = (path: string) => getId(path, '/directory/o/');

const SearchOrganizationProfileComponent = XMemo(({ id }: { id: string }) => (
    <OrganizationProfile organizationId={id} onDirectory={true} />
));

const CardsComponent = ComponentWithSort({
    Component: OrganizationCards,
    queryToPrefix: true,
    noSort: true,
});

export default withApp('Organizations', 'viewer', () => {
    const router = React.useContext(XRouterContext) as XRouter;
    const page = router.routeQuery.page;

    return (
        <DirectoryNavigation
            id={getOrganizationProfile(router.path)}
            title={'Organizations'}
            ProfileComponent={SearchOrganizationProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search organizations'}
            noQueryText={'All organizations'}
            hasQueryText={'Organizations'}
            page={page}
            withoutFeatured
        />
    );
});
