import * as React from 'react';
import {
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Animated,
    Keyboard,
    View,
} from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';

interface FloatContentProps {
    children: JSX.Element | JSX.Element[];
    floatContent: JSX.Element;
}

export const FloatKeyboardArea = React.memo(
    React.forwardRef((props: FloatContentProps, ref: React.RefObject<ScrollView>) => {
        const area = React.useContext(ASSafeAreaContext);
        const bottomOffset = area.bottom;

        const isAndroid = Platform.OS === 'android';
        const isIos = Platform.OS === 'ios';
        const isXGen = isIos && Dimensions.get('window').height > 800;
        const defaultIosPadding = isXGen ? 34 : 16;

        const [floatPadding] = React.useState(new Animated.Value(defaultIosPadding));

        const keyboardWillShow = (e: any) => {
            Animated.timing(floatPadding, {
                duration: e.duration,
                toValue: 16,
            }).start();
        };

        const keyboardWillHide = (e: any) => {
            Animated.timing(floatPadding, {
                duration: e.duration,
                toValue: defaultIosPadding,
            }).start();
        };

        React.useEffect(() => {
            if (isIos) {
                Keyboard.addListener('keyboardWillShow', keyboardWillShow);
                Keyboard.addListener('keyboardWillHide', keyboardWillHide);
            }
            return () => (isIos ? Keyboard.removeAllListeners() : undefined);
        });

        return (
            <KeyboardAvoidingView behavior="padding" flex={1}>
                <ScrollView flex={1} paddingTop={isIos ? area.top + 22 : undefined} ref={ref}>
                    {props.children}
                </ScrollView>
                {isAndroid && (
                    <View paddingHorizontal={16} paddingBottom={bottomOffset + 16} paddingTop={16}>
                        {props.floatContent}
                    </View>
                )}
                {isIos && (
                    <Animated.View paddingHorizontal={16} paddingBottom={floatPadding}>
                        {props.floatContent}
                    </Animated.View>
                )}
            </KeyboardAvoidingView>
        );
    }),
);
