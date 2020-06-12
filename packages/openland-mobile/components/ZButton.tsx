import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform, Animated, TouchableWithoutFeedback, Easing } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import Alert from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from './LoaderSpinner';

type ZButtonStyle = 'primary' | 'secondary' | 'danger' | 'pay';
type ZButtonSize = 'default' | 'large';

const stylesDefault = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        paddingHorizontal: 16,
    } as ViewStyle,
    title: {
        ...TextStyles.Label1,
        textAlignVertical: 'center',
    } as TextStyle
});

const stylesLarge = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        paddingHorizontal: 24,
    } as ViewStyle,
    title: {
        ...TextStyles.Label1,
        textAlignVertical: 'center',
    } as TextStyle
});

const resolveStylesBySize = {
    default: stylesDefault,
    large: stylesLarge,
};

const resolveRadiusBySize = {
    default: RadiusStyles.Large,
    large: RadiusStyles.Medium,
};

export interface ZButtonProps {
    title: string;
    onPress?: () => void;
    action?: () => void;
    actionFinally?: () => void;
    onActionStart?: () => void;
    onActionSuccess?: () => void;
    onActionError?: (e: Error) => void;
    path?: string;
    size?: ZButtonSize;
    style?: ZButtonStyle;
    enabled?: boolean;
    loading?: boolean;
}

const ZButtonComponent = React.memo<ZButtonProps & { router: SRouter }>((props) => {
    const [actionInProgress, setActionInProgress] = React.useState(props.loading || false);

    React.useEffect(() => {
        setActionInProgress(!!props.loading);
    }, [props.loading]);

    const theme = React.useContext(ThemeContext);
    const handlePress = React.useCallback(async () => {
        if (props.onPress) {
            props.onPress();
        }
        if (props.path) {
            props.router.push(props.path);
        }

        if (props.action) {
            setActionInProgress(true);

            try {
                if (props.onActionStart) {
                    await props.onActionStart();
                }
                await props.action();
                if (props.onActionSuccess) {
                    await props.onActionSuccess();
                }
            } catch (e) {
                if (props.onActionError) {
                    await props.onActionError(e);
                } else {
                    Alert.alert(formatError(e));
                }
                setActionInProgress(false);
            }
            if (props.actionFinally) {
                props.actionFinally();
            }
        }
    }, [props.onPress, props.path, props.action, props.onActionSuccess, props.onActionError, props.actionFinally]);

    const size: ZButtonSize = props.size || 'default';
    const style: ZButtonStyle = props.style || 'primary';
    const styles = resolveStylesBySize[size];
    const backgroundColor = style === 'primary' ? theme.accentPrimary : (style === 'danger' ? theme.accentNegative : style === 'pay' ? theme.payBackgroundPrimary : theme.backgroundTertiaryTrans);
    const textColor = style === 'primary' ? theme.foregroundInverted : (style === 'danger' ? theme.foregroundContrast : style === 'pay' ? theme.foregroundContrast : theme.foregroundSecondary);

    const highlightedColors = {
        'primary': theme.accentPrimaryActive,
        'secondary': theme.backgroundTertiaryActive,
        'danger': theme.accentNegativeActive,
    };

    const underlayColor = highlightedColors[style];

    const animation = React.useRef(new Animated.Value(0)).current;
    const animatedBgColor = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundColor, underlayColor || backgroundColor],
    });

    const animatedOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0.6],
    });

    const handlePressIn = () => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 100,
            easing: Easing.inOut(Easing.quad)
        }).start();
    };
    const handlePressOut = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 200,
            easing: Easing.inOut(Easing.quad)
        }).start();
    };

    return (
        <Animated.View
            style={{
                backgroundColor: animatedBgColor,
                opacity: props.enabled === false ? 0.6 : (!underlayColor ? animatedOpacity : undefined),
                borderRadius: resolveRadiusBySize[size],
                overflow: 'hidden'
            }}
        >
            <TouchableWithoutFeedback
                onPress={(!actionInProgress && props.enabled !== false) ? handlePress : undefined}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={actionInProgress || props.enabled === false}
                delayPressIn={0}
            >
                <View style={styles.container}>
                    <Text
                        style={[styles.title, { color: actionInProgress ? 'transparent' : textColor, paddingBottom: Platform.OS === 'android' ? 2 : undefined }]}
                        allowFontScaling={false}
                        numberOfLines={1}
                    >
                        {props.title}
                    </Text>

                    {actionInProgress && (
                        <View width="100%" height="100%" justifyContent="center" alignItems="center" position="absolute">
                            <LoaderSpinner color={textColor} size={size === 'default' ? 'small' : 'medium'} />
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </Animated.View>
    );
});

export const ZButton = withRouter<ZButtonProps>(ZButtonComponent);