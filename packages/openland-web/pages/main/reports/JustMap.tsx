import '../../../globals';
import * as React from 'react';
import { XMapProps, XMap } from './../../../components/X/XMap';

export const JustMap = (props: XMapProps & { children?: any, mode?: 'satellite' | 'zoning', selectedParcel?: string, onParcelClick?: (id: string) => void }) => {
    let { children, mode, ...other } = props;
    let mapStyle = 'mapbox://styles/mapbox/light-v9';
    if (props.mode === 'zoning') {
        mapStyle = 'mapbox://styles/steve-kite/cje15jkmr3bvt2so3mu8nvsk6';
    }
    if (props.mode === 'satellite') {
        mapStyle = 'mapbox://styles/mapbox/satellite-v9';
    }
    return (
        <XMap mapStyle={mapStyle} {...other} key={props.mode || 'map'} scrollZoom={false}>

            {children}
        </XMap>
    );
};