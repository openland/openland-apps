import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { AppContent } from '../../../components/App/AppContent';
import { withDeal, withDealAlterCombined, withDealRemove } from '../../../api/';
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
import { XArea } from '../../../components/X/XArea';
import { XZoningCode } from '../../../components/X/XZoningCode';
import { XDimensions } from '../../../components/X/XDimensions';
import { XView } from '../../../components/X/XView';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { ProjectTypes } from '../../../components/ProjectTypes';
import { Text } from '../../../strings';
import { XHeader } from '../../../components/X/XHeader';

const DealsForm = withDealAlterCombined((props) => (
    <DealForm
        mutation={props.alter}
        defaultValues={props.data.deal}
    />
));

const RemoveButton = withDealRemove((props) => {
    return (<XButtonMutation mutation={props.remove}>Remove</XButtonMutation>);
});

export default withApp('Deal', 'viewer', withDeal((props) => {

    let bulletText: string | undefined;
    let bulletColor: 'red' | 'yellow' | 'blue' | 'green' | undefined;
    if (props.data.deal.status === 'CLOSED') {
        bulletText = 'Closed';
        bulletColor = 'green';
    }
    if (props.data.deal.status === 'ACTIVE') {
        if (props.data.deal.statusDescription) {
            bulletText = props.data.deal.statusDescription;
        } else {
            bulletText = 'Active';
        }
        bulletColor = 'blue';
    }
    if (props.data.deal.status === 'ON_HOLD') {
        bulletText = 'Adjourned';
        bulletColor = 'yellow';
    }

    let area = props.data.deal.parcel && props.data.deal.parcel.extrasArea != null ? props.data.deal.parcel.extrasArea : null;

    return (
        <>
            <XHead title={props.data.deal.title} />
            <XModalRouted title="Edit Deal" query="edit">
                <DealsForm />
            </XModalRouted>
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XHeader text={props.data.deal.title} description="Deal" bullet={bulletText} bulletColor={bulletColor}>
                        <XWithRole role="super-admin">
                            <RemoveButton />
                        </XWithRole>
                        <XButton query={{ field: 'edit', value: 'true' }}>Edit</XButton>
                    </XHeader>
                    <XCard.PropertyColumns>
                        <XCard.PropertyList title="Deal Info">
                            {props.data.deal.price && (<XCard.Property title="Price"><XMoney value={props.data.deal.price} /></XCard.Property>)}
                            {props.data.deal.price && area && (<XCard.Property title="Price $/Sq ft"><XMoney value={props.data.deal.price / area} /></XCard.Property>)}
                            {props.data.deal.extrasTaxBill && (<XCard.Property title="Last Tax Bill"><XMoney value={props.data.deal.extrasTaxBill} /></XCard.Property>)}
                            {props.data.deal.extrasTaxBill && area && (<XCard.Property title="Tax/Sq. Ft."><XMoney value={props.data.deal.extrasTaxBill / area} /></XCard.Property>)}
                            {props.data.deal.extrasCompany && (<XCard.Property title="Company">{props.data.deal.extrasCompany}</XCard.Property>)}
                            {props.data.deal.extrasAttorney && (<XCard.Property title="Seller's Attorney">{props.data.deal.extrasAttorney}</XCard.Property>)}
                            {props.data.deal.extrasReferee && (<XCard.Property title="Refereee">{props.data.deal.extrasReferee}</XCard.Property>)}
                        </XCard.PropertyList>
                        <XCard.PropertyList title="Parcel">
                            {props.data.deal.parcel && (<XCard.Property title="Parcel ID"><XLink path={'/parcels/' + props.data.deal.parcel.id}>{props.data.deal.parcel.title}</XLink></XCard.Property>)}
                            {props.data.deal.parcel && props.data.deal.parcel.extrasZoning && (<XCard.Property title="Zoning"><XZoningCode codes={props.data.deal.parcel.extrasZoning} /></XCard.Property>)}
                            {props.data.deal.location && (<XCard.Property title="Location">{props.data.deal.location}</XCard.Property>)}
                            {props.data.deal.address && (<XCard.Property title="Address">{props.data.deal.address}</XCard.Property>)}
                            {area != null && (<XCard.Property title="Area"><XArea area={area} /></XCard.Property>)}
                            {props.data.deal.parcel && props.data.deal.parcel.extrasShapeType &&
                                <XCard.Property title="Parcel Shape">{props.data.deal.parcel.extrasShapeType}</XCard.Property>
                            }
                            {props.data.deal.parcel && props.data.deal.parcel!!.extrasShapeSides && props.data.deal.parcel!!.extrasShapeSides!!.length > 0 &&
                                <XCard.Property title="Parcel Dimensions"> <XDimensions dimensions={props.data.deal.parcel!!.extrasShapeSides!!} /></XCard.Property>
                            }
                            <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                                {props.data.deal.parcel && props.data.deal.parcel.extrasAnalyzed !== true &&
                                    <XCard.Property title="Compatible buildings">
                                        <XView direction="row">
                                            <XTooltip marginLeft={0} title={Text.hint_too_complex} />
                                            {Text.text_too_complex}
                                        </XView>
                                    </XCard.Property>
                                }
                                {props.data.deal.parcel && props.data.deal.parcel.extrasAnalyzed === true && props.data.deal.parcel.extrasFitProjects &&
                                    <XCard.Property title="Compatible buildings"><ProjectTypes types={props.data.deal.parcel.extrasFitProjects!!} /></XCard.Property>
                                }
                            </XWithRole>
                        </XCard.PropertyList>
                    </XCard.PropertyColumns>
                </XCard>
                {props.data.deal.parcel && props.data.deal.parcel.geometry && (
                    <ParcelMaps id={props.data.deal.parcel.id} geometry={props.data.deal.parcel.geometry} />
                )}
            </AppContent>
        </>
    );
}));