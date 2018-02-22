import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcel, ParcelTileSource, BlockTileSource } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton, XButtonLike } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { formatAddresses } from '../../../utils/Addresses';
import { AStreetViewModal } from '../../../components/App/AStreetViewModal';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { ParcelProperties } from '../../../components/ParcelProperties';
import { XHead } from '../../../components/X/XHead';

export default withApp(withParcel((props) => {
    return (
        <>
            <XHead title={['Statecraft', 'Parcel #' + props.data.item.title]} />
            <AppContent>
                <XCard shadow="medium" separators={true}>
                    <XCard.Hint title="Public" />
                    <XCard.Header text={'Parcel #' + props.data.item.title} description={formatAddresses(props.data.item.addresses)}>
                        <XCard.Header.Target>
                            <XButtonLike value={props.data!!.item!!.likes.liked}
                                onChange={(v) => {
                                    if (v) {
                                        (props as any).doLike();
                                    } else {
                                        (props as any).doUnlike();
                                    }
                                }}
                            />
                        </XCard.Header.Target>
                        {props.data.item.geometry && <AStreetViewModal geometry={props.data.item.geometry} />}
                        <XButton path={'/app/parcels/' + props.data.item.id + '/edit'}>Edit</XButton>
                    </XCard.Header>
                    <ParcelProperties item={props.data.item} />
                </XCard>
                {props.data.item.geometry && (
                    <XCard shadow="medium">
                        <XCard.Map focusLocation={{ ...findCenter(convertMapPatch(props.data.item.geometry)), zoom: 18 }}>
                            <ParcelTileSource layer="parcels" minZoom={16} />
                            <BlockTileSource layer="blocks" minZoom={12} />
                            <XMapPolygonLayer
                                source="parcels"
                                layer="parcels"
                                minZoom={16}
                                selectedId={props.data.item.id}
                                onClick={(v) => props.router.push('/app/parcels/' + v)}
                            />
                            <XMapPolygonLayer
                                source="blocks"
                                layer="blocks"
                                minZoom={12}
                                maxZoom={16}
                            />
                        </XCard.Map>
                    </XCard>
                )}
            </AppContent>
        </>
    )
}));