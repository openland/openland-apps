import * as React from 'react';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { t } from 'openland-mobile/text/useText';

export const formatMoney = (amount: number, showPositiveSign?: boolean) => {
    let a = amount < 0 ? -amount : amount; // Division of incorrect numbers is incorrect in CPU
    let d = Math.floor(a / 100);
    let c = a % 100;

    let cs = c.toString();
    if (c < 10) {
        cs = '0' + cs;
    }

    let sign = amount < 0 ? '− ' : (showPositiveSign ? '+ ' : '');

    return sign + '$' + (d.toString() + ((cs === '00') ? '' : ('.' + cs)));
};

export const formatMoneyInterval = (amount: number, interval: WalletSubscriptionInterval | null, fullText?: boolean): string => {
    let res = formatMoney(amount);
    if (interval) {
        const weekText = fullText ? t('periodLongPerWeek', 'per week') : `/ ${t('periodShortWeek', 'wk')}`;
        const monthText = fullText ? t('periodLongPerMonth', 'per month') : `/ ${t('periodShortMonth', 'mo')}`;
        if (interval === WalletSubscriptionInterval.WEEK) {
            res += ' ' + weekText;
        } else if (interval === WalletSubscriptionInterval.MONTH) {
            res += ' ' + monthText;
        }
    }

    return res;
};
export const Money = React.memo((props: { amount: number, showSign?: boolean }) => <>{formatMoney(props.amount, props.showSign)}</>);