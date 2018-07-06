import * as React from 'react';
import Glamorous from 'glamorous';
import { XMap } from './XMap';

let XCardMapDiv = Glamorous.div({
    height: '360px',
});

export function XMapSmall(props: { focusPosition: { latitude: number, longitude: number, zoom: number }, satellite?: boolean, children?: any }) {
    return (
        <XCardMapDiv>
            <XMap
                mapStyle={props.satellite ? 'mapbox://styles/mapbox/satellite-v9' : 'mapbox://styles/mapbox/light-v9'}
                focusPosition={props.focusPosition}
                scrollZoom={false}
            >
                {props.children}
            </XMap>
        </XCardMapDiv>
    );
}