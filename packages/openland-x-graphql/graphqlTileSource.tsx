import * as React from 'react';
import * as PropTypes from 'prop-types';
import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import { XMapSubscriber } from 'openland-x-map/XMap';
import { XMapSource } from 'openland-x-map/XMapSource';
import { backoff } from 'openland-x-utils/timer';
import { stopProgress, startProgress } from 'openland-x-routing/NextRouting';
import { parseGeometry } from 'openland-x-utils/parseGeometry';
import { GraphqlTypedQuery } from './typed';
interface GraphQLTileSourceProps {
    layer: string;
    minZoom?: number;
    query?: any;
    variables?: any;
    skip?: boolean;
    loaded?: Function;
}

const TileWidth = 0.005;
const TileHeight = 0.005;

const TileWidthLarge = 0.04;
const TileHeightLarge = 0.04;

export function graphQLTileSource<T extends { tiles: Array<{ id: string, geometry?: string | null, center?: { latitude: number, longitude: number } | null }> | null }>(
    query: GraphqlTypedQuery<T, { box: { south: number, north: number, west: number, east: number }, query?: string | null }>,
    options: {
        cluster?: boolean,
        propertiesFactory?: (src: any) => any;
    } = {}) {
    return class GraphQLTileSource extends React.Component<GraphQLTileSourceProps, { data?: any }> {
        static contextTypes = {
            mapSubscribe: PropTypes.func.isRequired,
            mapUnsubscribe: PropTypes.func.isRequired,
            client: PropTypes.object.isRequired,
        };

        private isLoading = false;
        private loadingId?: number;
        private client: ApolloClient<{}> | null = null;
        private pendingBox: { south: number, north: number, east: number, west: number, zoom: number } | null = null;
        private latestBox: { south: number, north: number, east: number, west: number, zoom: number } | null = null;
        private loaded = new Set<string>();
        private allElements = new Map<string, { key: string, geometry: any }>();
        private allFeatures: any[] = [];
        private generation = 0;

        constructor(props: GraphQLTileSourceProps, context: any) {
            super(props, context);
            this.state = {};
        }

        listener: XMapSubscriber = (src, map) => {
            this.latestBox = src;
            if ((this.props.minZoom !== undefined) && (src.zoom < this.props.minZoom) || this.props.skip) {
                return;
            }
            this.pendingBox = src;
            this.tryInvokeLoader(this.props);
        }

        tryInvokeLoader = async (props: GraphQLTileSourceProps) => {
            if (this.isLoading) {
                return;
            }
            if (this.pendingBox) {
                // Save Parameters
                let box = this.pendingBox;
                let currentGeneration = this.generation;

                // Update Internal State
                this.isLoading = true;
                this.pendingBox = null;
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }
                this.loadingId = startProgress();

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
                                    query: query.document,
                                    variables: {
                                        ...props.variables,
                                        box: {
                                            south: (y1 + j) * currentTileWidth,
                                            north: (y1 + j + 1) * currentTileWidth,
                                            west: (x1 + i) * currentTileHeight,
                                            east: (x1 + i + 1) * currentTileHeight
                                        },
                                        query: props.query ? JSON.stringify(props.query) : undefined
                                        
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

                if (currentGeneration !== this.generation) {
                    return;
                }

                let loadedElements: any[] = [];
                for (let e of elements) {
                    let es = await e;
                    if (es.data && es.data.tiles) {
                        for (let tile of es.data.tiles) {
                            loadedElements.push(tile);
                        }
                    }

                }

                // Stop if component is not mounted
                if (currentGeneration !== this.generation) {
                    return;
                }

                //
                // Apply
                //

                let wasUpdated = false;
                for (let s of loadedElements) {
                    if (!this.allElements.has(s.id)) {
                        if (s.geometry) {
                            let geometry = parseGeometry(s.geometry);
                            this.allElements.set(s.id, { key: s.id, geometry: geometry });
                            let properties = {
                                'id': s.id
                            };
                            if (options.propertiesFactory) {
                                properties = {
                                    ...options.propertiesFactory(s),
                                    ...properties
                                };
                            }
                            this.allFeatures.push({
                                type: 'Feature',
                                'geometry': { type: 'MultiPolygon', coordinates: geometry },
                                properties
                            });
                        } else if (s.center) {
                            let latitude = s.center.latitude as number;
                            let longitude = s.center.longitude as number;
                            this.allElements.set(s.id, { key: s.id, geometry: { latitude: latitude, longitude: longitude } });
                            let properties = {
                                'id': s.id
                            };
                            if (options.propertiesFactory) {
                                properties = {
                                    ...options.propertiesFactory(s),
                                    ...properties
                                };
                            }
                            this.allFeatures.push({
                                type: 'Feature',
                                'geometry': { type: 'Point', coordinates: [longitude, latitude] },
                                properties
                            });
                        }
                        wasUpdated = true;
                    }
                }

                if (this.props.loaded) {
                    this.props.loaded(this.allElements.size);
                }

                //
                // Complete Loading
                //

                this.isLoading = false;
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }
                this.tryInvokeLoader(this.props);

                if (wasUpdated) {
                    this.setState({ data: { 'type': 'FeatureCollection', features: [...this.allFeatures] } });
                }
            }
        }

        //
        // React Injecting
        //

        render() {
            return (
                <XMapSource id={this.props.layer} data={this.state.data} cluster={options.cluster} />
            );
        }

        componentWillReceiveProps(nextProps: GraphQLTileSourceProps) {
            if (nextProps.query !== this.props.query || nextProps.variables !== this.props.variables) {
                this.isLoading = false;
                this.loaded.clear();
                this.allElements.clear();
                this.allFeatures = [];
                this.generation = this.generation + 1;
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }

                this.setState({ data: { 'type': 'FeatureCollection', features: [...this.allFeatures] } });

                if (this.latestBox) {
                    if ((nextProps.minZoom !== undefined) && (this.latestBox.zoom < nextProps.minZoom) || nextProps.skip) {
                        return;
                    }
                    this.pendingBox = this.latestBox;
                }

                this.tryInvokeLoader(nextProps);
            }
            //
        }

        componentDidMount() {
            this.client = this.context.client as ApolloClient<{}>;
            this.context.mapSubscribe(this.listener);
        }

        componentWillUnmount() {
            this.generation = this.generation + 1;
            this.context.mapUnsubscribe(this.listener);
            if (this.loadingId) {
                stopProgress(this.loadingId);
            }
        }
    };
}