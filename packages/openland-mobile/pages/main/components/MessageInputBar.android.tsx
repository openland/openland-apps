import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';

let styles = StyleSheet.create({
    textInputContainer: {
        borderColor: '#ebebeb',
        borderWidth: 1,
        marginTop: 6,
        marginBottom: 6,
        backgroundColor: '#fff',
        borderRadius: 42,
        elevation: 1,
        alignItems: 'center',
        marginLeft: 12
    },
    textInput: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,

        paddingBottom: 6,
        maxHeight: 110,
        fontSize: 16,
    } as ViewStyle
});

const iconAttach = require('assets/ic-attach-input.png');
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
                <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        {this.props.attachesEnabled === false && (
                            <View width={15} />
                        )}

                        <View
                            style={styles.textInputContainer}
                            flexGrow={1}
                            flexBasis={0}
                            flexDirection="row"

                        >
                            <View
                                zIndex={1}
                                flexGrow={1}
                            >
                                <TextInput
                                    flexGrow={1}
                                    style={styles.textInput}
                                    placeholder="Message"
                                    placeholderTextColor="#aaaaaa"
                                    onChangeText={this.props.onChangeText}
                                    value={this.props.text}
                                    editable={this.props.enabled !== false}
                                    multiline={true}
                                    zIndex={1}
                                />
                            </View>

                            {this.props.attachesEnabled !== false && !hasText && (
                                <TouchableOpacity onPress={this.props.onAttachPress} >
                                    <Image source={iconAttach} marginHorizontal={16} />
                                </TouchableOpacity>

                            )}

                        </View>

                        <TouchableOpacity disabled={!hasText} onPress={this.props.onSubmitPress}>
                            <View
                                alignItems="center"
                                justifyContent="center"
                                width={30}
                                height={30}
                                borderRadius={30}
                                backgroundColor={hasText && this.props.enabled !== false ? '#0084fe' : '#ebebeb'}
                                marginLeft={10}
                                marginRight={12}
                            >
                                <Image
                                    source={icon}
                                    style={{
                                        width: 17,
                                        height: 17,
                                        marginRight: -4,
                                        tintColor: hasText && this.props.enabled !== false ? '#fff' : '#b0b0b0'
                                    }}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ZKeyboardAwareBar>
        );
    }
}