import * as React from 'react';
import { Geo } from '../../api/Geo';

export function XGeo(props: { geo: Geo }) {
    return <span>({props.geo.latitude},{props.geo.longitude})</span>;
}