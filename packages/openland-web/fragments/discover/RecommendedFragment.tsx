import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { showModalBox } from 'openland-x/showModalBox';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';
import { DiscoverStart } from 'openland-web/pages/onboarding/start.page';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';

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
                    <Page>
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
                    </Page>
                </>
            )}
        </React.Suspense>
    );
});