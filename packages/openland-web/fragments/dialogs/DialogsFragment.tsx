import * as React from 'react';
import { XViewRouterContext, XView } from 'react-mental';
import { NotificationsButton, NewOptionsButton } from 'openland-web/components/NewOptionsButton';
import { DialogListFragment } from './DialogListFragment';
import { UCounter } from 'openland-unicorn/UCounter';
import { useClient } from 'openland-web/utils/useClient';
import { USideHeader } from 'openland-web/components/unicorn/USideHeader';
import { useVisibleTab } from 'openland-unicorn/components/utils/VisibleTabContext';
import { trackEvent } from 'openland-x-analytics';

const DialogsCounter = React.memo(() => {
    const client = useClient();
    let counter = client.useWithoutLoaderGlobalCounter({ fetchPolicy: 'cache-first' });
    if (counter) {
        return <UCounter value={counter.alphaNotificationCounter.unreadCount} />;
    }
    return null;
});

const BotActivator = () => {
    const client = useClient();
    const discoverState = client.useWithoutLoaderDiscoverState();
    if (discoverState && !discoverState.isDiscoverSkipped && !discoverState.betaIsDiscoverDone) {
        client.mutateBetaDiscoverSkip({ selectedTagsIds: [] });
    }
    return null;
};

export const DialogsFragment = React.memo(() => {
    let router = React.useContext(XViewRouterContext)!;
    const isVisible = useVisibleTab();
    React.useEffect(() => {
        if (isVisible) {
            trackEvent('navigate_chats');
        }
    }, [isVisible]);

    return (
        <>
            <DialogsCounter />
            <BotActivator />
            <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
                <USideHeader title="Chats">
                    <NotificationsButton />
                    <NewOptionsButton />
                </USideHeader>
                <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                    <DialogListFragment
                        onSearchItemSelected={() => { /* */ }}
                        onDialogPress={(id) => {
                            router.navigate(`/mail/${id}`);
                        }}
                    />
                </XView>
            </XView>
        </>
    );
});