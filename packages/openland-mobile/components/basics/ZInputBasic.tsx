import * as React from 'react';
import { TextInput, View, TextInputProps, Text, StyleSheet, ViewStyle, TextStyle, NativeSyntheticEvent, TextInputFocusEventData, LayoutChangeEvent, Platform, Animated, Easing } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { hexToRgba } from 'openland-y-utils/hexToRgba';

const DURATION_PLACEHOLDER_ANIMATION = 150;
const PLACEHOLDER_SCALE_RATIO = 0.8;

const styles = StyleSheet.create({
    container: {
        borderRadius: RadiusStyles.Medium
    } as ViewStyle,
    placeholderContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 56,
        justifyContent: 'center',
        paddingHorizontal: 16
    } as ViewStyle,
    placeholder: {
        ...TextStyles.Densed
    } as TextStyle,
    prefixContainer: {
        position: 'absolute',
        top: 0,
        left: 16,
        height: 56,
        paddingTop: 19,
        justifyContent: 'center'
    } as ViewStyle,
    prefix: {
        ...TextStyles.Densed
    } as TextStyle,
    descriptionContainer: {
        paddingHorizontal: 16,
        paddingTop: 8
    } as ViewStyle,
    description: {
        ...TextStyles.Caption
    } as TextStyle,
});

export interface ZInputBasicProps extends TextInputProps {
    prefix?: string;
    invalid?: boolean;
    description?: string;
    enabled?: boolean;
    noWrapper?: boolean;
}

export const ZInputBasic = (props: ZInputBasicProps) => {
    const { placeholder, prefix, invalid, description, enabled, noWrapper, ...other } = props;
    const theme = React.useContext(ThemeContext);
    const [focused, setFocused] = React.useState<boolean>(false);
    const [filled, setFilled] = React.useState<boolean>(!!(props.value && props.value.length > 0));
    const [prefixWidth, setPrefixWidth] = React.useState<number>(0);
    const animation = React.useRef(new Animated.Value(filled ? 1 : 0)).current;
    const [placeholderWidth, setPlaceholderWidth] = React.useState<number>(0);

    const handleChangeText = React.useCallback((text) => {
        if (props.onChangeText) {
            props.onChangeText(text);
        }

        setFilled(!!(text && text.length > 0));
    }, [props.onChangeText]);

    const handleFocus = React.useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (props.onFocus) {
            props.onFocus(e);
        }

        setFocused(true);

        Animated.timing(animation, {
            toValue: 1,
            duration: DURATION_PLACEHOLDER_ANIMATION,
            useNativeDriver: true
        }).start();
    }, [props.onFocus]);

    const handleBlur = React.useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (props.onBlur) {
            props.onBlur(e);
        }

        setFocused(false);

        if (!filled) {
            Animated.timing(animation, {
                toValue: 0,
                duration: DURATION_PLACEHOLDER_ANIMATION,
                easing: Easing.linear,
                useNativeDriver: true
            }).start();
        }
    }, [props.onBlur, filled]);

    const handlePrefixLayout = React.useCallback((e: LayoutChangeEvent) => {
        setPrefixWidth(e.nativeEvent.layout.width);
    }, []);

    const handlePlaceholderLayout = React.useCallback((e: LayoutChangeEvent) => {
        setPlaceholderWidth(e.nativeEvent.layout.width);
    }, []);

    const placeholderAimatedStyle = {
        transform: [
            {
                translateX: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, (Math.round(placeholderWidth * PLACEHOLDER_SCALE_RATIO) / 2) - (placeholderWidth / 2)],
                })
            },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                }),
            },
            {
                scale: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, PLACEHOLDER_SCALE_RATIO],
                })
            },
        ]
    };

    return (
        <View marginHorizontal={noWrapper ? 0 : 16} marginBottom={noWrapper ? 0 : 16}>
            <View style={styles.container} backgroundColor={theme.backgroundTertiaryTrans}>
                {!!placeholder && (
                    <View style={styles.placeholderContainer}>
                        <Animated.View style={placeholderAimatedStyle} onLayout={handlePlaceholderLayout}>
                            <Text style={[styles.placeholder, { color: invalid ? theme.accentNegative : (focused ? theme.accentPrimary : theme.foregroundTertiary) }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                                {placeholder}
                            </Text>
                        </Animated.View>
                    </View>
                )}
                {!!prefix && (focused || filled) && (
                    <View style={styles.prefixContainer} onLayout={handlePrefixLayout}>
                        <Text style={[styles.prefix, { color: theme.foregroundPrimary }]} allowFontScaling={false}>
                            {prefix}
                        </Text>
                    </View>
                )}
                <TextInput
                    {...other}
                    keyboardAppearance={theme.keyboardAppearance}
                    onChangeText={handleChangeText}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    allowFontScaling={false}
                    selectionColor={Platform.OS === 'android' ? hexToRgba(theme.accentPrimary, HighlightAlpha) : theme.accentPrimary}
                    style={[props.style, {
                        ...TextStyles.Densed,
                        color: theme.foregroundPrimary,
                        flex: 1,
                        borderWidth: 0,
                        height: props.multiline ? undefined : 56,
                        minHeight: 56,
                        paddingTop: props.multiline ? (Platform.OS === 'android' ? 27 : 26) : (Platform.OS === 'android' ? 19 : 18),
                        paddingBottom: props.multiline ? 8 : 0,
                        paddingLeft: 16,
                        paddingRight: 16,
                        marginTop: 0,
                        marginBottom: 0,
                        marginLeft: prefixWidth > 0 ? prefixWidth + 2 : 0,
                        marginRight: 0,
                        textAlignVertical: props.multiline ? 'top' : 'center'
                    }]}
                    {...{ scrollEnabled: false }}
                />
            </View>

            {!!description && (
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.description, { color: invalid ? theme.accentNegative : theme.foregroundSecondary }]} allowFontScaling={false}>
                        {description}
                    </Text>
                </View>
            )}
        </View>
    );
};