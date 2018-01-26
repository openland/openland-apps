import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { XFullScreenPage } from '../../../components/X/XFullScreenPage';
import { XMap } from '../../../components/X/XMap';
import { XCard } from '../../../components/X/XCard';
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
            <XMap>
                <ParcelsOverlay />
            </XMap>
            <div className={'x-map--legend'}>
                <XCard>
                    <div className={'legend-cell'}>
                        <div className={'legend-indicator'} />
                        <span className={'legend-description'}>Продается</span>
                    </div>
                </XCard>      
            </div>
        </XFullScreenPage>
        </>
    )
});