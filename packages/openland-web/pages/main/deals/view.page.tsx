import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withDeal, withDealAlterCombined, withDealRemove } from '../../../api/';
import { DealForm } from './components/DealForm';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { XTooltip } from '../../../components/Incubator/XTooltip';
import { ProjectTypes } from '../../../components/ProjectTypes';
import { Text } from '../../../strings';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { sourceFromGeometry, sourceFromPoint } from '../../../utils/map';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
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
import { XView } from 'openland-x-layout/XView';
import { XTitle } from 'openland-x/XTitle';
import { XModalRouted } from 'openland-x-modal/XModalRouted';
import { XMapSmall } from 'openland-x-map/XMapSmall';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XPropertyColumns, XPropertyList, XProperty } from 'openland-x/XProperty';

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
            <XDocumentHead title={props.data.deal.title} />
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
                    <XPropertyColumns>
                        <XPropertyList title="Deal Info">
                            {props.data.deal.price && (<XProperty title="Price"><XMoney value={props.data.deal.price} /></XProperty>)}
                            {props.data.deal.price && area && (<XProperty title="Price $/Sq ft"><XMoney value={props.data.deal.price / area} /></XProperty>)}
                            {props.data.deal.extrasTaxBill && (<XProperty title="Last Tax Bill"><XMoney value={props.data.deal.extrasTaxBill} /></XProperty>)}
                            {props.data.deal.extrasTaxBill && area && (<XProperty title="Tax/Sq. Ft."><XMoney value={props.data.deal.extrasTaxBill / area} /></XProperty>)}
                            {props.data.deal.extrasCompany && (<XProperty title="Company">{props.data.deal.extrasCompany}</XProperty>)}
                            {props.data.deal.extrasAttorney && (<XProperty title="Seller's Attorney">{props.data.deal.extrasAttorney}</XProperty>)}
                            {props.data.deal.extrasReferee && (<XProperty title="Refereee">{props.data.deal.extrasReferee}</XProperty>)}
                        </XPropertyList>
                        <XPropertyList title="Parcel">
                            {props.data.deal.parcel && (<XProperty title="Parcel ID"><XLink path={'/parcels/' + props.data.deal.parcel.id}>{props.data.deal.parcel.number.title}</XLink></XProperty>)}
                            {props.data.deal.parcel && props.data.deal.parcel.extrasZoning && (<XProperty title="Zoning"><ZoningCode codes={props.data.deal.parcel.extrasZoning} /></XProperty>)}
                            {props.data.deal.location && (<XProperty title="Location">{props.data.deal.location}</XProperty>)}
                            {props.data.deal.address && (<XProperty title="Address">{props.data.deal.address}</XProperty>)}
                            {area != null && (<XProperty title="Area"><XArea value={area} /></XProperty>)}
                            {props.data.deal.parcel && props.data.deal.parcel.extrasShapeType &&
                                <XProperty title="Parcel Shape">{props.data.deal.parcel.extrasShapeType}</XProperty>
                            }
                            {props.data.deal.parcel && props.data.deal.parcel!!.extrasShapeSides && props.data.deal.parcel!!.extrasShapeSides!!.length > 0 &&
                                <XProperty title="Parcel Dimensions"> <XDimensions value={props.data.deal.parcel!!.extrasShapeSides!!} /></XProperty>
                            }
                            <XWithRole role={['feature-customer-kassita', 'editor', 'software-developer', 'super-admin']}>
                                {props.data.deal.parcel && props.data.deal.parcel.extrasAnalyzed !== true &&
                                    <XProperty title="Compatible buildings">
                                        <XView direction="row">
                                            <XTooltip marginLeft={0} title={Text.hint_too_complex} />
                                            {Text.text_too_complex}
                                        </XView>
                                    </XProperty>
                                }
                                {props.data.deal.parcel && props.data.deal.parcel.extrasAnalyzed === true && props.data.deal.parcel.extrasFitProjects &&
                                    <XProperty title="Compatible buildings"><ProjectTypes types={props.data.deal.parcel.extrasFitProjects!!} /></XProperty>
                                }
                            </XWithRole>
                        </XPropertyList>
                    </XPropertyColumns>
                    {props.data.deal.parcel && props.data.deal.parcel!!.city.name === 'New York' && (props.data.deal.parcel!!.extrasVacant === null || props.data.deal.parcel!!.extrasVacant) && props.data.deal.parcel!!.compatibleBuildings && props.data.deal.parcel!!.compatibleBuildings!!.length > 0 && (
                        <XVertical>
                            <XContent>
                                <XTitle>Compatible Constructions</XTitle>
                            </XContent>
                            {props.data.deal!!.parcel!!.compatibleBuildings!!.map((v, i) => (
                                <XHorizontal>
                                    <XView grow={1} basis={0}>
                                        <XPropertyList>
                                            <XProperty title="Construction Type">{v.title}</XProperty>
                                            {v.width && v.height && <XProperty title="Dimensions"><XDimensions value={[v.width, v.height]} /></XProperty>}
                                            {v.angle && <XProperty title="Azimuth"><XAngle value={v.angle} /></XProperty>}
                                            {v.center && <XProperty title="Location">{v.center.latitude.toFixed(6)},{v.center.longitude.toFixed(6)}</XProperty>}
                                        </XPropertyList>
                                    </XView>
                                    <XView grow={1} basis={0}>
                                        {v.center && <XMapSmall focusPosition={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                            <XMapSource id={'parcel'} data={sourceFromGeometry(props.data.deal.parcel!!.geometry!!)} />
                                            <XMapPolygonLayer source="parcel" layer="parcel" />

                                            {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                            {v.center && <XMapPointLayer source="center" layer="center" />}

                                            {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                            {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                        </XMapSmall>}
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