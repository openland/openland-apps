import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XTable } from '../../../components/X/XTable';
import { withParcel } from '../../../api/';
import { XButton } from '../../../components/X/XButton';
import { formatAddresses } from '../../../utils/Addresses';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { XHead } from '../../../components/X/XHead';
import { PermitType } from '../../../components/PermitType';
import { XDate } from '../../../components/X/XDate';
import { XWithRole } from '../../../components/X/XWithRole';
import { ParcelMaps } from '../../../components/ParcelMaps';
import { trackEvent } from '../../../utils/analytics';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XView } from '../../../components/X/XView';
import { XDimensions } from '../../../components/X/XDimensions';
import { XMapSource } from '../../../components/X/XMapSource';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { sourceFromPoint, sourceFromGeometry } from '../../../utils/map';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XAngle } from '../../../components/X/XAngle';
import { OpportunitiButton } from '../../../components/OpportunityButton';
import { XForm } from '../../../components/X/XForm';
import { XHeader } from '../../../components/X/XHeader';
import { Scaffold } from '../../../components/Scaffold';
import { XContent } from '../../../components/X/XContent';
import { XTitle } from '../../../components/X/XTitle';
import { XVertical } from '../../../components/X/XVertical';

export default withApp('Parcel', 'viewer', withParcel((props) => {

    return (
        <>
            <XHead title={['Parcel #' + props.data.item.title]} />
            <Scaffold>
                <Scaffold.Content bottomOffset={true}>
                    <XHeader
                        text={'Parcel #' + props.data.item.title}
                        description={formatAddresses(props.data.item.addresses, props.data.item.extrasAddress)}
                        bullet={props.data.item.metadata.available ? 'ON SALE' : undefined}
                        truncateDescription={true}
                    >
                        <XWithRole role={['super-admin', 'editor']}>
                            <XButton path={'/parcels/' + props.data.item.id + '/edit'}>Edit</XButton>
                        </XWithRole>
                        <XWithRole role={['super-admin', 'software-developer', 'feature-portfolio']}>
                            <OpportunitiButton
                                parcelId={props.data!!.item!!.id}
                                opportunityId={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.id : undefined}
                                opportunityState={props.data!!.item!!.opportunity ? props.data!!.item!!.opportunity!!.state : undefined}
                            />
                        </XWithRole>
                        <XButton
                            accent={true}
                            icon={props.data!!.item!!.likes.liked ? 'favorite' : 'favorite_border'}
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
                        >
                            Favorite
                        </XButton>
                    </XHeader>
                    <ParcelProperties item={props.data.item} />
                    <XContent>
                        <XTitle>Notes</XTitle>
                    </XContent>
                    <XForm defaultValues={{ notes: props.data.item.userData ? props.data.item.userData.notes : '' }} submitMutation={props.parcelNotes} mutationDirect={true}>
                        <XContent>
                            <XForm.TextArea field="notes" placeholder="Notes" />
                        </XContent>
                        <XForm.Footer>
                            <XForm.Submit style="dark">Save</XForm.Submit>
                        </XForm.Footer>
                    </XForm>
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
                                                {v.width && v.height && <XCard.Property title="Dimensions"><XDimensions dimensions={[v.width, v.height]} /></XCard.Property>}
                                                {v.angle && <XCard.Property title="Azimuth"><XAngle value={v.angle} /></XCard.Property>}
                                                {v.center && <XCard.Property title="Location">{v.center.latitude.toFixed(6)},{v.center.longitude.toFixed(6)}</XCard.Property>}
                                            </XCard.PropertyList>
                                        </XView>
                                        <XView grow={1} basis={0}>
                                            <XView css={{ paddingRight: 24 }}>
                                                {v.center && <XCard.Map focusLocation={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                                    <XMapSource id={'parcel'} data={sourceFromGeometry(props.data.item.geometry!!)} />
                                                    <XMapPolygonLayer source="parcel" layer="parcel" />

                                                    {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                                    {v.center && <XMapPointLayer source="center" layer="center" />}

                                                    {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                                    {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                                </XCard.Map>}
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
                                            <XTable.Cell>{v.createdAt && <XDate date={v.createdAt} />}</XTable.Cell>
                                            <XTable.Cell>{v.id}</XTable.Cell>
                                            <XTable.Cell>{v.type && <PermitType type={v.type!!} />}</XTable.Cell>
                                            <XTable.Cell>
                                                {v.status}
                                                {v.statusUpdatedAt && ' ('}
                                                {v.statusUpdatedAt && <XDate date={v.statusUpdatedAt} />}
                                                {v.statusUpdatedAt && ')'}
                                            </XTable.Cell>
                                            <XTable.Cell>{v.description}</XTable.Cell>
                                        </XTable.Row>
                                    ))}
                                </XTable.Body>
                            </XTable>
                        </>
                    )}
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));