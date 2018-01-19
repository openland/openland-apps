import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XMap } from '../../../components/X/XMap';
import { XMapOverlay } from '../../../components/X/XMapOverlay';
import { withParcelsQuery } from '../../../api/Parcels';

export default withPage(withParcelsQuery((props) => {
    console.warn(props.data.parcels)
    return (
        <>
        <div className="x-in">
            <XMap style={{ width: '100%', height: 400 }}>
                <XMapOverlay records={props.data.parcels} />
            </XMap>
        </div>
        </>
    )
}));