import * as React from 'react';
import * as Turf from '@turf/turf';
import { XCardStreetViewFullScreen } from '../X/XCardStreetView';
import { XStreetViewPreview } from '../X/XStreetViewPreview';
import Glamorous from 'glamorous';
import { parseGeometry } from '../../utils/Serializers';
import { XButton } from 'openland-x/XButton';
import { XModalTargeted } from 'openland-x-modal/XModalTargeted';

function loadCenter(src: string) {
    let center = Turf.center({ type: 'MultiPolygon', coordinates: parseGeometry(src) });
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] };
}

export function AStreetViewModal(props: { geometry: string }) {
    return (
        <XModalTargeted title="Street View" closeOnClick={false} width="auto">
            <XModalTargeted.Target>
                <XButton text="Street View" />
            </XModalTargeted.Target>
            <XModalTargeted.Content>
                <XCardStreetViewFullScreen location={loadCenter(props.geometry)} />
            </XModalTargeted.Content>
        </XModalTargeted>
    );
}

const StyledStreetViewPreview = Glamorous(XStreetViewPreview)<{ width: number, height: number }>((props) => ({
    height: props.height,
    width: props.width
}));

export function AStreetViewModalPreview(props: { geometry: string, width: number, height: number }) {
    return (
        <StyledStreetViewPreview location={loadCenter(props.geometry)} width={props.width} height={props.height} />
    );
}