import * as React from 'react';
import * as Turf from '@turf/turf';
import Glamorous from 'glamorous';
import { XButton } from 'openland-x/XButton';
import { XStreetViewPreview } from './XStreetViewPreview';
import { XStreetViewFullScreen } from './XStreetViewFullScreen';
import { parseGeometry } from 'openland-x-utils/parseGeometry';
import { CityLocations } from 'openland-x-utils/CityLocations';
import { XModal } from 'openland-x-modal/XModal';

function loadCenter(src: string) {
    let center = Turf.center({ type: 'MultiPolygon', coordinates: parseGeometry(src) });
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] };
}

export function XStreetViewModal(props: { geometry: string }) {
    return (
        <XModal
            title="Street View"
            size="x-large"
            closeOnClick={false}
            useTopCloser={true}
            target={<XButton text="Street View" style="flat" />}
            body={<XStreetViewFullScreen location={loadCenter(props.geometry)} />}
        />
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