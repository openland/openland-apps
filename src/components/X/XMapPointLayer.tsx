import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber } from './XMap';

interface XMapPointLayerProps {
    layer: string;
    source: string;
}

export class XMapPointLayer extends React.Component<XMapPointLayerProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired
    }

    private isInited = false;
    private _isMounted = false;
    private map: mapboxgl.Map | null = null;
    private layer: string;
    private source: string;

    constructor(props: XMapPointLayerProps) {
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

        this.map.addLayer({
            'id': this.layer + '-cluster',
            'type': 'circle',
            'source': this.source,
            'layout': {},
            'paint': {
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ],
                'circle-color': '#007cbf'
            },
            filter: ['has', 'point_count']
        });

        this.map.addLayer({
            id: this.layer + '-cluster-count',
            type: 'symbol',
            source: this.source,
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        });

        this.map.addLayer({
            'id': this.layer,
            'type': 'circle',
            'source': this.source,
            'layout': {},
            'paint': {
                'circle-radius': {
                    'base': 1.75,
                    'stops': [[12, 4], [22, 40]]
                },
                'circle-color': '#007cbf'
            },
            filter: ['!has', 'point_count']
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
                this.map.removeLayer(this.layer + '-cluster');
                this.map.removeLayer(this.layer + '-cluster-count');
            } catch (e) {
                // Just Ignore
            }
        }
    }
}