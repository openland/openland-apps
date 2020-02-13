import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SScrollView } from 'react-native-s/SScrollView';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { useClient } from 'openland-api/useClient';
import { WalletSubscriptionState, Subscriptions_subscriptions_product_WalletSubscriptionProductGroup } from 'openland-api/spacex.types';

interface NormalizedSubscription {
    id: string;
    title: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
    subscriptionId: string;
}

const displayDate = (date: Date) => {
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const month = segments[2];
    const day = segments[1];

    return `${month} ${day}`;
};

const generateSubTitle = (subscription: NormalizedSubscription) => {
    const date = displayDate(subscription.expires);

    switch (subscription.state) {
        case WalletSubscriptionState.STARTED:
            return `Next bill on ${date}`;

        case WalletSubscriptionState.GRACE_PERIOD:
        case WalletSubscriptionState.RETRYING: 
            return "Failing";

        case WalletSubscriptionState.CANCELED:
            return `Expires on ${date}`;

        case WalletSubscriptionState.EXPIRED:
            return `Expired on ${date}`;

        default:
            return `Expires on ${date}`;
    }
};

const SubscriptionsComponent = React.memo<PageProps>((props) => {
    const client = useClient();
    const subscriptions = client.useSubscriptions();
    const groupSubscriptions = subscriptions.subscriptions.filter(subscription => subscription.product.__typename === 'WalletSubscriptionProductGroup');
    const normalizedSubscriptions: NormalizedSubscription[] = groupSubscriptions.map(subscription => {
        const group = (subscription.product as Subscriptions_subscriptions_product_WalletSubscriptionProductGroup).group;

        return {
            ...group,
            subscriptionId: subscription.id,
            state: subscription.state,
            expires: new Date(parseInt(subscription.expires, 10))
        };
    });

    const activeSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.STARTED ||
        subscription.state === WalletSubscriptionState.GRACE_PERIOD ||
        subscription.state === WalletSubscriptionState.RETRYING ||
        subscription.state === WalletSubscriptionState.CANCELED
    );

    const expiredSubscriptions = normalizedSubscriptions.filter(subscription =>
        subscription.state === WalletSubscriptionState.EXPIRED
    );

    return (
        <>
            <SHeader title="Subscriptions" />
            <SScrollView>

                { activeSubscriptions.length > 0 && (
                    <ZListGroup header="Active">
                        { activeSubscriptions.map(subscription => (
                            <ZListItem
                                text={subscription.title}
                                subTitle={generateSubTitle(subscription)}
                                leftAvatar={{ photo: subscription.photo, key: subscription.id, title: subscription.title }}
                            />
                        ))}
                    </ZListGroup>
                )}

                { expiredSubscriptions.length > 0 && (
                    <ZListGroup header="Active">
                        { expiredSubscriptions.map(subscription => (
                            <ZListItem
                                text={subscription.title}
                                subTitle={generateSubTitle(subscription)}
                                leftAvatar={{ photo: subscription.photo, key: subscription.id, title: subscription.title }}
                            />
                        ))}
                    </ZListGroup>
                )}

            </SScrollView>
        </>
    );
});

export const Subscriptions = withApp(SubscriptionsComponent);