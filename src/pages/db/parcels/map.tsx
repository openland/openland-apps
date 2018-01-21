import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XMap } from '../../../components/X/XMap';
import { XMapOverlay } from '../../../components/X/XMapOverlay';
import { XHead } from '../../../components/X/XHead';
import { withParcelsQuery } from '../../../api/Parcels';

let ParcelsOverlay = withParcelsQuery((props) => {
    if (props.data.parcels) {
        return (<XMapOverlay records={props.data.parcels} />)
    } else {
        return null;
    }
})

export default withPage((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Parcels']} />
        <XMap style={{ width: '100%', height: '100vh' }}>
            <ParcelsOverlay />
        </XMap>
        </>
    )
});