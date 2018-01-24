import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChanged, FlyToInterpolator } from 'react-map-gl';
import * as Map from 'mapbox-gl';
import { XMapOverlayProvider } from './XMapOverlayProvider';

let MapBoxToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';

export interface XMapProps {
    style?: React.CSSProperties;
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
    map?: Map.Map;

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
            isEnabled: PropTypes.bool.isRequired,
            navigateTo: PropTypes.func.isRequired,
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
        }).isRequired
    };

    private container: HTMLDivElement | null = null

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

    getChildContext() {
        if (this.state.inited && this.state.map) {
            let bounds = this.state.map.getBounds();
            return {
                mapViewport: {
                    isEnabled: true,
                    navigateTo: this.navigateTo,
                    center: {
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                    },
                    bounds: {
                        sw: {
                            latitude: bounds.getSouthWest().lat,
                            longitude: bounds.getSouthWest().lng
                        },
                        ne: {
                            latitude: bounds.getNorthEast().lat,
                            longitude: bounds.getNorthEast().lng
                        }
                    },
                    zoom: this.state.zoom,
                    pitch: this.state.pitch,
                    bearing: this.state.bearing,
                    width: this.state.width,
                    height: this.state.height
                }
            }
        } else {
            return {
                mapViewport: {
                    isEnabled: false,
                    navigateTo: this.navigateTo
                }
            }
        }
    }

    render() {
        if (!canUseDOM) {
            return (
                <div className={classnames('x-map', this.props.className)} style={this.props.style} />
            )
        } else if (canUseDOM && !this.state.inited) {
            return (
                <div className={classnames('x-map', this.props.className)} style={this.props.style} ref={this.handleRef} />
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
                <div className={classnames('x-map', this.props.className)} style={this.props.style} ref={this.handleRef}>
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
                        ref={this.handleMapRef}
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
                    </InteractiveMap>
                </div >
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

    private handleMapRef = (v: any | null) => {
        if (v != null) {
            this.setState({ map: v.getMap() })
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