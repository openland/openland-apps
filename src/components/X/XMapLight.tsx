import * as React from 'react';
import { canUseDOM } from '../../utils/environment';
import Glamorous from 'glamorous';
let MapBox = canUseDOM ? import('mapbox-gl') : null;

let Wrapper = Glamorous.div({
    width: '100%',
    height: '100%'
})

interface XMapLightProps {
    className?: string;

    initLatitude?: number;
    initLongitude?: number;
    initZoom?: number;

    mapStyle?: mapboxgl.Style | string
}

export class XMapLight extends React.Component<XMapLightProps> {

    private ref: HTMLDivElement | null = null;
    private map: any | null = null;

    render() {
        if (!canUseDOM) {
            return (
                <Wrapper className={this.props.className} />
            )
        } else {
            return (
                <Wrapper className={this.props.className} innerRef={this.handleRef} />
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
                mp.addControl(new v2.NavigationControl(), 'bottom-left');
                this.map = mp;
            })
        }
    }
}