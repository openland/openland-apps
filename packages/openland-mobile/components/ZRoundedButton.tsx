import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Platform } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import Alert from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { RadiusStyles, TypeStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LoaderSpinner from './LoaderSpinner';

type ZRoundedButtonStyle = 'primary' | 'secondary' | 'secondary-inverted' | 'danger';
type ZRoundedButtonSize = 'default' | 'large';

const stylesDefault = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RadiusStyles.large,
        height: 36,
        paddingHorizontal: 16,
    } as ViewStyle,
    title: {
        ...TypeStyles.label1,
        textAlignVertical: 'center',
    } as TextStyle
});

const stylesLarge = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: RadiusStyles.medium,
        height: 48,
        paddingHorizontal: 24,
    } as ViewStyle,
    title: {
        ...TypeStyles.label1,
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
    const [ actionInProgress, setActionInProgress ] = React.useState(props.loading || false);
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
    const backgroundColor = style === 'primary' ? theme.accentPrimary : (style === 'danger' ? theme.accentNegative : style === 'secondary-inverted' ? theme.backgroundInverted : theme.backgroundTertiary);
    const textColor = style === 'primary' ? theme.contrastSpecial : (style === 'danger' ? theme.contrastPrimary : theme.foregroundSecondary);

    return (
        <TouchableOpacity onPress={(!actionInProgress && props.enabled !== false) ? handlePress : undefined} disabled={actionInProgress || props.enabled === false} activeOpacity={0.6}>
            <View style={[styles.container, { backgroundColor: backgroundColor, opacity: props.enabled === false ? 0.6 : undefined }]}>
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
            </View>
        </TouchableOpacity>
    );
});

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);