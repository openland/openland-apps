import * as React from 'react';
import * as PropTypes from 'prop-types';

export class XCloser extends React.Component<{ handler: () => void }, {}> {
    static childContextTypes = {
        xcloser: PropTypes.func.isRequired,
    };

    closer = () => {
        this.props.handler();
    }

    getChildContext() {
        return {
            xcloser: this.closer
        };
    }

    render() {
        return this.props.children;
    }
}