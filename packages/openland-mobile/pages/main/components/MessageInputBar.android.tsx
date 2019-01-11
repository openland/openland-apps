import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, PixelRatio } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewCapInsets from 'react-native-image-capinsets';
import { androidMessageInputListOverlap } from './ConversationView';

let styles = StyleSheet.create({
    textInputContainer: {

        marginTop: 15,
        marginBottom: 9,

        alignItems: 'center',
        marginHorizontal: 12,
        flexGrow: 1,
        flexBasis: 0,
        flexDirection: 'row'

    },
    textInput: {
        flexGrow: 1,
        paddingLeft: 16,
        paddingRight: 40,
        paddingTop: 6,

        paddingBottom: 6,
        maxHeight: 110,
        fontSize: 16,
    } as ViewStyle
});

const iconAttach = require('assets/ic-add.png');
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

                    <LinearGradient position="absolute" left={0} top={0} right={0} height={androidMessageInputListOverlap} colors={['#fff', '#fff', 'transparent', 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} />
                    <View position="absolute" left={0} top={androidMessageInputListOverlap} bottom={0} right={0} backgroundColor="#fff" />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        {this.props.attachesEnabled !== false && (
                            <TouchableOpacity onPress={this.props.onAttachPress} style={{ alignSelf: "flex-end" }}>
                                <View

                                    marginTop={1}
                                    marginLeft={12}
                                    marginBottom={15}
                                    width={30}
                                    height={30}
                                    borderRadius={15}
                                    backgroundColor="#0084fe"
                                    alignItems="center"
                                    justifyContent="center"
                                >
                                    <Image source={iconAttach} style={{ width: 17, height: 17, tintColor: '#fff' }} />
                                </View>
                            </TouchableOpacity>
                        )}
                        {this.props.attachesEnabled === false && (
                            <View width={15} />
                        )}

                        <View style={styles.textInputContainer} >
                            <ImageViewCapInsets
                                source={require('assets/input.png')}
                                capInsets={{
                                    left: PixelRatio.getPixelSizeForLayoutSize(14),
                                    top: PixelRatio.getPixelSizeForLayoutSize(14),
                                    right: PixelRatio.getPixelSizeForLayoutSize(14),
                                    bottom: PixelRatio.getPixelSizeForLayoutSize(14)

                                }}
                                style={{
                                    left: -PixelRatio.getPixelSizeForLayoutSize(2),
                                    top: -PixelRatio.getPixelSizeForLayoutSize(3)
                                    ,
                                    right: -PixelRatio.getPixelSizeForLayoutSize(2),
                                    bottom: -PixelRatio.getPixelSizeForLayoutSize(3),
                                    // height: '100%',
                                    position: 'absolute',

                                }}
                            />
                            <TextInput
                                style={styles.textInput
                                }
                                placeholder="Message"
                                placeholderTextColor="#aaaaaa"
                                onChangeText={this.props.onChangeText}
                                value={this.props.text}
                                editable={this.props.enabled !== false}
                                multiline={true}
                            />
                            <TouchableOpacity
                                disabled={!hasText}
                                onPress={this.props.onSubmitPress}
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    bottom: 5,
                                    zIndex: 2
                                }}
                            >
                                <View
                                    alignItems="center"
                                    justifyContent="center"
                                    width={30}
                                    height={30}
                                    borderRadius={30}
                                    backgroundColor={hasText && this.props.enabled !== false ? '#0084fe' : '#ebebeb'}
                                    marginHorizontal={8}
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
                </View>
            </ZKeyboardAwareBar >
        );
    }
}