import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XTable } from '../../../components/X/XTable';
import { withParcel } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
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
import { XVertical } from '../../../components/X/XVertical';
import { sourceFromPoint, sourceFromGeometry } from '../../../utils/map';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XAngle } from '../../../components/X/XAngle';

export default withApp('Parcel', 'viewer', withParcel((props) => {
    
    return (
        <>
            <XHead title={['Parcel #' + props.data.item.title]} />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header
                        text={'Parcel #' + props.data.item.title}
                        description={formatAddresses(props.data.item.addresses, props.data.item.extrasAddress)}
                        bullet={props.data.item.metadata.available ? 'ON SALE' : undefined}
                        truncateDescription={true}
                    >
                        <XWithRole role={['super-admin', 'editor']}>
                            <XButton path={'/parcels/' + props.data.item.id + '/edit'}>Edit</XButton>
                        </XWithRole>
                        <XButton disabled={true} icon="lock">Owner</XButton>
                        {/* {props.data.item.geometry && <AStreetViewModal geometry={props.data.item.geometry} />} */}
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
                    </XCard.Header>
                    <ParcelProperties item={props.data.item} />
                </XCard>
                {props.data.item.geometry && (
                    <ParcelMaps id={props.data.item.id} geometry={props.data.item.geometry} />
                )}
                {props.data.item.compatibleBuildings && props.data.item.compatibleBuildings.length > 0 && (
                    <XVertical>
                        {props.data.item.compatibleBuildings.map((v, i) => (
                            <XCard key={v.key + '-' + i} shadow="medium">
                                <XHorizontal>
                                    <XView grow={1} basis={0}>
                                        <XCard.PropertyList>
                                            <XCard.Property title="Construction Type">{v.title}</XCard.Property>
                                            {v.width && v.height && <XCard.Property title="Dimensions"><XDimensions dimensions={[v.width, v.height]} /></XCard.Property>}
                                            {v.angle && <XCard.Property title="Angle"><XAngle value={v.angle} /></XCard.Property>}
                                        </XCard.PropertyList>
                                    </XView>
                                    <XView grow={1} basis={0}>
                                        {v.center && <XCard.Map focusLocation={{ latitude: v.center.latitude, longitude: v.center.longitude, zoom: 18 }}>
                                            <XMapSource id={'parcel'} data={sourceFromGeometry(props.data.item.geometry!!)} />
                                            <XMapPolygonLayer source="parcel" layer="parcel" />

                                            {v.center && <XMapSource id={'center'} data={sourceFromPoint(v.center!!.latitude, v.center!!.longitude)} />}
                                            {v.center && <XMapPointLayer source="center" layer="center" />}

                                            {v.shape && <XMapSource id={'shape'} data={sourceFromGeometry(v.shape)} />}
                                            {v.shape && <XMapPolygonLayer source="shape" layer="shape" />}
                                        </XCard.Map>}
                                    </XView>
                                </XHorizontal>
                            </XCard>
                        ))}
                    </XVertical>
                )}
                {props.data.item.permits.length > 0 && (
                    <XCard shadow="medium">
                        <XCard.Header text="Building Permits for this Parcel" description={props.data.item.permits.length + ' permits'} />
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
                    </XCard>
                )}
            </AppContent>
        </>
    );
}));