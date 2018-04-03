import * as React from 'react';
import { XCloudImage } from './XCloudImage';

export function XLogo(props: { src: string | null }) {
    if (props.src != null) {
        return <XCloudImage src={props.src} maxWidth={64} maxHeight={64} resize="fit"/>;
    } else {
        return <div style={{width: 64, height: 64}}/>;
    }
}