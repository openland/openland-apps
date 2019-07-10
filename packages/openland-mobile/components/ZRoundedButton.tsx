import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import { Alert } from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

type ZRoundedButtonStyle = 'primary' | 'secondary' | 'danger';
type ZRoundedButtonSize = 'small' | 'medium' | 'large';

const stylesSmall = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 14,
        height: 28,
        paddingHorizontal: 16,
    } as ViewStyle,
    title: {
        textAlignVertical: 'center',
        fontWeight: TextStyles.weight.medium,
        fontSize: 14,
    } as TextStyle,
});

const stylesMedium = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        height: 35,
        paddingHorizontal: 16,
    } as ViewStyle,
    title: {
        textAlignVertical: 'center',
        fontWeight: TextStyles.weight.medium,
        fontSize: 16,
    } as TextStyle
});

const stylesLarge = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 24,
    } as ViewStyle,
    title: {
        textAlignVertical: 'center',
        fontWeight: TextStyles.weight.medium,
        fontSize: 15,
        height: 56,
        lineHeight: 56,
        letterSpacing: 0.2
    } as TextStyle
});

const resolveStylesBySize = {
    small: stylesSmall,
    medium: stylesMedium,
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
}

const ZRoundedButtonComponent = React.memo<ZRoundedButtonProps & { router: SRouter }>((props) => {
    const [ actionInProgress, setActionInProgress ] = React.useState(false);
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

    const size: ZRoundedButtonSize = props.size || 'small';
    const style: ZRoundedButtonStyle = props.style || 'primary';
    const styles = resolveStylesBySize[size];

    return (
        <TouchableOpacity onPress={(!actionInProgress && props.enabled !== false) ? handlePress : undefined} activeOpacity={0.6}>
            <View
                style={[
                    styles.container,
                    {
                        backgroundColor: style === 'primary' ? theme.accentPrimary : (style === 'danger' ? theme.accentNegative : theme.backgroundTertiary)
                    },
                ]}
            >
                <View >
                    <Text
                        style={[
                            styles.title,
                            {
                                color: (style === 'primary' || style === 'danger') ? theme.contrastSpecial : theme.foregroundSecondary
                            },
                            {
                                ...actionInProgress ? { color: 'transparent' } : {}
                            },
                            {
                                opacity: props.enabled === false ? 0.7 : undefined
                            }
                        ]}
                        allowFontScaling={false}
                    >
                        {props.title}
                    </Text>

                    {actionInProgress && (
                        <View width="100%" height="100%" justifyContent="center" position="absolute" >
                            <ActivityIndicator height="100%" color={(style === 'primary' || style === 'danger') ? theme.contrastSpecial : theme.foregroundSecondary} />
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
});

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);