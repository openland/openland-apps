import * as React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';

export interface ZTextInputBasicProps extends TextInputProps {
    invalid?: boolean;
    enabled?: boolean;

    title?: string;
    hideBorder?: boolean;
    prefix?: string;

    onChangeText?: (src: string) => void;
}

export const ZTextInputBasic = (props: ZTextInputBasicProps) => {
    return (
        <View paddingLeft={16} paddingRight={16} flexDirection="column" alignItems="stretch" flexGrow={1}>
            <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                {props.prefix && (
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 16,
                            lineHeight: 22,
                            alignSelf: 'center',
                        }}
                    >
                        {props.prefix}
                    </Text>
                )}
                <TextInput
                    placeholder={props.title || props.placeholder}
                    autoFocus={props.autoFocus}
                    multiline={props.multiline}
                    value={props.value}
                    onChangeText={props.onChangeText}
                    placeholderTextColor="#a0a0a0"
                    style={{
                        flex: 1,
                        minHeight: props.hideBorder ? 50 : 49,
                        fontSize: 16,
                        padding: 0,
                        margin: 0,
                        borderWidth: 0,
                        marginRight: 17,
                    }}
                />
            </View>

            {!props.hideBorder && (
                <View
                    style={{
                        height: 1,
                        marginLeft: 0,
                        backgroundColor: (props.invalid || !props.enabled) ? '#f6564e' : '#eff0f2'
                    }}
                />
            )}
        </View>
    );
}