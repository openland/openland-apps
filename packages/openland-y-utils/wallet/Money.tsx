import * as React from 'react';

export const formatMoney = (amount: number, adaptiveCents?: boolean) => {
    let a = amount < 0 ? -amount : amount; // Division of incorrect numbers is incorrect in CPU
    let d = Math.floor(a / 100);
    let c = a % 100;

    let cs = c.toString();
    if (c < 10) {
        cs = '0' + cs;
    }
    return (amount < 0 ? '- ' : '') + '$' + (d.toString() + ((adaptiveCents && cs === '00') ? '' : ('.' + cs)));
};

export const Money = React.memo((props: { amount: number, adaptiveCents?: boolean }) => <>{formatMoney(props.amount, props.adaptiveCents)}</>);