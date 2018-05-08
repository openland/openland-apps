import * as React from 'react';
import Glamorous from 'glamorous';

const Image = Glamorous.img({
    borderRadius: '4px',
    objectFit: 'cover'
});

export function XStreetViewPreview(props: {
    location: { latitude: number, longitude: number },
    width: number, height: number,
    className?: string
}) {
    let url = `https://maps.googleapis.com/maps/api/streetview?size=${props.width}x${props.height}&location=${props.location.latitude + ',' + props.location.longitude}&fov=90&key=AIzaSyAUlVnQo-DoLnyE3XSGMYVFeClzx9QephA`;
    let urlRef = `https://maps.googleapis.com/maps/api/streetview?size=${props.width * 2}x${props.height * 2}&location=${props.location.latitude + ',' + props.location.longitude}&fov=90&key=AIzaSyAUlVnQo-DoLnyE3XSGMYVFeClzx9QephA`;
    return (<Image className={props.className} src={url} srcSet={urlRef} />);
}
// https://maps.googleapis.com/maps/api/streetview?size=${width}x${height}&location=${location}&fov=90&key=${STREET_VIEW_KEY}