import { WalletSubscriptionInterval, WalletSubscriptionState, Subscriptions_subscriptions, Subscriptions_subscriptions_product_WalletProductGroup } from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';

export interface SubscriptionConverted {
    id: string;
    title: string;
    subtitle: string;
    amountSubtitle: string;
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

    const variants: { [key in WalletSubscriptionState]: string } = {
        [WalletSubscriptionState.STARTED]: `Next bill on ${date}`,
        [WalletSubscriptionState.GRACE_PERIOD]: `Payment failed`,
        [WalletSubscriptionState.RETRYING]: `Payment failed`,
        [WalletSubscriptionState.CANCELED]: `Expires on ${date}`,
        [WalletSubscriptionState.EXPIRED]: `Expired on ${date}`,
    };

    return variants[state] || `Expires on ${date}`;
};

export const convertSubscription = (subscription: Subscriptions_subscriptions) => {
    const group = (subscription.product as Subscriptions_subscriptions_product_WalletProductGroup).group;
    const expires = new Date(parseInt(subscription.expires, 10));
    const subtitle = generateSubTitle(expires, subscription.state);
    const amount = formatMoney(subscription.amount);
    const amountInterval = `${amount} / ${subscription.interval === WalletSubscriptionInterval.MONTH ? 'mo.' : 'w.'}, `;

    const converted: SubscriptionConverted = {
        ...group,
        subtitle,
        amountSubtitle: amountInterval + subtitle.charAt(0).toLowerCase() + subtitle.slice(1),
        subscriptionId: subscription.id,
        state: subscription.state,
        expires,
        amount: formatMoney(subscription.amount),
        interval: subscription.interval
    };

    return converted;
};