import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { FolderButton } from '../../../components/FolderButton';
import { ParcelCard } from '../../../components/Incubator/MapComponents/MapParcelCard';
import { MapStyleSwitcher } from '../../../components/Incubator/MapComponents/MapStyleSwitcher';
import { withParcelStats, withDealsMap, ParcelMapSearch } from '../../../api/';
// import { XSwitcher } from 'openland-x/XSwitcher';
import { withUserInfo, UserInfoComponentProps } from '../../../components/UserInfo';
import { Scaffold } from '../../../components/Scaffold';
import { ParcelMap } from '../../../components/ParcelMap';
import { TextPageExplore } from 'openland-text/TextPageExplore';
import { TextMap } from 'openland-text/TextMap';
import { RoutedMapFilters } from '../../../components/Incubator/MapComponents/MapFilters';
import { CitySelector } from '../../../components/Incubator/MapComponents/MapCitySelect';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XMapCameraLocation } from 'openland-x-map/XMap';
import { XMapPointLayer } from 'openland-x-map/XMapPointLayer';
import { XMapSource } from 'openland-x-map/XMapSource';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { trackEvent } from 'openland-x-analytics';
import { XRoleContext } from 'openland-x-permissions/XRoleContext';
import { XCard } from 'openland-x/XCard';
import { XButton } from 'openland-x/XButton';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMapGeocoder } from 'openland-x-map/XMapGeocoder';

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
            border: 'none',
            boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',

            '& .mapboxgl-ctrl-zoom-in': {
                borderBottom: 'solid 1px #c1c7cf4d',
                // backgroundImage: 'url(\'/static/X/zoomin.svg\')'
            },

            '& .mapboxgl-ctrl-zoom-out': {
                borderBottom: 'none !important',
                // backgroundImage: 'url(\'/static/X/zoomin.svg\')'
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

const MapSearcher = Glamorous(XMapGeocoder)({
    zIndex: 1,
    height: 52,
    top: 18,
    left: 165,
    width: 178,
    backgroundColor: '#fff',
    transition: 'all .2s',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    '&::before': {
        display: 'block',
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        content: `''`,
        backgroundColor: 'transparent',
        visibility: 'hidden',
        transition: 'all .2s'
    },
    '&:focus-within': {
        left: 18,
        zIndex: 2,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        width: 325
    },
    '&:focus-within::before': {
        backgroundColor: 'rgba(0, 0, 0, 0.41)',
        visibility: 'visible',
        zIndex: 1
    },
    '& .mapboxgl-ctrl-geocoder.mapboxgl-ctrl': {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingLeft: 36,
        paddingRight: 10,
        borderLeft: '1px solid #c1c7cf4d',
        backgroundImage: 'url(\'/static/img/icons/search-grey.svg\')',
        backgroundRepeat: 'no-repeat',
        backgroundPositionY: 'center',
        backgroundPositionX: 10,
        backgroundSize: 20,
        backgroundColor: '#fff',
        borderRadius: 6,
        zIndex: 2,
        '&:focus-within': {
            backgroundImage: 'url(\'/static/img/icons/search-purple.svg\')',
        },
        '& input': {
            width: '100%',
            height: '100%',
            fontSize: 16,
            lineHeight: 1.25,
            letterSpacing: 0.5,
            color: '#334562'
        },
        '& ul.suggestions': {
            position: 'absolute',
            top: 60,
            right: 0,
            width: 325,
            backgroundColor: '#fff',
            borderRadius: 6,
            boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
            listStyle: 'none',
            overflow: 'hidden',
            '& li': {
                fontSize: 15,
                fontWeight: 500,
                lineHeight: 1.33,
                letterSpacing: 0.5,
                color: '#334562',
                height: 48,
                paddingLeft: 40,

                backgroundImage: 'url(\'/static/img/icons/icon-location-grey.svg\')',
                backgroundRepeat: 'no-repeat',
                backgroundPositionY: 'center',
                backgroundPositionX: 10,
                backgroundSize: 20,

                '&:hover': {
                    backgroundColor: '#f8f8fb',
                    backgroundImage: 'url(\'/static/img/icons/icon-location-purple.svg\')',
                },
                '& a': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    cursor: 'pointer',
                    paddingTop: 14
                }
            }
        }
    }
});

const FilterCounterWrapper = Glamorous(XCard)<{ saveActive: boolean }>((props) => ({
    border: 'none',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    borderRadius: 6,
    paddingLeft: 18,
    paddingRight: 8,
    height: 48,
    left: 18,
    top: 80,
    zIndex: props.saveActive ? 11 : 1,
    boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.08)',
}));

const FilterCounter = Glamorous.div<{ filtered?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: '#334562',
    fontSize: 14,
    marginRight: 10,
    fontWeight: 500,
    // userSelect: 'none',
    whiteSpace: 'nowrap'
}));

const XButtonWithMargin = Glamorous(XButton)({
    marginLeft: 6
});

const FolderButtonWithSave = withParcelStats((props) => {
    if (!props.data.loading) {
        (props as any).onStatsLoaded();
    }
    if (!(props as any).show) {
        return null;
    }
    return (
        props.data.parcelsStats > 0 && props.data.variables && props.data.variables.query ? (
            <FolderButton style="primary" icon={null} placement="bottom" show={(props as any).showFolderSelect} search={props.data.variables as any}
                handleClose={(props as any).onClose}
                target={(
                    <FilterCounterWrapper saveActive={(props as any).showFolderSelect} >
                        <FilterCounter filtered={(props as any).variables.query !== undefined}>
                            <span>Found {props.data && props.data!!.parcelsStats !== null && <>{props.data!!.parcelsStats.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</>} parcels </span>
                        </FilterCounter>
                        <XWithRole role={['feature-customer-kassita']} negate={true}>
                            <XButtonWithMargin text="Save to Folder" style="primary" onClick={(props as any).onButtonClick} />
                        </XWithRole>
                    </FilterCounterWrapper>
                )} />
        ) : (
                <FilterCounterWrapper saveActive={(props as any).showFolderSelect}>
                    <FilterCounter filtered={(props as any).variables.query !== undefined}>
                        <span>Found {props.data && props.data!!.parcelsStats !== null && <>{props.data!!.parcelsStats.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</>} parcels </span>
                    </FilterCounter>

                </FilterCounterWrapper>
            ));
}) as React.ComponentClass<{ showFolderSelect: boolean, variables: any, onButtonClick: () => void, onClose: () => void, onStatsLoaded: () => void, show: boolean }>;

class FoundCounterSave extends React.Component<{
    variables: {
        query?: string,
        city: string,
        county: string,
        state: string,
    },
    onStatsLoaded: () => void,
    show: boolean

}, { showFolderSelect: boolean }> {

    constructor(props: any) {
        super(props);
        this.state = { showFolderSelect: false };
    }

    onButtonClick = () => {
        this.setState({ showFolderSelect: !this.state.showFolderSelect });
    }

    onClose = () => {
        this.setState({ showFolderSelect: false });
    }

    render() {
        return (
            <FolderButtonWithSave variables={this.props.variables} showFolderSelect={this.state.showFolderSelect} onButtonClick={this.onButtonClick} onClose={this.onClose} onStatsLoaded={this.props.onStatsLoaded} show={this.props.show} />
        );
    }
}

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

// const AddOpportunitiesButton = withAddFromSearchOpportunity((props) => <XButtonMutation mutation={props.addFromSearch}>Add to prospecting</XButtonMutation>);
class ParcelCollection extends React.Component<XWithRouter & UserInfoComponentProps & { roles: { roles: string[]; } | undefined }, { shadowed: boolean, mapLoaded?: boolean, parcelStatsLoaded?: boolean }> {

    knownCameraLocation?: XMapCameraLocation;

    savedCity?: string | null;

    constructor(props: XWithRouter & UserInfoComponentProps & { roles: { roles: string[]; } | undefined }) {
        super(props);
        this.state = {
            shadowed: false
        };

        if (canUseDOM) {
            let k = sessionStorage.getItem('__explore_location');
            if (k !== null) {
                this.knownCameraLocation = JSON.parse(k);
            }

            this.savedCity = sessionStorage.getItem('__explore_city');

            if (!this.props.router.routeQuery.city) {
                this.props.router.replaceQueryParams({ city: this.resolveCity() });
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
            if (JSON.parse(this.props.router.query!!.filterStories).indexOf('4') > -1) {
                clauses.push({ '$or': [{ 'stories': { gte: 4 } }, { 'stories': JSON.parse(this.props.router.query!!.filterStories) }] });
            } else {
                clauses.push({ 'stories': JSON.parse(this.props.router.query!!.filterStories) });
            }
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
            isVacantSet = JSON.parse(this.props.router.query!!.isVacant);
            console.warn(isVacantSet);
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
        this.props!!.router.pushQuery('selectedParcel', id);
    }

    handleMap = (e: XMapCameraLocation) => {
        sessionStorage.setItem('__explore_location', JSON.stringify(e));
        this.knownCameraLocation = e;
    }

    onMapLoaded = () => {
        this.setState({ mapLoaded: true });
    }

    onStatsLoaded = () => {
        if (!this.state.parcelStatsLoaded) {
            this.setState({ parcelStatsLoaded: true });
        }
    }

    resolveCity = () => {
        let defaultCity = 'sf';
        if (this.props.roles!!.roles.find((v) => v === 'feature-city-nyc-force')) {
            defaultCity = 'nyc';
        }
        let pendingCity = this.props.router.routeQuery.city || this.savedCity || defaultCity;
        return pendingCity;
    }

    render() {
        let pendingCity = this.resolveCity();
        let cityChanged = pendingCity !== this.savedCity;
        let city = pendingCity;
        if (canUseDOM) {
            sessionStorage.setItem('__explore_city', city);
        }
        let cityName = city === 'sf' ? 'San Francisco' : 'New York';
        let countyName = city === 'sf' ? 'San Francisco' : 'New York';
        let stateName = city === 'sf' ? 'CA' : 'NY';
        let boundingBox = city === 'sf' ? [-123.0137, 37.6040, -122.3549, 37.8324] : [-74.2589, 40.4774, -73.7004, 40.9176];
        let focus = city === 'sf'
            ? { latitude: 37.75444398077139, longitude: -122.43963811583545, zoom: 12 }
            : { latitude: 40.713919, longitude: -74.002332, zoom: 12 };

        let query = this.buildquery();

        return (
            <Scaffold noBoxShadow={true} sidebarBorderColor="#dcdee4cc">
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <XMapContainer>
                        <XMapContainer2>

                            <FoundCounterSave
                                variables={{
                                    query: query && JSON.stringify(query),
                                    city: cityName,
                                    county: countyName,
                                    state: stateName
                                }}
                                show={!!(this.state.mapLoaded)}
                                onStatsLoaded={this.onStatsLoaded}
                            />

                            {this.state.mapLoaded && this.state.parcelStatsLoaded && (
                                <>
                                    <RoutedMapFilters city={city} />

                                    <CitySelector title={city === 'sf' ? 'San Francisco' : 'New York City'}>
                                        <CitySelector.Item
                                            query={{ field: 'city', value: 'sf', clear: true }}
                                            active={city === 'sf'}
                                            label="San Francisco"
                                        />
                                        <CitySelector.Item
                                            query={{ field: 'city', value: 'nyc', clear: true }}
                                            active={city !== 'sf'}
                                            label="New York City"
                                        />
                                    </CitySelector>
                                </>
                            )}

                            <ParcelMap
                                mode={this.props.router.query.mode}
                                selectedParcel={this.props.router.query.selectedParcel}
                                onParcelClick={this.handleClick}
                                focusPosition={focus}
                                lastKnownCameraLocation={cityChanged ? undefined : this.knownCameraLocation}
                                onCameraLocationChanged={this.handleMap}
                                onLoaded={this.onMapLoaded}
                            >
                                <MapSearcher city={cityName} bbox={boundingBox} />

                                <ParcelMapSearch
                                    layer="parcels-found"
                                    query={query}
                                />
                                {/* 
                                            <ParcelPointSource
                                                layer="parcels-found"
                                                query={query}
                                                minZoom={12}
                                                skip={query === undefined}
                                            />
                                             */}
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
                                {/* <XSwitcher fieldStyle={true}>
                                                <XSwitcher.Item query={{ field: 'mode' }}>{TextMap.map}</XSwitcher.Item>
                                                <XSwitcher.Item query={{ field: 'mode', value: 'satellite' }}>{TextMap.satellite}</XSwitcher.Item>
                                                {city === 'sf' && <XSwitcher.Item query={{ field: 'mode', value: 'zoning' }}>{TextMap.zoning}</XSwitcher.Item>}
                                            </XSwitcher> */}
                                <MapStyleSwitcher>
                                    <MapStyleSwitcher.Item query={{ field: 'mode' }} text={TextMap.map} img="/static/X/Map.png" />
                                    <MapStyleSwitcher.Item query={{ field: 'mode', value: 'satellite' }} text={TextMap.satellite} img="/static/X/Satellite.png" />
                                    {city === 'sf' && <MapStyleSwitcher.Item query={{ field: 'mode', value: 'zoning' }} text={TextMap.zoning} img="/static/X/Zoning.png" />}
                                </MapStyleSwitcher>
                            </MapSwitcher>
                        </XMapContainer2>
                        {this.props.router.query.selectedParcel && <ParcelCard variables={{ parcelId: this.props.router.query!!.selectedParcel }} mapMode={this.props.router.routeQuery.mode} />}
                    </XMapContainer>
                </Scaffold.Content>
            </Scaffold>);
    }
}

export default withApp('Explore', 'viewer', withRouter(withUserInfo((props) => {
    return (
        <>
            <XDocumentHead title={[TextPageExplore.title]} />
            <XRoleContext.Consumer>
                {(roles) => {
                    return (
                        <ParcelCollection {...props} roles={roles} />
                    );

                }}

            </XRoleContext.Consumer >
        </>
    );
})));