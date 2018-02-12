import * as React from 'react';
import * as PropTypes from 'prop-types';
import { canUseDOM } from '../../../utils/environment';

let w = typeof window === 'undefined' ? undefined : window;
import Deck from 'deck.gl';
if (!canUseDOM) {
    window = w!!;
}

interface XMapOverlayProviderProps {
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
    width: number;
    height: number;
}

interface XMapOverlayProviderStats {
    layers: any[];
}

interface XMapOverlayContext {
    registerLayer: (layer: any) => number;
    unregisterLayer: (id: number) => void;
    updateLayer: (id: number, layer: any) => void;
}

export class XMapOverlayProvider extends React.Component<XMapOverlayProviderProps, XMapOverlayProviderStats> {
    static childContextTypes = {
        mapOverlays: PropTypes.shape({
            registerLayer: PropTypes.func.isRequired,
            unregisterLayer: PropTypes.func.isRequired,
            updateLayer: PropTypes.func.isRequired
        }).isRequired
    }

    nextId = 0;
    layers = new Map<number, any>();
    convertedLayers: any[] = [];
    layerComponent: XMapOverlayLayerComponent | null = null;

    childContext = {
        mapOverlays: {
            registerLayer: (layer: any) => {
                this.nextId++;
                this.layers.set(this.nextId, layer);
                this.handleUpdate();
                return this.nextId;
            },
            unregisterLayer: (id: number) => {
                this.layers.delete(id);
                this.handleUpdate();
            },
            updateLayer: (id: number, layer: any) => {
                this.layers.set(id, layer);
                this.handleUpdate();
            }
        }
    }

    constructor(props: XMapOverlayProviderProps) {
        super(props);
        this.state = { layers: [] };
    }

    private handleUpdate = () => {
        this.convertedLayers = Array.from(this.layers.values());
        if (this.layerComponent) {
            this.layerComponent.updateLayers(this.convertedLayers);
        }
    }

    private handleRef = (c: XMapOverlayLayerComponent | null) => {
        if (c) {
            this.layerComponent = c;
            this.layerComponent.updateLayers(this.convertedLayers);
        } else {
            this.layerComponent = null;
        }
    }

    getChildContext() {
        return this.childContext;
    }

    render() {
        return (
            <>
            {this.props.children}
            <XMapOverlayLayerComponent
                key="_deck"
                latitude={this.props.latitude}
                longitude={this.props.longitude}
                zoom={this.props.zoom}
                pitch={this.props.pitch}
                bearing={this.props.bearing}
                width={this.props.width}
                height={this.props.height}
                ref={this.handleRef}
            />
            </>
        )
    }
}

interface XMapOverlayLayerComponentProps {
    latitude: number;
    longitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
    width: number;
    height: number;
}

export class XMapOverlayLayerComponent extends React.PureComponent<XMapOverlayLayerComponentProps, { layers: any[], hasLayers: boolean }> {
    constructor(props: XMapOverlayLayerComponentProps) {
        super(props);
        this.state = { hasLayers: false, layers: [] };
    }

    updateLayers = (layers: any[]) => {
        this.setState({ layers: layers, hasLayers: this.state.hasLayers || layers.length > 0 })
    }

    render() {
        if (this.state.hasLayers) {
            return (
                <Deck
                    key="_deck"
                    latitude={this.props.latitude}
                    longitude={this.props.longitude}
                    zoom={this.props.zoom}
                    pitch={this.props.pitch}
                    bearing={this.props.bearing}
                    width={this.props.width}
                    height={this.props.height}
                    layers={this.state.layers}
                    useDevicePixels={true}
                />
            );
        } else {
            return null;
        }
    }
}

export class XMapOverlaySetter extends React.Component<{ layer: any }> {
    static contextTypes = {
        mapOverlays: PropTypes.shape({
            registerLayer: PropTypes.func.isRequired,
            unregisterLayer: PropTypes.func.isRequired,
            updateLayer: PropTypes.func.isRequired
        }).isRequired
    }

    private registered: any | null = null;
    private registrationId: number | null = null;

    private register(layer: any) {
        if (this.registered !== null && this.registered === layer) {
            return;
        }
        this.registered = layer;
        let context = (this.context.mapOverlays as XMapOverlayContext);
        if (this.registrationId === null) {
            this.registrationId = context.registerLayer(layer);
        } else {
            context.updateLayer(this.registrationId, layer);
        }
    }

    private unregister() {
        let context = (this.context.mapOverlays as XMapOverlayContext);
        if (this.registrationId !== null) {
            context.unregisterLayer(this.registrationId);
        }
    }

    componentWillMount() {
        this.register(this.props.layer);
    }

    componentWillReceiveProps(nextProps: Readonly<{ layer: any }>, nextContext: any) {
        this.register(nextProps.layer);
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        this.unregister();
    }
}