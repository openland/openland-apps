import * as React from 'react';
import { DiscoverNavigation } from './components/DiscoverNavigation';
import { withApp } from 'openland-web/components/withApp';
import { DiscoverStart } from '../../onboarding/start.page';
import { DiscoverOnLocalState } from '../../onboarding/discover.page';
import { useClient } from 'openland-web/utils/useClient';

export type tabsT = 'start' | 'discover';

export const tabs: { [K in tabsT]: tabsT } = {
    start: 'start',
    discover: 'discover',
};

const DiscoverContent = () => {
    const client = useClient();

    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    const [tab, setTab] = React.useState(
        discoverDone.betaIsDiscoverDone ? tabs.discover : tabs.start,
    );

    const onStartClick = React.useCallback(() => {
        setTab(tabs.discover);
    }, [tabs.discover]);

    return (
        <React.Suspense fallback={null}>
            {tab === 'start' && (
                <DiscoverStart onSkip={null} onStartClick={onStartClick} noTopBar noBackSkipLogo />
            )}
            {tab === 'discover' && (
                <DiscoverOnLocalState
                    noTopBar
                    noLogo
                    noSkipOnFirstScreen
                    noSkipOnChatsForYou
                    noBackOnFirstScreen
                />
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
