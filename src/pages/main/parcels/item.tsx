import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XTable } from '../../../components/X/XTable';
import { withParcel, ParcelTileSource, BlockTileSource } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { formatAddresses } from '../../../utils/Addresses';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { XHead } from '../../../components/X/XHead';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XStreetView } from '../../../components/X/XStreetView';
import { PermitType } from '../../../components/PermitType';
import { XDate } from '../../../components/X/XDate';
import { XWithRole } from '../../../components/X/XWithRole';

const Wrapper = Glamorous(XCard)({
    flexGrow: 1,
    height: '360px'
});

const StreetView = Glamorous(XStreetView)({
    height: '360px',
    width: '100%'
});

export default withApp('viewer', withParcel((props) => {
    return (
        <>
            <XHead title={['Parcel #' + props.data.item.title]} />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Header
                        text={'Parcel #' + props.data.item.title}
                        description={formatAddresses(props.data.item.addresses)}
                        bullet={props.data.item.metadata.available ? 'ON SALE' : undefined}
                        truncateDescription={true}
                    >
                        <XWithRole role="super-admin">
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
                <XHorizontal>
                    <Wrapper shadow="medium">
                        {props.data.item.geometry && (
                            <XCard.Map focusLocation={{ ...findCenter(convertMapPatch(props.data.item.geometry)), zoom: 18 }}>
                                <ParcelTileSource layer="parcels" minZoom={16} />
                                <BlockTileSource layer="blocks" minZoom={12} />
                                <XMapPolygonLayer
                                    source="parcels"
                                    layer="parcels"
                                    minZoom={16}
                                    selectedId={props.data.item.id}
                                    onClick={(v) => props.router.push('/parcels/' + v)}
                                />
                                <XMapPolygonLayer
                                    source="blocks"
                                    layer="blocks"
                                    minZoom={12}
                                    maxZoom={16}
                                />
                            </XCard.Map>)}
                    </Wrapper>
                    <Wrapper shadow="medium">
                        {props.data.item.geometry && (
                            <StreetView key={props.data.item.id} location={findCenter(convertMapPatch(props.data.item.geometry))} />
                        )}
                    </Wrapper>
                </XHorizontal>
                {props.data.item.permits.length > 7 && (
                    <XCard shadow="medium">
                        <XCard.Header text="Building Permits for this Parcel" description={props.data.item.permits.length + ' permits'} />
                        <XTable>
                            <XTable.Header>
                                <XTable.Cell>Created</XTable.Cell>
                                <XTable.Cell>Permit ID</XTable.Cell>
                                <XTable.Cell>Permit Type</XTable.Cell>
                                <XTable.Cell>Status</XTable.Cell>
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