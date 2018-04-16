import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber, DataSources } from './XMap';

export interface XMapSourceProps {
    id: string;
    data?: any;
    cluster?: boolean;
}

export class XMapSource extends React.PureComponent<XMapSourceProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired,
    };
    private isInited = false;
    private map: mapboxgl.Map;
    private datasources: DataSources;

    listener: XMapSubscriber = (src, map, datasources) => {
        if (!this.isInited) {
            this.map = map;
            this.datasources = datasources;
            this.isInited = true;
            let dt = this.props.data !== undefined ? this.props.data : { 'type': 'FeatureCollection', features: [] };
            datasources.addGeoJSONSource(this.props.id, dt);
            try {
                map.addSource(this.props.id, {
                    type: 'geojson',
                    data: dt,
                    cluster: this.props.cluster || false,
                    clusterMaxZoom: 14,
                    clusterRadius: 50
                });
            } catch (e) {
                // Ignore
            }
        }
    }

    componentWillReceiveProps(nextProps: XMapSourceProps) {
        if (this.isInited) {
            let dt = nextProps.data !== undefined ? nextProps.data : { 'type': 'FeatureCollection', features: [] };
            if (this.props.id !== nextProps.id) {
                try {
                    this.map.removeSource(this.props.id);
                    this.datasources.removeGeoJsonSource(this.props.id);
                    this.datasources.addGeoJSONSource(this.props.id, dt);
                    this.map.addSource(nextProps.id, {
                        type: 'geojson',
                        data: dt,
                        cluster: this.props.cluster || false,
                        clusterMaxZoom: 14,
                        clusterRadius: 50
                    });
                } catch (e) {
                    // Ignore
                }
            } else {
                try {
                    let source = this.map.getSource(this.props.id);
                    if (source.type === 'geojson') {
                        this.datasources.updateGeoJSONSource(this.props.id, dt);
                        source.setData(dt);
                    }
                } catch (e) {
                    // Ignore
                }
            }
        }
    }

    render() {
        return null;
    }

    componentDidMount() {
        this.context.mapSubscribe(this.listener);
    }

    componentWillUnmount() {
        this.context.mapUnsubscribe(this.listener);
        if (this.map) {
            try {
                console.warn(this.map.getStyle());
                this.map.removeSource(this.props.id);
            } catch (e) {
                console.warn(e);
                // Ignore
            }
            this.datasources.removeGeoJsonSource(this.props.id);
        }
    }
}