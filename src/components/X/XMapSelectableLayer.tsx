import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber, DataSources } from './XMapLight';
import * as Turf from '@turf/turf';

interface XMapSelectableLayerStyle {

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

    selectedFillColor?: string;
    selectedFillOpacity?: number;
    selectedBorderColor?: string;
    selectedBorderOpacity?: number;
    selectedBorderWidth?: number;
}

interface XMapSelectableLayerProps {
    source: string;
    layer: string;

    style?: XMapSelectableLayerStyle;

    minZoom?: number;
    maxZoom?: number;
    maxFillZoom?: number;

    allowHover?: boolean;
    allowClick?: boolean;

    flyOnClick?: boolean;
    onClick?: (id: string) => void;
    selectedId?: string;
}

export class XMapSelectableLayer extends React.Component<XMapSelectableLayerProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isInited = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;
    private datasources: DataSources | null = null;

    private layer: string;

    private source: string;
    private sourceHover: string;
    private sourceSelected: string;

    private focusedId?: string;

    constructor(props: XMapSelectableLayerProps) {
        super(props);
        this.layer = props.layer;
        this.source = props.source;

        // TODO: Randomize
        this.sourceHover = props.source + '-hover';
        this.sourceSelected = props.source + '-selected';
    }

    listener: XMapSubscriber = (src, map, datasources) => {
        if (!this.isInited && this._isMounted) {
            this.map = map;
            this.datasources = datasources;
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
        if (this.props.selectedId !== undefined) {
            let element = this.datasources!!.findGeoJSONElement(this.source, this.props.selectedId);
            if (element) {
                this.map.addSource(this.sourceSelected, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [element] } });
            } else {
                this.map.addSource(this.sourceSelected, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });
            }
        } else {
            this.map.addSource(this.sourceSelected, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });
        }

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
        // Selected Fill
        //

        let selectedFillColor = this.props.style && this.props.style.hoverFillColor !== undefined ? this.props.style.hoverFillColor : '#088';
        let selectedFillOpacity = this.props.style && this.props.style.hoverFillOpacity !== undefined ? this.props.style.hoverFillOpacity : 1;

        this.map.addLayer({
            'id': this.layer + '-fill-selected',
            'type': 'fill',
            'source': this.sourceSelected,
            'minzoom': minZoom,
            'maxzoom': this.props.maxFillZoom !== undefined ? this.props.maxFillZoom : maxZoom,
            'layout': {},
            'paint': {
                'fill-color': selectedFillColor,
                'fill-opacity': selectedFillOpacity
            }
        });

        //
        // Selected Border
        //

        let selectedBorderColor = this.props.style && this.props.style.selectedBorderColor !== undefined ? this.props.style.selectedBorderColor : '#088';
        let selectedBorderOpacity = this.props.style && this.props.style.selectedBorderOpacity !== undefined ? this.props.style.selectedBorderOpacity : 0.8;
        let selectedBorderWidth = this.props.style && this.props.style.selectedBorderWidth !== undefined ? this.props.style.selectedBorderWidth : 1;

        this.map.addLayer({
            'id': this.layer + '-borders-selected',
            'type': 'line',
            'source': this.sourceSelected,
            'minzoom': minZoom,
            'maxzoom': maxZoom,
            'layout': {},
            'paint': {
                'line-color': selectedBorderColor,
                'line-width': selectedBorderOpacity,
                'line-opacity': selectedBorderWidth
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
                    let element = this.datasources!!.findGeoJSONElement(this.source, id);
                    if (element) {
                        let source = this.map!!.getSource(this.sourceHover);
                        if (source.type === 'geojson') {
                            source.setData({ 'type': 'FeatureCollection', features: [element] });
                        }
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

        //
        // Click Handling
        //

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
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps: XMapSelectableLayerProps) {
        if (this.props.selectedId !== nextProps.selectedId && this.isInited && this._isMounted) {
            if (nextProps.selectedId !== undefined) {
                let element = this.datasources!!.findGeoJSONElement(this.source, nextProps.selectedId);
                let source = this.map!!.getSource(this.sourceSelected);
                if (source.type === 'geojson') {
                    if (element) {
                        source.setData({ 'type': 'FeatureCollection', features: [element] });
                    } else {
                        source.setData({ 'type': 'FeatureCollection', features: [] });
                    }
                }
            }
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this._isMounted = false;
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