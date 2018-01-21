import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../utils/environment';
import { Geo } from '../../api/Geo';
import { MapViewport } from '../../utils/map';

interface XMapOverlayProps {
    records: OverlayRecord[];
}

interface OverlayRecord {
    id: string;
    geometry: Geo[][]
}

interface XMapOverlayState {
    deck?: React.ComponentClass<{
        zoom: number,
        longitude: number,
        latitude: number,
        pitch: number,
        bearing: number,
        width: number,
        height: number,
        layers: any[]
    }>,
    layer?: Layer<GeoJsonLayerProps>
}

interface LayerProps {
    id?: string;
    data?: any;
    visible?: boolean;
    opacity?: number;

    pickable?: boolean;
    highlightColor?: number[];
    autoHighlight?: boolean;

    fp64?: boolean;
}

interface Layer<T extends LayerProps> {
    context: any;
    state: any;
    props: T;
    new(props: T): Layer<T>;
}

interface GeoJsonLayerProps extends LayerProps {
    filled?: boolean;
    stroked?: boolean;
    extruded?: boolean;
    wireframe?: boolean;

    getLineColor?: (src: any) => number[];
    getFillColor?: (src: any) => number[];
}

export class XMapOverlay extends React.Component<XMapOverlayProps, XMapOverlayState> {

    static contextTypes = {
        mapViewport: PropTypes.shape({
            isEnabled: PropTypes.bool.isRequired,
            center: PropTypes.shape({
                latitude: PropTypes.number,
                longitude: PropTypes.number,
            }),
            bounds: PropTypes.shape({
                ne: PropTypes.shape({
                    latitude: PropTypes.number,
                    longitude: PropTypes.number,
                }),
                sw: PropTypes.shape({
                    latitude: PropTypes.number,
                    longitude: PropTypes.number,
                }),
            }),
            zoom: PropTypes.number,
            pitch: PropTypes.number,
            bearing: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number
        }),
    };

    constructor(props: XMapOverlayProps, context?: any) {
        super(props, context);
        this.state = {};
        if (canUseDOM) {
            this.initDeck();
        }
    }

    initDeck = async () => {
        let deck = await import('deck.gl');

        this.setState({ deck: deck.default, layer: deck.GeoJsonLayer })
    }

    render() {
        let Deck = this.state.deck;
        let layer = this.state.layer;
        let D = this.context.mapViewport as MapViewport
        if (Deck && layer && D.isEnabled) {
            let polygons = this.props.records.map((v) => {
                let coordinates: number[][][] = [];
                if (v.geometry.length > 0) {
                    coordinates = v.geometry.map((p) => p.map((c) => [c.longitude, c.latitude]));
                }
                return {
                    type: 'Feature',
                    properties: {
                        name: v.id
                    },
                    geometry: {
                        type: 'Polygon',
                        coordinates: coordinates
                    }
                }
            });
            let l = new layer({
                id: 'maps',
                stroked: true,
                filled: true,
                extruded: false,
                wireframe: true,
                pickable: true,
                opacity: 0.2,
                fp64: true,
                getLineColor: () => [255, 255, 255],
                getFillColor: () => [255, 0, 0],
                data: {
                    type: 'FeatureCollection',
                    features: polygons
                }
            });

            return (
                <Deck
                    latitude={D.center!!.latitude}
                    longitude={D.center!!.longitude}
                    zoom={D.zoom!!}
                    pitch={D.pitch!!}
                    bearing={D.bearing!!}
                    width={D.width!!}
                    height={D.height!!}
                    layers={[l]}
                />
            );
        } else {
            return null;
        }
    }
}