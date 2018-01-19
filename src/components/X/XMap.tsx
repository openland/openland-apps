import * as React from 'react';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChange } from 'react-map-gl';

let MapBoxToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';

export interface XMapProps {
    width: number;
    height: number;
}
export class XMap extends React.Component<XMapProps, { latitude: number, longitude: number, zoom: number }> {
    constructor(props: XMapProps) {
        super(props);
        this.state = { latitude: 37.7577, longitude: -122.4376, zoom: 16 };
    }

    handleStateChange = (v: ViewPortChange) => {
        this.setState({ latitude: v.latitude, longitude: v.longitude, zoom: v.zoom });
    }

    render() {
        if (canUseDOM) {
            return (
                <InteractiveMap
                    mapboxApiAccessToken={MapBoxToken}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    width={this.props.width}
                    height={this.props.height}
                    zoom={this.state.zoom}
                    latitude={this.state.latitude}
                    longitude={this.state.longitude}
                    onViewportChange={this.handleStateChange}
                // style="mapbox://styles/mapbox/streets-v9"
                // containerStyle={{ width: props.width, height: props.height }}

                />
            );
        } else {
            return null;
        }
    }
}