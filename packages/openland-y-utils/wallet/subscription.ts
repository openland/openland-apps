import {
    WalletSubscriptionInterval,
    WalletSubscriptionState,
    Subscriptions_subscriptions,
    Subscriptions_subscriptions_product,
} from 'openland-api/spacex.types';
import { t } from 'openland-mobile/text/useText';
import DateTimeFormatter from 'openland-y-runtime/DateTimeFormatter';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import moment from 'moment';

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
    return DateTimeFormatter.formatAbsoluteDate(unixNumber);
};

const generateSubTitle = (expires: Date, renews: Date, state: WalletSubscriptionState) => {
    const date = displaySubscriptionDate(expires);
    const renewsFormatted = displaySubscriptionDate(expires);

    const variants: { [key in WalletSubscriptionState]: string } = t
        ? {
              [WalletSubscriptionState.STARTED]: t('subscriptionsStarted', { date: renewsFormatted, defaultValue: `Next bill on {{date}}` }),
              [WalletSubscriptionState.GRACE_PERIOD]: t('subscriptionsPaymentFailed', 'Payment failed'),
              [WalletSubscriptionState.RETRYING]: t('subscriptionsPaymentFailed', 'Payment failed'),
              [WalletSubscriptionState.CANCELED]: t('subscriptionsCanceled', { date, defaultValue: `Expires on {{date}}` }),
              [WalletSubscriptionState.EXPIRED]: t('subscriptionsExpired', { date, defaultValue: `Expired on {{date}}` }),
          }
        : {
              [WalletSubscriptionState.STARTED]: `Next bill on ${renewsFormatted}`,
              [WalletSubscriptionState.GRACE_PERIOD]: `Payment failed`,
              [WalletSubscriptionState.RETRYING]: `Payment failed`,
              [WalletSubscriptionState.CANCELED]: `Expires on ${date}`,
              [WalletSubscriptionState.EXPIRED]: `Expired on ${date}`,
          };

    return variants[state] || t('subscriptionsCanceled', { date, defaultValue: `Expires on {{date}}` }) || `Expired on ${date}`;
};

export function convertSubscription(subscription: Subscriptions_subscriptions): SubscriptionConverted {
    const expires = new Date(parseInt(subscription.expires, 10));
    const renews = moment(new Date(parseInt(subscription.expires, 10))).add('day', -1).toDate();
    const subtitle = generateSubTitle(expires, renews, subscription.state);
    const amount = formatMoney(subscription.amount);
    const intervalVariants: { [key in WalletSubscriptionInterval]: string } = {
        [WalletSubscriptionInterval.MONTH]: t('periodShortMonth') || 'mo',
        [WalletSubscriptionInterval.WEEK]: t('periodShortWeek') || 'wk',
    };
    const interval = intervalVariants[subscription.interval] || t('subscriptionsPeriod', 'period') || 'period';
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
