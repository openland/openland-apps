import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, Platform, TouchableHighlight, TouchableOpacity } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import Alert from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from './LoaderSpinner';

type ZRoundedButtonStyle = 'primary' | 'secondary' | 'danger';
type ZRoundedButtonSize = 'default' | 'large';

const stylesDefault = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RadiusStyles.Large,
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
        borderRadius: RadiusStyles.Medium,
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

export interface ZRoundedButtonProps {
    title: string;
    onPress?: () => void;
    action?: () => void;
    actionFinally?: () => void;
    onActionSuccess?: () => void;
    onActionError?: (e: Error) => void;
    path?: string;
    size?: ZRoundedButtonSize;
    style?: ZRoundedButtonStyle;
    enabled?: boolean;
    loading?: boolean;
}

const ZRoundedButtonComponent = React.memo<ZRoundedButtonProps & { router: SRouter }>((props) => {
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

    const size: ZRoundedButtonSize = props.size || 'default';
    const style: ZRoundedButtonStyle = props.style || 'primary';
    const styles = resolveStylesBySize[size];
    const backgroundColor = style === 'primary' ? theme.accentPrimary : (style === 'danger' ? theme.accentNegative : theme.backgroundTertiaryTrans);
    const textColor = style === 'primary' ? theme.foregroundInverted : (style === 'danger' ? theme.foregroundContrast : theme.foregroundSecondary);

    const highlightedColors = {
        'primary': theme.accentPrimaryActive,
        'secondary': theme.backgroundTertiaryActive,
        'danger': theme.accentNegativeActive,
    };

    const underlayColor = highlightedColors[style];
    const TouchableComponent = underlayColor ? TouchableHighlight : TouchableOpacity;

    return (
        <View style={{ borderRadius: RadiusStyles.Medium, overflow: 'hidden' }}>
            <TouchableComponent
                style={[styles.container, { backgroundColor: backgroundColor, opacity: props.enabled === false ? 0.6 : undefined }]}
                onPress={(!actionInProgress && props.enabled !== false) ? handlePress : undefined}
                disabled={actionInProgress || props.enabled === false}
                {...(underlayColor ? { underlayColor } : { activeOpacity: 0.6 })}
            >
                <>
                    <Text
                        style={[styles.title, { color: actionInProgress ? 'transparent' : textColor, paddingBottom: Platform.OS === 'android' ? 2 : undefined }]}
                        allowFontScaling={false}
                    >
                        {props.title}
                    </Text>

                    {actionInProgress && (
                        <View width="100%" height="100%" justifyContent="center" alignItems="center" position="absolute">
                            <LoaderSpinner color={textColor} size={size === 'default' ? 'small' : 'medium'} />
                        </View>
                    )}
                </>
            </TouchableComponent>
        </View>
    );
});

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);