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
    geometry: string;
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
    layer?: Layer<GeoJsonLayerProps>,
    data?: any
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

    items = new Map<string, any>();
    latest = {};

    constructor(props: XMapOverlayProps, context?: any) {
        super(props, context);
        this.state = { data: this.convertProps(props.records) };
        if (canUseDOM) {
            this.initDeck();
        }
    }

    initDeck = async () => {
        let deck = await import('deck.gl');

        this.setState({ deck: deck.default, layer: deck.GeoJsonLayer })
    }

    componentWillReceiveProps(nextProps: XMapOverlayProps) {
        if (this.props.records !== nextProps.records) {
            console.warn('rebuild')
            this.setState({ data: this.convertProps(nextProps.records) });
        }
    }

    convertProps = (src: OverlayRecord[]) => {
        let changed = false
        for (let v of src) {
            if (this.items.has(v.id)) {
                continue;
            }
            changed = true;

            let coordinates: number[][][] = [];
            if (v.geometry.length > 0) {
                coordinates = (JSON.parse(v.geometry as any) as number[][]).map((p) => p.map((c) => [c[0], c[1]]));
            }
            let item = {
                type: 'Feature',
                properties: {
                    name: v.id
                },
                geometry: {
                    type: 'Polygon',
                    coordinates: coordinates
                }
            }
            this.items.set(v.id, item);
        }
        if (changed) {
            this.latest = {
                type: 'FeatureCollection',
                features: Array.from(this.items.values())
            }
        }
        console.warn(this.latest);
        return this.latest;
    }

    render() {
        let Deck = this.state.deck;
        let layer = this.state.layer;
        let D = this.context.mapViewport as MapViewport
        if (Deck && layer && D.isEnabled) {
            let l = new layer({
                id: 'maps',
                stroked: true,
                filled: true,
                extruded: false,
                wireframe: false,
                pickable: false,
                opacity: 0.2,
                fp64: true,
                getLineColor: () => [255, 255, 255],
                getFillColor: () => [255, 0, 0],
                data: this.state.data
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