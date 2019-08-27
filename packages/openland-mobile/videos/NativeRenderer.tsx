import * as React from 'react';
import { VideoRendererInt } from 'openland-video/videos/components/renderers';
import { Animated } from 'react-native';
import { Animation, TimingAnimation, SequenceAnimation } from 'openland-video/videos/components/Animation';

function convertAnimation(delay: number, value: Animated.Value, animation: Animation): Animated.CompositeAnimation {
    if (animation instanceof TimingAnimation) {
        return Animated.timing(value, {
            toValue: animation._to,
            delay: delay + animation._delay,
        });
    } else if (animation instanceof SequenceAnimation) {
        return Animated.sequence(animation._animations.map((v) => convertAnimation(delay, value, v)));
    } else {
        throw Error();
    }
}
export const NativeRenderer: VideoRendererInt = {
    renderView: (props) => {
        const transform: any[] = [];
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
                    transform
                }}
            >
                {props.children}
            </Animated.View>
        );
    }
};