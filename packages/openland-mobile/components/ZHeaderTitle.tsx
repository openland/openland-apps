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

export class ZHeaderTitle extends React.PureComponent<ZHeaderTitleProps, { leftSize?: number, rightSize?: number }> {

    containerWidth = new Animated.Value(0);
    opacity = this.props.progress.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    });
    translate = Animated.multiply(Animated.multiply(this.props.progress, this.containerWidth), 0.5);

    constructor(props: ZHeaderTitleProps) {
        super(props);
        this.state = {};
    }

    private handleLayout = (event: LayoutChangeEvent) => {
        // this.setState({ contentWidth: event.nativeEvent.layout.width });
    }
    private handleGlobalLayout = (event: LayoutChangeEvent) => {
        this.containerWidth.setValue(event.nativeEvent.layout.width);
        // this.setState({ containerWidth: event.nativeEvent.layout.width });
    }

    private handleLeftLayout = (event: LayoutChangeEvent) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ leftSize: event.nativeEvent.layout.width });
        // this.setState({ contentWidth: event.nativeEvent.layout.width });
    }

    private handleRightLayout = (event: LayoutChangeEvent) => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        this.setState({ rightSize: event.nativeEvent.layout.width });
        // this.setState({ contentWidth: event.nativeEvent.layout.width });
    }

    // componentWillReceiveProps() {
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // }

    componentWillUpdate() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }

    render() {
        let left = <Text>Left</Text>;
        let right = <Text>{this.props.rightTitle}</Text>;
        console.log(this.state.leftSize);
        console.log(this.state.rightSize);
        // let offset = this.props.pr
        return (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row' }} onLayout={this.handleGlobalLayout}>

                {this.state.leftSize !== undefined && this.state.rightSize !== undefined && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row' }}>
                        <View style={{ flexGrow: this.state.leftSize, flexBasis: this.state.leftSize, backgroundColor: '#0ff' }} />
                        {this.state.rightSize - this.state.leftSize > 0 && <View style={{ flexGrow: this.state.rightSize - this.state.leftSize, flexBasis: this.state.rightSize, flexShrink: 100000, backgroundColor: '#0f0' }} />}
                        <Animated.View style={{ flexShrink: 1, flexDirection: 'row', opacity: this.opacity }}>
                            <View onLayout={this.handleLayout}>
                                <Text style={{ textAlign: 'center' }}>{this.props.titleText}</Text>
                            </View>
                        </Animated.View>
                        {this.state.rightSize - this.state.leftSize < 0 && <View style={{ flexGrow: -(this.state.rightSize - this.state.leftSize), flexBasis: this.state.leftSize, flexShrink: 100000, backgroundColor: '#0f0' }} />}
                        <View style={{ flexGrow: this.state.rightSize, flexBasis: this.state.rightSize, backgroundColor: '#0ff' }} />
                    </View>
                )}

                <View style={{ flexGrow: 0, flexDirection: 'row' }} onLayout={this.handleLeftLayout}>
                    {left}
                </View>
                <View style={{ flexGrow: 1, flexBasis: 0 }} />
                {/* <View style={{ flexGrow: 1, flexShrink: 10000000, flexDirection: 'row', opacity: 0 }}>
                    <View style={{ opacity: 0, height: 0 }}>{right}</View>
                </View> */}

                {/* <View style={{ flexGrow: 1, flexShrink: 10000000, flexDirection: 'row', backgroundColor: '#00f' }}>
                    <View style={{ opacity: 0, height: 0, flexShrink: 1 }}>{left}</View>
                </View> */}
                <View style={{ flexGrow: 0, flexDirection: 'row' }} onLayout={this.handleRightLayout}>
                    {right}
                </View>
            </View>
        );
    }
}