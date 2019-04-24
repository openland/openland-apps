import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, NativeSyntheticEvent, TextInputSelectionChangeEventData, Text, ActivityIndicator } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { ConversationTheme } from '../themes/ConversationThemeResolver';
import { SDevice } from 'react-native-s/SDevice';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const iconAttach = require('assets/ic-attachment-24.png');
const icon = require('assets/ic-send.png');

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

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps, ref: any) => {
    let theme = React.useContext(ThemeContext);

    return (
        <ZKeyboardAwareBar>
            {props.suggestions && (
                <ZBlurredView intensity="normal" style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: SDevice.safeArea.bottom }}>
                    {props.suggestions}
                </ZBlurredView>
            )}

            <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                {props.topView}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.attachesEnabled !== false && (
                        <TouchableOpacity onPress={props.onAttachPress}>
                            <View width={48} height={50} alignItems="center" justifyContent="center">
                                <View width={30} height={30} borderRadius={24} alignItems="center" justifyContent="center">
                                    <Image source={iconAttach} style={{ width: 24, height: 24, tintColor: theme.inputIconsColor }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    {props.attachesEnabled === false && (
                        <View width={15} />
                    )}
                    <TextInput
                        ref={ref}
                        flexGrow={1}
                        flexBasis={0}
                        placeholder={props.placeholder}
                        placeholderTextColor="#8a8a8f"
                        onChangeText={props.onChangeText}
                        onSelectionChange={props.onSelectionChange}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        value={props.text}
                        style={{
                            color: theme.textInputColor,
                            backgroundColor: theme.inputBackground,
                            borderRadius: 17.5,
                            paddingLeft: 12,
                            paddingRight: 12,
                            paddingTop: 7,
                            paddingBottom: 7,
                            minHeight: 34,
                            maxHeight: 100,
                            fontSize: 16,
                            marginTop: 8,
                            marginBottom: 8
                        }}
                        editable={props.enabled !== false}
                        multiline={true}
                        allowFontScaling={false}
                        keyboardAppearance={theme.keyboardAppearance}
                    />
                    {!props.showLoader && (
                        <TouchableOpacity disabled={!props.canSubmit} onPress={props.onSubmitPress}>
                            <View alignItems="center" justifyContent="center" width={52} height={50} paddingLeft={2}>
                                <Image source={icon} style={{ width: 26, height: 26, tintColor: props.canSubmit && props.enabled !== false ? theme.accentColor : theme.inputIconsColor }} />
                            </View>
                        </TouchableOpacity>
                    )}
                    {props.showLoader && (
                        <View width={52} height={50} alignItems="center" justifyContent="center">
                            <ActivityIndicator height="100%" color="#0084fe" />
                        </View>
                    )}
                </View>
            </View>
        </ZKeyboardAwareBar>
    );
});