import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XHead } from '../../../components/X/XHead';
import { AppContent } from '../../../components/App/AppContent';
import { withOpportunityById } from '../../../api';
import { XCard } from '../../../components/X/XCard';

export default withApp('Unit placement', 'viewer', withOpportunityById((props) => {
    return (
        <>
            <XHead title="Unit placement" />
            <AppContent>
                <XCard shadow="medium">
                    <XCard.Header text="Sourcing Opportunity" description={'Parcel #' + props.data.alphaOpportunity!!.parcel.title} />
                </XCard>
            </AppContent>
        </>
    );
}));