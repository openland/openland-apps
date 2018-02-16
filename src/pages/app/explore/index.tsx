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

class GraphQLTileSource extends React.Component<{ client: ApolloClient<any> }, { elements: Immutable.Map<string, { title: string, geometry: any }> }> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isInited = false;
    private isLoading = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;
    private pendingBox: { south: number, north: number, east: number, west: number } | null = null;

    constructor(props: { client: ApolloClient<any> }) {
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
                'filter': ['==', 'name', '']
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

            map.on('click', 'parcels-view', function (e: any) {
                // let parcelId = e.features[0].properties.parcelId;
                // let points: number[][] = e.features[0].geometry.coordinates[0];
                let center = Turf.bbox(e.features[0]);
                // console.warn(points);
                map.fitBounds([[center[0], center[1]], [center[2], center[3]]], {
                    padding: 100,
                    maxZoom: 18,
                    duration: 300
                });
                // map.flyTo({ center: center.geometry!!.coordinates });
                // console.warn(e);
            })
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

export default withApp((props) => {
    return (
        <AppContentMap>
            <LinkedSource />
        </AppContentMap>
    )
})