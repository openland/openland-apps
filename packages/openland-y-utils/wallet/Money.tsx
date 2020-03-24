import * as React from 'react';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';

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

export const formatMoneyInterval = (amount: number, interval: WalletSubscriptionInterval | null): string => {
    let res = formatMoney(amount);
    if (interval) {
        if (interval === WalletSubscriptionInterval.WEEK) {
            res += ' / wk';
        } else if (interval === WalletSubscriptionInterval.MONTH) {
            res += ' / mo';
        }
    }

    return res;
};

export const Money = React.memo((props: { amount: number, showSign?: boolean }) => <>{formatMoney(props.amount, props.showSign)}</>);