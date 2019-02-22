import * as React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';

export interface ZTextInputBasicProps extends TextInputProps {
    invalid?: boolean;
    enabled?: boolean;

    title?: string;
    hideBorder?: boolean;
    prefix?: string;
    fullWidthBorder?: boolean;

    onChangeText?: (src: string) => void;
}

export const ZTextInputBasic = (props: ZTextInputBasicProps) => {
    let { title, prefix, hideBorder, invalid, enabled, fullWidthBorder, ...others } = props;
    return (
        <View paddingLeft={16} flexDirection="column" alignItems="stretch" flexGrow={1}>
            <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                {title && (
                    <Text
                        style={{
                            width: 111,
                            color: '#a0a0a0',
                            fontSize: 16,
                            lineHeight: 22,
                            alignSelf: 'center',
                        }}
                    >
                        {title}
                    </Text>
                )}
                {prefix && (
                    <Text
                        style={{
                            color: props.value ? '#000000' : '#a0a0a0',
                            fontSize: 16,
                            lineHeight: 22,
                            alignSelf: 'center',
                        }}
                    >
                        {prefix}
                    </Text>
                )}
                <TextInput
                    {...others}
                    placeholderTextColor="#a0a0a0"
                    style={{
                        flex: 1,
                        minHeight: hideBorder ? 44 : 43,
                        fontSize: 16,
                        padding: 0,
                        margin: 0,
                        borderWidth: 0,
                        marginRight: 17,
                    }}
                />
            </View>
    
            {!hideBorder && (
                <View
                    style={{
                        height: 1,
                        marginLeft: fullWidthBorder ? 0 : title ? 111 : 0,
                        backgroundColor: (invalid || !enabled) ? '#f6564e' : '#eff0f2'
                    }}
                />
            )}
        </View>
    );
}