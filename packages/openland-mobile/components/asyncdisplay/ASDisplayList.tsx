import * as React from 'react';
import { ASView, ASText, ASLinearGradient } from './Views';
import { buildTree } from './ASTreeBuilder';
import { AsyncDisplayListNative } from './ASDisplayNodeNative';
import { StyleProp, ViewStyle } from 'react-native';

export interface ASDisplayListProps<T> {
    data: T[];
    renderItem: (item: T) => React.ReactElement<{}>;
    style?: StyleProp<ViewStyle>;
}

export class ASDisplayList<T> extends React.PureComponent<ASDisplayListProps<T>, { config?: string }> {
    constructor(props: ASDisplayListProps<T>) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        let config = JSON.stringify(this.props.data.map((v) => ({ layout: JSON.stringify(buildTree(this.props.renderItem(v))), data: v })));
        this.setState({ config });
    }

    componentWillUpdate(nextProps: ASDisplayListProps<T>) {
        if (nextProps.data !== this.props.data) {
            let config = JSON.stringify(nextProps.data.map((v) => ({ layout: JSON.stringify(buildTree(nextProps.renderItem(v))), data: v })));
            this.setState({ config });
        }
    }

    render() {
        return (
            <AsyncDisplayListNative
                style={this.props.style}
                config={this.state.config}
            />
        );
    }
}