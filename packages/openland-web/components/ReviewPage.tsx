import * as React from 'react';
import { AppContent } from './App/AppContent';
import { XCard } from './X/XCard';
import { withOpportunity } from '../api';
import ATypes from 'openland-api';
import { ParcelProperties } from './ParcelProperties';
import { XVertical } from './X/XVertical';
import { ParcelMaps } from './ParcelMaps';
import { XButtonMutation } from './X/XButtonMutation';

const ParcelInfo = (props: { parcel: ATypes.ParcelFullFragment }) => {
    return (
        <XVertical>
            <XCard shadow="medium">
                <ParcelProperties item={props.parcel} />
            </XCard>
            {props.parcel.geometry && (
                <ParcelMaps id={props.parcel.id} geometry={props.parcel.geometry} disableNavigation={true} />
            )}
        </XVertical>
    );
};

// const ApproveButton = withApproveOpportunity((props) => {
//     return (<XButtonMutation mutation={props.approve} />);
// });

const OpportunityInfo = withOpportunity((props) => {
    let state = props.data.variables.state;
    let title = 'Initial Review';
    if (state === 'APPROVED_INITIAL') {
        title = 'Zoning Reivew';
    }
    if (state === 'APPROVED_ZONING') {
        title = 'Unit Placement';
    }
    return (
        <XVertical>
            <XCard shadow="medium">
                <XCard.Loader loading={props.data.loading || false}>
                    {props.data.alphaNextReviewOpportunity && (
                        <XCard.Header text={title} description={'Parcel #' + props.data.alphaNextReviewOpportunity!!.parcel.title}>
                            <XButtonMutation
                                variables={{ state: state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.reject}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                            >
                                Reject
                            </XButtonMutation>
                            <XButtonMutation
                                variables={{ state: state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.snooze}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                            >
                                Snooze
                            </XButtonMutation>
                            <XButtonMutation
                                variables={{ state: state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.approve}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                                style="dark"
                            >
                                Approve
                            </XButtonMutation>
                        </XCard.Header>
                    )}
                    {!props.data.alphaNextReviewOpportunity && (
                        <XCard.Empty text="There are no parcels for review" icon="sort" />
                    )}
                </XCard.Loader>
            </XCard>
            {props.data.alphaNextReviewOpportunity && (
                <ParcelInfo parcel={props.data.alphaNextReviewOpportunity.parcel} />
            )}
        </XVertical>
    );
}) as React.ComponentType<{ variables?: any }>;

export const ReviewPage = (props: { state: 'INCOMING' | 'APPROVED_INITIAL' | 'APPROVED_ZONING' }) => {
    return (
        <AppContent>
            <OpportunityInfo variables={{ state: props.state }} />
        </AppContent>
    );
};