import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withPageFullScreen } from '../../../components/Navigation/withPage';
import { XMapLight } from '../../../components/X/XMapLight';
import { XMapControls } from '../../../components/X/XMapControls';
import { XCard } from '../../../components/X/XCard';
import { XPageFullScreen } from '../../../components/X/XPageFullScreen';

export const XMapLegendWrapper = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    padding: '10px'
})

export const XMapLegendCellWrap = Glamorous.div<{children: any}>({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    cursor: 'pointer',
    '&:last-child': {
        marginBottom: 0
    }
})

export const XMapLegendIndicator = Glamorous.div<{color: string}>((props) => {
    return {
        width: '25px',
        height: '16px',
        marginRight: '4px',
        backgroundColor: props.color,
    }
})

export const XMapLegendText = Glamorous.span({
    color: '#262626'
})

export function XMapLegendCell (props: { title: string; color: string }) {
    return (
        <XMapLegendCellWrap>
            <XMapLegendIndicator color={props.color} />
            <XMapLegendText>{props.title}</XMapLegendText>
        </XMapLegendCellWrap>
    )
}

export default withPageFullScreen((props) => {
    return (
        <>
        <XHead title={['Statecraft', 'San Francisco', 'Zoning']} />
        <XPageFullScreen behindHeader={true}>
            <XMapLight mapStyle="mapbox://styles/steve-kite/cjcsbw6zq00dg2squfjuum14i" />
            <XMapControls topRight={true}>
                <XCard>
                    <XMapLegendWrapper>
                        <XMapLegendCell title={'Residental'} color={'hsl(336, 82%, 51%)'} />
                        <XMapLegendCell title={'Mixed Use'} color={'rgb(241, 121, 215)'} />
                        <XMapLegendCell title={'Industrial'} color={'hsl(36, 79%, 52%)'} />
                        <XMapLegendCell title={'Commercial'} color={'hsl(220, 79%, 52%)'} />
                        <XMapLegendCell title={'Public'} color={'hsl(112, 59%, 68%)'} />
                    </XMapLegendWrapper>
                </XCard>
            </XMapControls>
        </XPageFullScreen>
        </>
    )
});