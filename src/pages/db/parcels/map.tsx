import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XFullScreenPage } from '../../../components/X/XFullScreenPage';
import { XMap } from '../../../components/X/XMap';
import { XMapOverlay } from '../../../components/X/XMapOverlay';
import { XHead } from '../../../components/X/XHead';
import { withBlocksQuery } from '../../../api/Parcels';

let ParcelsOverlay = withBlocksQuery((props) => {
    if (props.data.points) {
        return (<XMapOverlay records={props.data.points} />)
    } else {
        return null;
    }
})

export default withPage((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Parcels']} />
        <XFullScreenPage behindHeader={true}>
            <XMap rotation={false}>
                <ParcelsOverlay maxZoom={16} />
            </XMap>
        </XFullScreenPage>
        </>
    )
});