import * as React from 'react';
import * as PropTypes from 'prop-types';

export class HostNameProvider extends React.Component<{ hostName: string, protocol: string }> implements React.ChildContextProvider<{}> {
    static childContextTypes = {
        hostName: PropTypes.string.isRequired,
        protocol: PropTypes.string.isRequired,
    };

    render() {
        var children: any = false;
        React.Children.forEach(this.props.children, (ch) => {
            if (ch) {
                if (children) {
                    throw 'Only one child possible!';
                }
                children = ch;
            }
        });
        return children;
    }

    getChildContext() {
        return {
            hostName: this.props.hostName,
            protocol: this.props.protocol
        };
    }
}