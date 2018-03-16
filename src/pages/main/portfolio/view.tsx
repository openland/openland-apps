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
import { XMoney } from '../../../components/X/XMoney';

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
                        {props.data.deal.price && (<XCard.Property title="Price"><XMoney value={props.data.deal.price} /></XCard.Property>)}
                        {props.data.deal.price && props.data.deal.extrasArea && (<XCard.Property title="Price $/Sq ft"><XMoney value={props.data.deal.price / props.data.deal.extrasArea} /></XCard.Property>)}
                        {props.data.deal.extrasCompany && (<XCard.Property title="Company">{props.data.deal.extrasCompany}</XCard.Property>)}
                        {props.data.deal.extrasAttorney && (<XCard.Property title="Seller's Attorney">{props.data.deal.extrasAttorney}</XCard.Property>)}
                        {props.data.deal.extrasReferee && (<XCard.Property title="Refereee">{props.data.deal.extrasReferee}</XCard.Property>)}
                    </XCard.PropertyList>
                    <XCard.PropertyList title="Parcel">
                        {props.data.deal.location && (<XCard.Property title="Location">{props.data.deal.location}</XCard.Property>)}
                        {props.data.deal.address && (<XCard.Property title="Address">{props.data.deal.address}</XCard.Property>)}
                        {props.data.deal.extrasLotShape && (<XCard.Property title="Lot Shape">{props.data.deal.extrasLotShape}</XCard.Property>)}
                        {props.data.deal.extrasLotSize && (<XCard.Property title="Lot Size">{props.data.deal.extrasLotSize}</XCard.Property>)}
                        {props.data.deal.extrasTaxBill && (<XCard.Property title="Last Tax Bill"><XMoney value={props.data.deal.extrasTaxBill} /></XCard.Property>)}
                        {props.data.deal.extrasTaxBill && props.data.deal.extrasArea && (<XCard.Property title="Tax/Sq. Ft."><XMoney value={props.data.deal.extrasTaxBill / props.data.deal.extrasArea} /></XCard.Property>)}
                    </XCard.PropertyList>
                </XCard.PropertyColumns>
            </XCard>
            {props.data.deal.parcel && (
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text={'Parcel #' + props.data.deal.parcel.title} />
                </XCard>
            )}
        </AppContent>
    );
}));