import * as React from 'react';
import trufCenter from '@turf/center';
import Glamorous from 'glamorous';
import { XStreetViewPreview } from './XStreetViewPreview';
import { parseGeometry } from 'openland-x-utils/parseGeometry';
import { CityLocations } from 'openland-x-utils/CityLocations';

function loadCenter(src: string) {
    let center = trufCenter({ type: 'MultiPolygon', coordinates: parseGeometry(src) });
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] };
}
const StyledStreetViewPreview = Glamorous(XStreetViewPreview)<{ width: number, height: number }>((props) => ({
    height: props.height,
    width: props.width
}));

interface StreetViewModalPreviewProps {
    location?: {
        latitude: number,
        longitude: number
    };
    geometry?: string;
    width: number;
    height: number;
}

export function XStreetViewModalPreview(props: StreetViewModalPreviewProps) {
        let center = CityLocations.sf;
        if (props.location) {
            center = props.location;
        } else if (props.geometry) {
            center = loadCenter(props.geometry);
        }
        return (
            <StyledStreetViewPreview location={center} width={props.width} height={props.height} />
        );
}