import * as React from 'react';
import * as PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { NotNullableChildProps } from './graphql';
import { getComponentDisplayName } from './utils';

type ViewPortProps = { center: { latitude: number, longitude: number } };

export function withMapViewport<P = {}>(ComposedComponent: React.ComponentType<P & ViewPortProps>) {
    return class WithRouter extends React.Component<P> {
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
            let viewport = this.context.mapViewport as {
                isEnabled: boolean,
                latitude?: number,
                longitude?: number,
                zoom?: number,
                pitch?: number,
                bearing?: number,
                width?: number,
                height?: number
            };
            if (viewport.isEnabled) {
                return (
                    <ComposedComponent
                        center={{ latitude: viewport.latitude!!, longitude: viewport.longitude!! }}
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
    return function (component: React.ComponentType<NotNullableChildProps<TResult>>): React.ComponentType<{}> {
        let qlWrapper = graphql<TResult, ViewPortProps, NotNullableChildProps<TResult>>(document, {
            options: (props: ViewPortProps) => {
                return {
                    variables: {
                        latitude1: props.center.latitude - 0.005,
                        longitude1: props.center.longitude - 0.005,
                        latitude2: props.center.latitude + 0.005,
                        longitude2: props.center.longitude + 0.005,
                    }
                };
            }
        });

        return withMapViewport(qlWrapper(component));
    };
}