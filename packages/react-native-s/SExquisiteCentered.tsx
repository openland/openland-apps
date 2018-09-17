import * as React from 'react';
import { View, StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native';

export interface SEquisiteCenteredProps {
    style?: StyleProp<ViewStyle>;
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

        return (
            <View style={[this.props.style, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', flexShrink: 0, maxWidth: 100 }} onLayout={this.handleLeftLayout}>
                    {child[0]}
                </View>
                <View style={{ flexDirection: 'row', flexShrink: 0, maxWidth: 100 }} onLayout={this.handleRightLayout}>
                    {child[2]}
                </View>
                {this.state.rightWidth !== undefined && this.state.leftWidth !== undefined && (
                    <View style={{ position: 'absolute', left: Math.max(this.state.leftWidth, this.state.rightWidth), right: Math.max(this.state.leftWidth, this.state.rightWidth), top: 0, flexDirection: 'row' }}>
                        {child[1]}
                    </View>
                )}
            </View>
        );
    }
}