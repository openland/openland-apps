import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from './X/XHorizontal';
import { XCard } from './X/XCard';
import { XStreetView } from './X/XStreetView';
import { XMapPolygonLayer } from './X/XMapPolygonLayer';
import { ParcelTileSource, BlockTileSource } from '../api/index';
import { findCenter } from '../utils/map';
import { withRouter } from './withRouter';

const Wrapper = Glamorous(XCard)({
    flexGrow: 1,
    height: '360px'
});

const StreetView = Glamorous(XStreetView)({
    height: '360px',
    width: '100%'
});

export const ParcelMaps = withRouter<{ id: string, geometry: string }>((props) => {
    return (
        <XHorizontal>
            <Wrapper shadow="medium">
                <XCard.Map focusLocation={{ ...findCenter(props.geometry), zoom: 18 }}>
                    <ParcelTileSource layer="parcels" minZoom={16} />
                    <BlockTileSource layer="blocks" minZoom={12} />
                    <XMapPolygonLayer
                        source="parcels"
                        layer="parcels"
                        minZoom={16}
                        selectedId={props.id}
                        style={{
                            selectedFillOpacity: 0,
                            selectedBorderColor: '#4428E1',
                            selectedBorderWidth: 8,
                            selectedBorderOpacity: 1
                        }}
                        onClick={(v) => props.router.push('/parcels/' + v)}
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