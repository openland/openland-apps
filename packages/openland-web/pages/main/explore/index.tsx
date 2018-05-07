import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { ParcelCard } from '../../../components/ParcelCard';
import { ParcelPointSource, withParcelStats, withDealsMap } from '../../../api/';
import { XMapPointLayer } from '../../../components/X/XMapPointLayer';
import { XHead } from '../../../components/X/XHead';
import { XSwitcher } from '../../../components/X/XSwitcher';
import { XMapSource } from '../../../components/X/XMapSource';
import { withUserInfo, UserInfoComponentProps } from '../../../components/UserInfo';
import { trackEvent } from '../../../utils/analytics';
import { Scaffold } from '../../../components/Scaffold';
import { ParcelMap } from '../../../components/ParcelMap';
import { XMapCameraLocation } from '../../../components/X/XMap';
import { TextPageExplore } from 'openland-text/TextPageExplore';
import { TextMap } from 'openland-text/TextMap';
import { RoutedMapFilters } from '../../../components/Incubator/MapComponents/MapFilters';
import { CitySelector } from '../../../components/Incubator/MapComponents/MapCitySelect';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

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
    // pointerEvents: 'none'
}));

// const AddOpportunitiesButton = withAddFromSearchOpportunity((props) => <XButtonMutation mutation={props.addFromSearch}>Add to prospecting</XButtonMutation>);
class ParcelCollection extends React.Component<XWithRouter & UserInfoComponentProps, { shadowed: boolean }> {

    knownCameraLocation?: XMapCameraLocation;
    
    constructor(props: XWithRouter & UserInfoComponentProps) {
        super(props);
        this.state = { shadowed: false};

        if (canUseDOM) {
            let k = sessionStorage.getItem('__explore_location');
            if (k != null) {
                this.knownCameraLocation = JSON.parse(k);
            }
        }
    }

    buildquery = () => {
        let clauses: any[] = [];
        if (this.props.router.query!!.filterZoning) {
            clauses.push({ 'zone': JSON.parse(this.props.router.query!!.filterZoning) });
        }
        if (this.props.router.query!!.landUse) {
            clauses.push({ 'landUse': JSON.parse(this.props.router.query!!.landUse) });
        }
        if (this.props.router.query!!.filterStories) {
            clauses.push({ 'stories': JSON.parse(this.props.router.query!!.filterStories) });
        }
        if (this.props.router.query!!.ownerName) {
            clauses.push({ 'ownerName': this.props.router.query.ownerName });
        }
        // ownerName
        if (this.props.router.query!!.filterCurrentUse) {
            clauses.push({ 'currentUse': JSON.parse(this.props.router.query!!.filterCurrentUse) });
        }
        if (this.props.router.query!!.isOkForTower) {
            clauses.push({ 'isOkForTower': JSON.parse(this.props.router.query!!.isOkForTower) });
        }
        if (this.props.router.query!!.publicOwner) {
            clauses.push({ 'ownerPublic': JSON.parse(this.props.router.query!!.publicOwner) });
        }
        let isVacantSet: boolean | undefined;
        if (this.props.router.query!!.isVacant) {
            if (JSON.parse(this.props.router.query!!.isVacant) === 'true') {
                isVacantSet = true;
            } else {
                isVacantSet = false;
            }
        }
        if (this.props.router.query!!.compatible) {
            isVacantSet = true;
            clauses.push({ 'compatibleBuildings': JSON.parse(this.props.router.query!!.compatible) });
        }
        if (isVacantSet !== undefined) {
            clauses.push({ 'isVacant': isVacantSet.toString() });
        }

        if (this.props.router.query!!.filterOnSale) {
            clauses.push({ 'onSale': JSON.parse(this.props.router.query!!.filterOnSale) });
        }
        if (this.props.router.query!!.filterTransit) {
            clauses.push({
                'transitDistance': {
                    lt: parseInt(JSON.parse(this.props.router.query!!.filterTransit), 10)
                }
            });
        }
        if (this.props.router.query!!.customQuery) {
            let res = JSON.parse(this.props.router.query!!.customQuery) as string[];
            let q: any[] = [];
            for (let r of res) {
                q.push({
                    [r]: true
                });
            }
            clauses.push({
                '$or': q
            });
        }
        if (this.props.router.query!!.queryUrbyn2) {
            clauses.push({
                'customerUrbynQuery1': JSON.parse(this.props.router.query!!.queryUrbyn2)
            });
        }
        if (this.props.router.query!!.area) {
            let area = JSON.parse(this.props.router.query!!.area);
            area.gte = (area.gte * 0.092903);
            area.lte = (area.lte * 0.092903);
            clauses.push({
                'area': area
            });
        }
        if (clauses.length > 0) {
            let query = { '$and': clauses };
            return query;

        } else {
            return undefined;
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

        let query = this.buildquery();

        return (
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <XMapContainer>
                        <XMapContainer2>
                            <RoutedMapFilters city={city}/>
                            <CitySelector title={cityName}>
                                <CitySelector.Item
                                    query={{ field: 'city', value: 'sf' }}
                                    active={city === 'sf'}
                                    label="San Francisco"
                                />
                                <CitySelector.Item
                                    query={{ field: 'city', value: 'nyc' }}
                                    active={city !== 'sf'}
                                    label="New York"
                                />
                                <FilterComponent
                                    query={query && JSON.stringify(query)}
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
                                    query={query}
                                    minZoom={12}
                                    skip={query === undefined}
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