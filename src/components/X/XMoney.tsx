import * as React from 'react';
var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
export function XMoney(props: { value: number }) {
    return (
        <>
            {formatter.format(props.value)}
        </>
    )
}