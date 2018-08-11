import * as React from 'react';
import { ZKeyboardAwareBar } from '../../../components/ZKeybardAwareBar';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet } from 'react-native';

let styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#fff',
        borderRadius: 16,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 2,
        paddingBottom: 2,
        height: 34,
        fontSize: 14,
        borderColor: '#e6e6e6',
        borderWidth: 1
    } as ViewStyle
});

const iconAttach = require('assets/ic-attachment.png');
const icon = require('assets/ic-send.png');
const iconActive = require('assets/ic-send-active.png');

export interface MessageInputBarProps {
    onAttachPress: () => void;
    onSubmitPress: () => void;
    onChangeText: (value: string) => void;
    text: string;
}

export class MessageInputBar extends React.PureComponent<MessageInputBarProps> {
    render() {
        let hasText = this.props.text.trim().length > 0;
        return (
            <ZKeyboardAwareBar>
                <View flexDirection="row" style={{ paddingBottom: 10, paddingTop: 10 }}>
                    <TouchableOpacity onPress={this.props.onAttachPress}>
                        <View width={52} height={33} alignItems="center" justifyContent="center">
                            <Image source={iconAttach} style={{ width: 22, height: 21 }} />
                        </View>
                    </TouchableOpacity>
                    <TextInput
                        flexGrow={1}
                        flexBasis={0}
                        placeholder="Message"
                        placeholderTextColor="#aaaaaa"
                        onChangeText={this.props.onChangeText}
                        value={this.props.text}
                        onSubmitEditing={this.props.onSubmitPress}
                        style={styles.textInput}
                    />
                    <TouchableOpacity disabled={!hasText} onPress={this.props.onSubmitPress}>
                        <View alignContent="center" justifyContent="center" width={54} height={33} paddingLeft={12}>
                            <Image source={hasText ? iconActive : icon} style={{ width: 24, height: 24 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ZKeyboardAwareBar>
        );
    }
}