import * as React from 'react';
import { trackEvent } from '../../utils/analytics';

export class XTrack extends React.Component<{ event: string, params?: any }> {

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