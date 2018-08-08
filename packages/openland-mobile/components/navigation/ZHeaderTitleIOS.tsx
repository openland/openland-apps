import * as React from 'react';
import { Animated, View, Text, LayoutChangeEvent, LayoutAnimation } from 'react-native';
import { ZHeaderTitleProps } from './ZHeaderTitle';
import { ZAppConfig } from '../ZAppConfig';

export class ZHeaderTitleIOS extends React.PureComponent<ZHeaderTitleProps, { leftSize?: number, rightSize?: number }> {
    containerWidth = new Animated.Value(0);
    opacity = this.props.progress.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 1, 0],
        extrapolate: 'clamp'
    });
    translate = Animated.multiply(Animated.multiply(this.props.progress, this.containerWidth), -0.5);

    constructor(props: ZHeaderTitleProps) {
        super(props);
        this.state = {};
    }

    private handleGlobalLayout = (event: LayoutChangeEvent) => {
        this.containerWidth.setValue(event.nativeEvent.layout.width);
    }

    private handleLeftLayout = (event: LayoutChangeEvent) => {
        let val = Math.round(event.nativeEvent.layout.width);
        if (this.state.leftSize !== undefined && this.state.rightSize !== undefined && this.state.leftSize !== val) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
        this.setState({ leftSize: val });
    }

    private handleRightLayout = (event: LayoutChangeEvent) => {
        let val = Math.round(event.nativeEvent.layout.width);
        if (this.state.leftSize !== undefined && this.state.rightSize !== undefined && this.state.rightSize !== val) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
        this.setState({ rightSize: val });
    }

    componentWillReceiveProps(nextProps: ZHeaderTitleProps) {

        // Animate title/subtitle changes
        if (this.props.titleText !== nextProps.titleText || this.props.subtitleText !== nextProps.subtitleText) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }

        // Recalculate animations
        if (this.props.progress !== nextProps.progress) {
            this.opacity = nextProps.progress.interpolate({
                inputRange: [-1, 0, 1],
                outputRange: [0, 1, 0],
                extrapolate: 'clamp'
            });
            this.translate = Animated.multiply(Animated.multiply(this.props.progress, this.containerWidth), -0.5);
        }
    }

    render() {
        let left = <View width={this.props.first ? 0 : ZAppConfig.navigationBarBackWidth} />;
        let right = <View width={15} />;
        return (
            <View style={{ height: 44, flexDirection: 'row' }} onLayout={this.handleGlobalLayout}>
                {this.state.leftSize !== undefined && this.state.rightSize !== undefined && (
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, flexDirection: 'row', flexWrap: 'nowrap' }}>
                        <View style={{ flexGrow: this.state.leftSize, flexBasis: this.state.leftSize }} />
                        {this.state.rightSize - this.state.leftSize > 0 && <View style={{ flexGrow: this.state.rightSize - this.state.leftSize, flexBasis: this.state.rightSize - this.state.leftSize, flexShrink: 100000 }} />}
                        <Animated.View style={{ flexShrink: 1, flexDirection: 'row', opacity: this.opacity, flexWrap: 'nowrap', transform: [{ translateX: this.translate }] }}>
                            <View style={{ flexDirection: 'column' }}>
                                {!this.props.titleView && this.props.titleText && <Text style={{ textAlign: 'center' }}>{this.props.titleText}</Text>}
                                {!this.props.titleView && this.props.subtitleText && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>}
                                {this.props.titleView}
                            </View>
                        </Animated.View>
                        {this.state.rightSize - this.state.leftSize < 0 && <View style={{ flexGrow: -(this.state.rightSize - this.state.leftSize), flexBasis: -(this.state.rightSize - this.state.leftSize), flexShrink: 100000 }} />}
                        <View style={{ flexGrow: this.state.rightSize, flexBasis: this.state.rightSize }} />
                    </View>
                )}

                <View style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100 }} onLayout={this.handleLeftLayout}>
                    {left}
                </View>
                <View style={{ flexGrow: 1, flexBasis: 0 }} />
                <View style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100 }} onLayout={this.handleRightLayout}>
                    {right}
                </View>
            </View>
        );
    }
}