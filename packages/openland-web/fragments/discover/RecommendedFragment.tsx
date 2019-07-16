import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { DiscoverStart } from 'openland-web/pages/onboarding/start.page';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { UHeader } from 'openland-unicorn/UHeader';

export const RecommendedFragment = React.memo(() => {
    const client = useClient();
    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });
    const data = client.useSuggestedRooms();
    const tab = discoverDone.betaIsDiscoverDone ? 'discover' : 'start';
    
    const onStartClick = React.useCallback(() => {
        showModalBox({ fullScreen: true }, ctx => (
            <DiscoverOnLocalState fullHeight={true} noTopBar onJoinChats={ctx.hide} />
        ));
    }, []);

    return (
        <React.Suspense fallback={null}>
            {tab === 'start' && (
                <DiscoverStart onSkip={null} onStartClick={onStartClick} noTopBar noBackSkipLogo />
            )}
            {tab === 'discover' && (
                <>
                    <UHeader title="Chats for you" />
                    <XScrollView3 flexGrow={1} minHeight={0} flexBasis={0}>
                        {data.suggestedRooms.map((room, key) => {
                            if (room.__typename === 'SharedRoom') {
                                return (
                                    <XRoomCard
                                        key={key}
                                        room={room as any}
                                        path={'/directory/p/' + room.id}
                                        customMenu={null}
                                    />
                                );
                            }
                            return null;
                        })}
                    </XScrollView3>
                </>
            )}
        </React.Suspense>
    );
});