import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { withDeal, withDealAlterCombined, withDealRemove } from '../../../api';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { DealForm } from '../../../components/DealForm';
import { XHead } from '../../../components/X/XHead';
import { XModalRouted } from '../../../components/X/XModalRouted';
import { XMoney } from '../../../components/X/XMoney';
import { XButtonMutation } from '../../../components/X/XButtonMutation';
import { XWithRole } from '../../../components/X/XWithRole';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { XLink } from '../../../components/X/XLink';

const DealsForm = withDealAlterCombined((props) => (
    <DealForm
        mutation={props.alter}
        defaultValues={props.data.deal}
    />
));

const RemoveButton = withDealRemove((props) => {
    return (<XButtonMutation mutation={props.remove}>Remove</XButtonMutation>);
});

export default withApp('viewer', withDeal((props) => {
    return (
        <AppContent>
            <XHead title={props.data.deal.title} />
            <XModalRouted title="Edit Deal" query="edit">
                <DealsForm />
            </XModalRouted>
            <XCard shadow="medium" separators={true}>
                <XCard.Header text={props.data.deal.title} description="Deal" bullet={props.data.deal.status}>
                    <XWithRole role="super-admin">
                        <RemoveButton />
                    </XWithRole>
                    <XButton query={{ field: 'edit', value: 'true' }}>Edit</XButton>
                </XCard.Header>
                <XCard.PropertyColumns>
                    <XCard.PropertyList title="Deal Info">
                        {props.data.deal.price && (<XCard.Property title="Price"><XMoney value={props.data.deal.price} /></XCard.Property>)}
                        {props.data.deal.price && props.data.deal.extrasArea && (<XCard.Property title="Price $/Sq ft"><XMoney value={props.data.deal.price / props.data.deal.extrasArea} /></XCard.Property>)}
                        {props.data.deal.extrasTaxBill && (<XCard.Property title="Last Tax Bill"><XMoney value={props.data.deal.extrasTaxBill} /></XCard.Property>)}
                        {props.data.deal.extrasTaxBill && props.data.deal.extrasArea && (<XCard.Property title="Tax/Sq. Ft."><XMoney value={props.data.deal.extrasTaxBill / props.data.deal.extrasArea} /></XCard.Property>)}
                        {props.data.deal.extrasCompany && (<XCard.Property title="Company">{props.data.deal.extrasCompany}</XCard.Property>)}
                        {props.data.deal.extrasAttorney && (<XCard.Property title="Seller's Attorney">{props.data.deal.extrasAttorney}</XCard.Property>)}
                        {props.data.deal.extrasReferee && (<XCard.Property title="Refereee">{props.data.deal.extrasReferee}</XCard.Property>)}
                    </XCard.PropertyList>
                    <XCard.PropertyList title="Parcel">
                        {props.data.deal.parcel && (<XCard.Property title="Parcel ID"><XLink path={'/parcels/' + props.data.deal.parcel.id}>{props.data.deal.parcel.title}</XLink></XCard.Property>)}
                        {props.data.deal.location && (<XCard.Property title="Location">{props.data.deal.location}</XCard.Property>)}
                        {props.data.deal.address && (<XCard.Property title="Address">{props.data.deal.address}</XCard.Property>)}
                        {props.data.deal.extrasLotShape && (<XCard.Property title="Lot Shape">{props.data.deal.extrasLotShape}</XCard.Property>)}
                        {props.data.deal.extrasLotSize && (<XCard.Property title="Lot Size">{props.data.deal.extrasLotSize}</XCard.Property>)}
                    </XCard.PropertyList>
                </XCard.PropertyColumns>
            </XCard>
            {/* {props.data.deal.parcel && (
                <XCard shadow="medium" separators={true}>
                    <XCard.Header text={'Parcel #' + props.data.deal.parcel.title} />
                </XCard>
            )} */}
            {props.data.deal.parcel && props.data.deal.parcel.geometry && (
                <ParcelMaps id={props.data.deal.parcel.id} geometry={props.data.deal.parcel.geometry} />
            )}
        </AppContent>
    );
}));