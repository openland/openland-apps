import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withParcel } from '../../../api/';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { PermitType } from '../../../components/PermitType';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { sourceFromPoint, sourceFromGeometry } from '../../../utils/map';
import { OpportunitiButton } from '../../../components/OpportunityButton';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XContent } from 'openland-x-layout/XContent';
import { XVertical } from 'openland-x-layout/XVertical';
import { ParcelNumber } from '../../../components/ParcelNumber';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XButton } from 'openland-x/XButton';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XDate } from 'openland-x-format/XDate';
import { XMapPointLayer } from 'openland-x-map/XMapPointLayer';
import { XMapSource } from 'openland-x-map/XMapSource';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { XAngle } from 'openland-x-format/XAngle';
import { ZoningMetrics } from '../../../components/ZoningMetrics';
import { XTable } from 'openland-x/XTable';
import { XView } from 'openland-x-layout/XView';
import { XTitle } from 'openland-x/XTitle';
import { XMapSmall } from 'openland-x-map/XMapSmall';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XForm } from 'openland-x-forms/XForm';
import { XProperty, XPropertyList } from 'openland-x/XProperty';
import { FolderButton } from '../../../components/FolderButton';
import { XFooter } from 'openland-x/XFooter';

export default withApp('Parcel', 'viewer', withParcel((props) => {

    const detailsPath = '/parcels/' + props.data.item.id;
    const linksPath = '/parcels/' + props.data.item.id + '/links';
    const notesPath = '/parcels/' + props.data.item.id + '/notes';
    const zoningPath = '/parcels/' + props.data.item.id + '/zoning';
    const permitsPath = '/parcels/' + props.data.item.id + '/permits';
    const nearbyTransitPath = '/parcels/' + props.data.item.id + '/nearby_transit';

    return (
        <>
            <XDocumentHead title={['Parcel #' + props.data.item.number.title]} />
            <Scaffold>
                <Scaffold.Content bottomOffset={true}>
                    <XHeader
                        text={props.data.item.address || 'No address'}
                        description={<ParcelNumber city={props.data.item.city.name} id={props.data.item.number} />}
                        bullet={props.data!!.item!!.extrasOwnerPublic ? 'public' : (props.data.item.metadata.available ? 'ON SALE' : undefined)}
                        truncateDescription={true}
                    >
                        <XWithRole role={['super-admin', 'editor']}>
                            <XButton path={'/parcels/' + props.data.item.id + '/edit'} text="Edit" />
                        </XWithRole>
                        <>
                            <XWithRole role={['feature-customer-kassita']}>
                                <OpportunitiButton
                                    parcelId={props.data!!.item!!.id}
                                    opportunityId={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.id : undefined}
                                    opportunityState={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.state : undefined}
                                />
                            </XWithRole>
                            <XWithRole role={['feature-customer-kassita']} negate={true}>
                                <FolderButton folder={props.data!!.item.folder} parcelId={props.data!!.item!!.id} width={160} />
                            </XWithRole>
                        </>
                    </XHeader>

                    <XProperty>
                        <XSwitcher alignSelf="flex-start" flatStyle={true}>
                            <XSwitcher.Item path={detailsPath} >Parcel</XSwitcher.Item>
                            {props.data.item.permits.length > 0 && (
                                <XSwitcher.Item path={permitsPath} count={props.data.item.permits.length}>Building Permits</XSwitcher.Item>
                            )}
                            {(props.data.item.extrasMetroDistance !== null
                                || props.data.item.extrasTrainLocalDistance !== null
                                || props.data.item.extrasTrainDistance !== null) && (
                                    <XSwitcher.Item path={nearbyTransitPath} >Nearby Transit</XSwitcher.Item>
                                )}
                            {props.data.item.links.length > 0 && (
                                <XSwitcher.Item path={linksPath} count={props.data.item.links.length}>Links</XSwitcher.Item>
                            )}
                            <XSwitcher.Item path={notesPath} count={props.data.item.userData && props.data.item.userData.notes && props.data.item.userData.notes.length > 0 ? 1 : undefined}>Notes</XSwitcher.Item>
                            <XWithRole role={['feature-customer-kassita']}>
                                <XSwitcher.Item path={zoningPath} >Zoning</XSwitcher.Item>
                            </XWithRole>
                        </XSwitcher>
                    </XProperty>

                    {props.router.path === detailsPath && (
                        <>
                            <ParcelProperties item={props.data.item} />

                            {props.data.item!!.city.name === 'New York' && (props.data.item!!.extrasVacant === null || props.data.item!!.extrasVacant) && props.data.item.compatibleBuildings && (props.data.item.compatibleBuildings.length > 0) && (
                                <>
                                    <XContent>
                                        <XTitle>Compatible Constructions</XTitle>
                                    </XContent>
                                    <XVertical>
                                        {props.data.item.compatibleBuildings.map((v, i) => (
                                            <XHorizontal key={v.key + '-' + i}>
                                                <XView grow={1} basis={0}>
                                                    <XPropertyList>
                                                        <XProperty title="Construction Type">{v.title}</XProperty>
                                                        {v.width && v.height && <XProperty title="Dimensions"><XDimensions value={[v.width, v.height]} /></XProperty>}
                                                        {v.angle && <XProperty title="Azimuth"><XAngle value={v.angle} /></XProperty>}
                                                        {v.center && <XProperty title="Location">{v.center.latitude.toFixed(6)},{v.center.longitude.toFixed(6)}</XProperty>}
                                                    </XPropertyList>
                                                </XView>
                                                <XView grow={1} basis={0}>
                                                    <XView css={{ paddingRight: 24 }}>
                                                        {v.center && <XMapSmall focusPosition={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                                            <XMapSource id={'parcel'} data={sourceFromGeometry(props.data.item.geometry!!)} />
                                                            <XMapPolygonLayer source="parcel" layer="parcel" />

                                                            {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                                            {v.center && <XMapPointLayer source="center" layer="center" />}

                                                            {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                                            {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                                        </XMapSmall>}
                                                    </XView>
                                                </XView>
                                            </XHorizontal>
                                        ))}
                                    </XVertical>
                                </>
                            )}
                            {props.data.item.geometry && (
                                <>
                                    <XContent>
                                        <XTitle>Location</XTitle>
                                    </XContent>
                                    <XContent>
                                        <ParcelMaps id={props.data.item.id} geometry={props.data.item.geometry} />
                                    </XContent>
                                </>
                            )}

                        </>)}

                    {props.router.path === linksPath && props.data.item.links.length > 0 && (
                        <XPropertyList title="Links">
                            {props.data.item.links.map((v, i) => (
                                <XProperty key={'link-' + i} title={v.title} width={300}><XLinkExternal href={v.url}>{v.url}</XLinkExternal></XProperty>
                            ))}
                        </XPropertyList>
                    )}

                    {props.router.path === zoningPath && props.data.item.extrasZoning && props.data.item.extrasZoning!!.length > 0 &&
                        // <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}>
                        <XWithRole role={['feature-customer-kassita']}>
                            <ZoningMetrics codes={props.data.item!!.extrasZoning!!} />
                        </XWithRole>
                    }

                    {props.router.path === nearbyTransitPath && (props.data.item.extrasMetroDistance !== null
                        || props.data.item.extrasTrainLocalDistance !== null
                        || props.data.item.extrasTrainDistance !== null)
                        && (
                            <XPropertyList>
                                {props.data.item.extrasMetroDistance !== null &&
                                    <XProperty title="Muni Metro">{props.data.item.extrasMetroDistance} ({props.data.item.extrasMetroStation})</XProperty>
                                }
                                {props.data.item.extrasTrainLocalDistance !== null &&
                                    <XProperty title="BART">{props.data.item.extrasTrainLocalDistance} ({props.data.item.extrasTrainLocalStation})</XProperty>
                                }
                                {props.data.item.extrasTrainDistance !== null &&
                                    <XProperty title="Caltrain">{props.data.item.extrasTrainDistance} ({props.data.item.extrasTrainStation})</XProperty>
                                }
                            </XPropertyList>
                        )}

                    {props.router.path === permitsPath && props.data.item.permits.length > 0 && (
                        <>
                            <XHeader text="Building Permits for this Parcel" description={props.data.item.permits.length + ' permits'} />
                            <XTable>
                                <XTable.Header>
                                    <XTable.Cell width={120}>Created</XTable.Cell>
                                    <XTable.Cell width={150}>Permit ID</XTable.Cell>
                                    <XTable.Cell width={120}>Permit Type</XTable.Cell>
                                    <XTable.Cell width={170}>Status</XTable.Cell>
                                    <XTable.Cell>Description</XTable.Cell>
                                </XTable.Header>
                                <XTable.Body>
                                    {props.data.item.permits.map((v) => (
                                        <XTable.Row key={v.id} href={v.governmentalUrl!!}>
                                            <XTable.Cell>{v.createdAt && <XDate value={v.createdAt} />}</XTable.Cell>
                                            <XTable.Cell>{v.id}</XTable.Cell>
                                            <XTable.Cell>{v.type && <PermitType type={v.type!!} />}</XTable.Cell>
                                            <XTable.Cell>
                                                {v.status}
                                                {v.statusUpdatedAt && ' ('}
                                                {v.statusUpdatedAt && <XDate value={v.statusUpdatedAt} />}
                                                {v.statusUpdatedAt && ')'}
                                            </XTable.Cell>
                                            <XTable.Cell>{v.description}</XTable.Cell>
                                        </XTable.Row>
                                    ))}
                                </XTable.Body>
                            </XTable>
                        </>
                    )}

                    {props.router.path === notesPath && (
                        <>
                            <XForm defaultValues={{ notes: props.data.item.userData ? props.data.item.userData.notes : '' }} submitMutation={props.parcelNotes} mutationDirect={true}>
                                <XContent>
                                    <XForm.TextArea field="notes" placeholder="Notes" />
                                </XContent>
                                <XFooter>
                                    <XForm.Submit style="primary" text="Save" />
                                </XFooter>
                            </XForm>
                        </>)}

                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));