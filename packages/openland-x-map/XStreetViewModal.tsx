import * as React from 'react';
import * as Turf from '@turf/turf';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { XModalTargeted } from 'openland-x-modal/XModalTargeted';
import { XStreetViewPreview } from './XStreetViewPreview';
import { XStreetViewFullScreen } from './XStreetViewFullScreen';
import { parseGeometry } from 'openland-x-utils/parseGeometry';
import { CityLocations } from 'openland-x-utils/CityLocations';

function loadCenter(src: string) {
    let center = Turf.center({ type: 'MultiPolygon', coordinates: parseGeometry(src) });
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] };
}

export function XStreetViewModal(props: { geometry: string }) {
    return (
        <XModalTargeted title="Street View" closeOnClick={false} width="auto">
            <XModalTargeted.Target>
                <XButton text="Street View" />
            </XModalTargeted.Target>
            <XModalTargeted.Content>
                <XStreetViewFullScreen location={loadCenter(props.geometry)} />
            </XModalTargeted.Content>
        </XModalTargeted>
    );
}

const StyledStreetViewPreview = Glamorous(XStreetViewPreview)<{ width: number, height: number }>((props) => ({
    height: props.height,
    width: props.width
}));

export function AStreetViewModalPreview(props: { location?: { latitude: number, longitude: number }, geometry?: string, width: number, height: number }) {
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