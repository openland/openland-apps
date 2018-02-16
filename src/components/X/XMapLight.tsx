import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../utils/environment';
import Glamorous from 'glamorous';
import * as ReactDOM from 'react-dom';

let MapBox = canUseDOM ? import('mapbox-gl') : null;

let Wrapper = Glamorous.div({
    position: 'relative',
    width: '100%',
    height: '100%'
})

interface XMapLightProps {
    className?: string;

    focusPosition?: { latitude: number, longiutude: number, zoom: number };

    mapStyle?: string;
}

export type XMapSubscriber = (bbox: { south: number, north: number, east: number, west: number, zoom: number }) => void;

export class XMapLight extends React.Component<XMapLightProps> {

    static childContextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private map: mapboxgl.Map | null = null;
    private subscribers = new Set<XMapSubscriber>();
    private _isMounted = true;
    private _isLoaded = false;
    private childContext: any;

    constructor(props: XMapLightProps) {
        super(props);
        this.childContext = {
            mapSubscribe: this.subscribe,
            mapUnsubscribe: this.unsubscribe
        }
    }

    getChildContext() {
        return this.childContext;
    }

    subscribe = (subscriber: XMapSubscriber) => {
        console.warn('subscribe');
        this.subscribers.add(subscriber);
        if (this._isLoaded && this.map) {
            let zoom = this.map.getZoom();
            let bounds = this.map.getBounds();
            let state = { south: bounds.getSouth(), north: bounds.getNorth(), east: bounds.getEast(), west: bounds.getWest(), zoom: zoom };
            subscriber(state);
        }
    }

    unsubscribe = (subscriber: XMapSubscriber) => {
        this.subscribers.delete(subscriber);
    }

    render() {
        return <Wrapper className={this.props.className}>{this.props.children}</Wrapper>;
    }

    componentDidMount() {

        this._isMounted = true;
        let domNode = ReactDOM.findDOMNode(this);
        MapBox!!.then((map) => {
            if (!this._isMounted) {
                return
            }
            map.accessToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';
            let initialLatitude = 37.75444398077139;
            let initialLongutude = -122.43963811583545;
            let initialZoom = 12;

            if (this.props.focusPosition) {
                initialLatitude = this.props.focusPosition.latitude;
                initialLongutude = this.props.focusPosition.longiutude;
                initialZoom = this.props.focusPosition.zoom;
            }

            let mapComponent = new map.Map({
                container: domNode,
                center: [initialLongutude, initialLatitude],
                zoom: initialZoom,
                style: this.props.mapStyle || 'mapbox://styles/mapbox/streets-v9'
            });
            mapComponent.addControl(new map.NavigationControl(), 'bottom-right');
            mapComponent.on('load', () => { this.configureMap(mapComponent); });
            this.map = mapComponent;
        })
    }

    mapZoomHandler = () => {
        if (this.map && this._isLoaded && this._isMounted && this.subscribers.size > 0) {
            let zoom = this.map.getZoom();
            let bounds = this.map.getBounds();
            let state = { south: bounds.getSouth(), north: bounds.getNorth(), east: bounds.getEast(), west: bounds.getWest(), zoom: zoom };
            for (let s of this.subscribers) {
                s(state)
            }
        }
    }

    configureMap(map: mapboxgl.Map) {

        //
        // Zooming
        //

        // let initialLatitude = 37.75444398077139;
        // let initialLongutude = -122.43963811583545;
        // let initialZoom = 12;

        // if (this.props.focusPosition) {
        //     initialLatitude = this.props.focusPosition.latitude;
        //     initialLongutude = this.props.focusPosition.longiutude;
        //     initialZoom = this.props.focusPosition.zoom;
        // }
        // map.flyTo({ center: [initialLongutude, initialLatitude], zoom: initialZoom });

        //
        // Subscribers
        //

        this._isLoaded = true;
        if (this.subscribers.size > 0) {
            let zoom = map.getZoom();
            let bounds = map.getBounds();
            let state = { south: bounds.getSouth(), north: bounds.getNorth(), east: bounds.getEast(), west: bounds.getWest(), zoom: zoom };
            for (let s of this.subscribers) {
                s(state)
            }
        }

        //
        // Listen for updates
        //

        map.on('dragend', this.mapZoomHandler);
        map.on('zoomend', this.mapZoomHandler);
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }
}