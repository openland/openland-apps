import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChanged, FlyToInterpolator } from 'react-map-gl';
import * as Map from 'mapbox-gl';

let MapBoxToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';

export interface XMapProps {
    style?: React.CSSProperties;
    className?: string;
    rotation?: boolean;
}

interface XMapState {
    inited: boolean;
    latitude?: number;
    longitude?: number;
    setLatitude?: number;
    setLongitude?: number;
    setZoom?: number;
    zoom?: number;
    pitch?: number;
    bearing?: number;
    width?: number;
    height?: number;
    transitionDuration?: number;
    transitionInterpolator?: FlyToInterpolator;

    map?: Map.Map;
}

export class XMap extends React.Component<XMapProps, XMapState> {
    static childContextTypes = {
        mapViewport: PropTypes.shape({
            isEnabled: PropTypes.bool.isRequired,
            navigateTo: PropTypes.func,
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
        })
    };

    private container: HTMLDivElement | null = null

    constructor(props: XMapProps) {
        super(props);
        this.state = {
            inited: false,
            latitude: 37.75444398077139, longitude: -122.43963811583545,
            pitch: 0,
            bearing: 0,
            zoom: 12
        };
    }

    handleStateChange = (v: ViewPortChanged) => {
        this.setState((s) => ({ ...s, ...v, setLatitude: undefined, setLongitude: undefined, setZoom: undefined }));
    }

    handleResize = () => {
        if (this.container !== null) {
            this.setState({
                inited: true,
                width: this.container!!.clientWidth,
                height: this.container!!.clientHeight
            })
        }
    }

    componentDidMount() {
        this.handleResize();
        if (canUseDOM) {
            window.addEventListener('resize', this.handleResize);
        }
    }

    componentWillUnmount() {
        if (this.container !== null) {
            this.container.removeEventListener('resize', this.handleResize);
            this.container = null;
        }
        if (canUseDOM) {
            window.removeEventListener('resize', this.handleResize);
        }
    }

    handleRef = (v: HTMLDivElement | null) => {
        if (v != null) {
            if (this.container !== null) {
                this.container.removeEventListener('resize', this.handleResize);
                this.container = null;
            }
            this.container = v;
            this.container.addEventListener('resize', this.handleResize);
            this.handleResize();
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

    handleMapRef = (v: any | null) => {
        if (v != null) {
            this.setState({ map: v.getMap() })
        }
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
                    isEnabled: false
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
            return (
                <div className={classnames('x-map', this.props.className)} style={this.props.style} ref={this.handleRef}>
                    <InteractiveMap
                        mapboxApiAccessToken={MapBoxToken}
                        mapStyle="mapbox://styles/mapbox/streets-v9"
                        width={this.state.width}
                        height={this.state.height}
                        zoom={this.state.setZoom ? this.state.setZoom : this.state.zoom}
                        pitch={this.state.pitch}
                        bearing={this.state.bearing}
                        latitude={this.state.setLatitude ? this.state.setLatitude : this.state.latitude}
                        longitude={this.state.setLongitude ? this.state.setLongitude : this.state.longitude}
                        onViewportChange={this.handleStateChange}
                        dragPan={true}
                        dragRotate={this.props.rotation}
                        touchRotate={this.props.rotation}
                        transitionDuration={this.state.transitionDuration}
                        transitionInterpolator={this.state.transitionInterpolator}
                        ref={this.handleMapRef}
                    >
                        {this.props.children}
                    </InteractiveMap>
                </div >
            )
        }
    }
}