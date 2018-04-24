import * as React from 'react';
import { XMapProps, XMap } from './X/XMap';
import { BlockTileSource, ParcelTileSource } from '../api';
import { XMapPolygonLayer } from './X/XMapPolygonLayer';
import { ParcelLayer } from './ParcelLayer';

export const ParcelMap = (props: XMapProps & { children?: any, mode?: 'satellite' | 'zoning', selectedParcel?: string, onParcelClick?: (id: string) => void }) => {
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
            <ParcelTileSource
                layer="parcels"
                minZoom={16}
            />
            <BlockTileSource
                layer="blocks"
                minZoom={12}
            />
            <ParcelLayer
                inverted={props.mode === 'satellite'}
                onClick={props.onParcelClick}
                selectedId={props.selectedParcel}
            />
            <XMapPolygonLayer
                source="blocks"
                layer="blocks"
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