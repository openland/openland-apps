import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, NativeSyntheticEvent, TextInputSelectionChangeEventData, Platform } from 'react-native';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { RadiusStyles, HighlightAlpha } from 'openland-mobile/styles/AppStyles';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { hexToRgba } from 'openland-y-utils/hexToRgba';

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

    stickerKeyboardShown?: boolean;
    onStickerKeyboardButtonPress?: () => void;
}

const iconAttach = require('assets/ic-attach-24.png');
const icon = require('assets/ic-send-24.png');
const iconFilled = require('assets/ic-send-filled-24.png');
const iconKeyboard = require('assets/ic-keyboard-24.png');
const iconSticker = require('assets/ic-sticker-24.png');

export const MessageInputInner = React.forwardRef((props: MessageInputBarProps & { theme: ThemeGlobal }, ref: React.RefObject<TextInput>) => {
    const { theme, stickerKeyboardShown, onStickerKeyboardButtonPress } = props;
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
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: Platform.OS === 'android' ? theme.backgroundPrimary : undefined, position: 'relative' }}>
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
                        backgroundColor: theme.backgroundTertiaryTrans,
                        borderRadius: RadiusStyles.Large,
                        marginVertical: 8,
                        overflow: 'hidden',
                    }}
                >
                    <TextInput
                        ref={ref}
                        selectionColor={theme.accentPrimary}
                        style={{
                            paddingTop: 7,
                            paddingBottom: 7,
                            paddingLeft: 12,
                            paddingRight: 12,
                            color: theme.foregroundPrimary,
                            minHeight: 21,
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
                    selectionColor={hexToRgba(theme.accentPrimary, HighlightAlpha)}
                    style={{
                        color: theme.foregroundPrimary,
                        maxHeight: 100,
                        fontSize: 17,
                        backgroundColor: theme.backgroundTertiaryTrans,
                        borderRadius: RadiusStyles.Large,
                        paddingHorizontal: 12,
                        paddingTop: 3,
                        paddingBottom: 5,
                        marginVertical: 8,
                    }}
                    {...inputProps}
                />
            )}
            {props.text.length === 0 && onStickerKeyboardButtonPress && (
                <View style={{ position: 'absolute', right: 56 }} width={40} height={52} alignItems="center" justifyContent="center">
                    <TouchableOpacity onPress={onStickerKeyboardButtonPress} activeOpacity={HighlightAlpha}>
                        <View width={40} height={44} alignItems="center" justifyContent="center">
                            <Image source={stickerKeyboardShown ? iconKeyboard : iconSticker} style={{ width: 24, height: 24, tintColor: theme.foregroundSecondary }} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            {!props.showLoader && (
                <View width={56} height={52} alignItems="center" justifyContent="center">
                    <TouchableOpacity disabled={!props.canSubmit} onPress={props.onSubmitPress}>
                        <View width={44} height={44} alignItems="center" justifyContent="center">
                            <Image source={props.canSubmit ? iconFilled : icon} style={{ width: 24, height: 24, tintColor: props.canSubmit && props.enabled !== false ? theme.accentPrimary : theme.foregroundSecondary }} />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
            {props.showLoader && (
                <View width={56} height={52} alignItems="center" justifyContent="center">
                    <LoaderSpinner />
                </View>
            )}
        </View>
    );
});