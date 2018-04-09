import * as React from 'react';
import { withAddOpportunity } from '../api';
import { XButtonMutation } from './X/XButtonMutation';
import { XButton } from './X/XButton';

const OpportunityCreate = withAddOpportunity((props) => {
    return <XButtonMutation mutation={props.add} size="medium" accent={true}>Add Opportunity</XButtonMutation>;
});

export const OpportunitiButton = (props: { parcelId: string, opportunityId?: string }) => {
    if (!props.opportunityId) {
        return <OpportunityCreate variables={{ parcelId: props.parcelId }} />;
    } else {
        return <XButton path={'/sourcing/' + props.opportunityId} style="dark" size="medium">View Opportunity</XButton>;
    }
};