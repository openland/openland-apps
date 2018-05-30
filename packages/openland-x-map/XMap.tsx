import Glamorous from 'glamorous';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

let MapBox = canUseDOM ? import('mapbox-gl') : null;

let Wrapper = Glamorous.div({
    position: 'relative',
    width: '100%',
    height: '100%'
});

export type XMapCameraLocation = { latitude: number, longitude: number, zoom: number };

export interface XMapProps {
    scrollZoom?: boolean;
    mapStyle?: string;
    focusPosition?: XMapCameraLocation;
    className?: string;

    lastKnownCameraLocation?: XMapCameraLocation | null;
    onCameraLocationChanged?: (e: XMapCameraLocation) => void;
    onLoaded?: (map: mapboxgl.Map) => void;
}

export interface DataSources {
    addGeoJSONSource: (source: string, data: any) => void;
    updateGeoJSONSource: (source: string, data: any) => void;
    removeGeoJsonSource: (source: string) => void;
    findGeoJSONElement: (source: string, id: string) => any | undefined;
}

export type XMapSubscriber = (bbox: { south: number, north: number, east: number, west: number, zoom: number }, map: mapboxgl.Map, sources: DataSources) => void;

export class XMap extends React.Component<XMapProps> {

    static childContextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    };

    private map: mapboxgl.Map | null = null;
    private subscribers = new Set<XMapSubscriber>();
    private _isMounted = true;
    private _isLoaded = false;
    private childContext: any;

    private allSources = new Map<string, Map<string, any>>();

    private sources: DataSources = {
        addGeoJSONSource: (source: string, data: any) => {
            if (this.allSources.has(source)) {
                throw Error('Source ' + source + ' already exist!');
            }
            let elements = new Map<string, any>();
            if (data.features) {
                for (let src of data.features) {
                    if (src.properties && src.properties.id) {
                        elements.set(src.properties.id as string, src);
                    }
                }
            }
            this.allSources.set(source, elements);
        },
        updateGeoJSONSource: (source: string, data: any) => {
            if (!this.allSources.has(source)) {
                throw Error('Source ' + source + ' does not exist!');
            }
            let elements = this.allSources.get(source)!!;
            if (data.features) {
                for (let src of data.features) {
                    if (src.properties && src.properties.id) {
                        elements.set(src.properties.id as string, src);
                    }
                }
            }
        },
        removeGeoJsonSource: (source: string) => {
            if (!this.allSources.has(source)) {
                throw Error('Source ' + source + ' does not exist!');
            }
            this.allSources.delete(source);
        },
        findGeoJSONElement: (source: string, id: string) => {
            let src = this.allSources.get(source);
            if (src) {
                return src.get(id);
            } else {
                return undefined;
            }
        }
    };

    constructor(props: XMapProps) {
        super(props);
        this.childContext = {
            mapSubscribe: this.subscribe,
            mapUnsubscribe: this.unsubscribe
        };
    }

    getChildContext() {
        return this.childContext;
    }

    subscribe = (subscriber: XMapSubscriber) => {
        this.subscribers.add(subscriber);
        if (this._isLoaded && this.map) {
            let zoom = this.map.getZoom();
            let bounds = this.map.getBounds();
            let state = { south: bounds.getSouth(), north: bounds.getNorth(), east: bounds.getEast(), west: bounds.getWest(), zoom: zoom };
            subscriber(state, this.map, this.sources);
        }
    }

    unsubscribe = (subscriber: XMapSubscriber) => {
        this.subscribers.delete(subscriber);
    }

    render() {
        return <Wrapper className={this.props.className}>{this.props.children}</Wrapper>;
    }

    componentDidUpdate() {
        if (this._isLoaded && this._isMounted && this.map) {
            this.map.resize();
        }
    }

    componentDidMount() {
        this._isMounted = true;
        let domNode = ReactDOM.findDOMNode(this);
        MapBox!!.then((map) => {
            if (!this._isMounted) {
                return;
            }
            map.accessToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';
            let initialLatitude = 37.75444398077139;
            let initialLongitude = -122.43963811583545;
            let initialZoom = 12;

            if (this.props.focusPosition) {
                initialLatitude = this.props.focusPosition.latitude;
                initialLongitude = this.props.focusPosition.longitude;
                initialZoom = this.props.focusPosition.zoom;
            }

            if (this.props.lastKnownCameraLocation) {
                initialLatitude = this.props.lastKnownCameraLocation.latitude;
                initialLongitude = this.props.lastKnownCameraLocation.longitude;
                initialZoom = this.props.lastKnownCameraLocation.zoom;
            }

            let mapComponent = new map.Map({
                container: domNode,
                center: [initialLongitude, initialLatitude],
                zoom: initialZoom,
                style: this.props.mapStyle || 'mapbox://styles/mapbox/streets-v9',
                scrollZoom: this.props.scrollZoom !== undefined ? this.props.scrollZoom : true
            });
            mapComponent.addControl(new map.NavigationControl());
            mapComponent.on('load', () => {
                this.configureMap(mapComponent);
                if (this.props.onLoaded) {
                    this.props.onLoaded(this.map!!);
                }
            });
            this.map = mapComponent;
        });
    }

    componentWillReceiveProps(nextProps: XMapProps) {
        if (this.map && nextProps.focusPosition !== undefined) {
            if (!this.props.focusPosition ||
                (this.props.focusPosition.latitude !== nextProps.focusPosition.latitude) ||
                (this.props.focusPosition.longitude !== nextProps.focusPosition.longitude) ||
                (this.props.focusPosition.zoom !== nextProps.focusPosition.zoom)) {
                this.map!!.jumpTo({
                    center: [nextProps.focusPosition.longitude, nextProps.focusPosition.latitude],
                    zoom: nextProps.focusPosition.zoom,
                });
            }

            if (this.props.mapStyle !== nextProps.mapStyle) {
                this.map.setStyle(nextProps.mapStyle || 'mapbox://styles/mapbox/streets-v9');
            }
        }
    }

    mapZoomHandler = () => {
        if (this.map && this._isLoaded && this._isMounted) {
            if (this.subscribers.size > 0) {
                let zoom = this.map.getZoom();
                let bounds = this.map.getBounds();
                let state = { south: bounds.getSouth(), north: bounds.getNorth(), east: bounds.getEast(), west: bounds.getWest(), zoom: zoom };
                for (let s of this.subscribers) {
                    s(state, this.map, this.sources);
                }
            }

            if (this.props.onCameraLocationChanged) {
                this.props.onCameraLocationChanged({ zoom: this.map.getZoom(), latitude: this.map.getCenter().lat, longitude: this.map.getCenter().lng });
            }
        }
    }

    configureMap(map: mapboxgl.Map) {

        //
        // Subscribers
        //

        this._isLoaded = true;
        if (this.subscribers.size > 0) {
            let zoom = map.getZoom();
            let bounds = map.getBounds();
            let state = { south: bounds.getSouth(), north: bounds.getNorth(), east: bounds.getEast(), west: bounds.getWest(), zoom: zoom };
            for (let s of this.subscribers) {
                s(state, map, this.sources);
            }
        }

        //
        // Listen for updates
        //

        map.on('dragend', this.mapZoomHandler);
        map.on('zoomend', this.mapZoomHandler);
        map.on('rotateend', this.mapZoomHandler);
        map.on('flyend', this.mapZoomHandler);
        map.on('moveend', this.mapZoomHandler);

        if (this.props.onCameraLocationChanged) {
            this.props.onCameraLocationChanged({ zoom: map.getZoom(), latitude: map.getCenter().lat, longitude: map.getCenter().lng });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }
}