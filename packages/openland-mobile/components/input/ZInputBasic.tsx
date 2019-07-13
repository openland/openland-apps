import * as React from 'react';
import { TextInput, View, TextInputProps, Text, StyleSheet, ViewStyle, TextStyle, NativeSyntheticEvent, TextInputFocusEventData, LayoutChangeEvent, Platform } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TypeStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    container: {
        borderRadius: RadiusStyles.medium
    } as ViewStyle,
    labelContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 56,
        justifyContent: 'center',
        paddingHorizontal: 16
    } as ViewStyle,
    labelContainerFocused: {
        justifyContent: 'flex-start',
        paddingTop: 8,
    } as ViewStyle,
    label: {
        ...TypeStyles.densed
    } as TextStyle,
    labelFocused: {
        ...TypeStyles.caption
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
        ...TypeStyles.densed
    } as TextStyle,
    descriptionContainer: {
        paddingHorizontal: 16,
        paddingTop: 8
    } as ViewStyle,
    description: {
        ...TypeStyles.caption
    } as TextStyle,
});

export interface ZInputBasicProps extends TextInputProps {
    label?: string;
    prefix?: string;
    invalid?: boolean;
    description?: string;
    enabled?: boolean;
    noMargin?: boolean;
}

export const ZInputBasic = (props: ZInputBasicProps) => {
    const { label, prefix, invalid, description, enabled, noMargin, ...other } = props;
    const theme = React.useContext(ThemeContext);
    const [ focused, setFocused ] = React.useState<boolean>(false);
    const [ filled, setFilled ] = React.useState<boolean>(!!(props.value && props.value.length > 0));
    const [ prefixWidth, setPrefixWidth ] = React.useState<number>(0);

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
    }, [props.onFocus]);

    const handleBlur = React.useCallback((e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (props.onBlur) {
            props.onBlur(e);
        }

        setFocused(false);
    }, [props.onBlur]);

    const handlePrefixLayout = React.useCallback((e: LayoutChangeEvent) => {
        setPrefixWidth(e.nativeEvent.layout.width);
    }, []);

    return (
        <View marginHorizontal={noMargin ? 0 : 16}>
            <View style={styles.container} backgroundColor={theme.backgroundTertiary}>
                {!!label && (
                    <View style={[styles.labelContainer, (focused || filled) && styles.labelContainerFocused]}>
                        <Text style={[styles.label, (focused || filled) && styles.labelFocused, { color: invalid ? theme.accentNegative : (focused ? theme.accentPrimary : theme.foregroundTertiary) }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {label}
                        </Text>
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
                    style={[props.style, {
                        ...TypeStyles.densed,
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
                    <Text style={[styles.description,  { color: invalid ? theme.accentNegative : theme.foregroundSecondary }]} allowFontScaling={false}>
                        {description}
                    </Text>
                </View>
            )}
        </View>
    );
};