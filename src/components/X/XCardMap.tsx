import * as React from 'react';
import Glamorous from 'glamorous';
import { XMapLight } from './XMapLight';

let XCardMapDiv = Glamorous.div({
    height: '360px',
})

export function XCardMap(props: { location: { latitude: number, longitude: number }, children?: any }) {
    return (
        <XCardMapDiv>
            <XMapLight
                mapStyle="mapbox://styles/mapbox/streets-v9"
                focusPosition={{ zoom: 16, latitude: props.location.latitude, longiutude: props.location.longitude }}
            >
                {props.children}
            </XMapLight>
        </XCardMapDiv>
    );
}