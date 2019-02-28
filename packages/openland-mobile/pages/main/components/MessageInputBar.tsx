import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { ConversationTheme } from '../themes/ConversationThemeResolver';
import { SDevice } from 'react-native-s/SDevice';

let styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#f5f6f7',
        borderRadius: 17.5,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 7,
        paddingBottom: 7,
        minHeight: 34,
        maxHeight: 100,
        fontSize: 16,
        borderColor: '#e6e8eb',
        borderWidth: 0.5,
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

    topContent?: any;
}

export class MessageInputBar extends React.PureComponent<MessageInputBarProps> {
    render() {
        let hasText = this.props.text.trim().length > 0;
        return (
            <ZKeyboardAwareBar>
                {this.props.topContent && (
                    <React.Suspense fallback={null}>
                        <View style={{ backgroundColor: '#ffffff', position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: SDevice.safeArea.bottom }}>
                            {this.props.topContent}
                        </View>
                    </React.Suspense>
                )}

                <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {this.props.attachesEnabled !== false && (
                            <TouchableOpacity onPress={this.props.onAttachPress}>
                                <View width={48} height={50} alignItems="center" justifyContent="center">
                                    <View width={30} height={30} borderRadius={24} backgroundColor={this.props.theme.mainColor} alignItems="center" justifyContent="center">
                                        <Image source={iconAttach} style={{ width: 24, height: 24, tintColor: '#fff' }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        {this.props.attachesEnabled === false && (
                            <View width={15} />
                        )}
                        <TextInput
                            flexGrow={1}
                            flexBasis={0}
                            placeholder="Message"
                            placeholderTextColor="#aaaaaa"
                            onChangeText={this.props.onChangeText}
                            onSelectionChange={this.props.onSelectionChange}
                            onFocus={this.props.onFocus}
                            onBlur={this.props.onBlur}
                            value={this.props.text}
                            style={styles.textInput}
                            editable={this.props.enabled !== false}
                            multiline={true}
                        />
                        <TouchableOpacity disabled={!hasText} onPress={this.props.onSubmitPress}>
                            <View alignItems="center" justifyContent="center" width={50} height={50}>
                                <Image source={icon} style={{ width: 26, height: 26, tintColor: hasText && this.props.enabled !== false ? this.props.theme.mainColor : '#C8C7CC' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ZKeyboardAwareBar>
        );
    }
}