import * as React from 'react';
import * as Types from '../../api/Types';

export function XGeo(props: { geo: Types.GeoShortFragment }) {
    return <span>({props.geo.latitude},{props.geo.longitude})</span>;
}