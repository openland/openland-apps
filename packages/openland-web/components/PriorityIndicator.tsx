import * as React from 'react';
import * as Types from 'openland-api/Types';
import { XIcon } from 'openland-x/XIcon';
import Glamorous from 'glamorous';

let IconNormal = Glamorous(XIcon)({
    fontSize: 14,
    color: '#ff0000'
});

let IconLow = Glamorous(XIcon)({
    fontSize: 14,
    color: '#00ff00'
});

export function PriorityIndicator(props: { priority: Types.OpportunityPriority }) {
    if (props.priority === Types.OpportunityPriority.HIGH) {
        return <span><IconNormal icon="arrow_upward" /> High</span>;
    } else if (props.priority === Types.OpportunityPriority.NORMAL) {
        return <span><IconNormal icon="arrow_upward" /> Medium</span>;
    } else if (props.priority === Types.OpportunityPriority.LOW) {
        return <span><IconLow icon="arrow_downward" /> Low</span>;
    }

    return null;
}