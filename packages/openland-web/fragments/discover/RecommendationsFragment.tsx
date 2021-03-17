import * as React from 'react';
import { XView } from 'react-mental';
import { useClient } from 'openland-api/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { DiscoverStart } from 'openland-web/fragments/onboarding/DiscoverStart';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { DiscoverSharedRoom } from 'openland-api/spacex.types';
import { DiscoverRecommendationsStart } from './components/DiscoverRecommendationsStart';
import { GroupJoinButton } from './components/JoinButton';

export const RecommendationsFragment = React.memo(() => {
    const client = useClient();
    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });
    const data = client.useSuggestedRooms();
    const tab = discoverDone.betaIsDiscoverDone ? 'discover' : 'start';

    const onStartClick = React.useCallback(() => {
        showModalBox({ fullScreen: true }, (ctx) => (
            <DiscoverStart onJoinChats={ctx.hide} />
        ));
    }, []);

    return (
        <React.Suspense fallback={null}>
            {tab === 'start' && (
                <>
                    <UHeader documentTitle="Recommendations" />
                    <DiscoverRecommendationsStart onStartClick={onStartClick} />
                </>
            )}
            {tab === 'discover' && (
                <Page track="discover_recommended">
                    <UHeader title="Chats for you" />
                    <XView height={16} />
                    {data.suggestedRooms.map((room) => {
                        if (room.__typename === 'SharedRoom') {
                            return (
                                <XView marginHorizontal={-16} maxWidth={560 + 16 * 2}>
                                    <UGroupView
                                        group={room as DiscoverSharedRoom}
                                        rightElement={
                                            <GroupJoinButton group={room as DiscoverSharedRoom} />
                                        }
                                    />
                                </XView>
                            );
                        }
                        return null;
                    })}
                    <XView height={56} />
                </Page>
            )}
        </React.Suspense>
    );
});
