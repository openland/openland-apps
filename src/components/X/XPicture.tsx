import * as React from 'react';
import { Picture } from '../../api/Picture';

export function XPicture(props: { picture: Picture }) {
    return <img src={props.picture.url} srcSet={props.picture.retina} />;
}