import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../utils/environment';

interface XMapOverlayProps {
    records: OverlayRecord[];
}

interface OverlayRecord {
    id: string;
    polygons: { longitude: number, latitude: number }[][]
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
    layer?: any
}

export class XMapOverlay extends React.Component<XMapOverlayProps, XMapOverlayState> {

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

    constructor(props: XMapOverlayProps, context?: any) {
        super(props, context);
        this.state = {};
        if (canUseDOM) {
            this.initDeck();
        }
    }

    initDeck = async () => {
        let deck = await import('deck.gl');
        let polygons = this.props.records.map((v) => {
            let coordinates: number[][][] = [];
            if (v.polygons.length > 0) {
                coordinates = v.polygons.map((p) => p.map((c) => [c.longitude, c.latitude]));
            }
            return {
                type: 'Feature',
                geometry: {
                    type: 'Polygon',
                    coordinates: coordinates
                }
            }
        });
        let layer = new deck.GeoJsonLayer({
            id: 'maps',
            stroked: false,
            filled: true,
            extruded: false,
            wireframe: true,
            opacity: 0.2,
            fp64: true,
            data: {
                type: 'FeatureCollection',
                features: polygons
            }
        });
        this.setState({ deck: deck.default, layer: layer })
    }

    render() {
        let Deck = this.state.deck;
        let Layer = this.state.layer;
        let D = (this.context as {
            mapViewport: {
                isEnabled: boolean,
                latitude?: number,
                longitude?: number,
                zoom?: number,
                pitch?: number,
                bearing?: number,
                width?: number,
                height?: number
            }
        }).mapViewport
        if (Deck && Layer && D.isEnabled) {
            return (
                <Deck
                    latitude={D.latitude!!}
                    longitude={D.longitude!!}
                    zoom={D.zoom!!}
                    pitch={D.pitch!!}
                    bearing={D.bearing!!}
                    width={D.width!!}
                    height={D.height!!}
                    layers={[Layer]}
                />
            );
        } else {
            return null;
        }
    }
}