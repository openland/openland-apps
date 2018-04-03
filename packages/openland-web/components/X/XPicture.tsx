import * as React from 'react';
import { Picture } from '../../api';

export function XPicture(props: { picture: Picture | string, className?: string }) {
    if (typeof (props.picture) === 'string') {
        return <img src={props.picture} className={props.className} />;
    } else {
        return <img src={props.picture.url} srcSet={props.picture.retina} className={props.className} />;
    }
}