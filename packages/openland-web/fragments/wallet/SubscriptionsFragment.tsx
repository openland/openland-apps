import * as React from 'react';
import { UHeader } from 'openland-unicorn/UHeader';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-api/useClient';
import { Subscriptions_subscriptions_product_WalletSubscriptionProductGroup, WalletSubscriptionState } from 'openland-api/spacex.types';
import { XView } from 'react-mental';

interface NormalizedSubscription {
    id: string;
    title: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
}

export const SubscriptionsFragment = React.memo(() => {
    const client = useClient();
    const subscriptions = client.useSubscriptions();
    const groupSubscriptions = subscriptions.subscriptions.filter(subscription => subscription.product.__typename === 'WalletSubscriptionProductGroup');
    const normalizedSubscriptions: NormalizedSubscription[] = groupSubscriptions.map(subscription => {
        const group = (subscription.product as Subscriptions_subscriptions_product_WalletSubscriptionProductGroup).group;

        return {
            ...group,
            state: subscription.state,
            expires: new Date(subscription.expires * 1000)
        };
    });

    const activeSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.STARTED ||
        subscription.state === WalletSubscriptionState.GRACE_PERIOD ||
        subscription.state === WalletSubscriptionState.RETRYING
    );

    const expiredSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.EXPIRED ||
        subscription.state === WalletSubscriptionState.CANCELED
    );

    return (
        <Page track="settings_subscriptions">
            <UHeader title="Subscriptions" />

            <XView>
                { JSON.stringify(activeSubscriptions, null, 2) }
            </XView>

            <XView>
                { JSON.stringify(expiredSubscriptions, null, 2) }
            </XView>
        </Page>
    );
});