import * as React from 'react';
import Glamorous from 'glamorous';
import { XButton } from '../../X/XButton';
import { XCard } from '../../X/XCard';
import { Filter } from './PopperFilterButton';

const MapFilterWrapper = Glamorous(XCard)({
    position: 'absolute',
    top: 12,
    left: 16,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    zIndex: 2
});

export const MapFilters = (props: { shadowHandler: Function }) => (
    <MapFilterWrapper>
        <Filter handler={props.shadowHandler}>
            <Filter.Target>
                <XButton style="dark">qwe</XButton>
            </Filter.Target>
            <Filter.Popper>
                <XButton autoClose={true}>qwe</XButton>
            </Filter.Popper>
        </Filter>
        <Filter handler={props.shadowHandler}>
            <Filter.Target>
                <XButton style="dark">qwe</XButton>
            </Filter.Target>
            <Filter.Popper>
                <XButton autoClose={true}>qwe</XButton>
            </Filter.Popper>
        </Filter>
        <Filter handler={props.shadowHandler}>
            <Filter.Target>
                <XButton style="dark">qwe</XButton>
            </Filter.Target>
            <Filter.Popper>
                <XButton autoClose={true}>qwe</XButton>
            </Filter.Popper>
        </Filter>
    </MapFilterWrapper>
);