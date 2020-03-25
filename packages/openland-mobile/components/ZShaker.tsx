import * as React from 'react';
import { Animated, Easing } from 'react-native';

export const ZShaker = React.memo(
    React.forwardRef<{ shake: () => void }, { children: JSX.Element }>((props, ref) => {
        const [shakeAnimation] = React.useState(new Animated.Value(0));

        const shakeIt = () => {
            shakeAnimation.setValue(0);
            Animated.timing(shakeAnimation, {
                duration: 800,
                toValue: 3,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();
        };

        React.useImperativeHandle<any, { shake: () => void }>(ref, () => ({
            shake: () => shakeIt(),
        }));

        return (
            <Animated.View
                style={{
                    transform: [
                        {
                            translateX: shakeAnimation.interpolate({
                                inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                                outputRange: [0, -10, 0, 10, 0, -10, 0],
                            }),
                        },
                    ],
                }}
            >
                {props.children}
            </Animated.View>
        );
    }),
);
