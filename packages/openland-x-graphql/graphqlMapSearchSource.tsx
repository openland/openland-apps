import * as React from 'react';
import * as PropTypes from 'prop-types';
import { GraphqlTypedQuery } from 'openland-y-graphql/typed';
import ApolloClient from 'apollo-client';
import { XMapSubscriber } from 'openland-x-map/XMap';
import { stopProgress, startProgress } from 'openland-x-routing/NextRouting';
import { XMapSource } from 'openland-x-map/XMapSource';
import { backoff } from 'openland-x-utils/timer';

interface GraphQLMapSearchSourceProps {
    layer: string;
    query?: any;
}

export function graphQLMapSearchSource<T extends { results: Array<{ count: number | null, ref: string | null, lat: number, lon: number }> }>(
    query: GraphqlTypedQuery<T, { box: { south: number, north: number, west: number, east: number }, query: string, zoom: number }>
) {

    return class GraphQLMapSearchSource extends React.Component<GraphQLMapSearchSourceProps, { data?: any }> {
        static contextTypes = {
            mapSubscribe: PropTypes.func.isRequired,
            mapUnsubscribe: PropTypes.func.isRequired,
            client: PropTypes.object.isRequired,
        };

        private isLoading = false;
        private client: ApolloClient<{}>;
        private generation = 0;
        private loadingId?: number;
        private pendingBox: { south: number, north: number, east: number, west: number, zoom: number } | null = null;
        private latestBox: { south: number, north: number, east: number, west: number, zoom: number } | null = null;

        constructor(props: GraphQLMapSearchSourceProps, context: any) {
            super(props, context);
            this.state = {};
            this.client = context.client as ApolloClient<{}>;
        }

        listener: XMapSubscriber = (src, map) => {
            this.latestBox = src;
            if ((this.props.query === undefined)) {
                return;
            }
            this.pendingBox = src;
            this.tryInvokeLoader(this.props);
        }

        tryInvokeLoader = async (props: GraphQLMapSearchSourceProps) => {
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

                // Loading
                console.warn(Math.round(box.zoom));
                let response = await backoff(async () =>
                    this.client!!.query<T>({
                        query: query.document,
                        variables: {
                            box: {
                                south: box.south,
                                north: box.north,
                                west: box.west,
                                east: box.east
                            },
                            query: props.query ? JSON.stringify(props.query) : undefined,
                            zoom: Math.round(box.zoom)
                        }
                    })
                );

                // Cancel iteration if generation was advanced
                if (currentGeneration !== this.generation) {
                    return;
                }

                // Apply new Data
                let data = response.data.results.map((v, i) => {
                    if (v.count !== null) {
                        return {
                            type: 'Feature',
                            'geometry': { type: 'Point', coordinates: [v.lon, v.lat] },
                            'properties': {
                                'id': 'cluster-' + i,
                                'point_count': v.count,
                                'point_count_abbreviated': v.count + ''
                            }
                        };
                    } else {
                        console.warn(v.ref);
                        return {
                            type: 'Feature',
                            'geometry': { type: 'Point', coordinates: [v.lon, v.lat] },
                            'properties': {
                                'id': v.ref,
                            }
                        };
                    }
                });
                this.setState({ data: { 'type': 'FeatureCollection', features: data } });

                // Try again if needed
                this.isLoading = false;
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }
                this.tryInvokeLoader(this.props);
            }
        }

        render() {
            return (
                <XMapSource id={this.props.layer} data={this.state.data} />
            );
        }

        //
        // Handle Updates
        //

        componentWillReceiveProps(nextProps: GraphQLMapSearchSourceProps) {
            if (nextProps.query !== this.props.query) {

                // Halt iteration
                this.isLoading = false;
                this.generation = this.generation + 1;
                if (this.loadingId) {
                    stopProgress(this.loadingId);
                }

                // Init next iteration if needed
                if (this.latestBox && nextProps.query) {
                    this.pendingBox = this.latestBox;
                } else {
                    this.pendingBox = null;
                }

                // Start next iteration
                this.tryInvokeLoader(nextProps);
            }
        }

        //
        // Subscriptions
        //

        componentDidMount() {
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
