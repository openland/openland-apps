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

export default withApp('Discover', 'viewer', () => {
    const client = useClient();

    const discoverDone = client.useDiscoverIsDone({ fetchPolicy: 'network-only' });

    const [tab, setTab] = React.useState(
        discoverDone.betaIsDiscoverDone ? tabs.discover : tabs.start,
    );

    // React.useEffect(() => {
    //     setTab(discoverDone.betaIsDiscoverDone ? tabs.discover : tabs.start);
    // }, [discoverDone.betaIsDiscoverDone]);

    const onStartClick = () => {
        setTab(tabs.discover);
    };

    return (
        <DiscoverNavigation>
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
        </DiscoverNavigation>
    );
});
