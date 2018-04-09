import * as React from 'react';
import Glamorous from 'glamorous';
import { XMap } from './XMap';

let XCardMapDiv = Glamorous.div({
    height: '360px',
});

export function XCardMap(props: { focusLocation: { latitude: number, longitude: number, zoom: number }, satellite?: boolean, children?: any }) {
    return (
        <XCardMapDiv>
            <XMap
                mapStyle={props.satellite ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/light-v9'}
                focusPosition={{ zoom: props.focusLocation.zoom, latitude: props.focusLocation.latitude, longitude: props.focusLocation.longitude }}
                scrollZoom={false}
            >
                {props.children}
            </XMap>
        </XCardMapDiv >
    );
}