import * as React from 'react';
import { Animated, View, Text, LayoutChangeEvent, LayoutAnimation } from 'react-native';

export interface ZHeaderTitleProps {
    appearance: 'ios' | 'android';
    titleText?: string;
    titleView?: any;
    rightTitle?: string;
    progress: Animated.AnimatedInterpolation;
    hairlineOffset: Animated.AnimatedInterpolation;
}

export class ZHeaderTitle extends React.PureComponent<ZHeaderTitleProps, {
    containerWidth: number,
    contentWidth: number,
    leftWidth: number,
    rightWidth: number
}> {
    constructor(props: ZHeaderTitleProps) {
        super(props);
        this.state = {
            containerWidth: -1,
            contentWidth: -1,
            leftWidth: -1,
            rightWidth: -1,
        };
    }
    private handleLayout = (event: LayoutChangeEvent) => {
        this.setState({ contentWidth: event.nativeEvent.layout.width });
    }
    private handleGlobalLayout = (event: LayoutChangeEvent) => {
        this.setState({ containerWidth: event.nativeEvent.layout.width });
    }
    private handleLeftlLayout = (event: LayoutChangeEvent) => {
        this.setState({ leftWidth: event.nativeEvent.layout.width });
    }
    private handleRightlLayout = (event: LayoutChangeEvent) => {
        this.setState({ rightWidth: event.nativeEvent.layout.width });
    }
    componentWillReceiveProps() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    render() {
        let opacity: Animated.AnimatedInterpolation = new Animated.Value(0);
        let translate: Animated.AnimatedInterpolation = new Animated.Value(0);
        if (this.state.containerWidth !== -1 && this.state.contentWidth !== -1 && this.state.leftWidth !== -1 && this.state.rightWidth !== -1) {
            let padding = Math.max(this.state.leftWidth, this.state.rightWidth);
            opacity = this.props.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            });
            translate = this.props.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [-this.state.contentWidth / 2, this.state.containerWidth / 2 - this.state.contentWidth / 2, this.state.containerWidth - this.state.contentWidth + padding],
                extrapolate: 'clamp'
            });
        }
        // let offset = this.props.pr
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 1, flexDirection: 'row' }} onLayout={this.handleGlobalLayout}>
                <View onLayout={this.handleLeftlLayout}>
                    <Text>Left</Text>
                </View>
                <View flexGrow={1} />
                <View onLayout={this.handleRightlLayout}>
                    <Text>{this.props.rightTitle}</Text>
                </View>
                {this.state.leftWidth !== -1 && this.state.rightWidth !== -1 && (
                    <Animated.View style={{ flexGrow: 1, position: 'absolute', width: '100%', flexBasis: 0, flexDirection: 'row', opacity: opacity, transform: [{ translateX: translate }] }}>
                        <View onLayout={this.handleLayout} style={{ paddingHorizontal: Math.max(this.state.leftWidth, this.state.rightWidth) }}>
                            <Text style={{ textAlign: 'center' }}>{this.props.titleText}</Text>
                        </View>
                    </Animated.View>
                )}

            </View>
        );
    }
}