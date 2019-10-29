import * as React from 'react';
import { View, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';

export interface SEquisiteCenteredProps {
    style?: StyleProp<ViewStyle>;
    enable?: boolean;
}
export class SEquisiteCentered extends React.PureComponent<SEquisiteCenteredProps, { leftWidth?: number, rightWidth?: number }> {

    constructor(props: SEquisiteCenteredProps) {
        super(props);
        this.state = {};
    }

    private handleLeftLayout = (event: LayoutChangeEvent) => {
        this.setState({ leftWidth: event.nativeEvent.layout.width });
    }

    private handleRightLayout = (event: LayoutChangeEvent) => {
        this.setState({ rightWidth: event.nativeEvent.layout.width });
    }

    render() {
        let child = React.Children.toArray(this.props.children);
        if (child.length !== 3) {
            throw Error('SEquisiteCentered need exactly three children');
        }

        let inited = this.state.rightWidth !== undefined && this.state.leftWidth !== undefined;

        if (this.props.enable === false) {
            let left = inited ? this.state.leftWidth! : 0;
            let right = inited ? this.state.rightWidth! : 0;
            return (
                <View style={[this.props.style, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', flexShrink: 0, maxWidth: 100 }} onLayout={this.handleLeftLayout}>
                        {child[0]}
                    </View>
                    <View style={{ flexDirection: 'row', flexShrink: 0, maxWidth: 100 }} onLayout={this.handleRightLayout}>
                        {child[2]}
                    </View>
                    <View style={{ position: 'absolute', left: left, right: right, top: 0, flexDirection: 'row', opacity: inited ? 1 : 0 }}>
                        {child[1]}
                    </View>
                </View>
            );
        } else {
            let padding = inited ? Math.max(this.state.leftWidth!, this.state.rightWidth!) : 0;
            return (
                <View style={[this.props.style, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{ flexDirection: 'row', flexShrink: 0, maxWidth: 100 }} onLayout={this.handleLeftLayout}>
                        {child[0]}
                    </View>
                    <View style={{ flexDirection: 'row', flexShrink: 0, maxWidth: 100 }} onLayout={this.handleRightLayout}>
                        {child[2]}
                    </View>
                    <View style={{ position: 'absolute', left: padding, right: padding, top: 0, flexDirection: 'row', opacity: inited ? 1 : 0 }}>
                        {child[1]}
                    </View>
                </View>
            );
        }
    }
}