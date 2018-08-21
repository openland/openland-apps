import * as React from 'react';
import { AsyncDisplayNodeNative } from './ASDisplayNodeNative';
import { StyleProp, ViewStyle } from 'react-native';
import { buildTree } from './ASTreeBuilder';

export class ASDisplayNode extends React.PureComponent<{ style?: StyleProp<ViewStyle> }, { config?: string }> {

    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    private doRefresh = () => {
        let res = buildTree(this.props.children);
        setTimeout(() => {
            this.setState({ config: JSON.stringify(res) });
        });
    }

    componentWillMount() {
        this.doRefresh();
    }

    componentDidUpdate() {
        this.doRefresh();
    }

    render() {
        return (
            <AsyncDisplayNodeNative style={this.props.style} config={this.state.config} />
        );
    }
}