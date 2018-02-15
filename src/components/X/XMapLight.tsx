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

export class XMapLight extends React.Component<XMapLightProps> {

    static childContext = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private map: mapboxgl.Map | null = null;
    private _isMounted = true;
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

    subscribe = () => {
        // 
    }

    unsubscribe = () => {
        // 
    }

    render() {
        return <Wrapper className={this.props.className} />;
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
                style: this.props.mapStyle
            });
            mapComponent.addControl(new map.NavigationControl(), 'bottom-right');
            mapComponent.on('load', () => { this.configureMap(mapComponent); });
            this.map = mapComponent;
        })
    }

    configureMap(map: mapboxgl.Map) {

        //
        // Zooming
        //

        let initialLatitude = 37.75444398077139;
        let initialLongutude = -122.43963811583545;
        let initialZoom = 12;

        if (this.props.focusPosition) {
            initialLatitude = this.props.focusPosition.latitude;
            initialLongutude = this.props.focusPosition.longiutude;
            initialZoom = this.props.focusPosition.zoom;
        }
        map.flyTo({ center: [initialLongutude, initialLatitude], zoom: initialZoom })
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (this.map) {
            this.map.remove();
            this.map = null;
        }
    }
}