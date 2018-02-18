import * as React from 'react';
import * as PropTypes from 'prop-types';
import { DocumentNode } from 'graphql';
import { XMapSubscriber } from '../components/X/XMapLight';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { backoff } from './timer';
import { startProgress, stopProgress } from './routing';

interface GraphQLTileSourceProps {
    layer: string;
    minZoom?: number;
}

const TileWidth = 0.005;
const TileHeight = 0.005;

const TileWidthLarge = 0.04;
const TileHeightLarge = 0.04;

export function graphQLTileSource<T extends { tiles: Array<{ id: string, geometry: string | null }> | null }>(QueryDocument: DocumentNode) {
    return class GraphQLTileSource extends React.Component<GraphQLTileSourceProps> {
        static contextTypes = {
            mapSubscribe: PropTypes.func.isRequired,
            mapUnsubscribe: PropTypes.func.isRequired,
            client: PropTypes.object.isRequired,
        }

        private isInited = false;
        private isLoading = false;
        private loadingId?: number;
        private _isMounted = false;
        private client: ApolloClient<{}> | null = null;
        private map: mapboxgl.Map | null = null;
        private pendingBox: { south: number, north: number, east: number, west: number } | null = null;
        private loaded = new Set<string>();
        private allElements = new Map<string, { key: string, geometry: any }>();
        private allFeatures: any[] = [];

        constructor(props: GraphQLTileSourceProps, context: any) {
            super(props, context);
        }

        listener: XMapSubscriber = (src, map) => {
            if (!this.isInited) {
                this.map = map;
                this.isInited = true;
                map.addSource(this.props.layer, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });
            }
            if ((this.props.minZoom !== undefined) && (src.zoom < this.props.minZoom)) {
                return;
            }
            this.pendingBox = src;
            this.tryInvokeLoader();
        }

        refreshState = () => {
            (this.map!!.getSource(this.props.layer) as any).setData({ 'type': 'FeatureCollection', features: this.allFeatures });
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
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }
                this.loadingId = startProgress();

                // const TileWidth = 0.005;
                // const TileHeight = 0.005;

                // const TileWidthLarge = 0.04;
                // const TileHeightLarge = 0.04;

                let zoomFactor = ((this.props.minZoom || 0) - 12) / 4;
                if (zoomFactor < 0) {
                    zoomFactor = 0;
                } else if (zoomFactor > 1) {
                    zoomFactor = 1;
                }

                let currentTileWidth = this.props.minZoom ? ((1 - zoomFactor) * TileWidthLarge + (zoomFactor) * TileWidth) : TileWidthLarge;
                let currentTileHeight = this.props.minZoom ? ((1 - zoomFactor) * TileHeightLarge + (zoomFactor) * TileHeight) : TileHeightLarge;

                let x1 = Math.ceil(box.west / currentTileWidth) - 1;
                let y1 = Math.ceil(box.south / currentTileHeight) - 1;
                let x2 = Math.floor(box.east / currentTileWidth) + 1;
                let y2 = Math.floor(box.north / currentTileHeight) + 1;
                let xStride = x2 - x1;
                let yStride = y2 - y1;

                // Loading Tile Patch
                let elements: Promise<ApolloQueryResult<T>>[] = [];
                for (let i = 0; i < xStride; i++) {
                    for (let j = 0; j < yStride; j++) {
                        let key = (x1 + i) + '-' + (y1 + j);
                        if (!this.loaded.has(key)) {
                            let response = backoff(async () =>
                                this.client!!.query<T>({
                                    query: QueryDocument,
                                    variables: {
                                        box: {
                                            south: (y1 + j) * currentTileWidth,
                                            north: (y1 + j + 1) * currentTileWidth,
                                            west: (x1 + i) * currentTileHeight,
                                            east: (x1 + i + 1) * currentTileHeight
                                        },
                                        query: query
                                    }
                                })
                            );

                            this.loaded.add(key);
                            elements.push(response);
                        }
                    }
                }

                //
                // Handling updated
                //

                let loadedElements: any[] = []
                for (let e of elements) {
                    let es = await e;
                    if (es.data && es.data.tiles) {
                        for (let tile of es.data.tiles) {
                            loadedElements.push(tile);
                        }
                    }

                }

                // Stop if component is not mounted
                if (!this._isMounted) {
                    return;
                }

                //
                // Apply
                //
                let wasUpdated = false;
                for (let s of loadedElements) {
                    if (!this.allElements.has(s.id)) {
                        let geometry = (JSON.parse(s.geometry as any) as number[][]).map((p) => [p.map((c) => [c[0], c[1]])]);
                        this.allElements.set(s.id, { key: s.id, geometry: geometry });
                        this.allFeatures.push({
                            type: 'Feature',
                            'geometry': { type: 'MultiPolygon', coordinates: geometry },
                            properties: {
                                'parcelId': s.id
                            }
                        });
                        wasUpdated = true;
                    }
                }

                //
                // Complete Loading
                //

                this.isLoading = false;
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }
                this.tryInvokeLoader();
                if (wasUpdated) {
                    this.refreshState();
                }
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
            if (this.map) {
                try {
                    this.map.removeSource(this.props.layer);
                } catch (_) {
                    // Ignore
                }
            }
            if (this.loadingId) {
                stopProgress(this.loadingId);
            }
        }
    }
}