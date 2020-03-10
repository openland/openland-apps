import * as React from 'react';

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

export const Money = React.memo((props: { amount: number, showSign?: boolean }) => <>{formatMoney(props.amount, props.showSign)}</>);