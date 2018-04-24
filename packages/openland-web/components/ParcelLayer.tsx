import * as React from 'react';
import { XMapPolygonLayer, XMapPolygonLayerProps } from './X/XMapPolygonLayer';

export function ParcelLayer(props: Partial<XMapPolygonLayerProps> & { inverted?: boolean }) {
    let { inverted, ...other } = props;
    return (
        <XMapPolygonLayer
            source="parcels"
            layer="parcels"
            style={{
                selectedFillOpacity: 0,
                selectedBorderColor: '#4428E1',
                selectedBorderWidth: 8,
                selectedBorderOpacity: 1,
                borderColor: inverted ? '#ffffff' : '#4428e0',
                borderWidth: inverted ? 4 : 1,
            }}
            minZoom={16}
            flyOnClick={true}
            flyToMaxZoom={18}
            {...other}
        />
    );
}