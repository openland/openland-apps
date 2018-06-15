import * as React from 'react';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import * as PropTypes from 'prop-types';
import { XMapSubscriber } from './XMap';
import Glamorous from 'glamorous';

let GeoCoder = canUseDOM ? import('@mapbox/mapbox-gl-geocoder') : null;

const Container = Glamorous.div({
    position: 'absolute',
    top: 200,
    left: 24,
    width: 200,
    zIndex: 10,
    backgroundColor: '#ffffff'
});

export interface XMapGeocoderResult {
    result: {
        id: string;
        center: number[];
        relevance: number;
        text: string;
        type: string;
        context?: { id?: string, text?: string, short_code?: string, wikidata?: string }[];
        geometry?: { type: string, coordintaes?: number[] };
        matching_place_name?: string;
        matching_text?: string;
        place_name?: string;
        palce_type?: string;
        properties?: any;
    };
}

export class XMapGeocoder extends React.Component<{ city?: string, bbox?: number[], className?: string, onResult?: (result: any) => void }> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    };

    private isInited: boolean = false;
    private _isMounted: boolean = false;
    private map: mapboxgl.Map | null = null;
    private geocoderNode?: any;
    private geocoderInstance?: any | null = null;
    private containerNode?: any;

    listener: XMapSubscriber = (src, map, datasources) => {
        if (!this.isInited && this._isMounted) {
            this.map = map;
            this.isInited = true;

            this.initMap();
        }
    }

    initMap = () => {
        if (!this.map) {
            return;
        }
        this.initGeocoder(this.props.city);
    }

    initGeocoder = (city?: string) => {
        let mapControl = this.map!!;
        GeoCoder!!.then((Coder) => {
            if (this.map === mapControl && this._isMounted) {
                let Control = new Coder({
                    accessToken: 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw',
                    country: 'US',
                    zoom: 19,
                    types: 'address,postcode,neighborhood,district',
                    bbox: this.props.bbox ? [
                        Math.min(this.props.bbox[0], this.props.bbox[2]), Math.min(this.props.bbox[1], this.props.bbox[3]),
                        Math.max(this.props.bbox[0], this.props.bbox[2]), Math.max(this.props.bbox[1], this.props.bbox[3])
                    ] : undefined,
                    filter: (item) => {
                        let items = item.context as { id: string, text: string }[];
                        let place = items.find((v) => v.id.split('.')[0] === 'place');
                        if (place && place.text === this.props.city) {
                            return true;
                        }
                        return true;
                    }
                });
                var center = this.map.getCenter().wrap();
                this.geocoderInstance = Control;
                this.geocoderInstance.setProximity({ longitude: center.lng, latitude: center.lat });
                this.geocoderNode = Control.onAdd(mapControl);
                if (this.containerNode) {
                    this.containerNode.appendChild(this.geocoderNode);
                }
                if (this.props.onResult) {
                    this.geocoderInstance.on('result', this.props.onResult);
                }
                mapControl.on('load', this.updateProximity);
                mapControl.on('moveend', this.updateProximity);
            }
        }).catch((v) => console.warn(v));
    }

    updateProximity = () => {
        if (this.map && this.geocoderInstance) {
            if (this.map.getZoom() > 9) {
                var center = this.map.getCenter().wrap();
                this.geocoderInstance.setProximity({ longitude: center.lng, latitude: center.lat });
            } else {
                this.geocoderInstance.setProximity(null);
            }
        }
    }

    initRef = (node: any | null) => {
        if (node) {
            this.containerNode = node;
            if (this.geocoderNode) {
                this.containerNode.appendChild(this.geocoderNode);
            }
        }
    }

    componentDidUpdate(prevProps: { city: string, className?: string }) {
        if (this.props.city !== prevProps.city) {
            if (this.geocoderNode) {
                if (this.containerNode) {
                    this.containerNode.removeChild(this.geocoderNode);
                }
                this.geocoderNode = undefined;
                this.geocoderInstance = null;
                this.initGeocoder(this.props.city);
            }
        }
    }

    render() {
        return (<Container className={this.props.className} innerRef={this.initRef}>{}</Container>);
    }

    componentDidMount() {
        this._isMounted = true;
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.context.mapUnsubscribe(this.listener);
    }
}