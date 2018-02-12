import * as React from 'react';

export function XArea(props: { area: number }) {
    let kms = props.area * 0.0000010;
    var factor = Math.pow(10, 6);
    let kmsRounded = (Math.round(kms * factor) / factor);
    return <span>{kmsRounded.toString()} km^2</span>;
}