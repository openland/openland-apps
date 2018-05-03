import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelPointSource, withParcelStats, withDealsMap } from '../../../api/';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XHead } from '../../../components/X/XHead';
import { XWithRouter, withRouter } from '../../../components/withRouter';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { XCard } from '../../../components/X/XCard';
import { AppFilters } from '../../../components/App/AppFilters';
import { XButton } from '../../../components/X/XButton';
import { XHorizontal } from '../../../components/X/XHorizontal';
import { XMapSource } from '../../../components/X/XMapSource';
import { withUserInfo, UserInfoComponentProps } from '../../../components/UserInfo';
import { trackEvent } from '../../../utils/analytics';
import { canUseDOM } from '../../../utils/environment';
// import { XButtonMutation } from '../../../components/X/XButtonMutation';
// import { XWithRole } from '../../../components/X/XWithRole';
import { Scaffold } from '../../../components/Scaffold';
import { ParcelMap } from '../../../components/ParcelMap';
import { XMapCameraLocation } from '../../../components/X/XMap';
import { TextPageExplore } from 'openland-text/TextPageExplore';
import { TextMap } from 'openland-text/TextMap';
import { MapFilters } from '../../../components/Incubator/MapComponents/MapFilters';
import { CitySelector } from '../../../components/Incubator/MapComponents/MapCitySelect';

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
        left: '18px !important',
        bottom: '18px !important',
        top: 'auto',
        right: 'auto',
        zIndex: 0,
        '& .mapboxgl-ctrl-group': {
            border: '1px solid rgba(132, 142, 143, 0.1)',
            boxShadow: 'none',

            '& .mapboxgl-ctrl-zoom-out': {
                borderBottom: 'none !important'
            },
            '& .mapboxgl-ctrl-compass': {
                display: 'none !important'
            }
        }
    },
    '& .mapboxgl-ctrl-bottom-left': {
        display: 'none'
    }
});

const MapSwitcher = Glamorous.div({
    position: 'absolute',
    bottom: 18,
    left: 68,

    display: 'flex',
    flexDirection: 'row'
});

const FilterHeaderSubtitle = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    color: 'rgba(96, 124, 156, 0.52)',
    fontSize: '14px',
    fontWeight: 500,
    opacity: 0.8,
});

const FilterComponent = withParcelStats((props) => {
    return <FilterHeaderSubtitle>{props.data && props.data!!.parcelsStats !== null && <>{props.data!!.parcelsStats}</>} parcels found</FilterHeaderSubtitle>;
});

const DealsSource = withDealsMap((props) => {
    if (props.data.deals) {
        let features = props.data.deals
            .filter((v) => v.parcel !== null)
            .map((v) => ({
                type: 'Feature',
                'geometry': { type: 'Point', coordinates: [v.parcel!!.center!!.longitude, v.parcel!!.center!!.latitude] },
                properties: {
                    'id': v.parcel!!.id
                }
            }));
        let result = { 'type': 'FeatureCollection', features: features };
        return <XMapSource id="deals" data={result} />;
    }
    return null;
});

const Shadow = Glamorous.div<{ active: boolean }>((props) => ({
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    visibility: props.active ? 'visible' : 'hidden',
    opacity: props.active ? 1 : 0,
    transition: 'all 220ms',
    backgroundColor: 'rgba(0, 0, 0, 0.41)',
    zIndex: 2,
    pointerEvents: 'none'
}));

// const AddOpportunitiesButton = withAddFromSearchOpportunity((props) => <XButtonMutation mutation={props.addFromSearch}>Add to prospecting</XButtonMutation>);
class ParcelCollection extends React.Component<XWithRouter & UserInfoComponentProps, { query?: any, shadowed: boolean }> {

    knownCameraLocation?: XMapCameraLocation;
    
    shadowRequests = new Set();

    constructor(props: XWithRouter & UserInfoComponentProps) {
        super(props);
        this.state = { shadowed: false};

        if (canUseDOM) {
            let k = sessionStorage.getItem('__explore_location');
            if (k != null) {
                this.knownCameraLocation = JSON.parse(k);
            }
            let q = sessionStorage.getItem('__explore_query');
            if (q != null) {
                this.state = { query: JSON.parse(q), shadowed: false };
            }
        }
    }

    handleUpdate = (e?: any) => {
        this.setState({ query: e });
        if (e) {
            sessionStorage.setItem('__explore_query', JSON.stringify(e));
        } else {
            sessionStorage.removeItem('__explore_query');
        }
    }

    handleClick = (id: string) => {
        trackEvent('Explore Parcel', { id: id });
        this.props.router.pushQuery('selectedParcel', id);
    }

    handleMap = (e: XMapCameraLocation) => {
        sessionStorage.setItem('__explore_location', JSON.stringify(e));
        this.knownCameraLocation = e;
    }

    requestShadow = (add: boolean, caller: any) => {
        if (add) {
            this.shadowRequests.add(caller);
        } else {
            this.shadowRequests.delete(caller);
        }

        this.setState({ shadowed: this.shadowRequests.size > 0 });
    }

    render() {
        let defaultCity = 'sf';
        if (this.props.roles.find((v) => v === 'feature-city-nyc-force')) {
            defaultCity = 'nyc';
        }
        let city = this.props.router.routeQuery.city || defaultCity;
        let cityName = city === 'sf' ? 'San Francisco' : 'New York';
        let countyName = city === 'sf' ? 'San Francisco' : 'New York';
        let stateName = city === 'sf' ? 'CA' : 'NY';
        let focus = city === 'sf'
            ? { latitude: 37.75444398077139, longitude: -122.43963811583545, zoom: 12 }
            : { latitude: 40.713919, longitude: -74.002332, zoom: 12 };

        return (
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <XMapContainer>
                        <XMapContainer2>
                            <Shadow active={this.state.shadowed} />
                            <MapFilters shadowHandler={this.requestShadow} />
                            <CitySelector title={cityName} shadowHandler={this.requestShadow}>
                                <CitySelector.Item
                                    query={{ field: 'city', value: 'sf' }}
                                    active={city === 'sf'}
                                    autoClose={true}
                                    label="San Francisco"
                                />
                                <CitySelector.Item
                                    query={{ field: 'city', value: 'nyc' }}
                                    active={city !== 'sf'}
                                    autoClose={true}
                                    label="New York"
                                />
                                <FilterComponent
                                    query={this.state.query && JSON.stringify(this.state.query)}
                                    city={cityName}
                                    county={countyName}
                                    state={stateName}
                                />
                            </CitySelector>

                            <ParcelMap
                                mode={this.props.router.query.mode}
                                selectedParcel={this.props.router.query.selectedParcel}
                                onParcelClick={this.handleClick}
                                focusPosition={focus}
                                lastKnownCameraLocation={this.knownCameraLocation}
                                onCameraLocationChanged={this.handleMap}
                            >
                                <ParcelPointSource
                                    layer="parcels-found"
                                    query={this.state.query}
                                    minZoom={12}
                                    skip={this.state.query === undefined}
                                />
                                <DealsSource />

                                <XMapPointLayer
                                    source="parcels-found"
                                    layer="parcels-found"
                                    onClick={this.handleClick}
                                />

                                <XMapPointLayer
                                    source="deals"
                                    layer="deals"
                                    color="#24b47e"
                                    onClick={this.handleClick}
                                />
                            </ParcelMap>
                            <MapSwitcher>
                                <XSwitcher fieldStyle={true}>
                                    <XSwitcher.Item query={{ field: 'mode' }}>{TextMap.map}</XSwitcher.Item>
                                    <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>{TextMap.satellite}</XSwitcher.Item>
                                    {city === 'sf' && <XSwitcher.Item query={{ field: 'mode', value: 'zoning' }}>{TextMap.zoning}</XSwitcher.Item>}
                                </XSwitcher>
                            </MapSwitcher>
                        </XMapContainer2>
                        {this.props.router.query!!.selectedParcel && <ParcelCard parcelId={this.props.router.query!!.selectedParcel} />}
                    </XMapContainer>
                </Scaffold.Content>
            </Scaffold>
        );
    }
}

export default withApp('Explore', 'viewer', withRouter(withUserInfo((props) => {
    return (
        <>
            <XHead title={[TextPageExplore.title]} />
            <ParcelCollection {...props} />
        </>
    );
})));