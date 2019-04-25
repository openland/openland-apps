import * as React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import { withRouter } from 'react-native-s/withRouter';
import { SRouter } from 'react-native-s/SRouter';
import { Alert } from './AlertBlanket';
import { formatError } from 'openland-y-forms/errorHandling';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

type ZRoundedButtonStyle = 'default' | 'flat' | 'danger' | 'flat-danger';
type ZRoundedButtonSize = 'default' | 'big' | 'large';

const stylesDefault = StyleSheet.create({
    container: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 13,
        height: 26,
        paddingHorizontal: 12,
    } as ViewStyle,
    title: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: TextStyles.weight.medium,
        fontSize: 14,
    } as TextStyle,
});

const stylesBig = StyleSheet.create({
    container: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        height: 35,
        paddingHorizontal: 19,
    } as ViewStyle,
    title: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: TextStyles.weight.medium,
        fontSize: 16,
    } as TextStyle
});

const stylesLarge = StyleSheet.create({
    container: {
        backgroundColor: '#0084fe',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
        height: 56,
        paddingHorizontal: 20,
    } as ViewStyle,
    title: {
        color: '#fff',
        textAlignVertical: 'center',
        fontWeight: TextStyles.weight.medium,
        fontSize: 15,
        height: 56,
        lineHeight: 56,
        letterSpacing: 0.2
    } as TextStyle
});

const resolveStylesBySize = {
    default: stylesDefault,
    big: stylesBig,
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
    style?: ZRoundedButtonStyle
    uppercase?: boolean;
}

const ZRoundedButtonComponent = React.memo<ZRoundedButtonProps & { router: SRouter }>((props) => {
    let [actionInProgress, setActionInProgress] = React.useState(false);
    let theme = React.useContext(ThemeContext);
    let handlePress = React.useCallback(async () => {
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
    let size = props.size || 'default';
    let styles = resolveStylesBySize[size];

    return (
        <View borderRadius={size === 'default' ? 13 : 18}>
            <TouchableOpacity onPress={!actionInProgress ? handlePress : undefined} activeOpacity={0.6}>
                <View
                    style={[
                        styles.container,
                        { backgroundColor: theme.roundButtonBackground },
                        {
                            ...props.style === 'flat' ? { backgroundColor: 'transparent' } :
                                props.style === 'danger' ? { backgroundColor: '#ff3b30' } :
                                    props.style === 'flat-danger' ? { backgroundColor: 'transparent' } : {}
                        }
                    ]}
                >
                    <View >
                        <Text
                            style={[
                                styles.title,
                                { color: theme.roundButtonText },
                                {
                                    ...props.style === 'flat' ? { color: theme.accentColor } :
                                        props.style === 'danger' ? { color: theme.backgroundColor } :
                                            props.style === 'flat-danger' ? { color: '#ff3b30' } : {}
                                },
                                {
                                    ...actionInProgress ? { color: 'transparent' } : {}
                                }
                            ]}
                            allowFontScaling={false}
                        >
                            {props.uppercase !== false ? props.title.toUpperCase() : props.title}
                        </Text>

                        {actionInProgress && (
                            <View width="100%" height="100%" justifyContent="center" position="absolute" >
                                <ActivityIndicator height="100%" color={props.style === 'flat' ? theme.accentColor : theme.backgroundColor} />
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </View >
    );
})

export const ZRoundedButton = withRouter<ZRoundedButtonProps>(ZRoundedButtonComponent);