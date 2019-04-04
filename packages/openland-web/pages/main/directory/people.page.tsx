import * as React from 'react';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { PagePagination } from './components/PagePagination';
import { UserProfile } from '../profile/components/UserProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XMemo } from 'openland-y-utils/XMemo';
import { useClient } from 'openland-web/utils/useClient';
interface PeopleCardsProps {
    variables: { query?: string; sort?: string };
    tagsCount: (n: number) => void;
    error: any;
}

export const PeopleCards = ({ variables, error, tagsCount }: PeopleCardsProps) => {
    const client = useClient();

    const data = client.useExplorePeople(variables, {
        fetchPolicy: 'network-only',
    });

    if (!data.items) {
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
};

const getId = (myPath: string, substring: string) => {
    if (!myPath.includes(substring)) {
        return null;
    }
    return myPath.split(substring)[1];
};

const getPeopleProfile = (path: string) => getId(path, '/directory/u/');

const SearchUserProfileComponent = XMemo(({ id }: { id: string }) => (
    <UserProfile userId={id} onDirectory={true} />
));

export default () => {
    const { path } = React.useContext(XRouterContext) as XRouter;

    let CardsComponent = ComponentWithSort({ Component: PeopleCards });

    return (
        <DirectoryNavigation
            id={getPeopleProfile(path)}
            title={'People'}
            ProfileComponent={SearchUserProfileComponent}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search people'}
            noQueryText={'All people'}
            hasQueryText={'People'}
            withoutFeatured
        />
    );
};
