import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';

export const SubscriptionsFragment = React.memo(() => {
    const client = useClient();
    const subscriptions = client.useSubscriptions();

    console.warn({ subscriptions });

    return (
        <Page track="settings_subscriptions">
            <UHeader title="Subscriptions" />
        </Page>
    );
});