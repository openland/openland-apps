import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withDeal, withDealAlterCombined, withDealRemove } from '../../../api/';
import { XCard } from '../../../components/X/XCard';
import { DealForm } from '../../../components/DealForm';
import { XHead } from '../../../components/X/XHead';
import { XModalRouted } from '../../../components/X/XModalRouted';
import { XWithRole } from '../../../components/X/XWithRole';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { XView } from '../../../components/X/XView';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { ProjectTypes } from '../../../components/ProjectTypes';
import { Text } from '../../../strings';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { sourceFromGeometry, sourceFromPoint } from '../../../utils/map';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XContent } from '../../../components/X/XContent';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';
import { ParcelNumber } from '../../../components/ParcelNumber';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XButtonMutation } from 'openland-x/XButtonMutation';
import { XArea } from 'openland-x-format/XArea';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XMoney } from 'openland-x-format/XMoney';
import { XMapPointLayer } from 'openland-x-map/XMapPointLayer';
import { XMapSource } from 'openland-x-map/XMapSource';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { XAngle } from 'openland-x-format/XAngle';
import { ZoningCode } from '../../../components/ZoningCode';

const DealsForm = withDealAlterCombined((props) => (
    <DealForm
        mutation={props.alter}
        defaultValues={props.data.deal}
    />
));

const RemoveButton = withDealRemove((props) => {
    return (<XButtonMutation mutation={props.remove} style="danger" text="Remove" />);
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
            <Scaffold>
                <Scaffold.Content>
                    <XHeader
                        text={props.data.deal.title}
                        description={props.data.deal.parcel ? <ParcelNumber city={props.data.deal.parcel!!.city.name} id={props.data.deal.parcel!!.number} /> : 'unknown parcel'}
                        bullet={bulletText} bulletColor={bulletColor}
                    >
                        <XWithRole role="super-admin">
                            <RemoveButton />
                        </XWithRole>
                        <XButton query={{ field: 'edit', value: 'true' }} text="Edit" />
                    </XHeader>
                    {/* <XCard shadow="medium" separators={true}> */}
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
                            {props.data.deal.parcel && (<XCard.Property title="Parcel ID"><XLink path={'/parcels/' + props.data.deal.parcel.id}>{props.data.deal.parcel.number.title}</XLink></XCard.Property>)}
                            {props.data.deal.parcel && props.data.deal.parcel.extrasZoning && (<XCard.Property title="Zoning"><ZoningCode codes={props.data.deal.parcel.extrasZoning} /></XCard.Property>)}
                            {props.data.deal.location && (<XCard.Property title="Location">{props.data.deal.location}</XCard.Property>)}
                            {props.data.deal.address && (<XCard.Property title="Address">{props.data.deal.address}</XCard.Property>)}
                            {area != null && (<XCard.Property title="Area"><XArea value={area} /></XCard.Property>)}
                            {props.data.deal.parcel && props.data.deal.parcel.extrasShapeType &&
                                <XCard.Property title="Parcel Shape">{props.data.deal.parcel.extrasShapeType}</XCard.Property>
                            }
                            {props.data.deal.parcel && props.data.deal.parcel!!.extrasShapeSides && props.data.deal.parcel!!.extrasShapeSides!!.length > 0 &&
                                <XCard.Property title="Parcel Dimensions"> <XDimensions value={props.data.deal.parcel!!.extrasShapeSides!!} /></XCard.Property>
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
                    {props.data.deal.parcel && props.data.deal.parcel!!.city.name === 'New York' && (props.data.deal.parcel!!.extrasVacant === null || props.data.deal.parcel!!.extrasVacant) && props.data.deal.parcel!!.compatibleBuildings && props.data.deal.parcel!!.compatibleBuildings!!.length > 0 && (
                        <XVertical>
                            <XContent>
                                <XTitle>Compatible Constructions</XTitle>
                            </XContent>
                            {props.data.deal!!.parcel!!.compatibleBuildings!!.map((v, i) => (
                                <XHorizontal>
                                    <XView grow={1} basis={0}>
                                        <XCard.PropertyList>
                                            <XCard.Property title="Construction Type">{v.title}</XCard.Property>
                                            {v.width && v.height && <XCard.Property title="Dimensions"><XDimensions value={[v.width, v.height]} /></XCard.Property>}
                                            {v.angle && <XCard.Property title="Azimuth"><XAngle value={v.angle} /></XCard.Property>}
                                            {v.center && <XCard.Property title="Location">{v.center.latitude.toFixed(6)},{v.center.longitude.toFixed(6)}</XCard.Property>}
                                        </XCard.PropertyList>
                                    </XView>
                                    <XView grow={1} basis={0}>
                                        {v.center && <XCard.Map focusLocation={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                            <XMapSource id={'parcel'} data={sourceFromGeometry(props.data.deal.parcel!!.geometry!!)} />
                                            <XMapPolygonLayer source="parcel" layer="parcel" />

                                            {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                            {v.center && <XMapPointLayer source="center" layer="center" />}

                                            {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                            {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                        </XCard.Map>}
                                    </XView>
                                </XHorizontal>
                            ))}
                        </XVertical>
                    )}
                    {props.data.deal.parcel && props.data.deal.parcel.geometry && (
                        <>
                            <XContent>
                                <XTitle>Location</XTitle>
                            </XContent>
                            <XContent>
                                <ParcelMaps id={props.data.deal.parcel.id} geometry={props.data.deal.parcel.geometry} />
                            </XContent>
                        </>
                    )}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));