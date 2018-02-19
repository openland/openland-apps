import * as React from 'react';
import { withApp } from '../../../components/App/withApp';
import { XCard } from '../../../components/X/XCard';
import { withParcel, ParcelTileSource, BlockTileSource } from '../../../api/index';
import { AppContent } from '../../../components/App/AppContent';
import { XButton } from '../../../components/X/XButton';
import { convertMapPatch, findCenter } from '../../../utils/map';
import { formatAddresses } from '../../../utils/Addresses';
import { AStreetViewModal } from '../../../components/App/AStreetViewModal';
import { XMapSelectableLayer } from '../../../components/X/XMapSelectableLayer';
import { ParcelProperties } from '../../../components/ParcelProperties';

export default withApp(withParcel((props) => {
    return (
        <AppContent>
            <XCard shadow="medium" separators={true}>
                <XCard.Hint title="Public" />
                <XCard.Header title={'Parcel #' + props.data.item.title} description={formatAddresses(props.data.item.addresses)}>
                    {props.data.item.geometry && <AStreetViewModal geometry={props.data.item.geometry} />}
                    <XButton path={'/app/parcels/' + props.data.item.id + '/edit'}>Edit</XButton>
                </XCard.Header>
                <ParcelProperties item={props.data.item} />
            </XCard>
            {props.data.item.geometry && (
                <XCard shadow="medium">
                    <XCard.Map location={findCenter(convertMapPatch(props.data.item.geometry))}>
                        <ParcelTileSource layer="parcels" minZoom={16} />
                        <BlockTileSource layer="blocks" minZoom={12} />
                        <XMapSelectableLayer
                            source="parcels"
                            layer="parcels"
                            minZoom={16}
                            flyOnClick={true}
                            selectedId={props.data.item.id}
                            onClick={(v) => props.router.push('/app/parcels/' + v)}
                        />
                        <XMapSelectableLayer
                            source="blocks"
                            layer="blocks"
                            minZoom={12}
                            maxZoom={16}
                            flyOnClick={true}
                        />
                    </XCard.Map>
                </XCard>
            )}
        </AppContent>
    )
}));