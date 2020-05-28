import * as React from 'react';
import { Animated, Easing } from 'react-native';

export const ZShaker = React.memo(
    React.forwardRef<{ shake: () => void }, { children: JSX.Element | JSX.Element[] }>((props, ref) => {
        const [shakeAnimation] = React.useState(new Animated.Value(0));

        const shakeIt = () => {
            shakeAnimation.setValue(0);
            Animated.timing(shakeAnimation, {
                duration: 1600,
                toValue: 1,
                easing: Easing.bezier(0.36, 0.07, 0.19, 0.97),
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
                                inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                                outputRange: [0, -2, 4, -8, 8, -8, 8, -8, 4, -2, 0],
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
