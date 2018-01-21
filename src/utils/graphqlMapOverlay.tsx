import * as React from 'react';
import * as PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { NotNullableChildProps } from './graphql';
import { getComponentDisplayName } from './utils';
import { MapViewport } from './map';

type ViewPortProps = {
    center: { latitude: number, longitude: number },
    bounds: {
        ne: { latitude: number, longitude: number },
        sw: { latitude: number, longitude: number }
    }
};
type ViewPortFilterProps = { minZoom?: number, maxZoom?: number };

export function withMapViewport<P = {}>(ComposedComponent: React.ComponentType<P & ViewPortProps>) {
    return class WithMapViewPort extends React.Component<P & ViewPortFilterProps> {
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

        render() {
            let viewport = this.context.mapViewport as MapViewport;
            if (viewport.isEnabled) {
                if (this.props.maxZoom) {
                    if (viewport.zoom!! > this.props.maxZoom) {
                        return null;
                    }
                }
                if (this.props.minZoom) {
                    if (viewport.zoom!! < this.props.minZoom) {
                        return null;
                    }
                }
                return (
                    <ComposedComponent
                        center={viewport.center!!}
                        bounds={viewport.bounds!!}
                        {...this.props}
                    />
                );
            } else {
                return null;
            }
        }
    };
}

export function graphqlMapOverlay<TResult>(document: DocumentNode) {
    return function (component: React.ComponentType<NotNullableChildProps<TResult>>): React.ComponentType<ViewPortFilterProps> {
        let qlWrapper = graphql<TResult, ViewPortProps, NotNullableChildProps<TResult>>(document, {
            options: (props: ViewPortProps) => {
                let latDiff = Math.abs(props.bounds.ne.latitude - props.bounds.sw.latitude) * 0.25;
                let lonDiff = Math.abs(props.bounds.ne.longitude - props.bounds.sw.longitude) * 0.25;
                return {
                    variables: {
                        latitude1: props.bounds.ne.latitude + latDiff,
                        longitude1: props.bounds.ne.longitude + lonDiff,
                        latitude2: props.bounds.sw.latitude - latDiff,
                        longitude2: props.bounds.sw.longitude - lonDiff,
                    }
                };
            }
        });

        return withMapViewport(qlWrapper(component));
    };
}