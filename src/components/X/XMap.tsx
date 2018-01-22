import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classnames from 'classnames';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChanged } from 'react-map-gl';
import * as Map from 'mapbox-gl';

let MapBoxToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';

export interface XMapProps {
    style?: React.CSSProperties;
    className?: string;
}

interface XMapState {
    inited: boolean;
    latitude?: number;
    longitude?: number;
    zoom?: number;
    pitch?: number;
    bearing?: number;
    width?: number;
    height?: number;
    map?: Map.Map;
}

export class XMap extends React.Component<XMapProps, XMapState> {
    static childContextTypes = {
        mapViewport: PropTypes.shape({
            isEnabled: PropTypes.bool.isRequired,
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
            latitude: 37.7717807, longitude: -122.4196095,
            pitch: 0,
            bearing: 0,
            zoom: 16
        };
    }

    handleStateChange = (v: ViewPortChanged) => {
        this.setState({ ...v });
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
                        zoom={this.state.zoom}
                        pitch={this.state.pitch}
                        bearing={this.state.bearing}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        onViewportChange={this.handleStateChange}
                        ref={this.handleMapRef}
                    >
                        {this.props.children}
                    </InteractiveMap>
                </div >
            )
        }
    }
}