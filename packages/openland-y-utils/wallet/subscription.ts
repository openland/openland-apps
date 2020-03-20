import {
    WalletSubscriptionInterval,
    WalletSubscriptionState,
    Subscriptions_subscriptions,
    Subscriptions_subscriptions_product,
} from 'openland-api/spacex.types';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { formatAbsoluteDate } from 'openland-mobile/utils/formatDate';

export interface SubscriptionConverted {
    product: Subscriptions_subscriptions_product;
    id?: string;
    photo: string;
    title?: string;
    subtitle: string;
    amountSubtitle: string;
    state: WalletSubscriptionState;
    expires: Date;
    subscriptionId: string;
    amount: string;
    interval: WalletSubscriptionInterval;
}

export const displaySubscriptionDate = (date: Date) => {
    const unixNumber = date.getTime();
    return formatAbsoluteDate(unixNumber);
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

export function convertSubscription (subscription: Subscriptions_subscriptions): SubscriptionConverted {
    const expires = new Date(parseInt(subscription.expires, 10));
    const subtitle = generateSubTitle(expires, subscription.state);
    const amount = formatMoney(subscription.amount);
    const intervalVariants: { [key in WalletSubscriptionInterval]: string } = {
        [WalletSubscriptionInterval.MONTH]: 'mo',
        [WalletSubscriptionInterval.WEEK]: 'wk',
    };
    const interval = intervalVariants[subscription.interval] || 'period';
    const amountInterval = `${amount} / ${interval}, `;
    let converted = {
        photo: 'ph://' + subscription.id,
        subtitle,
        amountSubtitle: amountInterval + subtitle.charAt(0).toLowerCase() + subtitle.slice(1),
        subscriptionId: subscription.id,
        state: subscription.state,
        expires,
        amount: formatMoney(subscription.amount),
        interval: subscription.interval,
        product: subscription.product
    };
    if (subscription.product.__typename === 'WalletProductGroup') {
        const group = subscription.product.group;
        converted = {
            ...converted,
            ...group,
        };
    }
    return converted;
}
