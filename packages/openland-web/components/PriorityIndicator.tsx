import * as React from 'react';
import ATypes from 'openland-api';
import { XIcon } from './X/XIcon';
import Glamorous from 'glamorous';

let IconNormal = Glamorous(XIcon)({
    fontSize: 14,
    color: '#ff0000'
});

let IconLow = Glamorous(XIcon)({
    fontSize: 14,
    color: '#00ff00'
});

export function PriorityIndicator(props: { priority: ATypes.OpportunityPriority }) {
    if (props.priority === ATypes.OpportunityPriority.HIGH) {
        return <span><IconNormal icon="arrow_upward" /> High</span>;
    } else if (props.priority === ATypes.OpportunityPriority.NORMAL) {
        return <span><IconNormal icon="arrow_upward" /> Medium</span>;
    } else if (props.priority === ATypes.OpportunityPriority.LOW) {
        return <span><IconLow icon="arrow_downward" /> Low</span>;
    }

    return null;
}