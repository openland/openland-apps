import * as React from 'react';
import {
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Animated,
    Keyboard,
    View,
    StyleSheet,
    TextStyle,
    Text,
} from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

const textStyles = StyleSheet.create({
    title: {
        ...TextStyles.Title1,
        textAlign: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    } as TextStyle,
    hint: {
        ...TextStyles.Body,
        textAlign: 'center',
        paddingHorizontal: 16,
        marginBottom: 32,
    } as TextStyle,
});

interface RegistrationContainerProps {
    header?: JSX.Element;
    title?: string | JSX.Element;
    subtitle?: string | JSX.Element;
    children: JSX.Element | JSX.Element[];
    floatContent: JSX.Element;
    scalableContent?: JSX.Element;
    scalableContentSize?: number;
    autoScrollToBottom?: boolean;
}

export const RegistrationContainer = React.memo((props: RegistrationContainerProps) => {
    const theme = React.useContext(ThemeContext);
    const area = React.useContext(ASSafeAreaContext);
    const scrollRef = React.useRef<ScrollView>(null);
    const bottomOffset = area.bottom;

    const isAndroid = Platform.OS === 'android';
    const isIos = Platform.OS === 'ios';
    const isXGen = isIos && Dimensions.get('window').height > 800;
    const defaultIosPadding = isXGen ? 34 : 16;

    const [floatPadding] = React.useState(new Animated.Value(defaultIosPadding));
    const [avatarScale] = React.useState(new Animated.Value(1));
    const [avatarSize] = React.useState(new Animated.Value(props.scalableContentSize ? props.scalableContentSize : 96));

    const keyboardWillShow = (e: any) => {
        if (props.autoScrollToBottom && scrollRef.current && !isXGen) {
            scrollRef.current.scrollToEnd({ animated: true });
        }
        Animated.parallel([
            Animated.timing(avatarSize, {
                duration: e.duration,
                toValue: props.scalableContentSize ? props.scalableContentSize / 2 : 48,
            }),
            Animated.timing(avatarScale, {
                duration: e.duration,
                toValue: 0.5,
            }),
            Animated.timing(floatPadding, {
                duration: e.duration,
                toValue: 16,
            }),
        ]).start();
    };

    const keyboardWillHide = (e: any) => {
        Animated.parallel([
            Animated.timing(avatarSize, {
                duration: e.duration,
                toValue: props.scalableContentSize ? props.scalableContentSize : 96,
            }),
            Animated.timing(avatarScale, {
                duration: e.duration,
                toValue: 1,
            }),
            Animated.timing(floatPadding, {
                duration: e.duration,
                toValue: defaultIosPadding,
            }),
        ]).start();
    };

    React.useEffect(
        () => {
            if (isIos) {
                Keyboard.addListener('keyboardWillShow', keyboardWillShow);
                Keyboard.addListener('keyboardWillHide', keyboardWillHide);
            }
            return () => (isIos ? Keyboard.removeAllListeners() : undefined);
        },
        [floatPadding, avatarScale, avatarSize],
    );

    return (
        <>
            {props.header && props.header}
            <KeyboardAvoidingView
                behavior="padding"
                flex={1}
                keyboardVerticalOffset={isIos && theme.type === 'Dark' ? 88 : undefined}
            >
                <ScrollView flex={1} paddingTop={isIos ? area.top + 16 : undefined} ref={scrollRef}>
                    <Text
                        style={[textStyles.title, { color: theme.foregroundPrimary }]}
                        allowFontScaling={false}
                    >
                        {props.title}
                    </Text>
                    <Text
                        style={[textStyles.hint, { color: theme.foregroundSecondary }]}
                        allowFontScaling={false}
                    >
                        {props.subtitle}
                    </Text>
                    {props.scalableContent && (
                        <Animated.View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: [{ scale: avatarScale }],
                                height: avatarSize,
                            }}
                        >
                            {props.scalableContent}
                        </Animated.View>
                    )}
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
        </>
    );
});
