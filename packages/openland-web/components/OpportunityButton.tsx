import * as React from 'react';
import { withAddOpportunity } from '../api';
import { OpportunityState } from 'openland-api/Types';
import { XButtonMutation } from 'openland-x/XButtonMutation';
import { XButton } from 'openland-x/XButton';

const OpportunityCreate = withAddOpportunity((props) => {
    return <XButtonMutation mutation={props.add} size={(props as any).size} style="primary" text="Add to prospecting"/>;
});

export const OpportunitiButton = (props: { parcelId: string, public?: boolean, opportunityId?: string, opportunityState?: OpportunityState, size?: 'x-large' | 'large' | 'medium' | 'default' | 'small' }) => {
    let suffix = '';
    let suffix2 = '';
    if (props.public) {
        suffix = '?public=true';
        suffix2 = '&public=true';
    }
    if (!props.opportunityId) {
        return <OpportunityCreate variables={{ parcelId: props.parcelId }} {...props} />;
    } else {
        if (props.opportunityState === OpportunityState.APPROVED) {
            return <XButton path={'/prospecting/approved' + suffix} style="primary" size={props.size} text="Approved Parcel"/>;
        } else if (props.opportunityState === OpportunityState.REJECTED) {
            return <XButton path={'/prospecting/rejected' + suffix} style="primary" size={props.size} text="Rejected Parcel"/>;
        } else if (props.opportunityState === OpportunityState.SNOOZED) {
            return (<XButton path={'/prospecting/snoozed' + suffix} style="primary" size={props.size} text="Snoozed Parcel"/>);
        } else if (props.opportunityState === OpportunityState.INCOMING) {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId + suffix2} style="primary" size={props.size} text="Begin review"/>;
        } else if (props.opportunityState === OpportunityState.APPROVED_ZONING) {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId + '?stage=unit' + suffix2} style="primary" size={props.size} text="Continue Review"/>;
        } else if (props.opportunityState === OpportunityState.APPROVED_INITIAL) {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId + '?stage=zoning' + suffix2} style="primary" size={props.size} text="Continue Review"/>;
        } else {
            return <XButton path={'/prospecting/review?initialId=' + props.opportunityId + suffix2} style="primary" size={props.size} text="Continue Review"/>;
        }
    }
};