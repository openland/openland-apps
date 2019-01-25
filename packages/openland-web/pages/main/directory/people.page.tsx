import * as React from 'react';
import { withExplorePeople } from '../../../api/withExplorePeople';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { UserProfile } from '../profile/UserProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XUserCard } from 'openland-x/cards/XUserCard';
import {
    DirectoryUniversalNavigation,
    ComponentWithSort,
} from './components/DirectoryUniversalNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
interface PeopleCardsProps {
    variables: { query?: string; sort?: string };
    tagsCount: (n: number) => void;
}

export const PeopleCards = withExplorePeople(({ data, error, tagsCount }: any) => {
    if (!(data && data.items)) {
        return null;
    }

    let noData =
        error ||
        data === undefined ||
        data.items === undefined ||
        data.items === null ||
        data.items.edges.length === 0;

    tagsCount(noData ? 0 : data.items.pageInfo.itemsCount);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {data.items.edges.map((i: any, j: any) => (
                        <XUserCard key={'_org_card_' + i.node.id} user={i.node} />
                    ))}
                    <PagePagination
                        pageInfo={data.items.pageInfo}
                        currentRoute="/directory/people"
                    />
                </XContentWrapper>
            )}
            {noData && <EmptySearchBlock text="No people matches your search" />}
        </>
    );
}) as React.ComponentType<PeopleCardsProps>;

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    return myPath.split(substring)[1];
};

const getPeopleProfile = (path: string) => getId(path, '/directory/u/');

const SearchUserProfileComponent = React.memo(({ id }: { id: string }) => (
    <UserProfile userId={id} onDirectory={true} />
));

export default () => {
    const { path } = React.useContext(XRouterContext) as XRouter;

    let CardsComponent = ComponentWithSort({ Component: PeopleCards });

    return (
        <DirectoryUniversalNavigation
            id={getPeopleProfile(path)}
            title={'People'}
            ProfileComponent={SearchUserProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search organizations'}
            noQueryText={'All organizations'}
            hasQueryText={'People'}
        />
    );
};
