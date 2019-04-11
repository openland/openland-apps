import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, NativeSyntheticEvent, TextInputSelectionChangeEventData, Text, ActivityIndicator } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { ConversationTheme } from '../themes/ConversationThemeResolver';
import { SDevice } from 'react-native-s/SDevice';
import { ZBlurredView } from 'openland-mobile/components/ZBlurredView';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

let styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#f3f5f7',
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
    } as ViewStyle
});

const iconAttach = require('assets/ic-add-24.png');
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
    theme: ConversationTheme;
    placeholder: string;

    topContent?: any;
    showLoader?: boolean;
}

export const MessageInputBar = XMemo<MessageInputBarProps>(props => {
    let theme = React.useContext(ThemeContext);
    let hasText = props.text.trim().length > 0;

    return (
        <ZKeyboardAwareBar>
            {props.topContent && (
                <React.Suspense fallback={null}>
                    <ZBlurredView intensity="normal" style={{ position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: SDevice.safeArea.bottom }}>
                        {props.topContent}
                    </ZBlurredView>
                </React.Suspense>
            )}

            <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.attachesEnabled !== false && (
                        <TouchableOpacity onPress={props.onAttachPress}>
                            <View width={48} height={50} alignItems="center" justifyContent="center">
                                <View width={30} height={30} borderRadius={24} backgroundColor={props.theme.mainColor} alignItems="center" justifyContent="center">
                                    <Image source={iconAttach} style={{ width: 24, height: 24, tintColor: '#fff' }} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    {props.attachesEnabled === false && (
                        <View width={15} />
                    )}
                    <TextInput
                        flexGrow={1}
                        flexBasis={0}
                        placeholder={props.placeholder}
                        placeholderTextColor="#8a8a8f"
                        onChangeText={props.onChangeText}
                        onSelectionChange={props.onSelectionChange}
                        onFocus={props.onFocus}
                        onBlur={props.onBlur}
                        value={props.text}
                        style={styles.textInput}
                        editable={props.enabled !== false}
                        multiline={true}
                        allowFontScaling={false}
                        keyboardAppearance={theme.keyboardAppearance}
                    />
                    {!props.showLoader && (
                        <TouchableOpacity disabled={!hasText} onPress={props.onSubmitPress}>
                            <View alignItems="center" justifyContent="center" width={52} height={50} paddingLeft={2}>
                                <Image source={icon} style={{ width: 26, height: 26, tintColor: hasText && props.enabled !== false ? props.theme.mainColor : '#C8C7CC' }} />
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