import * as React from 'react';
import { ViewProps, Platform, LayoutAnimation, Keyboard, DeviceEventEmitter, View } from 'react-native';

export const KeyboardHandlerContainer = React.memo((props: { style?: ViewProps["style"], children: JSX.Element | (JSX.Element | null | false | undefined)[] }) => {
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const isIos = Platform.OS === 'ios';

    const keyboardWillShow = (e: any) => {
        if (e.duration > 0) {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]),
            );
        }
        setKeyboardHeight(e?.endCoordinates?.height);
    };

    const keyboardWillHide = (e: any) => {
        if (e.duration > 0) {
            LayoutAnimation.configureNext(
                LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]),
            );
        }
        setKeyboardHeight(0);
    };

    const keyboardHeightChange = (e: any) => {
        setKeyboardHeight(e?.height ? Math.ceil(e.height) : 0);
    };

    React.useEffect(() => {
        if (isIos) {
            Keyboard.addListener('keyboardWillShow', keyboardWillShow);
            Keyboard.addListener('keyboardWillHide', keyboardWillHide);
        } else {
            DeviceEventEmitter.addListener('async_keyboard_height', keyboardHeightChange);
        }
        return () => {
            if (isIos) {
                Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
                Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
            } else {
                DeviceEventEmitter.removeListener('async_keyboard_height', keyboardHeightChange);
            }
        };
    }, []);

    return (
        <View
            style={[props.style, {
                marginBottom: keyboardHeight,
            }]}
        >
            {props.children}
        </View>
    );
});
