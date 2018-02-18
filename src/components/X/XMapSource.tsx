import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber, DataSources } from './XMapLight';

export interface XMapSourceProps {
    id: string;
    data?: any;
}

export class XMapSource extends React.PureComponent<{ id: string, data?: any }> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired,
    }
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
            map.addSource(this.props.id, { type: 'geojson', data: dt });
        }
    }

    componentWillReceiveProps(nextProps: XMapSourceProps) {
        if (this.isInited) {
            let dt = nextProps.data !== undefined ? nextProps.data : { 'type': 'FeatureCollection', features: [] };
            if (this.props.id !== nextProps.id) {
                this.map.removeSource(this.props.id);
                this.datasources.removeGeoJsonSource(this.props.id);
                this.datasources.addGeoJSONSource(this.props.id, dt);
                this.map.addSource(nextProps.id, { type: 'geojson', data: dt });
            } else {
                let source = this.map.getSource(this.props.id)
                if (source.type === 'geojson') {
                    this.datasources.updateGeoJSONSource(this.props.id, dt);
                    source.setData(dt);
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
                this.map.removeSource(this.props.id);
            } catch (_) {
                // Ignore
            }
            this.datasources.removeGeoJsonSource(this.props.id);
        }
    }
}