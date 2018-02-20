import * as React from 'react';
import Glamorous from 'glamorous';
import { XMap } from './XMap';

let XCardMapDiv = Glamorous.div({
    height: '360px',
})

export function XCardMap(props: { focusLocation: { latitude: number, longitude: number, zoom: number }, children?: any }) {
    return (
        <XCardMapDiv>
            <XMap
                mapStyle="mapbox://styles/mapbox/streets-v9"
                focusPosition={{ zoom: props.focusLocation.zoom, latitude: props.focusLocation.latitude, longiutude: props.focusLocation.longitude }}
            >
                {props.children}
            </XMap>
        </XCardMapDiv>
    );
}