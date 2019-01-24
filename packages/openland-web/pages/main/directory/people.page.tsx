import * as React from 'react';
import { withExplorePeople } from '../../../api/withExplorePeople';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { UserProfile } from '../profile/UserProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { DirectoryUniversalNavigation, ComponentWithSort } from './DirectoryUniversalNavigation';
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

let CardsComponent = ComponentWithSort(PeopleCards);

export default React.memo(({ path }: { path: string }) => {
    let id = getPeopleProfile(path);

    return (
        <DirectoryUniversalNavigation
            id={id}
            title={'People'}
            ProfileComponent={SearchUserProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search organizations'}
            noQueryText={'All organizations'}
            hasQueryText={'People'}
        />
    );
});
