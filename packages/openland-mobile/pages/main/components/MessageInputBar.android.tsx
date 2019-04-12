import * as React from 'react';
import { View, TouchableOpacity, Image, TextInput, ViewStyle, StyleSheet, NativeSyntheticEvent, TextInputSelectionChangeEventData, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { androidMessageInputListOverlap } from './ConversationView';
import { ASView } from 'react-native-async-view/ASView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ConversationTheme } from '../themes/ConversationThemeResolver';
import { SDevice } from 'react-native-s/SDevice';

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
    placeholder: string;

    topContent?: any;
    showLoader?: boolean;
}

export const MessageInputBar = React.forwardRef((props: MessageInputBarProps, ref: any) => {
    let hasText = props.text.trim().length > 0;
    let resolved = Image.resolveAssetSource(inputShadow);

    return (
        <View marginBottom={SDevice.safeArea.bottom}>
            <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                {!props.topContent && (
                    <>
                        <LinearGradient position="absolute" left={0} top={0} right={0} height={androidMessageInputListOverlap} colors={['#fff', '#fff', 'rgba(255,255,255,0)', 'rgba(255,255,255,0)']} start={{ x: 0.5, y: 1 }} end={{ x: 0.5, y: 0 }} />
                        <View position="absolute" left={0} top={androidMessageInputListOverlap} bottom={0} right={0} backgroundColor="#fff" />
                    </>
                )}

                {props.topContent && (
                    <React.Suspense fallback={null}>
                        <View position="absolute" left={0} top={0} bottom={0} right={0} backgroundColor="#fff" />
                        <View style={{ backgroundColor: '#ffffff', position: 'absolute', bottom: '100%', left: 0, right: 0, marginBottom: -7 }}>
                            {props.topContent}
                        </View>
                    </React.Suspense>
                )}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.attachesEnabled !== false && (
                        <TouchableOpacity onPress={props.onAttachPress} style={{ alignSelf: "flex-end" }}>
                            <View
                                marginTop={1}
                                marginLeft={12}
                                marginBottom={14}
                                width={30}
                                height={30}
                                borderRadius={15}
                                backgroundColor={props.theme.mainColor}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Image source={iconAttach} style={{ width: 17, height: 17, tintColor: '#fff' }} />
                            </View>
                        </TouchableOpacity>
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
                            ref={ref}
                            style={styles.textInput}
                            placeholder={props.placeholder}
                            placeholderTextColor="#aaaaaa"
                            onChangeText={props.onChangeText}
                            onSelectionChange={props.onSelectionChange}
                            onFocus={props.onFocus}
                            onBlur={props.onBlur}
                            value={props.text}
                            editable={props.enabled !== false}
                            multiline={true}
                        />

                        {!props.showLoader && (
                            <TouchableOpacity
                                disabled={!hasText}
                                onPress={props.onSubmitPress}
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
                                    backgroundColor={hasText && props.enabled !== false ? props.theme.mainColor : '#ebebeb'}
                                    marginHorizontal={6}
                                >
                                    <Image
                                        source={icon}
                                        style={{
                                            width: 17,
                                            height: 17,
                                            marginRight: -4,
                                            tintColor: hasText && props.enabled !== false ? '#fff' : '#b0b0b0'
                                        }}
                                    />
                                </View>
                            </TouchableOpacity>
                        )}

                        {props.showLoader && (
                            <View width={30} height={30} marginRight={6} alignItems="center" justifyContent="center">
                                <ActivityIndicator height="100%" color="#000000" />
                            </View>
                        )}
                    </View>

                </View>
            </View>
        </View>
    );
});