import * as React from 'react';
import * as Turf from '@turf/turf';
import { XModal } from '../X/XModal';
import { XButton } from '../X/XButton';
import { XCardStreetViewFullScreen } from '../X/XCardStreetView';

function loadCenter(src: string) {
    let center = Turf.center({ type: 'MultiPolygon', coordinates: (JSON.parse(src) as number[][]).map((p) => [p.map((c) => [c[0], c[1]])]) })
    return { latitude: center.geometry!!.coordinates[1], longitude: center.geometry!!.coordinates[0] }
}

export function AStreetViewModal(props: { geometry: string }) {
    return (
        <XModal closeOnClick={false}>
            <XModal.Target>
                <XButton icon="streetview">Street View</XButton>
            </XModal.Target>
            <XModal.Content title="Street View">
                <XCardStreetViewFullScreen location={loadCenter(props.geometry)} />
            </XModal.Content>
        </XModal>
    );
}