import * as React from 'react';
// import { BlockTileSource, ParcelTileSource } from '../api';
// import { ParcelLayer } from './ParcelLayer';
import { XMapProps, XMap } from 'openland-x-map/XMap';
import { XMapPolygonLayer } from 'openland-x-map/XMapPolygonLayer';
import { XMapSourceTile } from 'openland-x-map/XMapSourceTile';

export const ParcelMap = (props: XMapProps & { children?: any, mode?: 'satellite' | 'zoning', selectedParcel?: string, onParcelClick?: (id: string) => void }, city: string) => {
    let { children, mode, ...other } = props;
    let mapStyle = 'mapbox://styles/mapbox/light-v9';
    if (props.mode === 'zoning') {
        mapStyle = 'mapbox://styles/steve-kite/cje15jkmr3bvt2so3mu8nvsk6';
    }
    if (props.mode === 'satellite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-v9';
    }
    return (
        <XMap mapStyle={mapStyle} {...other} key={props.mode || 'map'}>
            <XMapSourceTile
                id="parcels"
                url="mapbox://steve-kite.parcels_nyc_v1"
            />
            <XMapSourceTile
                id="blocks"
                url="mapbox://steve-kite.blocks_nyc_v1"
            />
            {/* <ParcelTileSource
                layer="parcels"
                minZoom={16}
            /> */}
            {/* <BlockTileSource
                layer="blocks"
                minZoom={12}
            />
            <ParcelLayer
                inverted={props.mode === 'satellite'}
                onClick={props.onParcelClick}
                selectedId={props.selectedParcel}
            /> */}
            <XMapPolygonLayer
                source="parcels"
                layer="parcels"
                layerSource="nyc_parcels"
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
                onClick={props.onParcelClick}
                selectedId={props.selectedParcel}
            />
            <XMapPolygonLayer
                source="blocks"
                layer="blocks"
                layerSource="nyc_blocks"
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