import * as React from 'react';
import Glamorous from 'glamorous';
import { AStreetViewModal } from './App/AStreetViewModal';
import { XCard } from './X/XCard';
import { withParcelDirect } from '../api';
import { XButton } from './X/XButton';
import { ParcelProperties } from './ParcelProperties';

let Container = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    zIndex: 1,
    bottom: '64px',
    left: 'calc(50vw - 400px)',
    width: '800px'
});

export const ParcelCard = withParcelDirect((props) => {
    return (
        <Container>
            <XCard shadow="medium">
                <XCard.Loader loading={props.data!!.loading}>
                    {props.data && props.data!!.item &&
                        <>
                            <XCard.Header title={'Parcel #' + props.data.item!!.title}>
                                <AStreetViewModal geometry={props.data.item!!.geometry!!} />
                                <XButton style="dark" path={'/app/parcels/' + props.data.item!!.id}>View</XButton>
                            </XCard.Header>
                            <ParcelProperties item={props.data.item!!} />
                        </>}
                </XCard.Loader>
            </XCard>
        </Container>
    )
});