import * as React from 'react';
import { VideoRendererInt } from 'openland-video/components/VideoRenderer';
import { Animated, Text, Easing } from 'react-native';
import { Animation, TimingAnimation, SequenceAnimation, SetValueAnimation } from 'openland-video/components/Animation';

function convertAnimation(delay: number, value: Animated.Value, animation: Animation): Animated.CompositeAnimation {
    if (animation instanceof TimingAnimation) {
        return Animated.timing(value, {
            toValue: animation._to,
            delay: delay + animation._delay,
            duration: animation._duration,
            easing: Easing.bezier(animation._easing.x1, animation._easing.y1, animation._easing.x2, animation._easing.y2),
            useNativeDriver: true
        });
    } else if (animation instanceof SequenceAnimation) {
        return Animated.sequence(animation._animations.map((v) => convertAnimation(delay, value, v)));
    } else if (animation instanceof SetValueAnimation) {
        return Animated.timing(value, {
            toValue: animation._to,
            delay: 0,
            duration: 0,
            useNativeDriver: true
        });
    } else {
        throw Error();
    }
}
export const NativeRenderer: VideoRendererInt = {
    renderView: (props) => {
        const transform: any[] = [];
        let opacity: any = undefined;
        if (typeof props.translateY === 'object') {
            const value = new Animated.Value(0);
            const anim = convertAnimation(props.delay, value, props.translateY);
            anim.start();
            transform.push({ translateY: value });
        }
        if (typeof props.translateX === 'object') {
            const value = new Animated.Value(0);
            const anim = convertAnimation(props.delay, value, props.translateX);
            anim.start();
            transform.push({ translateX: value });
        }
        if (typeof props.opacity === 'object') {
            const value = new Animated.Value(1);
            const anim = convertAnimation(props.delay, value, props.opacity);
            anim.start();
            opacity = value;
        }
        return (
            <Animated.View
                style={{
                    marginTop: props.marginTop,
                    marginBottom: props.marginBottom,
                    marginLeft: props.marginLeft,
                    marginRight: props.marginRight,
                    paddingTop: props.paddingTop,
                    paddingBottom: props.paddingBottom,
                    paddingRight: props.paddingRight,
                    paddingLeft: props.paddingLeft,
                    width: props.width,
                    height: props.height,
                    backgroundColor: props.backgroundColor,
                    opacity: opacity,
                    transform
                }}
            >
                {props.children}
            </Animated.View>
        );
    },
    renderText: (props) => {
        return (
            <Text
                style={{
                    color: props.color,
                    fontSize: props.fontSize,
                    fontWeight: props.fontWeight,
                    lineHeight: props.lineHeight
                }}
            >
                {props.children}
            </Text>
        );
    }
};