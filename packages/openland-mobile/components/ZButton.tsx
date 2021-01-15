import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform, TouchableWithoutFeedback } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import Alert from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from './LoaderSpinner';
import { SAnimatedView, SAnimated, SAnimatedShadowView } from 'react-native-fast-animations';
import UUID from 'uuid/v4';

export type ZButtonStyle = 'primary' | 'secondary' | 'danger' | 'pay';
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
    pathParams?: any;
    size?: ZButtonSize;
    style?: ZButtonStyle;
    enabled?: boolean;
    loading?: boolean;
    onPressIn?: () => void;
    onPressOut?: () => void;
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
            props.router.push(props.path, props.pathParams);
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
    }, [props.onPress, props.path, props.pathParams, props.action, props.onActionSuccess, props.onActionError, props.actionFinally]);

    const size: ZButtonSize = props.size || 'default';
    const style: ZButtonStyle = props.style || 'primary';
    const styles = resolveStylesBySize[size];
    const borderRadius = resolveRadiusBySize[size];

    const backgroundColor = ({
        'primary': theme.accentPrimary,
        'secondary': theme.backgroundTertiaryTrans,
        'danger': theme.accentNegative,
        'pay': theme.payBackgroundPrimary,
    })[style];

    const textColor = ({
        'primary': theme.foregroundInverted,
        'secondary': theme.foregroundSecondary,
        'danger': theme.foregroundContrast,
        'pay': theme.foregroundContrast,
    })[style];

    const underlayColor = ({
        'primary': theme.accentPrimaryActive,
        'secondary': theme.backgroundTertiaryActive,
        'danger': theme.accentNegativeActive,
    })[style];

    const animateView = React.useMemo(() => new SAnimatedShadowView(UUID()), []);
    const inverted = style === 'secondary';

    let staticViewColor = inverted ? backgroundColor : underlayColor;
    let staticViewOpacity = 1;
    let dynamicViewColor = inverted ? underlayColor : backgroundColor;
    let dynamicViewOpacity = inverted ? 0 : 1;

    if (props.enabled === false) {
        staticViewColor = backgroundColor;
        staticViewOpacity = 0.6;
        dynamicViewColor = undefined;
        dynamicViewOpacity = 0;
    }

    const triggerAnimation = (v: 'down' | 'up') => {
        SAnimated.beginTransaction();
        SAnimated.setDuration(v === 'down' ? 0.1 : 0.2);
        SAnimated.setPropertyAnimator((name, property, from, to) => {
            SAnimated.timing(name, { property, from, to, easing: { bezier: [0.17, 0.67, 0.83, 0.67] } }); // ease-in-out
        });

        if (v === 'down') {
            animateView.opacity = inverted ? 1 : (!underlayColor ? 0.6 : 0);
        } else {
            animateView.opacity = inverted ? 0 : 1;
        }

        SAnimated.commitTransaction();
    };
    const handlePressIn = React.useCallback(() => {
        triggerAnimation('down');
        if (props.onPressIn) {
            props.onPressIn();
        }
    }, []);
    const handlePressOut = React.useCallback(() => {
        triggerAnimation('down');
        if (props.onPressOut) {
            props.onPressOut();
        }
    }, []);

    return (
        <View style={{ borderRadius, backgroundColor: staticViewColor, opacity: staticViewOpacity, overflow: 'hidden' }}>
            <SAnimatedView
                name={animateView.name}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: dynamicViewColor, opacity: dynamicViewOpacity, borderRadius }}
            />

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
                        <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                            <LoaderSpinner color={textColor} size={size === 'default' ? 'small' : 'medium'} />
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
});

export const ZButton = withRouter<ZButtonProps>(ZButtonComponent);