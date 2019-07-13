import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { RadiusStyles, TypeStyles } from 'openland-mobile/styles/AppStyles';
import { SRouter } from 'react-native-s/SRouter';
import { withRouter } from 'react-native-s/withRouter';

const styles = StyleSheet.create({
    container: {
        borderRadius: RadiusStyles.medium,
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
        ...TypeStyles.densed
    } as TextStyle,
    labelFocused: {
        ...TypeStyles.caption
    } as TextStyle,
    iconContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle
});

export interface ZPickFieldProps {
    label: string;
    value?: string;
    noWrapper?: boolean;
    path?: string;
    onPress?: () => void;
}

const ZPickFieldComponent = (props: ZPickFieldProps & { router: SRouter }) => {
    const { label, value, noWrapper } = props;
    const theme = React.useContext(ThemeContext);
    const hasValue = !!(value && value.length > 0);

    const handlePress = React.useCallback(async () => {
        if (props.onPress) {
            props.onPress();
        }
        if (props.path) {
            props.router.push(props.path);
        }
    }, [props.onPress, props.path]);

    return (
        <View marginHorizontal={noWrapper ? 0 : 16} marginBottom={noWrapper ? 0 : 16}>
            <TouchableOpacity onPress={handlePress} activeOpacity={0.6}>
                <View style={styles.container} backgroundColor={theme.backgroundTertiary}>
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
                                ...TypeStyles.densed,
                                color: theme.foregroundPrimary,
                            }}
                        >
                            {value}
                        </Text>
                    )}

                    <View style={styles.iconContainer}>
                        <Image source={require('assets/ic-right-16.png')} style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary }} />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export const ZPickField = withRouter<ZPickFieldProps>(ZPickFieldComponent);