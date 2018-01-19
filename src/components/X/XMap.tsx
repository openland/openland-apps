import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChanged } from 'react-map-gl';

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
}

export class XMap extends React.Component<XMapProps, XMapState> {
    static childContextTypes = {
        mapViewport: PropTypes.shape({
            isEnabled: PropTypes.bool.isRequired,
            latitude: PropTypes.number,
            longitude: PropTypes.number,
            zoom: PropTypes.number,
            pitch: PropTypes.number,
            bearing: PropTypes.number,
            width: PropTypes.number,
            height: PropTypes.number
        }),
    };

    private container: HTMLDivElement | null = null

    constructor(props: XMapProps) {
        super(props);
        this.state = {
            inited: false,
            latitude: 49.2407190, longitude: -123.0249569,
            pitch: 45,
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

    getChildContext() {
        return {
            mapViewport: {
                isEnabled: this.state.inited,
                latitude: this.state.inited ? this.state.latitude : undefined,
                longitude: this.state.inited ? this.state.longitude : undefined,
                zoom: this.state.inited ? this.state.zoom : undefined,
                pitch: this.state.inited ? this.state.pitch : undefined,
                bearing: this.state.inited ? this.state.bearing : undefined,
                width: this.state.inited ? this.state.width : undefined,
                height: this.state.inited ? this.state.height : undefined
            }
        }
    }

    render() {
        if (!canUseDOM) {
            return (
                <div className={this.props.className} style={this.props.style} />
            )
        } else if (canUseDOM && !this.state.inited) {
            return (
                <div className={this.props.className} style={this.props.style} ref={this.handleRef} />
            )
        } else {
            return (
                <div className={this.props.className} style={this.props.style} ref={this.handleRef}>
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
                    >
                        {this.props.children}
                    </InteractiveMap>
                </div>
            )
        }
    }
}