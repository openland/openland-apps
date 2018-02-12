import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../utils/environment';
import { MapViewport } from '../../utils/map';
import { XMapOverlaySetter } from './XMapOverlayProvider';
import * as GeoLib from 'geolib';

import * as M from 'mapbox-gl';
let w = typeof window === 'undefined' ? undefined : window;
import { GeoJsonLayer } from 'deck.gl';
if (!canUseDOM) {
    window = w!!;
}

interface XMapOverlayProps {
    maxZoom?: number;
    minZoom?: number;
    records: OverlayRecord[];
    id: string;
}

interface OverlayRecord {
    id: string;
    geometry: string;
}

interface XMapOverlayState {
    data?: any;
    selected?: string;
    map?: M.Map;
}

export class XMapJsonOverlay extends React.Component<{ records: OverlayRecord[]; }> {
    static contextTypes = {
        mapOverlays: PropTypes.shape({
            register: PropTypes.func.isRequired,
            unregister: PropTypes.func.isRequired
        })
    }

    componentDidMount() {
        //
    }
    componentWillUnmount() {
        //
    }

    render() {
        return null;
    }
}

export class XMapOverlay extends React.Component<XMapOverlayProps, XMapOverlayState> {
    static contextTypes = {
        mapViewport: PropTypes.shape({
            navigateTo: PropTypes.func.isRequired,
            zoom: PropTypes.number
        }).isRequired
    };
    items = new Map<string, {
        type: string,
        properties: {
            name: string
        },
        geometry: {
            type: string,
            coordinates: number[][][][]
        }
    }>();
    latest = {
        type: 'FeatureCollection',
        features: [] as any[]
    };

    constructor(props: XMapOverlayProps, context?: any) {
        super(props, context);
        this.state = { data: this.convertProps(props.records) };
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

            let coordinates: number[][][][] = [];
            if (v.geometry.length > 0) {
                coordinates = (JSON.parse(v.geometry as any) as number[][]).map((p) => [p.map((c) => [c[0], c[1]])]);
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

    onClick = (src: { object?: { geometry: { coordinates: number[][][][] }, properties: { name: string } } }) => {
        let navigateTo = (this.context.mapViewport as MapViewport).navigateTo!!

        let points: { latitude: number, longitude: number }[] = [];
        for (let s of src.object!!.geometry.coordinates) {
            for (let c of s) {
                for (let c2 of c) {
                    points.push({ latitude: c2[1], longitude: c2[0] })
                }
            }
        }

        let center = GeoLib.getCenterOfBounds(points);
        
        navigateTo({ longitude: center.longitude, latitude: center.latitude, zoom: 17 })
    }

    render() {
        let zoom = (this.context.mapViewport as MapViewport).zoom;
        let alpha = 0.8
        let isVisible = true;
        if (this.props.maxZoom) {
            if (zoom && zoom > this.props.maxZoom - 1) {
                if (zoom < this.props.maxZoom) {
                    alpha = 0.8 * (1 - (zoom - this.props.maxZoom + 1));
                } else {
                    alpha = 0.8;
                    isVisible = false;
                }
            }
        }
        if (this.props.minZoom) {
            if (zoom && zoom < this.props.minZoom + 1) {
                if (zoom > this.props.minZoom) {
                    alpha = 0.8 * (zoom - this.props.minZoom);
                } else {
                    alpha = 0.8;
                    isVisible = false;
                }
            }
        }

        let l = new GeoJsonLayer({
            id: this.props.id,
            stroked: true,
            filled: true,
            extruded: false,
            wireframe: false,
            pickable: true,
            opacity: alpha,
            fp64: zoom ? zoom > 14 : false,
            getFillColor: this.getFillColor,
            getLineColor: this.getLineColor,
            onHover: this.onHover,
            onClick: this.onClick,
            data: this.state.data,
            visible: isVisible,
            updateTriggers: {
                getFillColor: this.state.selected
            }
        });
        return <XMapOverlaySetter layer={l} />;
    }
}