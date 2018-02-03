import * as React from 'react';
import * as classnames from 'classnames';
import { canUseDOM } from '../../utils/environment';
let MapBox = canUseDOM ? import('mapbox-gl') : null;
// import * as MapBox from 'mapbox-gl';

interface XMap2Props {
    style?: React.CSSProperties;
    className?: string;

    initLatitude?: number;
    initLongitude?: number;
    initZoom?: number;

    mapStyle?: mapboxgl.Style | string
}

export class XMap2 extends React.Component<XMap2Props> {

    private ref: HTMLDivElement | null = null;
    // private map: MapBox.Map | null = null;
    private map: any | null = null;

    render() {
        if (!canUseDOM) {
            return (
                <div className={classnames('x-map', this.props.className)} style={this.props.style} />
            )
        } else {
            return (
                <div className={classnames('x-map', this.props.className)} style={this.props.style} ref={this.handleRef} />
            )
        }
    }

    private handleRef = (v: HTMLDivElement | null) => {
        if (v !== null) {
            if (this.ref !== null) {
                this.map!!.remove();
                this.map = null;
                this.ref = null;
            }

            let latitude = this.props.initLatitude ? this.props.initLatitude : 37.75444398077139
            let longitude = this.props.initLongitude ? this.props.initLongitude : -122.43963811583545
            let zoom = this.props.initZoom ? this.props.initZoom : 12;

            this.ref = v;

            MapBox!!.then((v2) => {
                v2.accessToken = 'pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw';
                let mp = new v2.Map({
                    container: this.ref!!,
                    center: [longitude, latitude],
                    zoom: zoom,
                    style: this.props.mapStyle
                });
                mp.addControl(new v2.NavigationControl(), 'top-left');
                // mp.on('load', () => {
                //     mp.addLayer({
                //         'id': 'terrain-data',
                //         'type': 'fill',
                //         'source': {
                //             type: 'vector',
                //             url: 'mapbox://mapbox.mapbox-streets-v7,steve-kite.sf_zoning'
                //         },
                //         'source-layer': 'sf_zoning',
                //         'filter': ['==', '$type', 'Polygon'],
                //         // 'layout': {
                //         //     'line-join': 'round',
                //         //     'line-cap': 'round'
                //         // },
                //         // 'paint': {
                //         //     'line-color': '#ff69b4',
                //         //     'line-width': 1
                //         // }
                //     });
                // });
                this.map = mp;
            })
        }
    }
}