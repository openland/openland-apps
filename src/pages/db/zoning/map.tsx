import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withPageFullScreen } from '../../../components/withPage';
import { XFullScreenPage } from '../../../components/X/XFullScreenPage';
import { XMap2 } from '../../../components/X/XMap2';
import { XCard } from '../../../components/X/XCard';

export default withPageFullScreen((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Parcels']} />
        <XFullScreenPage behindHeader={true}>
            <XMap2 mapStyle="mapbox://styles/steve-kite/cjcsbw6zq00dg2squfjuum14i" />
            <div className={'x-map--legend'}>
                <XCard>
                    <div className={'legend-cell'}>
                        <div className={'legend-indicator'} style={{ backgroundColor: 'hsl(336, 82%, 51%)' }} />
                        <span className={'legend-description'}>Resident</span>
                    </div>
                    <div className={'legend-cell'}>
                        <div className={'legend-indicator'} style={{ backgroundColor: 'rgb(241, 121, 215)' }} />
                        <span className={'legend-description'}>Mixed Use</span>
                    </div>
                    <div className={'legend-cell'}>
                        <div className={'legend-indicator'} style={{ backgroundColor: 'hsl(36, 79%, 52%)' }} />
                        <span className={'legend-description'}>Industrial</span>
                    </div>
                    <div className={'legend-cell'}>
                        <div className={'legend-indicator'} style={{ backgroundColor: 'hsl(220, 79%, 52%)' }} />
                        <span className={'legend-description'}>Commercial</span>
                    </div>
                    <div className={'legend-cell'}>
                        <div className={'legend-indicator'} style={{ backgroundColor: 'hsl(112, 59%, 68%)' }} />
                        <span className={'legend-description'}>Public</span>
                    </div>
                </XCard>
            </div>
        </XFullScreenPage>
        </>
    )
});