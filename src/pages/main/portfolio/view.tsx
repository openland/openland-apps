import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { withDeal, withDealAlterCombined } from '../../../api';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { DealForm } from '../../../components/DealForm';
import { XHead } from '../../../components/X/XHead';
import { XModalRouted } from '../../../components/X/XModalRouted';

const DealsForm = withDealAlterCombined((props) => (
    <DealForm
        mutation={props.alter}
        defaultValues={props.data.deal}
    />
));

export default withApp('viewer', withDeal((props) => {
    return (
        <AppContent>
            <XHead title="Portfolio" />
            <XModalRouted title="Edit Deal" query="edit">
                <DealsForm />
            </XModalRouted>
            <XCard shadow="medium" separators={true}>
                <XCard.Header text={props.data.deal.title} description="Deal" bullet={props.data.deal.status}>
                    <XButton query={{ field: 'edit', value: 'true' }}>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyColumns>
                    <XCard.PropertyList title="Deal Info">
                        {props.data.deal.location && (<XCard.Property title="Location">{props.data.deal.location}</XCard.Property>)}
                        {props.data.deal.address && (<XCard.Property title="Address">{props.data.deal.address}</XCard.Property>)}
                    </XCard.PropertyList>
                </XCard.PropertyColumns>
            </XCard>
        </AppContent>
    );
}));