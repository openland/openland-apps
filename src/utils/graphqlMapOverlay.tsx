import * as React from 'react';
import * as PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { NotNullableChildProps } from './graphql';
import { getComponentDisplayName } from './utils';
import { MapViewport } from './map';
type Geo = { latitude: number, longitude: number };
type ViewPortProps = {
    center: Geo,
    bounds: {
        ne: Geo,
        sw: Geo
    }
};
type ViewPortFilterProps = { minZoom?: number, maxZoom?: number };

function withMapViewport<P = {}>(ComposedComponent: React.ComponentType<P & ViewPortProps>) {
    return class WithMapViewPort extends React.Component<P & ViewPortFilterProps, {
        enabled: boolean,
        bounds?: {
            ne: Geo,
            sw: Geo
        },
        center?: Geo,
        zoom?: number
    }> {
        static displayName = `WithMapViewport(${getComponentDisplayName(ComposedComponent)})`;
        static contextTypes = {
            mapViewport: PropTypes.shape({
                isEnabled: PropTypes.bool.isRequired,
                latitude: PropTypes.number,
                longitude: PropTypes.number,
                zoom: PropTypes.number,
                pitch: PropTypes.number,
                bearing: PropTypes.number,
                width: PropTypes.number,
                height: PropTypes.number
            }),
        };

        invalidate: number | null = null;

        constructor(props: P & ViewPortFilterProps, context: any) {
            super(props, context);

            let viewport = this.context.mapViewport as MapViewport;
            this.state = {
                enabled: viewport.isEnabled,
                bounds: viewport.bounds,
                center: viewport.center,
                zoom: viewport.zoom
            }
        }

        componentWillReceiveProps(nextProps: Readonly<P & ViewPortFilterProps>, nextContext: any) {
            let viewport = nextContext.mapViewport as MapViewport;
            if (this.invalidate !== null) {
                window.clearTimeout(this.invalidate);
                this.invalidate = null;
            }
            this.invalidate = window.setTimeout(
                () => {
                    this.setState({
                        enabled: viewport.isEnabled,
                        bounds: viewport.bounds,
                        center: viewport.center,
                        zoom: viewport.zoom
                    })
                },
                250);
        }

        render() {
            if (!this.state.enabled) {
                return null
            }
            if (this.props.maxZoom) {
                if (this.state.zoom!! > this.props.maxZoom) {
                    return null;
                }
            }
            if (this.props.minZoom) {
                if (this.state.zoom!! < this.props.minZoom) {
                    return null;
                }
            }

            return (
                <ComposedComponent
                    center={this.state.center!!}
                    bounds={this.state.bounds!!}
                    {...this.props}
                />
            );
        }
    };
}

function roundLocation(val: number) {
    return val; // Math.round(val * 1000) / 1000;
}

export function graphqlMapOverlay<TResult extends { id: string }>(document: DocumentNode) {
    return function (component: React.ComponentType<NotNullableChildProps<{ points: TResult[] }>>): React.ComponentType<ViewPortFilterProps> {
        let qlWrapper = graphql<{ points: TResult[] }, ViewPortProps, NotNullableChildProps<{ points: TResult[] }>>(document, {
            options: (props: ViewPortProps) => {

                let e = roundLocation(props.bounds.ne.latitude);
                let n = roundLocation(props.bounds.ne.longitude);
                let w = roundLocation(props.bounds.sw.latitude);
                let s = roundLocation(props.bounds.sw.longitude);

                // let latDiff = roundLocation(Math.abs(e - w) * 0.1);
                // let lonDiff = roundLocation(Math.abs(n - s) * 0.1);
                
                return {
                    variables: {
                        latitude1: e,
                        longitude1: n,
                        latitude2: w,
                        longitude2: s,
                    },
                    fetchPolicy: 'network-only'
                };
            }
        });

        return withMapViewport(qlWrapper(component));
    };
}