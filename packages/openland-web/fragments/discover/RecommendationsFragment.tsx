import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { DiscoverStart } from 'openland-web/pages/onboarding/start.page';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { RoomShort_SharedRoom } from 'openland-api/Types';

export const RecommendationsFragment = React.memo(() => {
    const client = useClient();
    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });
    const data = client.useSuggestedRooms();
    const tab = discoverDone.betaIsDiscoverDone ? 'discover' : 'start';

    const onStartClick = React.useCallback(() => {
        showModalBox({ fullScreen: true }, ctx => (
            <DiscoverOnLocalState fullHeight={true} onJoinChats={ctx.hide} />
        ));
    }, []);

    return (
        <React.Suspense fallback={null}>
            {tab === 'start' && (
                <>
                    <UHeader documentTitle="Recommendations" />
                    <DiscoverStart onSkip={null} onStartClick={onStartClick} noBackSkipLogo={true} />
                </>
            )}
            {tab === 'discover' && (
                <>
                    <UHeader title="Chats for you" />
                    <Page track="discover_recommended">
                        {data.suggestedRooms.map((room) => {
                            if (room.__typename === 'SharedRoom') {
                                return (
                                    <UGroupView
                                        key={'group-' + room.id}
                                        group={room as RoomShort_SharedRoom}
                                    />
                                );
                            }
                            return null;
                        })}
                    </Page>
                </>
            )}
        </React.Suspense>
    );
});