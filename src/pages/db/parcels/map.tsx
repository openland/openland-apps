import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XFullScreenPage } from '../../../components/X/XFullScreenPage';
import { XMap } from '../../../components/X/XMap';
import { XMapOverlay } from '../../../components/X/XMapOverlay';
import { XHead } from '../../../components/X/XHead';
import { withBlocksQuery, withParcelsQuery } from '../../../api/Parcels';

let BlocksOverlay = withBlocksQuery((props) => {
    if (props.data.points) {
        return (<XMapOverlay id="blocks" records={props.data.points} maxZoom={17} minZoom={14} />)
    } else {
        return null;
    }
})

let ParcelsOverlay = withParcelsQuery((props) => {
    if (props.data.points) {
        return (<XMapOverlay id="parcels" records={props.data.points} minZoom={16} />)
    } else {
        return null;
    }
})

export default withPage((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Parcels']} />
        <XFullScreenPage behindHeader={true}>
            <XMap allowRotation={false} mapStyle="mapbox://styles/steve-kite/cjcsbw6zq00dg2squfjuum14i">
                {/* <BlocksOverlay maxZoom={17} minZoom={14} />
                <ParcelsOverlay minZoom={13} /> */}
            </XMap>
        </XFullScreenPage>
        </>
    )
});