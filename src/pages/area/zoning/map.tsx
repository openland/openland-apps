import * as React from 'react';
import { XHead } from '../../../components/X/XHead';
import { withPageFullScreen } from '../../../components/Navigation/withPage';
import { XMap2 } from '../../../components/X/XMap2';
import { XCard } from '../../../components/X/XCard';
import { XPageFullScreen } from '../../../components/X/XPageFullScreen';

export function XMapLegendContainer (props: {children: any}) {
    return (
        <div className="x-map--legend">
            <XCard>
                <div className="x-map--legend--wrapper">
                    {props.children}
                </div>
            </XCard>
        </div>
    )
}

export function XMapLegendCell (props: { title: string; color: string }) {
    return (
        <div className={'legend-cell'}>
            <div className={'legend-indicator'} style={{ backgroundColor: `${props.color}` }} />
            <span className={'legend-description'}>{props.title}</span>
        </div>
    )
}

export default withPageFullScreen((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Zoning']} />
        <XPageFullScreen behindHeader={true}>
            <XMap2 mapStyle="mapbox://styles/steve-kite/cjcsbw6zq00dg2squfjuum14i" />
            <XMapLegendContainer>
                <XMapLegendCell title={'Residental'} color={'hsl(336, 82%, 51%)'} />
                <XMapLegendCell title={'Mixed Use'} color={'rgb(241, 121, 215)'} />
                <XMapLegendCell title={'Industrial'} color={'hsl(36, 79%, 52%)'} />
                <XMapLegendCell title={'Commercial'} color={'hsl(220, 79%, 52%)'} />
                <XMapLegendCell title={'Public'} color={'hsl(112, 59%, 68%)'} />
            </XMapLegendContainer>
        </XPageFullScreen>
        </>
    )
});