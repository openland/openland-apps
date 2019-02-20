import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, PixelRatio, ScrollView, NativeSyntheticEvent, TextInputSelectionChangeEventData } from 'react-native';
import { AppStyles } from '../../../styles/AppStyles';
import { ZKeyboardAwareBar } from '../../../components/layout/ZKeyboardAwareBar';
import LinearGradient from 'react-native-linear-gradient';
import ImageViewCapInsets from 'react-native-image-capinsets';
import { androidMessageInputListOverlap } from './ConversationView';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ConversationTheme } from '../themes/ConversationThemeResolver';
import { SDevice } from 'react-native-s/SDevice';

let styles = StyleSheet.create({
    textInputContainer: {

        // borderColor: '#ebebeb',
        // borderWidth: 1,
        // backgroundColor: '#fff',
        // borderRadius: 21,
        // elevation: 1,

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
const inputShadow = require('assets/input.png');

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
        let resolved = Image.resolveAssetSource(inputShadow);

        return (
            <View marginBottom={SDevice.safeArea.bottom}>
                <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    {!this.props.topContent && (
                        <>
                            <LinearGradient position="absolute" left={0} top={0} right={0} height={androidMessageInputListOverlap} colors={['#fff', '#fff', 'transparent', 'transparent']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} />
                            <View position="absolute" left={0} top={androidMessageInputListOverlap} bottom={0} right={0} backgroundColor="#fff" />
                        </>
                    )}

                    {this.props.topContent && (
                        <>
                            <View position="absolute" left={0} top={0} bottom={0} right={0} backgroundColor="#fff" />
                            <View style={{ backgroundColor: '#ffffff', position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: -7 }}>
                                <View height={1} backgroundColor="rgba(0, 0, 0, 0.05)" />
                                <ScrollView keyboardShouldPersistTaps={true} maxHeight={160}>
                                    {this.props.topContent}
                                </ScrollView>
                                <View height={1} backgroundColor="rgba(0, 0, 0, 0.05)" />
                            </View>
                        </>
                    )}

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        {this.props.attachesEnabled !== false && (
                            <TouchableOpacity onPress={this.props.onAttachPress} style={{ alignSelf: "flex-end" }}>
                                <View

                                    marginTop={1}
                                    marginLeft={12}
                                    marginBottom={14}
                                    width={30}
                                    height={30}
                                    borderRadius={15}
                                    backgroundColor={this.props.theme.mainColor}
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
                            <ASView
                                style={{
                                    left: -4,
                                    top: -6,
                                    right: -4,
                                    bottom: -6,
                                    position: 'absolute',
                                }}
                            >
                                <ASFlex
                                    flexGrow={1}
                                    backgroundPatch={{ source: resolved.uri, scale: resolved.scale, top: 21, left: 21, right: 21, bottom: 21 }}
                                />

                            </ASView>
                            <TextInput
                                style={styles.textInput
                                }
                                placeholder="Message"
                                placeholderTextColor="#aaaaaa"
                                onChangeText={this.props.onChangeText}
                                onSelectionChange={this.props.onSelectionChange}
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
                                    backgroundColor={hasText && this.props.enabled !== false ? this.props.theme.mainColor : '#ebebeb'}
                                    marginHorizontal={6}
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
            </View>
        );
    }
}