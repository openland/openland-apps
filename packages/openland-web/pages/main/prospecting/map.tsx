import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withRouter, XWithRouter } from '../../../components/withRouter';
import { XHead } from '../../../components/X/XHead';
import { Scaffold } from '../../../components/Scaffold';
import { ProspectingNavigationMap } from '../../../components/ProspectingNavigation';
import { XMap, XMapCameraLocation } from '../../../components/X/XMap';
import { SourcingTileSource, BlockTileSource, ParcelTileSource } from '../../../api';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { XCard } from '../../../components/X/XCard';
import { XButton } from '../../../components/X/XButton';
import { OpportunityState } from 'openland-api/Types';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { canUseDOM } from '../../../utils/environment';
import { trackEvent } from '../../../utils/analytics';
import { ParcelCard } from '../../../components/ParcelCard';
// import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    height: '100%',
    width: '100%',
    '& .mapboxgl-ctrl-top-right': {
        top: '65px !important',
        right: '6px !important'
    }
});

const Filter = Glamorous(XCard)({
    position: 'absolute',
    left: 8,
    top: 8,
    // width: '200px',
    // height: '48px',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
});

const MapSwitcher = Glamorous.div({
    position: 'absolute',
    top: 12,
    right: 16,

    display: 'flex',
    flexDirection: 'row'
});

const MapContainer = Glamorous.div({
    flexGrow: 1
});

class ProspectingMap extends React.Component<XWithRouter & { query: any | null }, {}> {
    knownCameraLocation?: XMapCameraLocation;

    constructor(props: XWithRouter & { query: any | null }) {
        super(props);
        if (canUseDOM) {
            let k = sessionStorage.getItem('__prospecting_location');
            if (k != null) {
                this.knownCameraLocation = JSON.parse(k);
            }
        }
    }

    handleMap = (e: XMapCameraLocation) => {
        sessionStorage.setItem('__prospecting_location', JSON.stringify(e));
        this.knownCameraLocation = e;
    }

    handleParcelClick = (id: string) => {
        trackEvent('Prospecting Map View Parcel', { id: id });
        this.props.router.pushQuery('selectedParcel', id);
    }
    handleDealClick = (id: string, item: any) => {
        if (item.properties && item.properties.parcelId) {
            this.handleParcelClick(item.properties.parcelId as string);
        }
    }
    render() {
        let mapStyle = this.props.router.query!!.mode === 'full'
            ? 'mapbox://styles/mapbox/streets-v9'
            : (this.props.router.query!!.mode === 'satellite' ?
                'mapbox://styles/mapbox/satellite-v9'
                : (this.props.router.query!!.mode === 'zoning' ?
                    'mapbox://styles/steve-kite/cje15jkmr3bvt2so3mu8nvsk6'
                    : 'mapbox://styles/mapbox/light-v9'
                )
            );
        return (
            <>
                <MapContainer>
                    <XMap
                        mapStyle={mapStyle}
                        focusPosition={{ latitude: 40.713919, longitude: -74.002332, zoom: 12 }}
                        lastKnownCameraLocation={this.knownCameraLocation}
                        onCameraLocationChanged={this.handleMap}
                    >
                        <ParcelTileSource
                            layer="parcels"
                            minZoom={16}
                        />
                        <BlockTileSource
                            layer="blocks"
                            minZoom={12}
                        />
                        <SourcingTileSource
                            layer="sourcing"
                            minZoom={12}
                            query={this.props.query}
                        />

                        <XMapPolygonLayer
                            source="parcels"
                            layer="parcels"
                            style={{
                                selectedFillOpacity: 0,
                                selectedBorderColor: '#4428E1',
                                selectedBorderWidth: 8,
                                selectedBorderOpacity: 1
                            }}
                            minZoom={16}
                            flyOnClick={true}
                            onClick={this.handleParcelClick}
                            selectedId={this.props.router.query!!.selectedParcel}
                            flyToMaxZoom={18}
                        />
                        <XMapPolygonLayer
                            source="blocks"
                            layer="blocks"
                            minZoom={12}
                            maxZoom={16}
                            style={{
                                fillOpacity: 0.1,
                                borderOpacity: 0.3,
                            }}
                            flyOnClick={true}
                            flyToMaxZoom={18}
                            flyToPadding={{ left: 64, top: 64, bottom: 64, right: 64 }}
                        />
                        <XMapPointLayer
                            source="sourcing"
                            layer="sourcing"
                            minZoom={12}
                            onClick={this.handleDealClick}
                            flyToMaxZoom={18}
                        />
                    </XMap>
                </MapContainer>
                {this.props.router.query!!.selectedParcel && <ParcelCard compact={true} parcelId={this.props.router.query!!.selectedParcel} />}
            </>
        );
    }
}

const ProspectingMapWrapped = withRouter(ProspectingMap);

export default withApp('Prospecting Map', 'viewer', withRouter((props) => {
    let hasPublic = props.router.query.public ? true : false;
    let squery: any = { stage: OpportunityState.INCOMING };
    if (props.router.query.stage === 'snoozed') {
        squery = { stage: OpportunityState.SNOOZED };
    } else if (props.router.query.stage === 'approved') {
        squery = { stage: OpportunityState.APPROVED };
    } else if (props.router.query.stage === 'zoning') {
        squery = { stage: OpportunityState.APPROVED_INITIAL };
    } else if (props.router.query.stage === 'unit') {
        squery = { stage: OpportunityState.APPROVED_ZONING };
    } else if (props.router.query.stage === 'rejected') {
        squery = { stage: OpportunityState.REJECTED };
    }
    if (hasPublic) {
        squery = {
            '$and': [squery, { isPublic: true }]
        };
    }
    return (
        <>
            <XHead title={['Prospecting Map']} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <ProspectingNavigationMap />
                    <Container>
                        <ProspectingMapWrapped query={squery} key={props.router.query.mode || 'map'} />
                        <Filter shadow="medium">
                            {!hasPublic && <XButton query={{ field: 'public', value: 'true' }}>Show only public land</XButton>}
                            {hasPublic && <XButton style="important" query={{ field: 'public' }}>Show only public land</XButton>}
                        </Filter>
                        <MapSwitcher>
                            <XSwitcher fieldStyle={true}>
                                <XSwitcher.Item query={{ field: 'mode' }}>Map</XSwitcher.Item>
                                <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>Satellite</XSwitcher.Item>
                            </XSwitcher>
                        </MapSwitcher>
                    </Container>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));