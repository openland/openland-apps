import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XCard } from 'openland-x/XCard';
import { XStreetView } from 'openland-x-map/XStreetView';
import { findCenter } from '../utils/map';
import { withRouter } from 'openland-x-routing/withRouter';
import { ParcelMap } from './ParcelMap';

const Wrapper = Glamorous(XCard)({
    flexGrow: 1,
    height: '360px',
    maxWidth: 'calc(50% - 8px)'
});

const StreetView = Glamorous(XStreetView)({
    height: '360px',
    width: '100%'
});

export const ParcelMaps = withRouter<{ id: string, geometry: string, disableNavigation?: boolean, satellite?: boolean }>((props) => {
    return (
        <XHorizontal>
            <Wrapper shadow="medium">
                <ParcelMap
                    focusPosition={{ ...findCenter(props.geometry), zoom: 18 }}
                    mode={props.satellite ? 'satellite' : undefined}
                    selectedParcel={props.id}
                    onParcelClick={props.disableNavigation !== true ? (v: any) => props.router.push('/parcels/' + v) : undefined}
                />
                {/* <XMapSmall focusPosition={{ ...findCenter(props.geometry), zoom: 18 }} satellite={props.satellite}>
                    <ParcelTileSource layer="parcels" minZoom={16} />
                    <BlockTileSource layer="blocks" minZoom={12} />
                    <ParcelLayer
                        inverted={props.satellite}
                        allowHover={props.disableNavigation !== true}
                        allowClick={props.disableNavigation !== true}
                        flyOnClick={props.disableNavigation !== true}
                        onClick={props.disableNavigation !== true ? (v: any) => props.router.push('/parcels/' + v) : undefined}
                        selectedId={props.id}
                    />
                    <XMapPolygonLayer
                        source="blocks"
                        layer="blocks"
                        minZoom={12}
                        maxZoom={16}
                    />
                </XMapSmall> */}
            </Wrapper>
            <Wrapper shadow="medium">
                <StreetView key={props.id} location={findCenter(props.geometry)} />
            </Wrapper>
        </XHorizontal>);
});