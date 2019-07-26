import * as React from 'react';
import { CounterContext } from './components/CounterContext';

export const UCounter = React.memo((props: { value: number }) => {
    let ctx = React.useContext(CounterContext);
    ctx(props.value);
    return null;
});