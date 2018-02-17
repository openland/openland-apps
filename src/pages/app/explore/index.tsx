import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withApp } from '../../../components/App/withApp';
import { AppContentMap } from '../../../components/App/AppContentMap';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { withApollo } from 'react-apollo';
import * as Queries from '../../../api/queries/Blocks';
import * as Types from '../../../api/Types';
import * as Immutable from 'immutable';
import { XMapSubscriber } from '../../../components/X/XMapLight';
import * as Turf from '@turf/turf';
import { XCard } from '../../../components/X/XCard';
import { withParcelDirect } from '../../../api';
import { XButton } from '../../../components/X/XButton';
import Glamorous from 'glamorous';
import { XLink } from '../../../components/X/XLink';
import { XArea } from '../../../components/X/XArea';
import { XMoney } from '../../../components/X/XMoney';
import { AStreetViewModal } from '../../../components/App/AStreetViewModal';

class GraphQLTileSource extends React.Component<{
    client: ApolloClient<any>,
    onClick: (parcelId: string) => void,
    selected?: string
}, { elements: Immutable.Map<string, { title: string, geometry: any }> }> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isInited = false;
    private isLoading = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;
    private pendingBox: { south: number, north: number, east: number, west: number } | null = null;

    constructor(props: { client: ApolloClient<any>, onClick: (parcelId: string) => void }, selected?: string) {
        super(props);

        this.state = { elements: Immutable.Map() }
    }

    listener: XMapSubscriber = (src, map) => {
        if (!this.isInited) {
            this.map = map;
            this.isInited = true;

            map.addSource('parcels', { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });
            map.addLayer({
                'id': 'parcels-view',
                'type': 'fill',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'fill-color': '#4428e0',
                    'fill-opacity': 0.8
                }
            });
            map.addLayer({
                'id': 'parcels-borders',
                'type': 'line',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'line-color': '#4428e0',
                    'line-width': 1,
                    'line-opacity': 1
                }
            });
            map.addLayer({
                'id': 'parcels-view-hover',
                'type': 'fill',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'fill-color': '#088',
                    'fill-opacity': 1
                },
                'filter': ['==', 'parcelId', '']
            });

            map.addLayer({
                'id': 'parcels-view-selected',
                'type': 'fill',
                'source': 'parcels',
                'layout': {},
                'paint': {
                    'fill-color': '#ff0000',
                    'fill-opacity': 1
                },
                'filter': ['==', 'parcelId', '']
            });

            // When the user moves their mouse over the states-fill layer, we'll update the filter in
            // the state-fills-hover layer to only show the matching state, thus making a hover effect.
            map.on('mousemove', 'parcels-view', function (e: any) {
                map.setFilter('parcels-view-hover', ['==', 'parcelId', e.features[0].properties.parcelId]);
            });

            // Reset the state-fills-hover layer's filter when the mouse leaves the layer.
            map.on('mouseleave', 'parcels-view', function () {
                map.setFilter('parcels-view-hover', ['==', 'parcelId', '']);
            });

            map.on('click', 'parcels-view', (e: any) => {
                let center = Turf.bbox(e.features[0]);
                map.fitBounds([[center[0], center[1]], [center[2], center[3]]], {
                    padding: {
                        left: 100,
                        right: 100,
                        top: 100,
                        bottom: 400
                    },
                    maxZoom: 18,
                    duration: 300
                });
                this.props.onClick(e.features[0].properties.parcelId);
            })
            map.setFilter('parcels-view-selected', ['==', 'parcelId', this.props.selected]);
        }
        this.pendingBox = src;
        this.tryInvokeLoader();
    }

    tryInvokeLoader = async () => {
        if (this.isLoading) {
            return
        }
        if (this.pendingBox) {
            let box = this.pendingBox;
            this.isLoading = true;
            this.pendingBox = null;

            let response: ApolloQueryResult<Types.ParcelsTileOverlayQuery> | null = null;
            console.warn('Querying...')
            while (this._isMounted) {
                try {
                    response = await this.props.client.query<Types.ParcelsTileOverlayQuery>({
                        query: Queries.ParcelsTileOverlay,
                        variables: {
                            box: { south: box.south, north: box.north, east: box.east, west: box.west }
                        }
                    });
                } catch {
                    continue;
                }
                break;
            }
            if (!response) {
                return;
            }
            console.warn('Completed')
            this.setState(
                (src) => {
                    let res = src.elements;
                    for (let s of response!!.data.tiles!!) {
                        if (!res.has(s.id)) {
                            res = res.set(s.id, { title: s.title, geometry: (JSON.parse(s.geometry as any) as number[][]).map((p) => [p.map((c) => [c[0], c[1]])]) });
                        }
                    }
                    return { elements: res };
                },
                () => {
                    this.isLoading = false;
                    this.tryInvokeLoader();
                    let features = this.state.elements.map((v, k) => ({
                        type: 'Feature',
                        'geometry': { type: 'MultiPolygon', coordinates: v!!.geometry },
                        properties: {
                            parcelId: k
                        }
                    })).toArray();
                    (this.map!!.getSource('parcels') as any).setData({ 'type': 'FeatureCollection', features: features });
                });
        }
    }

    render() {
        console.warn('Count: ' + this.state.elements.size);
        return null;
    }

    componentWillReceiveProps(nextProps: { selected?: string }) {
        if (this.props.selected !== nextProps.selected && this.isInited && this._isMounted) {
            this.map!!.setFilter('parcels-view-selected', ['==', 'parcelId', nextProps.selected]);
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.context.mapUnsubscribe(this.listener);
    }
}

let LinkedSource = withApollo(GraphQLTileSource);

let Container = Glamorous.div({
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    zIndex: 1,
    bottom: '64px',
    left: 'calc(50vw - 400px)',
    width: '800px'
})

let ParcelViewer = withParcelDirect((props) => {
    return (
        <Container>
            <XCard shadow="medium">
                <XCard.Loader loading={props.data!!.loading}>
                    {props.data && props.data!!.item && <>
                        <XCard.Header title={'Parcel #' + props.data.item!!.title}>
                            <AStreetViewModal geometry={props.data.item!!.geometry!!} />
                            <XButton style="dark" path={'/app/parcels/' + props.data.item!!.id}>View</XButton>
                        </XCard.Header>
                        <XCard.PropertyColumns>
                            <XCard.PropertyList>
                                <XCard.Property title="Block"><XLink path={'/app/blocks/' + props.data.item!!.block.id}>{props.data.item!!.block.title}</XLink></XCard.Property>
                                {props.data.item!!.extrasArea &&
                                    <XCard.Property title="Parcel Area"><XArea area={props.data.item!!.extrasArea!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasSupervisorDistrict &&
                                    <XCard.Property title="Supervisor District">{props.data.item!!.extrasSupervisorDistrict}</XCard.Property>
                                }
                                {props.data.item!!.extrasZoning && props.data.item!!.extrasZoning!!.length > 0 &&
                                    <XCard.Property title="Zoning">{props.data.item!!.extrasZoning!!.join()}</XCard.Property>
                                }

                                {props.data.item!!.extrasLandValue !== null &&
                                    <XCard.Property title="Land Value"><XMoney value={props.data.item!!.extrasLandValue!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasImprovementValue !== null &&
                                    <XCard.Property title="Improvement Value"><XMoney value={props.data.item!!.extrasImprovementValue!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasFixturesValue !== null &&
                                    <XCard.Property title="Fixtures Value"><XMoney value={props.data.item!!.extrasFixturesValue!!} /></XCard.Property>
                                }
                                {props.data.item!!.extrasPropertyValue !== null &&
                                    <XCard.Property title="Personal Property Value"><XMoney value={props.data.item!!.extrasPropertyValue!!} /></XCard.Property>
                                }
                            </XCard.PropertyList>
                            <XCard.PropertyList>
                                {props.data.item!!.extrasYear !== null &&
                                    <XCard.Property title="Year Built">{props.data.item!!.extrasYear}</XCard.Property>
                                }
                                {props.data.item!!.extrasStories !== null &&
                                    <XCard.Property title="Stories Count">{props.data.item!!.extrasStories}</XCard.Property>
                                }
                                {props.data.item!!.extrasUnits !== null &&
                                    <XCard.Property title="Units Count">{props.data.item!!.extrasUnits}</XCard.Property>
                                }
                                {props.data.item!!.extrasRooms !== null &&
                                    <XCard.Property title="Rooms Count">{props.data.item!!.extrasRooms}</XCard.Property>
                                }
                                {props.data.item!!.extrasBedrooms !== null &&
                                    <XCard.Property title="Bedrooms Count">{props.data.item!!.extrasBedrooms}</XCard.Property>
                                }
                                {props.data.item!!.extrasBathrooms !== null &&
                                    <XCard.Property title="Bathrooms Count">{props.data.item!!.extrasBathrooms}</XCard.Property>
                                }
                            </XCard.PropertyList>
                        </XCard.PropertyColumns>
                    </>}
                </XCard.Loader>
            </XCard>
        </Container>
    )
})

class ParcelCollection extends React.Component<{}, { selected?: string }> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <>
                <LinkedSource onClick={(v: string) => this.setState({ selected: v })} selected={this.state.selected} />
                {this.state.selected && <ParcelViewer parcelId={this.state.selected} />}
            </>
        )
    }
}

export default withApp((props) => {
    return (
        <AppContentMap>
            <ParcelCollection />
        </AppContentMap>
    )
})