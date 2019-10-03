import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { SRouter } from 'react-native-s/SRouter';
import { withRouter } from 'react-native-s/withRouter';

const styles = StyleSheet.create({
    container: {
        borderRadius: RadiusStyles.Medium,
        paddingLeft: 16,
        paddingRight: 48,
        paddingTop: 18,
        height: 56,
        justifyContent: 'center',
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
        ...TextStyles.Densed
    } as TextStyle,
    labelFocused: {
        ...TextStyles.Caption
    } as TextStyle,
    iconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    descriptionContainer: {
        paddingHorizontal: 16,
        paddingTop: 8
    } as ViewStyle,
    description: {
        ...TextStyles.Caption
    } as TextStyle,
});

export interface ZPickFieldProps {
    label: string;
    value?: string;
    noWrapper?: boolean;
    path?: string;
    pathParams?: any;
    onPress?: () => void;
    description?: string;
    arrow?: 'right' | 'bottom';
    disabled?: boolean;
}

const arrowIcon = {
    right: require('assets/ic-chevron-16.png'),
    bottom: require('assets/ic-dropdown-16.png'),
};

const ZPickFieldComponent = (props: ZPickFieldProps & { router: SRouter }) => {
    const { label, value, noWrapper, description, arrow = 'right', disabled } = props;
    const theme = React.useContext(ThemeContext);
    const hasValue = !!(value && value.length > 0);

    const handlePress = React.useCallback(async () => {
        if (props.onPress) {
            props.onPress();
        }
        if (props.path) {
            props.router.push(props.path, props.pathParams);
        }
    }, [props.onPress, props.path, props.pathParams]);

    return (
        <View marginHorizontal={noWrapper ? 0 : 16} marginBottom={noWrapper ? 0 : 16}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.6} disabled={disabled}>
                <View style={styles.container} backgroundColor={theme.backgroundTertiaryTrans}>
                    <View style={[styles.labelContainer, (hasValue) && styles.labelContainerFocused]}>
                        <Text style={[styles.label, (hasValue) && styles.labelFocused, { color: theme.foregroundTertiary }]} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                            {label}
                        </Text>
                    </View>

                    {hasValue && (
                        <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                                ...TextStyles.Densed,
                                color: theme.foregroundPrimary,
                            }}
                        >
                            {value}
                        </Text>
                    )}

                    {!disabled && (
                        <View style={styles.iconContainer}>
                            <Image source={arrowIcon[arrow]} style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary }} />
                        </View>
                    )}
                </View>
            </TouchableOpacity>

            {!!description && (
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.description, { color: theme.foregroundSecondary }]} allowFontScaling={false}>
                        {description}
                    </Text>
                </View>
            )}
        </View>
    );
};

export const ZPickField = withRouter<ZPickFieldProps>(ZPickFieldComponent);