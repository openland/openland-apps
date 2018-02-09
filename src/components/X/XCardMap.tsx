import * as React from 'react';
import Glamorous from 'glamorous';
import { XMap2 } from './XMap2';

let XCardMapDiv = Glamorous.div({
    height: '240px',
})

export function XCardMap(props: { location: { latitude: number, longitude: number } }) {
    return (<XCardMapDiv><XMap2 mapStyle="mapbox://styles/mapbox/streets-v9" initZoom={17} initLatitude={props.location.latitude} initLongitude={props.location.longitude} /></XCardMapDiv>)
}