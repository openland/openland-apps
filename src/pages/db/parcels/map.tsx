import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XFullScreenPage } from '../../../components/X/XFullScreenPage';
import { XMap } from '../../../components/X/XMap';
import { XMapOverlay } from '../../../components/X/XMapOverlay';
import { withParcelsQuery } from '../../../api/Parcels';
import { XHead } from '../../../components/X/XHead';

export default withPage(withParcelsQuery((props) => {
    console.warn(props.data.parcels)
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Parcels']} />
        <XFullScreenPage behindHeader={true}>
            <XMap>
                <XMapOverlay records={props.data.parcels} />
            </XMap>
        </XFullScreenPage>
        </>
    )
}));