import * as React from 'react';
import {
    Platform,
    ScrollView,
    KeyboardAvoidingView,
    Dimensions,
    Keyboard,
    View,
    StyleSheet,
    TextStyle,
    Text,
    LayoutAnimation,
} from 'react-native';
import { ASSafeAreaContext } from 'react-native-async-view/ASSafeAreaContext';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';

const titlesStyles = StyleSheet.create({
    title: {
        ...TextStyles.Title1,
        textAlign: 'center',
        paddingHorizontal: 16,
        marginBottom: 8,
    } as TextStyle,
    subtitle: {
        ...TextStyles.Body,
        textAlign: 'center',
        paddingHorizontal: 16,
        marginBottom: 32,
    } as TextStyle,
});

interface RegistrationContainerProps {
    header?: JSX.Element;
    title: string;
    subtitle: string | JSX.Element;
    children: any;
    floatContent: JSX.Element;
    autoScrollToBottom?: boolean;
    autoScrollToTop?: boolean;
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

    const [floatPadding, setFloatPadding] = React.useState(defaultIosPadding);

    const keyboardWillShow = (e: any) => {
        if (props.autoScrollToBottom && scrollRef.current) {
            (scrollRef.current as any).getNode().scrollToEnd({ animated: true });
        }
        if (props.autoScrollToTop && scrollRef.current) {
            (scrollRef.current as any).getNode().scrollToTop({ animated: true });
        }

        // Animate
        if (isIos && e.duration > 0) {
            LayoutAnimation.configureNext(LayoutAnimation.create(
                e.duration,
                LayoutAnimation.Types[e.easing]
            ));
            setFloatPadding(16);
        }
    };

    const keyboardWillHide = (e: any) => {
        if (isIos && e.duration > 0) {
            LayoutAnimation.configureNext(LayoutAnimation.create(
                e.duration,
                LayoutAnimation.Types[e.easing]
            ));
            setFloatPadding(defaultIosPadding);
        }
    };

    React.useEffect(
        () => {
            if (isIos) {
                Keyboard.addListener('keyboardWillShow', keyboardWillShow);
                Keyboard.addListener('keyboardWillHide', keyboardWillHide);
            }
            return () => {
                if (isIos) {
                    Keyboard.removeListener('keyboardWillShow', keyboardWillShow);
                    Keyboard.removeListener('keyboardWillHide', keyboardWillHide);
                }
            };
        },
        [floatPadding],
    );

    return (
        <>
            {props.header && props.header}
            {isIos && <SHeader title={props.title} />}
            <KeyboardAvoidingView
                behavior="padding"
                style={{
                    alignItems: 'center',
                    flex: 1
                }}
            >
                <SScrollView
                    style={{
                        flex: 1,
                        paddingTop: 16,
                        maxWidth: 600,
                        width: '100%'
                    }}
                    scrollRef={scrollRef}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text
                        style={[titlesStyles.title, { color: theme.foregroundPrimary }]}
                        allowFontScaling={false}
                    >
                        {props.title}
                    </Text>
                    {typeof props.subtitle === 'string' ? (
                        <Text
                            style={[titlesStyles.subtitle, { color: theme.foregroundSecondary }]}
                            allowFontScaling={false}
                        >
                            {props.subtitle}
                        </Text>
                    ) : (
                            props.subtitle
                        )}
                    {props.children}
                </SScrollView>
                {isAndroid && (
                    <View style={{ maxWidth: 424, width: '100%', paddingHorizontal: 16, paddingBottom: bottomOffset + 16, paddingTop: 16 }}>
                        {props.floatContent}
                    </View>
                )}
                {isIos && (
                    <View
                        style={{
                            paddingHorizontal: 16,
                            paddingBottom: floatPadding,
                            paddingTop: 16,
                            maxWidth: 424,
                            width: '100%'
                        }}
                    >
                        {props.floatContent}
                    </View>
                )}
            </KeyboardAvoidingView>
        </>
    );
});
