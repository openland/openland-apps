import * as React from 'react';
import { XMapProps, XMap } from 'openland-x-map/XMap';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { XMapSourceTile } from 'openland-x-map/XMapSourceTile';

export const ParcelMap = (props: XMapProps & { children?: any, mode?: 'satellite' | 'zoning', selectedParcel?: string, onParcelClick?: (id: string, city: string) => void, city: string }) => {
    let { children, mode, ...other } = props;
    let mapStyle = 'mapbox://styles/mapbox/light-v9';
    if (props.mode === 'zoning') {
        mapStyle = 'mapbox://styles/steve-kite/cje15jkmr3bvt2so3mu8nvsk6';
    }
    if (props.mode === 'satellite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-v9';
    }
    let parcelsSource = 'mapbox://steve-kite.parcels_nyc_v1';
    let parcelsSourceLayer = 'nyc_parcels';
    let blocksSource = 'mapbox://steve-kite.blocks_nyc_v1';
    let blocksSourceLayer = 'nyc_blocks';
    if (props.city === 'sf') {
        parcelsSource = 'mapbox://steve-kite.parcels_sf_v1';
        parcelsSourceLayer = 'sf_parcels';
        blocksSource = 'mapbox://steve-kite.blocks_sf_v1';
        blocksSourceLayer = 'sf_blocks';
    }
    return (
        <XMap mapStyle={mapStyle} {...other} key={props.mode || 'map'}>
            <XMapSourceTile
                id={'parcels_' + props.city}
                key={'parcels_' + props.city}
                url={parcelsSource}
            />
            <XMapSourceTile
                id={'blocks_' + props.city}
                key={'blocks_' + props.city}
                url={blocksSource}
            />
            <XMapPolygonLayer
                key={'parcels_layer_' + props.city}
                source={'parcels_' + props.city}
                layer={'parcels_' + props.city}
                layerSource={parcelsSourceLayer}
                inlineHover={true}
                style={{
                    selectedFillOpacity: 0,
                    selectedBorderColor: '#4428E1',
                    selectedBorderWidth: 8,
                    selectedBorderOpacity: 1,
                    borderColor: props.mode === 'satellite' ? '#ffffff' : '#4428e0',
                    borderWidth: props.mode === 'satellite' ? 4 : 1,
                }}
                minZoom={16}
                flyOnClick={true}
                flyToMaxZoom={18}
                onClick={props.onParcelClick ? (id: string) => props.onParcelClick!!(id, props.city) : undefined}
                selectedId={props.selectedParcel}
            />
            <XMapPolygonLayer
                key={'blocks_layer_' + props.city}
                source={'blocks_' + props.city}
                layer={'blocks_' + props.city}
                layerSource={blocksSourceLayer}
                inlineHover={true}
                minZoom={props.mode === 'satellite' ? 14 : 12}
                maxZoom={16}
                style={{
                    fillOpacity: 0.1,
                    borderOpacity: 0.7,
                    borderColor: props.mode === 'satellite' ? '#ffffff' : '#4428e0',
                    borderWidth: props.mode === 'satellite' ? 4 : 1,
                }}
                flyOnClick={true}
                flyToMaxZoom={18}
                flyToPadding={{ left: 64, top: 64, bottom: 64, right: 64 }}
            />
            {children}
        </XMap>
    );
};