import { WalletSubscriptionInterval, WalletSubscriptionState, Subscriptions_subscriptions, Subscriptions_subscriptions_product_WalletProductGroup } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';

export interface SubscriptionConverted {
    id: string;
    title: string;
    subtitle: string;
    photo: string;
    state: WalletSubscriptionState;
    expires: Date;
    subscriptionId: string;
    amount: string;
    interval: WalletSubscriptionInterval;
}

export const displaySubscriptionDate = (date: Date) => {
    const utc = date.toUTCString();
    const segments = utc.split(' ');
    const month = segments[2];
    const day = segments[1];

    return `${month} ${day}`;
};

const generateSubTitle = (expires: Date, state: WalletSubscriptionState) => {
    const date = displaySubscriptionDate(expires);

    switch (state) {
        case WalletSubscriptionState.STARTED:
            return `Next bill on ${date}`;

        case WalletSubscriptionState.GRACE_PERIOD:
        case WalletSubscriptionState.RETRYING:
            return "Payment failed";

        case WalletSubscriptionState.CANCELED:
            return `Expires on ${date}`;

        case WalletSubscriptionState.EXPIRED:
            return `Expired on ${date}`;

        default:
            return `Expires on ${date}`;
    }
};

export const convertSubscription = (subscription: Subscriptions_subscriptions) => {
    const group = (subscription.product as Subscriptions_subscriptions_product_WalletProductGroup).group;
    const expires = new Date(parseInt(subscription.expires, 10));

    const converted: SubscriptionConverted = {
        ...group,
        subtitle: generateSubTitle(expires, subscription.state),
        subscriptionId: subscription.id,
        state: subscription.state,
        expires,
        amount: formatMoney(subscription.amount),
        interval: subscription.interval
    };

    return converted;
};