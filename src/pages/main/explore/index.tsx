import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import { XMapPolygonLayer } from '../../../components/X/XMapPolygonLayer';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelTileSource, BlockTileSource, ParcelPointSource, withParcelStats } from '../../../api';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XMap } from '../../../components/X/XMap';
import { XHead } from '../../../components/X/XHead';
import { XWithRouter, withRouter } from '../../../components/withRouter';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { XCard } from '../../../components/X/XCard';
import { AppFilters } from '../../../components/App/AppFilters';

const XMapContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '100vh'
});

const XMapContainer2 = Glamorous.div({
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '100vh',
    // alignItems: 'stretch',
    // height: '100%'
    '& .mapboxgl-ctrl-top-right': {
        top: '70px !important',
        right: '6px !important'
    }
});

const MapSwitcher = Glamorous.div({
    position: 'absolute',
    top: 16,
    right: 16,

    display: 'flex',
    flexDirection: 'row'
});

const FilterContainer = Glamorous(XCard)({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#5968e2',
    width: '362px',
    height: '78px',
    pointerEvents: 'auto'
});

const FilterHeader = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center'
});

const FilterHeaderTitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    color: '#f5f6f8',
    fontSize: '20px',
    fontWeight: 600
});

const FilterHeaderSubtitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    color: '#f5f6f8',
    fontSize: '14px',
    fontWeight: 500,
    opacity: 0.7,
});

const FilterActions = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'flex-start'
});

const FilterComponent = withParcelStats((props) => {
    return <FilterHeaderSubtitle>{props.data && props.data!!.parcelsStats !== null && <>{props.data!!.parcelsStats}</>} parcels found</FilterHeaderSubtitle>;
});

class ParcelCollection extends React.Component<XWithRouter, { query?: any }> {
    constructor(props: XWithRouter) {
        super(props);
        this.state = {};
    }

    handleUpdate = (e?: any) => {
        this.setState({ query: e });
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
            <AppContentMap>
                <AppContentMap.Item>
                    <FilterContainer shadow="medium">
                        <FilterHeader>
                            <FilterHeaderTitle>San Francisco</FilterHeaderTitle>
                            <FilterComponent query={this.state.query && JSON.stringify(this.state.query)} />
                        </FilterHeader>
                        <FilterActions>
                            <AppFilters onChange={this.handleUpdate} />
                        </FilterActions>
                    </FilterContainer>
                </AppContentMap.Item>
                <XMapContainer>
                    <XMapContainer2>
                        <XMap key={this.props.router.query!!.mode || 'map'} mapStyle={mapStyle}>
                            <ParcelTileSource layer="parcels" minZoom={16} />
                            <BlockTileSource layer="blocks" minZoom={12} />
                            <XMapPolygonLayer
                                source="parcels"
                                layer="parcels"
                                minZoom={16}
                                flyOnClick={true}
                                onClick={(v) => this.props.router.pushQuery('selectedParcel', v)}
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
                                    borderOpacity: 0.3
                                }}
                            />
                            <ParcelPointSource layer="parcels-found" query={this.state.query} minZoom={12} skip={this.state.query === undefined} />
                            <XMapPointLayer source="parcels-found" layer="parcels-found" />
                        </XMap>
                        <MapSwitcher>
                            <XSwitcher fieldStyle={true}>
                                <XSwitcher.Item query={{ field: 'mode' }}>Basic</XSwitcher.Item>
                                <XSwitcher.Item query={{ field: 'mode', value: 'full' }}>Standart</XSwitcher.Item>
                                <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>Satellite</XSwitcher.Item>
                                <XSwitcher.Item query={{ field: 'mode', value: 'zoning' }}>Zoning</XSwitcher.Item>
                            </XSwitcher>
                        </MapSwitcher>
                    </XMapContainer2>
                    {this.props.router.query!!.selectedParcel && <ParcelCard parcelId={this.props.router.query!!.selectedParcel} />}
                </XMapContainer>
            </AppContentMap>
        );
    }
}

export default withApp('viewer', withRouter((props) => {
    return (
        <>
            <XHead title={['Explore']} />
            <ParcelCollection router={props.router} />
        </>
    );
}));