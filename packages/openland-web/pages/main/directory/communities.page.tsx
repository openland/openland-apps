import * as React from 'react';
import { withExploreCommunities } from '../../../api/withExploreCommunities';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { OrganizationProfile } from '../profile/OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XCommunityCard } from 'openland-x/cards/XCommunityCard';
import {
    DirectoryUniversalNavigation,
    ComponentWithSort,
} from './components/DirectoryUniversalNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { withApp } from 'openland-web/components/withApp';

interface CommunitiesCardsProps {
    variables: { query?: string; sort?: string };
    tagsCount: (n: number) => void;
}

export const CommunitiesCards = withExploreCommunities(props => {
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
                        <XCommunityCard key={'_org_card_' + i.node.id} community={i.node} />
                    ))}
                    <PagePagination
                        pageInfo={props.data.items.pageInfo}
                        currentRoute="/directory/communities"
                    />
                </XContentWrapper>
            )}
            {noData && <EmptySearchBlock text="No community matches your search" />}
        </>
    );
}) as React.ComponentType<CommunitiesCardsProps>;

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    return myPath.split(substring)[1];
};

const getCommunityProfile = (path: string) => getId(path, '/directory/c/');

const SearchOrganizationProfileComponent = React.memo(({ id }: { id: string }) => (
    <OrganizationProfile organizationId={id} onDirectory={true} />
));

export default withApp('Communities', 'viewer', () => {
    const { path } = React.useContext(XRouterContext) as XRouter;

    let CardsComponent = ComponentWithSort({ Component: CommunitiesCards });

    return (
        <DirectoryUniversalNavigation
            id={getCommunityProfile(path)}
            title={'Communities'}
            ProfileComponent={SearchOrganizationProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search communities'}
            noQueryText={'All communities'}
            hasQueryText={'Communities'}
        />
    );
});
