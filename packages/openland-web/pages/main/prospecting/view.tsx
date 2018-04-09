import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XHead } from '../../../components/X/XHead';
import { AppContent } from '../../../components/App/AppContent';
import { withOpportunityById } from '../../../api';
import { XCard } from '../../../components/X/XCard';
import ATypes from 'openland-api';
import { XVertical } from '../../../components/X/XVertical';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { XButtonMutation } from '../../../components/X/XButtonMutation';

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

export default withApp('Unit placement', 'viewer', withOpportunityById((props) => {
    return (
        <>
            <XHead title="Unit placement" />
            <AppContent>
                <XCard shadow="medium">
                    <XCard.Header text="Sourcing Opportunity" description={'Parcel #' + props.data.alphaOpportunity!!.parcel.title}>
                        <XButtonMutation
                            variables={{ state: props.data.alphaOpportunity!!.state, opportunityId: props.data.alphaOpportunity!!.id }}
                            mutation={props.reject}
                        >
                            Reject
                            </XButtonMutation>
                        <XButtonMutation
                            variables={{ state: props.data.alphaOpportunity!!.state, opportunityId: props.data.alphaOpportunity!!.id }}
                            mutation={props.snooze}
                        >
                            Snooze
                            </XButtonMutation>
                        <XButtonMutation
                            variables={{ state: props.data.alphaOpportunity!!.state, opportunityId: props.data.alphaOpportunity!!.id }}
                            mutation={props.approve}
                            onSuccess={() => props.data.refetch({ forceFetch: true })}
                            style="dark"
                        >
                            Approve
                            </XButtonMutation>
                    </XCard.Header>
                </XCard>
                {props.data.alphaOpportunity && (
                    <ParcelInfo parcel={props.data.alphaOpportunity.parcel} />
                )}
            </AppContent>
        </>
    );
}));