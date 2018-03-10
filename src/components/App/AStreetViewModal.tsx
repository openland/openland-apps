import * as React from 'react';
import * as Turf from '@turf/turf';
import { XModalTargeted } from '../X/XModalTargeted';
import { XButton } from '../X/XButton';
import { XCardStreetViewFullScreen } from '../X/XCardStreetView';
import { XStreetViewPreview } from '../X/XStreetViewPreview';
import Glamorous from 'glamorous';

function loadCenter(src: string) {
    let center = Turf.center({ type: 'MultiPolygon', coordinates: (JSON.parse(src) as number[][]).map((p) => [p.map((c) => [c[0], c[1]])]) });
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] };
}

export function AStreetViewModal(props: { geometry: string }) {
    return (
        <XModalTargeted title="Street View" closeOnClick={false}>
            <XModalTargeted.Target>
                <XButton>Street View</XButton>
            </XModalTargeted.Target>
            <XModalTargeted.Content>
                <XCardStreetViewFullScreen location={loadCenter(props.geometry)} />
            </XModalTargeted.Content>
        </XModalTargeted>
    );
}

const StyledStreetViewPreview = Glamorous(XStreetViewPreview)<{width: number, height: number}>((props) => ({
    height: props.height,
    width: props.width
}));

export function AStreetViewModalPreview(props: { geometry: string, width: number, height: number }) {
    return (
        <StyledStreetViewPreview location={loadCenter(props.geometry)} width={props.width} height={props.height} />
    );
}