import * as React from 'react';
import { DiscoverNavigation } from './components/DiscoverNavigation';
import { withApp } from 'openland-web/components/withApp';
import { DiscoverStart } from '../../onboarding/start.page';
import { useClient } from 'openland-web/utils/useClient';
import { XView } from 'react-mental';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { showModalBox } from 'openland-x/showModalBox';
import { DiscoverOnLocalState } from 'openland-web/pages/onboarding/discover.page';

export type tabsT = 'start' | 'discover';

export const tabs: { [K in tabsT]: tabsT } = {
    start: 'start',
    discover: 'discover',
};

const DiscoverContent = () => {
    const client = useClient();

    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });
    const data = client.useSuggestedRooms();
    const [tab, setTab] = React.useState(
        discoverDone.betaIsDiscoverDone ? tabs.discover : tabs.start,
    );

    React.useEffect(() => {
        setTab(discoverDone.betaIsDiscoverDone ? tabs.discover : tabs.start);
    }, [discoverDone.betaIsDiscoverDone]);

    const onStartClick = React.useCallback(() => {
        showModalBox({ fullScreen: true }, () => (
            <DiscoverOnLocalState fullHeight={true} noTopBar />
        ));
    }, []);

    return (
        <React.Suspense fallback={null}>
            {tab === 'start' && (
                <DiscoverStart onSkip={null} onStartClick={onStartClick} noTopBar noBackSkipLogo />
            )}
            {tab === 'discover' && (
                <XContentWrapper withPaddingBottom={true}>
                    <XView fontSize={16} marginTop={32} marginBottom={27}>
                        Chats for you
                    </XView>
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
                </XContentWrapper>
            )}
        </React.Suspense>
    );
};

export default withApp('Discover', 'viewer', () => {
    return (
        <DiscoverNavigation>
            <DiscoverContent />
        </DiscoverNavigation>
    );
});
