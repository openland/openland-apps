import '../../../globals';
import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { withRouter } from '../../../components/withRouter';
import { XVertical } from '../../../components/X/XVertical';
import { XCard } from '../../../components/X/XCard';
import { ParcelProperties } from '../../../components/ParcelProperties';
import ATypes from 'openland-api';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { withOpportunity } from '../../../api';
import { XButtonMutation } from '../../../components/X/XButtonMutation';
import { AppContent } from '../../../components/App/AppContent';
import { XTab } from '../../../components/X/XTab';

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

const OpportunityInfo = withOpportunity((props) => {
    // let state = props.data.variables.state;
    // let title = 'Initial Review';
    let approveText = 'Move to next stage';
    if (props.data.variables.state === 'INCOMING') {
        approveText = 'Move to Zoning Review';
    } else if (props.data.variables.state === 'APPROVED_INITIAL') {
        approveText = 'Move to Unit Placement';
    }else if (props.data.variables.state === 'APPROVED_ZONING') {
        approveText = 'Approve';
    }
    // if (state === 'APPROVED_INITIAL') {
    //     title = 'Zoning Reivew';
    // }
    // if (state === 'APPROVED_ZONING') {
    //     title = 'Unit Placement';
    // }
    return (
        <XVertical>
            <XTab>
                <XTab.Item query={{ field: 'stage' }} asArrow={true}>Incoming</XTab.Item>
                <XTab.Item query={{ field: 'stage', value: 'zoning' }} asArrow={true}>Zoning Review</XTab.Item>
                <XTab.Item query={{ field: 'stage', value: 'unit' }} asArrow={true}>Unit Placement</XTab.Item>
                <XTab.Item path="/prospecting/approved">Approved</XTab.Item>
                <XTab.Item path="/prospecting/rejected">Rejected</XTab.Item>
                <XTab.Item path="/prospecting/snoozed">Snoozed</XTab.Item>
            </XTab>
            <XCard shadow="medium">
                <XCard.Loader loading={props.data.loading || false}>
                    {props.data.alphaNextReviewOpportunity && (
                        <XCard.Header text={'Parcel #' + props.data.alphaNextReviewOpportunity!!.parcel.title}>
                            <XButtonMutation
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.reject}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                            >
                                Reject
                            </XButtonMutation>
                            <XButtonMutation
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.snooze}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                            >
                                Snooze
                            </XButtonMutation>
                            <XButtonMutation
                                variables={{ state: props.data.variables.state, opportunityId: props.data.alphaNextReviewOpportunity!!.id }}
                                mutation={props.approve}
                                onSuccess={() => props.data.refetch({ forceFetch: true })}
                                style="dark"
                            >
                                {approveText}
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

export default withApp('Initial Review', 'viewer', withRouter((props) => {
    let state: 'INCOMING' | 'APPROVED_INITIAL' | 'APPROVED_ZONING' = 'INCOMING';
    let title = 'Initial Review';
    if (props.router.routeQuery.stage) {
        if (props.router.routeQuery.stage === 'zoning') {
            state = 'APPROVED_INITIAL';
            title = 'Zoning Review';
        } else if (props.router.routeQuery.stage === 'unit') {
            state = 'APPROVED_ZONING';
            title = 'Unit Placement Review';
        }
    }
    return (
        <>
            <XHead title={title} />
            <AppContent>
                <OpportunityInfo variables={{ state: state }} />
            </AppContent>
        </>
    );
}));