import * as React from 'react';
import { withAddOpportunity } from '../api';
import { XButtonMutation } from './X/XButtonMutation';
import { XButton } from './X/XButton';
import { OpportunityState } from 'openland-api/Types';

const OpportunityCreate = withAddOpportunity((props) => {
    return <XButtonMutation mutation={props.add} size="medium" accent={true}>Add to prospecting</XButtonMutation>;
});

export const OpportunitiButton = (props: { parcelId: string, opportunityId?: string, opportunityState?: OpportunityState }) => {
    if (!props.opportunityId) {
        return <OpportunityCreate variables={{ parcelId: props.parcelId }} />;
    } else {
        if (props.opportunityState === OpportunityState.APPROVED) {
            return <XButton path={'/prospecting/approved'} style="dark" size="medium">Approved Parcel</XButton>;
        } else if (props.opportunityState === OpportunityState.REJECTED) {
            return <XButton path={'/prospecting/rejected'} style="dark" size="medium">Rejected Parcel</XButton>;
        } else if (props.opportunityState === OpportunityState.SNOOZED) {
            return <XButton path={'/prospecting/snoozed'} style="dark" size="medium">Snoozed Parcel</XButton>;
        } else if (props.opportunityState === OpportunityState.INCOMING) {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId} style="dark" size="medium">Start Review</XButton>;
        } else if (props.opportunityState === OpportunityState.APPROVED_ZONING) {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId + '?stage=unit'} style="dark" size="medium">Continue Review</XButton>;
        } else if (props.opportunityState === OpportunityState.APPROVED_INITIAL) {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId + '?stage=zoning'} style="dark" size="medium">Continue Review</XButton>;
        } else {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId} style="dark" size="medium">Continue Review</XButton>;
        }
    }
};