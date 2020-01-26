import * as React from 'react';

export const Money = React.memo((props: { amount: number }) => {
    let a = props.amount < 0 ? -props.amount : props.amount; // Division of incorrect numbers is incorrect in CPU
    let d = Math.floor(a / 100);
    let c = a % 100;

    let cs = c.toString();
    if (c < 10) {
        cs = '0' + cs;
    }
    return <>${(props.amount < 0 ? '-' : '') + (d.toString() + '.' + cs)}</>;
});