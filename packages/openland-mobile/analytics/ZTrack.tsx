import * as React from 'react';
import { trackEvent } from './index';

export class ZTrack extends React.Component<{ event: string, params?: any }> {

    componentDidMount() {
        trackEvent(this.props.event, this.props.params);
    }

    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}