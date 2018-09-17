import * as React from 'react';

export class SDeferred extends React.PureComponent<{}, { inited: boolean }> {
    state = {
        inited: false
    };

    componentWillMount() {
        setTimeout(() => this.setState({ inited: true }), 10);
    }

    render() {
        if (!this.state.inited) {
            return null;
        } else {
            return (
                <>
                    {this.props.children}
                </>
            );
        }
    }
}