import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber } from './XMap';

interface XMapImageProps {
    layer: string;
    source: string;
    image: string;
    minZoom?: number;
    flyToMaxZoom?: number;

    onClick?: (id: string, item: any) => void;
}

export class XMapImageLayer extends React.Component<XMapImageProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    };

    private isInited = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;
    private layer: string;
    private source: string;

    constructor(props: XMapImageProps) {
        super(props);
        this.layer = props.layer;
        this.source = props.source;
    }

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

        let map = this.map;
        let source = this.source;
        let layer = this.layer;
        let props = this.props;

        map.loadImage(this.props.image, function (error: any, image: any) {
            if (error) {
                throw error;
            }
            map.addImage(props.image, image);
            map.addLayer({
                'id': layer,
                'type': 'symbol',
                'source': source,
                'layout': {
                    'icon-image': props.image,
                    'icon-size': .3,
                    'icon-allow-overlap': true
                },
                filter: ['!has', 'point_count'],
            });
        });

    }

    render() {
        return null;
    }

    componentDidMount() {
        this._isMounted = true;
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this._isMounted = false;
        this.context.mapUnsubscribe(this.listener);
        if (this.map) {
            try {
                this.map.removeLayer(this.layer);
            } catch (e) {
                // Just Ignore
            }
        }
    }
}