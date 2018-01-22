import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../utils/environment';
import { MapViewport } from '../../utils/map';
import * as M from 'mapbox-gl';
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
        layers: any[],
        useDevicePixels?: boolean
    }>,
    layer?: Layer<GeoJsonLayerProps>,
    data?: any,
    selected?: string,
    map?: M.Map
}

interface LayerProps {
    id?: string;
    data?: any;
    visible?: boolean;
    opacity?: number;

    pickable?: boolean;
    highlightColor?: number[];
    autoHighlight?: boolean;

    enabled?: boolean;

    fp64?: boolean;

    updateTriggers?: any;
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
    lineJointRounded?: boolean;
    pointRadiusScale?: number;

    getLineColor?: (src: any) => number[];
    getFillColor?: (src: any) => number[];
    onHover?: (src: any) => void;
    onClick?: (src: any) => void;
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

    items = new Map<string, {
        type: string,
        properties: {
            name: string
        },
        geometry: {
            type: string,
            coordinates: number[][][]
        }
    }>();
    latest = {
        type: 'FeatureCollection',
        features: [] as any[]
    };

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
        this.items.clear();
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
                    type: 'MultiPolygon',
                    coordinates: coordinates
                }
            }
            this.items.set(v.id, item);
        }
        if (changed) {
            let items = Array.from(this.items.values());
            let count = 0;
            for (let i of items) {
                for (let c of i.geometry.coordinates) {
                    for (let v of c) {
                        count += v.length;
                    }
                }
            }
            console.warn('Total vertexes: ' + count);
            this.latest = {
                type: 'FeatureCollection',
                features: items
            }
        }
        return this.latest;
    }

    getFillColor = (src: { properties: { name: string } }) => {
        if (this.state.selected) {
            if (src.properties.name === this.state.selected) {
                return [254, 173, 84];
            }
        }
        return [1, 152, 189];
    }
    getLineColor = (src: any) => [0, 0, 0];

    onHover = (src: { object?: { properties: { name: string } } }) => {
        if (src.object) {
            this.setState({ selected: src.object.properties.name });
        } else {
            this.setState({ selected: undefined });
        }
    }

    onClick = (src: { object?: { geometry: { coordinates: number[][][] }, properties: { name: string } } }) => {
        let navigateTo = (this.context.mapViewport as MapViewport).navigateTo!!

        let count = 0
        let latSum = 0
        let lonSum = 0
        for (let s of src.object!!.geometry.coordinates) {
            for (let c of s) {
                latSum += c[1];
                lonSum += c[0];
                count++
            }
        }
        latSum = latSum / count;
        lonSum = lonSum / count;

        navigateTo({ longitude: lonSum, latitude: latSum })
    }

    render() {
        let Deck = this.state.deck;
        let layer = this.state.layer;
        let D = this.context.mapViewport as MapViewport
        if (Deck && layer && D.isEnabled) {
            let l = new layer({
                id: 'maps',
                stroked: false,
                filled: true,
                extruded: false,
                wireframe: false,
                pickable: true,
                opacity: 0.8,
                fp64: false,
                getFillColor: this.getFillColor,
                getLineColor: this.getLineColor,
                onHover: this.onHover,
                onClick: this.onClick,
                data: this.state.data,
                updateTriggers: {
                    getFillColor: this.state.selected
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
                    useDevicePixels={false}
                />
            );
        } else {
            return null;
        }
    }
}