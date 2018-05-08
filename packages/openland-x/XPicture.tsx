import * as React from 'react';

export function XPicture(props: {
    picture: {
        url: string;
        retina: string
    } | string, className?: string
}) {
    if (typeof (props.picture) === 'string') {
        return <img src={props.picture} className={props.className} />;
    } else {
        return <img src={props.picture.url} srcSet={props.picture.retina} className={props.className} />;
    }
}