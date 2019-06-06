import * as React from 'react';
import { withApp } from 'openland-web/components/withApp';
import { EmptySearchBlock } from './components/EmptySearchBlock';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { DirectoryNavigation, ComponentWithSort } from './components/DirectoryNavigation';
import { useClient } from 'openland-web/utils/useClient';

interface RoomsCardsProps {
    onPageChange?: () => void;
    variables: { query?: string; prefix?: string; sort?: string };
    tagsCount: (n: number) => void;
    notFoundText: string;
}

export const RoomsCards = (props: RoomsCardsProps) => {
    const client = useClient();
    const data = client.useAvailableRooms({ true: true, false: false });

    let noData =
        data === undefined || (data.availableChats === undefined);

    let rooms = data ? [...(data.availableChats || [])] : [];

    props.tagsCount(rooms.length);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {rooms.map(r => {
                        return (
                            <XRoomCard
                                key={r.id}
                                room={r as any}
                                path={'/directory/p/' + r.id}
                                isMember={r.membership === 'MEMBER'}
                            />
                        );
                    })}
                    {/* <PagePagination
                            currentRoute="/directory/explore"
                            pageInfo={data.rooms.pageInfo}
                        /> */}
                </XContentWrapper>
            )}
            {noData && (
                <EmptySearchBlock text={`We couldn't find anything for "${props.notFoundText}"`} />
            )}
        </>
    );
};

export default withApp('Explore', 'viewer', () => {
    let CardsComponent = ComponentWithSort({ Component: RoomsCards, queryToPrefix: true });

    return (
        <DirectoryNavigation
            title={'Explore'}
            CardsComponent={CardsComponent}
            searchPlaceholder={'Search groups'}
            noQueryText={'All groups'}
            hasQueryText={'Groups'}
            withoutFeatured
        />
    );
});
