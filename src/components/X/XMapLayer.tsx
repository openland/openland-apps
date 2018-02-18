import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber } from './XMapLight';
import * as Turf from '@turf/turf';

interface XMapLayerStyle {

    fillColor?: string;
    fillOpacity?: number;

    borderColor?: string;
    borderOpacity?: number;
    borderWidth?: number;

    hoverFillColor?: string;
    hoverFillOpacity?: number;

    hoverBorderColor?: string;
    hoverBorderOpacity?: number;
    hoverBorderWidth?: number;
}

interface XMapLayerProps {
    source: string;
    layer: string;

    style?: XMapLayerStyle;

    minZoom?: number;
    maxZoom?: number;
    maxFillZoom?: number;

    allowHover?: boolean;
    allowClick?: boolean;

    flyOnClick?: boolean;
    onClick?: (id: string) => void;
    selectedId?: string;
}

export class XMapLayer extends React.Component<XMapLayerProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isInited = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;

    private layer: string;

    private source: string;
    private sourceHover: string;
    private sourceSelected: string;

    private focusedId?: string;

    constructor(props: XMapLayerProps) {
        super(props);
        this.layer = props.layer;
        this.source = props.source;

        // TODO: Randomize
        this.sourceHover = props.source + '-hover';
        this.sourceSelected = props.source + '-selected';
    }

    listener: XMapSubscriber = (src, map) => {
        if (!this.isInited && this._isMounted) {
            this.map = map;
            this.isInited = true;

            this.initMap();
        }
    }

    initMap = () => {
        if (!this.map) {
            return;
        }

        //
        // Hovered and Selected Sources
        //

        this.map.addSource(this.sourceHover, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });
        this.map.addSource(this.sourceSelected, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });

        //
        // Fill Layer
        //

        let maxZoom = this.props.maxZoom !== undefined ? this.props.maxZoom : 22;
        let minZoom = this.props.minZoom !== undefined ? this.props.minZoom : 0;

        let fillColor = this.props.style && this.props.style.fillColor !== undefined ? this.props.style.fillColor : '#4428e0';
        let fillOpacity = this.props.style && this.props.style.fillOpacity !== undefined ? this.props.style.fillOpacity : 0.1;

        this.map.addLayer({
            'id': this.layer + '-fill',
            'type': 'fill',
            'source': this.source,
            'minzoom': minZoom,
            'maxzoom': maxZoom,
            'layout': {},
            'paint': {
                'fill-color': fillColor,
                'fill-opacity': fillOpacity
            }
        });

        //
        // Border Layers
        //

        let borderColor = this.props.style && this.props.style.borderColor !== undefined ? this.props.style.borderColor : '#4428e0';
        let borderOpacity = this.props.style && this.props.style.borderOpacity !== undefined ? this.props.style.borderOpacity : 0.8;
        let borderWidth = this.props.style && this.props.style.borderWidth !== undefined ? this.props.style.borderWidth : 1;

        this.map.addLayer({
            'id': this.layer + '-borders',
            'type': 'line',
            'source': this.source,
            'minzoom': minZoom,
            'maxzoom': maxZoom,
            'layout': {},
            'paint': {
                'line-color': borderColor,
                'line-width': borderWidth,
                'line-opacity': borderOpacity
            }
        });

        //
        // Hover Fill
        //

        let hoverFillColor = this.props.style && this.props.style.hoverFillColor !== undefined ? this.props.style.hoverFillColor : '#088';
        let hoverFillOpacity = this.props.style && this.props.style.hoverFillOpacity !== undefined ? this.props.style.hoverFillOpacity : 1;

        this.map.addLayer({
            'id': this.layer + '-fill-hover',
            'type': 'fill',
            'source': this.sourceHover,
            'minzoom': minZoom,
            'maxzoom': this.props.maxFillZoom !== undefined ? this.props.maxFillZoom : maxZoom,
            'layout': {},
            'paint': {
                'fill-color': hoverFillColor,
                'fill-opacity': hoverFillOpacity
            }
        });

        //
        // Hover Border
        //

        let hoverBorderColor = this.props.style && this.props.style.hoverBorderColor !== undefined ? this.props.style.hoverBorderColor : '#088';
        let hoverBorderOpacity = this.props.style && this.props.style.hoverBorderOpacity !== undefined ? this.props.style.hoverBorderOpacity : 0.8;
        let hoverBorderWidth = this.props.style && this.props.style.hoverBorderWidth !== undefined ? this.props.style.hoverBorderWidth : 1;

        this.map.addLayer({
            'id': this.layer + '-borders-hover',
            'type': 'line',
            'source': this.sourceHover,
            'minzoom': minZoom,
            'maxzoom': maxZoom,
            'layout': {},
            'paint': {
                'line-color': hoverBorderColor,
                'line-width': hoverBorderOpacity,
                'line-opacity': hoverBorderWidth
            }
        });

        //
        // Handling Hover
        //

        this.map.on('mousemove', this.layer + '-fill', (e: any) => {
            if (this._isMounted) {
                let id = e.features[0].properties.id;
                if (this.focusedId !== id) {
                    this.focusedId = id;
                    let source = this.map!!.getSource(this.sourceHover);
                    if (source.type === 'geojson') {
                        source.setData({ 'type': 'FeatureCollection', features: e.features });
                    }
                }
            }
        });
        this.map.on('mouseleave', this.layer + '-fill', () => {
            if (this._isMounted) {
                if (this.focusedId !== undefined) {
                    this.focusedId = undefined;
                    let source = this.map!!.getSource(this.sourceHover);
                    if (source.type === 'geojson') {
                        source.setData({ 'type': 'FeatureCollection', features: [] });
                    }
                }
            }
        });

        this.map.on('click', this.layer + '-fill', (e: any) => {
            let id = e.features[0].properties.id;
            if (this.props.flyOnClick) {
                let center = Turf.bbox(e.features[0]);
                this.map!!.fitBounds([[center[0], center[1]], [center[2], center[3]]], {
                    padding: {
                        left: 100,
                        right: 100,
                        top: 100,
                        bottom: 400
                    },
                    maxZoom: 18,
                    duration: 300
                });
            }
            if (this.props.onClick) { this.props.onClick(id); }
        })
        // map.setFilter('parcels-view-selected', ['==', 'parcelId', this.props.selected]);
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps: XMapLayerProps) {
        // if (this.props.selected !== nextProps.selected && this.isInited && this._isMounted) {
        //     this.map!!.setFilter('parcels-view-selected', ['==', 'parcelId', nextProps.selected]);
        // }
    }

    componentDidMount() {
        this._isMounted = true;
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this._isMounted = true;
        this.context.mapUnsubscribe(this.listener);
        if (this.map) {
            try {
                this.map.removeLayer(this.layer + '-fill');
                this.map.removeLayer(this.layer + '-borders');
                this.map.removeLayer(this.layer + '-fill-hover');
                this.map.removeLayer(this.layer + '-borders-hover');
                this.map.removeLayer(this.layer + '-fill-selected');
                this.map.removeLayer(this.layer + '-borders-selected');
                this.map.removeSource(this.sourceHover);
                this.map.removeSource(this.sourceSelected);
            } catch {
                // Just Ignore
            }
        }
    }
}