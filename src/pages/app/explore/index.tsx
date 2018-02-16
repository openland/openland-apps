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
                    'fill-color': '#088',
                    'fill-opacity': 0.8
                }
            });
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
                    let features = this.state.elements.map((v) => ({ type: 'Feature', 'geometry': { type: 'MultiPolygon', coordinates: v!!.geometry } })).toArray();
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