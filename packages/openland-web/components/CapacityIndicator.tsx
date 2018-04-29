import * as React from 'react';
import { withSourcingCapacity } from '../api';

export const CapacityIndicator = withSourcingCapacity((props) => {
    return <>Total capacity: {props.data.totalCapacity} units</>;
});