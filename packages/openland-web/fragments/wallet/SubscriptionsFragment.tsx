import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';

export const SubscriptionsFragment = React.memo(() => {
    return (
        <Page track="settings_subscriptions">
            <UHeader title="Subscriptions" />
        </Page>
    );
});