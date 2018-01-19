import * as React from 'react';
import { canUseDOM } from '../../utils/environment';
import { InteractiveMap, ViewPortChanged } from 'react-map-gl';

let MapBoxToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';

export interface XMapProps {
    width: number;
    height: number;
}
export class XMap extends React.Component<XMapProps, {
    latitude: number,
    longitude: number,
    zoom: number,
    maxZoom?: number,
    pitch?: number,
    bearing?: number,
    deck?: React.ComponentClass<{
        zoom?: number, longitude?: number, latitude?: number, pitch?: number,
        bearing?: number, width?: number, height?: number, layers?: any[]
    }>,
    layer?: any[]
}> {

    constructor(props: XMapProps) {
        super(props);
        this.state = {
            latitude: 49.2407190, longitude: -123.0249569,
            pitch: 45,
            bearing: 0,
            zoom: 16
        };

        if (canUseDOM) {
            this.initDeck();
        }
    }

    initDeck = async () => {
        let deck = await import('deck.gl');
        let layer = new deck.GeoJsonLayer(
            {
                id: 'maps',
                stroked: false,
                // filled: true,
                // extruded: true,
                wireframe: true,
                opacity: 0.8,
                fp64: true,
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Polygon',
                                coordinates: [
                                    [
                                        [-123.0249569, 49.2407190],
                                        [-123.0241582, 49.2407165],
                                        [-123.0240445, 49.2406847],
                                        [-123.0239311, 49.2407159],
                                        [-123.0238530, 49.2407157],
                                        [-123.0238536, 49.2404548],
                                        [-123.0249568, 49.2404582],
                                        [-123.0249569, 49.2407190]
                                    ]
                                ]
                            }
                        }
                    ]
                }
            });
        this.setState({ deck: deck.default, layer: [layer] });
    }

    handleStateChange = (v: ViewPortChanged) => {
        this.setState({ ...v });
    }

    render() {
        let DeckComponent = this.state.deck
        return (
            <InteractiveMap
                mapboxApiAccessToken={MapBoxToken}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                width={this.props.width}
                height={this.props.height}
                zoom={this.state.zoom}
                pitch={this.state.pitch}
                bearing={this.state.bearing}
                latitude={this.state.latitude}
                longitude={this.state.longitude}
                onViewportChange={this.handleStateChange}
            >
                {DeckComponent && (
                    <DeckComponent
                        zoom={this.state.zoom}
                        latitude={this.state.latitude}
                        longitude={this.state.longitude}
                        pitch={this.state.pitch}
                        bearing={this.state.bearing}
                        width={this.props.width}
                        height={this.props.height}
                        layers={this.state.layer}
                    />
                )}
            </InteractiveMap>
        );
    }
}