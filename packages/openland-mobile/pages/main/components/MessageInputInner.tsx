import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, NativeSyntheticEvent, TextInputSelectionChangeEventData, ActivityIndicator, Platform } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';

export interface MessageInputBarProps {
    onAttachPress?: () => void;
    onSubmitPress: () => void;
    onChangeText: (value: string) => void;
    onSelectionChange?: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    enabled?: boolean;
    attachesEnabled?: boolean;
    text: string;
    placeholder: string;
    canSubmit: boolean;

    suggestions?: any;
    topView?: any;
    showLoader?: boolean;
}

const iconAttach = require('assets/ic-attach-24.png');
const icon = require('assets/ic-send-24.png');

export const MessageInputInner = React.forwardRef((props: MessageInputBarProps & { theme: ThemeGlobal }, ref: React.RefObject<TextInput>) => {
    const { theme } = props;
    const inputProps = {
        flexGrow: 1,
        flexBasis: 0,
        placeholder: props.placeholder,
        placeholderTextColor: theme.foregroundTertiary,
        onChangeText: props.onChangeText,
        onSelectionChange: props.onSelectionChange,
        onFocus: props.onFocus,
        onBlur: props.onBlur,
        value: props.text,
        editable: props.enabled !== false,
        multiline: true,
        allowFontScaling: false,
        keyboardAppearance: theme.keyboardAppearance,
    };

    return (
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: Platform.OS === 'android' ? theme.backgroundPrimary : undefined }}>
            {props.attachesEnabled !== false && (
                <View width={56} height={52} alignItems="center" justifyContent="center">
                    <TouchableOpacity onPress={props.onAttachPress}>
                        <View width={44} height={44} alignItems="center" justifyContent="center">
                            <Image source={iconAttach} style={{ width: 24, height: 24, tintColor: theme.foregroundSecondary }} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            {props.attachesEnabled === false && (
                <View width={16} />
            )}
            {Platform.OS === 'ios' && (
                <View
                    flexGrow={1}
                    flexBasis={0}
                    style={{
                        backgroundColor: theme.backgroundInverted,
                        borderRadius: RadiusStyles.large,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        marginVertical: 8,
                    }}
                >
                    <TextInput
                        ref={ref}
                        style={{
                            paddingTop: 0,
                            color: theme.foregroundPrimary,
                            minHeight: 22,
                            maxHeight: 100,
                            fontSize: 17,
                        }}
                        {...inputProps}
                    />
                </View>
            )}
            {Platform.OS === 'android' && (
                <TextInput
                    ref={ref}
                    style={{
                        color: theme.foregroundPrimary,
                        maxHeight: 100,
                        fontSize: 17,
                        backgroundColor: theme.backgroundInverted,
                        borderRadius: RadiusStyles.large,
                        paddingHorizontal: 12,
                        paddingTop: 3,
                        paddingBottom: 5,
                        marginVertical: 8,
                    }}
                    {...inputProps}
                />
            )}
            {!props.showLoader && (
                <View width={52} height={52} alignItems="center" justifyContent="center">
                    <TouchableOpacity disabled={!props.canSubmit} onPress={props.onSubmitPress}>
                        <View width={44} height={44} alignItems="center" justifyContent="center">
                            <Image source={icon} style={{ width: 26, height: 26, tintColor: props.canSubmit && props.enabled !== false ? theme.accentPrimary : theme.foregroundSecondary }} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            {props.showLoader && (
                <View width={52} height={52} alignItems="center" justifyContent="center">
                    <ActivityIndicator height="100%" color={theme.foregroundSecondary} />
                </View>
            )}
        </View>
    );
});