import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './X/XHorizontal';
import { XCard } from './X/XCard';
import { XStreetView } from './X/XStreetView';
import { XMapPolygonLayer } from './X/XMapPolygonLayer';
import { ParcelTileSource, BlockTileSource } from '../api/index';
import { findCenter } from '../utils/map';
import { withRouter } from './withRouter';
import { ParcelLayer } from './ParcelLayer';

const Wrapper = Glamorous(XCard)({
    flexGrow: 1,
    height: '360px'
});

const StreetView = Glamorous(XStreetView)({
    height: '360px',
    width: '100%'
});

export const ParcelMaps = withRouter<{ id: string, geometry: string, disableNavigation?: boolean, satellite?: boolean }>((props) => {
    return (
        <XHorizontal>
            <Wrapper shadow="medium">
                <XCard.Map focusLocation={{ ...findCenter(props.geometry), zoom: 18 }} satellite={props.satellite}>
                    <ParcelTileSource layer="parcels" minZoom={16} />
                    <BlockTileSource layer="blocks" minZoom={12} />
                    <ParcelLayer
                        inverted={props.satellite}
                        allowHover={props.disableNavigation !== true}
                        allowClick={props.disableNavigation !== true}
                        flyOnClick={props.disableNavigation !== true}
                        onClick={props.disableNavigation !== true ? (v) => props.router.push('/parcels/' + v) : undefined}
                        selectedId={props.id}
                    />
                    <XMapPolygonLayer
                        source="blocks"
                        layer="blocks"
                        minZoom={12}
                        maxZoom={16}
                    />
                </XCard.Map>
            </Wrapper>
            <Wrapper shadow="medium">
                <StreetView key={props.id} location={findCenter(props.geometry)} />
            </Wrapper>
        </XHorizontal>);
});