import * as React from 'react';

export class SDeferred extends React.PureComponent<{}, { inited: boolean }> {
    state = {
        inited: false
    };

    componentWillMount() {
        console.log('SDeferred: Waiting');
        setTimeout(() => { console.log('SDeferred: Mounting'); this.setState({ inited: true }); }, 10);
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