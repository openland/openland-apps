import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcel } from '../../../api/';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { XHead } from '../../../components/X/XHead';
import { PermitType } from '../../../components/PermitType';
import { XWithRole } from '../../../components/X/XWithRole';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { trackEvent } from '../../../utils/analytics';
import { XHorizontal } from 'openland-x/XHorizontal';
import { sourceFromPoint, sourceFromGeometry } from '../../../utils/map';
import { OpportunitiButton } from '../../../components/OpportunityButton';
import { XForm } from '../../../components/X/XForm';
import { XHeader } from 'openland-x/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XContent } from 'openland-x/XContent';
import { XVertical } from 'openland-x/XVertical';
import { ParcelNumber } from '../../../components/ParcelNumber';
import { XSwitcher } from './../../../components/X/XSwitcher';
import { XLinkExternal } from 'openland-x/XLinkExternal';
import { XCardProperty } from './../../../components/X/XCardProperty';
import { XButton } from 'openland-x/XButton';
import { XDimensions } from 'openland-x-format/XDimensions';
import { XDate } from 'openland-x-format/XDate';
import { XMapPointLayer } from 'openland-x-map/XMapPointLayer';
import { XMapSource } from 'openland-x-map/XMapSource';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { XAngle } from 'openland-x-format/XAngle';
import { ZoningMetrics } from '../../../components/ZoningMetrics';
import { XTable } from 'openland-x/XTable';
import { XView } from 'openland-x/XView';
import { XTitle } from 'openland-x/XTitle';
import { XMapSmall } from 'openland-x-map/XMapSmall';

export default withApp('Parcel', 'viewer', withParcel((props) => {

    const detailsPath = '/parcels/' + props.data.item.id;
    const linksPath = '/parcels/' + props.data.item.id + '/links';
    const notesPath = '/parcels/' + props.data.item.id + '/notes';
    const zoningPath = '/parcels/' + props.data.item.id + '/zoning';

    return (
        <>
            <XHead title={['Parcel #' + props.data.item.number.title]} />
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
                        <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']}>
                            <OpportunitiButton
                                parcelId={props.data!!.item!!.id}
                                opportunityId={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.id : undefined}
                                opportunityState={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.state : undefined}
                            />
                        </XWithRole>
                        <XButton
                            style="ghost"
                            text="Favorite"
                            // icon={props.data!!.item!!.likes.liked ? 'favorite' : 'favorite_border'}
                            onClick={(e) => {
                                e.preventDefault();
                                if (props.data!!.item!!.likes.liked) {
                                    trackEvent('Unlike Parcel', { id: props.data!!.item!!.id });
                                    (props as any).doUnlike({
                                        optimisticResponse: {
                                            __typename: 'Mutation',
                                            unlikeParcel: {
                                                __typename: 'Parcel',
                                                id: props.data!!.item!!.id,
                                                likes: {
                                                    __typename: 'Likes',
                                                    liked: false,
                                                    count: Math.max(0, props.data!!.item!!.likes!!.count!! - 1)
                                                }
                                            },
                                        }
                                    });
                                } else {
                                    trackEvent('Like Parcel', { id: props.data!!.item!!.id });
                                    (props as any).doLike({
                                        optimisticResponse: {
                                            __typename: 'Mutation',
                                            likeParcel: {
                                                __typename: 'Parcel',
                                                id: props.data!!.item!!.id,
                                                likes: {
                                                    __typename: 'Likes',
                                                    liked: true,
                                                    count: props.data!!.item!!.likes!!.count!! + 1
                                                }
                                            },
                                        }
                                    });
                                }
                            }}
                        />
                    </XHeader>

                    <XCardProperty>
                        <XSwitcher alignSelf="flex-start" flatStyle={true}>
                            <XSwitcher.Item path={detailsPath} >Parcel</XSwitcher.Item>
                            <XSwitcher.Item path={linksPath} count={props.data.item.links.length}>Links</XSwitcher.Item>
                            <XSwitcher.Item path={notesPath} count={props.data.item.userData && props.data.item.userData.notes && props.data.item.userData.notes.length > 0 ? 1 : undefined}>Notes</XSwitcher.Item>
                            {/* <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}> */}
                            <XSwitcher.Item path={zoningPath} >Zoning</XSwitcher.Item>
                            {/* </XWithRole> */}
                        </XSwitcher>
                    </XCardProperty>

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
                                                    <XCard.PropertyList>
                                                        <XCard.Property title="Construction Type">{v.title}</XCard.Property>
                                                        {v.width && v.height && <XCard.Property title="Dimensions"><XDimensions value={[v.width, v.height]} /></XCard.Property>}
                                                        {v.angle && <XCard.Property title="Azimuth"><XAngle value={v.angle} /></XCard.Property>}
                                                        {v.center && <XCard.Property title="Location">{v.center.latitude.toFixed(6)},{v.center.longitude.toFixed(6)}</XCard.Property>}
                                                    </XCard.PropertyList>
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
                            {props.data.item.permits.length > 0 && (
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
                        </>)}

                    {props.router.path === linksPath && props.data.item.links.length > 0 && (
                        <XCard.PropertyList title="Links">
                            {props.data.item.links.map((v, i) => (
                                <XCard.Property key={'link-' + i} title={v.title}><XLinkExternal href={v.url}>{v.url}</XLinkExternal></XCard.Property>
                            ))}
                        </XCard.PropertyList>
                    )}

                    {props.router.path === zoningPath && props.data.item.extrasZoning && props.data.item.extrasZoning!!.length > 0 &&
                        // <XWithRole role={['super-admin', 'software-developer', 'parcel-zoning-metrics']}>
                        <ZoningMetrics codes={props.data.item!!.extrasZoning!!} />
                        // </XWithRole>
                    }

                    {props.router.path === notesPath && (
                        <>
                            <XForm defaultValues={{ notes: props.data.item.userData ? props.data.item.userData.notes : '' }} submitMutation={props.parcelNotes} mutationDirect={true}>
                                <XContent>
                                    <XForm.TextArea field="notes" placeholder="Notes" />
                                </XContent>
                                <XForm.Footer>
                                    <XForm.Submit style="primary" text="Save" />
                                </XForm.Footer>
                            </XForm>
                        </>)}

                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));