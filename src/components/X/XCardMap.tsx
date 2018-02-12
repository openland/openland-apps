import * as React from 'react';
import Glamorous from 'glamorous';
import { XMap } from './XMap';

let XCardMapDiv = Glamorous.div({
    height: '240px',
})

export function XCardMap(props: { location: { latitude: number, longitude: number }, children?: any }) {
    return (
        <XCardMapDiv>
            <XMap
                mapStyle="mapbox://styles/mapbox/streets-v9"
                initZoom={16}
                initLatitude={props.location.latitude}
                initLongitude={props.location.longitude}>
                {props.children}
            </XMap>
        </XCardMapDiv>
    );
}