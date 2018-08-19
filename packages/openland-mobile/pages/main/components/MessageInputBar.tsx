import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, Text } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import { UploadState } from '../../../files/UploadManager';
import { ZLinearProgress } from '../../../components/ZLinearProgress';

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
    uploadState?: UploadState;
}

export class MessageInputBar extends React.PureComponent<MessageInputBarProps> {
    render() {
        let hasText = this.props.text.trim().length > 0;
        return (
            <ZKeyboardAwareBar>
                <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    {this.props.uploadState && this.props.uploadState.queueSize > 0 && (
                        <View style={{ marginTop: 2, marginLeft: 2, marginRight: 2 }}>
                            <ZLinearProgress progress={this.props.uploadState.progress} />
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                        {this.props.attachesEnabled !== false && (
                            <TouchableOpacity onPress={this.props.onAttachPress}>
                                <View width={48} height={50} alignItems="center" justifyContent="center">
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
                            <View alignItems="center" justifyContent="center" width={48} height={50}>
                                <Image source={icon} style={{ width: 26, height: 26, tintColor: hasText && this.props.enabled !== false ? AppStyles.primaryColor : '#C8C7CC' }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ZKeyboardAwareBar>
        );
    }
}