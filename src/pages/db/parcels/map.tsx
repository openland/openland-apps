import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withPage } from '../../../components/withPage';
import { XFullScreenPage } from '../../../components/X/XFullScreenPage';
import { XMap2 } from '../../../components/X/XMap2';

export default withPage((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Parcels']} />
        <XFullScreenPage behindHeader={true}>
            <XMap2 mapStyle="mapbox://styles/steve-kite/cjcsbw6zq00dg2squfjuum14i" />
        </XFullScreenPage>
        </>
    )
});