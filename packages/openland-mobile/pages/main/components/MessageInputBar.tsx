import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';

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
        borderColor: '#E6E6E7',
        borderWidth: 0.5,
        marginBottom: 8
    } as ViewStyle
});

const iconAttach = require('assets/ic-attachment.png');
const icon = require('assets/ic-send.png');

export interface MessageInputBarProps {
    onAttachPress?: () => void;
    onSubmitPress: () => void;
    onChangeText: (value: string) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    enabled?: boolean;
    attachesEnabled?: boolean;
    text: string;
}

export class MessageInputBar extends React.PureComponent<MessageInputBarProps> {
    render() {
        let hasText = this.props.text.trim().length > 0;
        return (
            <ZKeyboardAwareBar>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    {this.props.attachesEnabled !== false && (
                        <TouchableOpacity onPress={this.props.onAttachPress}>
                            <View width={50} height={50} alignItems="center" justifyContent="center">
                                <Image source={iconAttach} style={{ width: 24, height: 24 }} />
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
                        value={this.props.text}
                        style={styles.textInput}
                        editable={this.props.enabled !== false}
                        multiline={true}
                    />
                    <TouchableOpacity disabled={!hasText} onPress={this.props.onSubmitPress}>
                        <View alignItems="center" justifyContent="center" width={50} height={50}>
                            <Image source={icon} style={{ width: 26, height: 26, tintColor: hasText && this.props.enabled !== false ? AppStyles.primaryColor : '#C8C7CC' }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </ZKeyboardAwareBar>
        );
    }
}