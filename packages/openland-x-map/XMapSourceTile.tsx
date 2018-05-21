import * as React from 'react';
import * as PropTypes from 'prop-types';
import { XMapSubscriber } from './XMap';

export interface XMapSourceTileProps {
    id: string;
    url: string;
}

export class XMapSourceTile extends React.PureComponent<XMapSourceTileProps> {
    static contextTypes = {
        mapSubscribe: PropTypes.func.isRequired,
        mapUnsubscribe: PropTypes.func.isRequired,
    };
    private isInited = false;
    private map?: mapboxgl.Map;

    listener: XMapSubscriber = (src, map, datasources) => {
        if (!this.isInited) {
            this.map = map;
            this.isInited = true;
            try {
                map.addSource(this.props.id, {
                    type: 'vector',
                    url: this.props.url,
                });
            } catch (e) {
                console.warn(e);
                // Ignore
            }
        }
    }

    componentWillReceiveProps(nextProps: XMapSourceTileProps) {
        if (this.isInited) {
            if (this.props.id !== nextProps.id) {
                try {
                    this.map!!.removeSource(this.props.id);
                    this.map!!.addSource(nextProps.id, {
                        type: 'vector',
                        url: this.props.url,
                    });
                } catch (e) {
                    console.warn(e);
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
        }
    }
}