import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DocumentNode } from 'graphql';
import { XMapSubscriber } from '../components/X/XMapLight';
import ApolloClient from 'apollo-client';
import * as Immutable from 'immutable';
import { backoff } from './timer';

interface GraphQLTileSourceProps {
    layer: string;
    minZoom?: number;
}

export function graphQLTileSource<T extends { tiles: Array<{ id: string, geometry: string | null }> | null }>(QueryDocument: DocumentNode) {
    return class GraphQLTileSource extends React.Component<GraphQLTileSourceProps, { elements: Immutable.Map<string, { key: string, geometry: any }> }> {
        static contextTypes = {
            mapSubscribe: PropTypes.func.isRequired,
            mapUnsubscribe: PropTypes.func.isRequired,
            client: PropTypes.object.isRequired,
        }

        private isInited = false;
        private isLoading = false;
        private _isMounted = false;
        private client: ApolloClient<{}> | null = null;
        private map: mapboxgl.Map | null = null;
        private pendingBox: { south: number, north: number, east: number, west: number } | null = null;

        constructor(props: GraphQLTileSourceProps, context: any) {
            super(props, context);

            this.state = { elements: Immutable.Map() }
        }

        listener: XMapSubscriber = (src, map) => {
            console.warn('listener:call')
            if (!this.isInited) {
                this.map = map;
                this.isInited = true;
                map.addSource(this.props.layer, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });
            }
            if ((this.props.minZoom !== undefined) && (this.props.minZoom < src.zoom)) {
                return;
            }
            this.pendingBox = src;
            this.tryInvokeLoader();
        }

        refreshState = () => {
            let features = this.state.elements.map((v, k) => ({
                type: 'Feature',
                'geometry': { type: 'MultiPolygon', coordinates: v!!.geometry },
                properties: {
                    parcelId: k
                }
            })).toArray();
            (this.map!!.getSource(this.props.layer) as any).setData({ 'type': 'FeatureCollection', features: features });
        }

        tryInvokeLoader = async () => {
            if (this.isLoading) {
                return
            }
            if (this.pendingBox) {
                // Save Parameters
                let box = this.pendingBox; // query: '{"$and": [{"stories": {"gt": 1, "lte": 2}},{"zone": "NC-3"}]}'
                let query: string | undefined = undefined;

                // Update Internal State
                this.isLoading = true;
                this.pendingBox = null;

                // Loading Tile Patch
                console.warn('Querying...');
                let response = await backoff(async () =>
                    this.client!!.query<T>({
                        query: QueryDocument,
                        variables: {
                            box: { south: box.south, north: box.north, east: box.east, west: box.west },
                            query: query
                        }
                    })
                );

                // Stop if component is not mounted
                if (!this._isMounted) {
                    return;
                }

                // Updating loaded tiles
                this.setState(
                    (src) => {
                        let res = src.elements;
                        if (response.data && response.data.tiles) {
                            for (let s of response.data.tiles) {
                                if (!res.has(s.id)) {
                                    res = res.set(s.id, { key: s.id, geometry: (JSON.parse(s.geometry as any) as number[][]).map((p) => [p.map((c) => [c[0], c[1]])]) });
                                }
                            }
                        }
                        return { elements: res };
                    },
                    () => {
                        this.isLoading = false;
                        this.tryInvokeLoader();
                        this.refreshState();
                    });
            }
        }

        //
        // React Injecting
        //

        render() {
            return null;
        }

        componentDidMount() {
            this._isMounted = true;
            this.client = this.context.client as ApolloClient<{}>;
            this.context.mapSubscribe(this.listener);
        }

        componentWillUnmount() {
            this._isMounted = false;
            this.context.mapUnsubscribe(this.listener);
        }
    }
}