import * as React from 'react';
import { Picture } from '../../api';

export function XPicture(props: { picture: Picture | string }) {
    if (typeof (props.picture) === 'string') {
        return <img src={props.picture} />;
    } else {
        return <img src={props.picture.url} srcSet={props.picture.retina} />;
    }
}