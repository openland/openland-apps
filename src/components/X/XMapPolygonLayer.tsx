import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber, DataSources } from './XMap';
import * as Turf from '@turf/turf';

interface XMapPolygonLayerStyle {

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

interface XMapPolygonLayerProps {
    source: string;
    layer: string;

    style?: XMapPolygonLayerStyle;

    minZoom?: number;
    maxZoom?: number;
    maxFillZoom?: number;

    allowHover?: boolean;
    allowClick?: boolean;

    flyOnClick?: boolean;
    flyToPadding?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    flyToMaxZoom?: number;

    onClick?: (id: string) => void;
    selectedId?: string;
}

export class XMapPolygonLayer extends React.Component<XMapPolygonLayerProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    };

    private isInited = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;
    private datasources: DataSources | null = null;

    private layer: string;

    private source: string;
    private sourceHover: string;

    private focusedId?: string;

    constructor(props: XMapPolygonLayerProps) {
        super(props);
        this.layer = props.layer;
        this.source = props.source;

        // TODO: Randomize
        this.sourceHover = props.source + '-hover';
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
        // Hovered Sources
        //

        this.map.addSource(this.sourceHover, { type: 'geojson', data: { 'type': 'FeatureCollection', features: [] } });

        //
        // Fill Layer
        //

        let maxZoom = this.props.maxZoom !== undefined ? this.props.maxZoom : 22;
        let minZoom = this.props.minZoom !== undefined ? this.props.minZoom : 0;
        let selected = this.props.selectedId || '';

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
            },
            'filter': ['!=', 'id', selected]
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
            },
            'filter': ['!=', 'id', selected]
        });

        //
        // Hover Fill
        //

        let hoverFillColor = this.props.style && this.props.style.hoverFillColor !== undefined ? this.props.style.hoverFillColor : '#5967e2';
        let hoverFillOpacity = this.props.style && this.props.style.hoverFillOpacity !== undefined ? this.props.style.hoverFillOpacity : 0.7;

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

        let hoverBorderColor = this.props.style && this.props.style.hoverBorderColor !== undefined ? this.props.style.hoverBorderColor : '#4428e1';
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

        let selectedFillColor = this.props.style && this.props.style.hoverFillColor !== undefined ? this.props.style.hoverFillColor : '#4428e1';
        let selectedFillOpacity = this.props.style && this.props.style.hoverFillOpacity !== undefined ? this.props.style.hoverFillOpacity : 1;

        this.map.addLayer({
            'id': this.layer + '-fill-selected',
            'type': 'fill',
            'source': this.source,
            'minzoom': minZoom,
            'maxzoom': this.props.maxFillZoom !== undefined ? this.props.maxFillZoom : maxZoom,
            'layout': {},
            'paint': {
                'fill-color': selectedFillColor,
                'fill-opacity': selectedFillOpacity
            },
            'filter': ['==', 'id', selected]
        });

        //
        // Selected Border
        //

        let selectedBorderColor = this.props.style && this.props.style.selectedBorderColor !== undefined ? this.props.style.selectedBorderColor : '#4428e1';
        let selectedBorderOpacity = this.props.style && this.props.style.selectedBorderOpacity !== undefined ? this.props.style.selectedBorderOpacity : 0.8;
        let selectedBorderWidth = this.props.style && this.props.style.selectedBorderWidth !== undefined ? this.props.style.selectedBorderWidth : 1;

        this.map.addLayer({
            'id': this.layer + '-borders-selected',
            'type': 'line',
            'source': this.source,
            'minzoom': minZoom,
            'maxzoom': maxZoom,
            'layout': {},
            'paint': {
                'line-color': selectedBorderColor,
                'line-width': selectedBorderOpacity,
                'line-opacity': selectedBorderWidth
            },
            'filter': ['==', 'id', selected]
        });

        //
        // Handling Hover
        //

        this.map.on('mousemove', this.layer + '-fill', (e: any) => {
            if (this._isMounted && (this.props.allowHover || (this.props.allowHover || this.props.onClick || this.props.flyOnClick))) {
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
            if (this._isMounted && (this.props.allowHover || (this.props.allowHover || this.props.onClick || this.props.flyOnClick))) {
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
                let element = this.datasources!!.findGeoJSONElement(this.source, id);
                if (element) {
                    let center = Turf.bbox(element);
                    this.map!!.fitBounds([[center[0], center[1]], [center[2], center[3]]], {
                        padding: this.props.flyToPadding !== undefined ? this.props.flyToPadding : 0,
                        maxZoom: this.props.flyToMaxZoom,
                        duration: 300
                    });
                }
            }
            if (this.props.onClick && this.props.allowClick !== false) {
                this.props.onClick(id);
            }
        });
    }

    render() {
        return null;
    }

    componentWillReceiveProps(nextProps: XMapPolygonLayerProps) {
        if (this.props.selectedId !== nextProps.selectedId && this.isInited && this._isMounted) {
            if (nextProps.selectedId !== undefined) {
                let selected = nextProps.selectedId || '';
                this.map!!.setFilter(this.layer + '-fill', ['!=', 'id', selected]);
                this.map!!.setFilter(this.layer + '-borders', ['!=', 'id', selected]);
                this.map!!.setFilter(this.layer + '-fill-selected', ['==', 'id', selected]);
                this.map!!.setFilter(this.layer + '-borders-selected', ['==', 'id', selected]);
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
                // this.map.removeSource(this.sourceSelected);
            } catch (e) {
                // Just Ignore
            }
        }
    }
}