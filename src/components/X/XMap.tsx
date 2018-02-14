import * as React from 'react';
import * as PropTypes from 'prop-types';
import Glamorous from 'glamorous';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChanged, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import { XMapOverlayProvider } from './Map/XMapOverlayProvider';
import { XMapOverlay } from './Map/XMapOverlay';

let MapBoxToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';

let Wrapper = Glamorous.div({
    width: '100%',
    height: '100%'
})

export interface XMapProps {
    className?: string;

    initLatitude?: number;
    initLongitude?: number;
    initZoom?: number;
    initPitch?: number;
    initBearing?: number;

    allowRotation?: boolean;

    mapStyle?: 'light' | 'dark' | string;
}

interface XMapState {
    inited: boolean;
    width?: number;
    height?: number;
    initedMap: boolean;

    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
    bearing: number;

    setLatitude?: number;
    setLongitude?: number;
    setZoom?: number;

    transitionDuration?: number;
    transitionInterpolator?: FlyToInterpolator;
}

export class XMap extends React.Component<XMapProps, XMapState> {
    static childContextTypes = {
        mapViewport: PropTypes.shape({
            navigateTo: PropTypes.func.isRequired,
            navigateToBounds: PropTypes.func.isRequired,
        }).isRequired
    };

    static Overlay = XMapOverlay;

    private container: HTMLDivElement | null = null
    private childContexts: any;

    constructor(props: XMapProps) {
        super(props);
        this.state = {
            inited: false,
            initedMap: false,
            latitude: props.initLatitude ? props.initLatitude : 37.75444398077139,
            longitude: props.initLongitude ? props.initLongitude : -122.43963811583545,
            pitch: props.initPitch ? props.initPitch : 0,
            bearing: props.initBearing ? props.initBearing : 0,
            zoom: props.initZoom ? props.initZoom : 12
        };
        this.childContexts = {
            mapViewport: {
                navigateTo: this.navigateTo,
                navigateToBounds: this.navigateToBounds
            }
        }
    }

    componentDidMount() {
        this.handleResize();
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        if (this.container !== null) {
            this.container.removeEventListener('resize', this.handleResize);
            this.container = null;
        }
        window.removeEventListener('resize', this.handleResize);
    }

    componentWillReceiveProps(nextProps: XMapProps) {
        if (
            nextProps.initLatitude &&
            nextProps.initLongitude &&
            this.props.initLatitude &&
            this.props.initLongitude &&
            (nextProps.initLatitude !== this.props.initLatitude || nextProps.initLongitude !== this.props.initLongitude)) {
            this.setState((s) => ({
                ...s,
                setLatitude: nextProps.initLatitude,
                setLongitude: nextProps.initLongitude,
                setZoom: s.zoom,
                transitionDuration: 300,
                transitionInterpolator: new FlyToInterpolator()
            }));
        }
    }

    navigateTo = (loc: { latitude: number, longitude: number, zoom: number }) => {
        this.setState((s) => ({
            ...s,
            setLatitude: loc.latitude,
            setLongitude: loc.longitude,
            setZoom: loc.zoom,
            transitionDuration: 300,
            transitionInterpolator: new FlyToInterpolator()
        }));
    }

    navigateToBounds = () => {
        // TODO: Implement
    }

    getChildContext() {
        return this.childContexts;
    }

    render() {
        if (!canUseDOM) {
            return (
                <Wrapper className={this.props.className} />
            )
        } else if (canUseDOM && !this.state.inited) {
            return (
                <Wrapper className={this.props.className} innerRef={this.handleRef} />
            )
        } else {
            let style = 'mapbox://styles/mapbox/streets-v9';
            if (this.props.mapStyle === 'light') {
                style = 'mapbox://styles/mapbox/light-v9';
            } else if (this.props.mapStyle === 'dark') {
                style = 'mapbox://styles/mapbox/dark-v9';
            } else if (this.props.mapStyle) {
                style = this.props.mapStyle;
            }
            return (
                <Wrapper className={this.props.className} innerRef={this.handleRef} >
                    <InteractiveMap
                        mapboxApiAccessToken={MapBoxToken}
                        mapStyle={style}
                        width={this.state.width!!}
                        height={this.state.height!!}
                        pitch={this.state.pitch}
                        bearing={this.state.bearing}
                        zoom={this.state.setZoom !== undefined ? this.state.setZoom : this.state.zoom}
                        latitude={this.state.setLatitude !== undefined ? this.state.setLatitude : this.state.latitude}
                        longitude={this.state.setLongitude !== undefined ? this.state.setLongitude : this.state.longitude}
                        onViewportChange={this.handleStateChange}
                        dragPan={true}
                        dragRotate={this.props.allowRotation !== undefined ? this.props.allowRotation : true}
                        touchRotate={this.props.allowRotation !== undefined ? this.props.allowRotation : true}
                        transitionDuration={this.state.transitionDuration}
                        transitionInterpolator={this.state.transitionInterpolator}
                    >
                        <XMapOverlayProvider
                            width={this.state.width!!}
                            height={this.state.height!!}
                            pitch={this.state.pitch}
                            bearing={this.state.bearing}
                            zoom={this.state.zoom}
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                        >
                            {this.props.children}
                        </XMapOverlayProvider>
                        <div style={{ position: 'absolute', left: 12, bottom: 44 }}>
                            <NavigationControl onViewportChange={this.handleStateChange} />
                        </div>
                    </InteractiveMap>
                </Wrapper>
            )
        }
    }

    private handleStateChange = (v: ViewPortChanged) => {
        this.setState((s) => ({
            ...s, ...v,
            setLatitude: undefined,
            setLongitude: undefined,
            setZoom: undefined
        }));
    }

    private handleResize = () => {
        if (this.container !== null) {
            this.setState({
                inited: true,
                width: this.container!!.clientWidth,
                height: this.container!!.clientHeight
            })
        }
    }

    private handleRef = (v: HTMLDivElement | null) => {
        if (v != null) {
            if (this.container !== null) {
                this.container.removeEventListener('resize', this.handleResize);
                this.container = null;
            }
            this.container = v;
            this.container.addEventListener('resize', this.handleResize);
            this.handleResize();
            window.setTimeout(this.handleResize);
        }
    }
}