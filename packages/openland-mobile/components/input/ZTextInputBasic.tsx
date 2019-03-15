import * as React from 'react';
import { TextInput, Text, View, TextInputProps } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export interface ZTextInputBasicProps extends TextInputProps {
    invalid?: boolean;
    enabled?: boolean;

    title?: string;
    border?: boolean | 'force-full';
    prefix?: string;

    onChangeText?: (src: string) => void;
}

export const ZTextInputBasic = (props: ZTextInputBasicProps) => {
    let { title, prefix, border, invalid, enabled, ...others } = props;
    let theme = React.useContext(ThemeContext);

    let realBorder = typeof border === 'undefined' ? true : border;

    return (
        <View paddingLeft={16} flexDirection="column">
            <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                {title && (
                    <Text
                        style={{
                            width: 111,
                            color: '#a0a0a0',
                            fontSize: 17,
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
                            fontSize: 17,
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
                    keyboardAppearance={theme.keyboardAppearance}
                    style={{
                        color: theme.textColor,
                        flex: 1,
                        minHeight: realBorder ? 43 : 44,
                        fontSize: 17,
                        padding: 0,
                        margin: 0,
                        borderWidth: 0,
                        marginRight: 17,
                    }}
                />
            </View>
    
            {realBorder && (
                <View
                    style={{
                        height: 1,
                        marginLeft: (realBorder === 'force-full') ? 0 : title ? 111 : 0,
                        backgroundColor: (invalid || !enabled) ? '#f6564e' : theme.separatorColor
                    }}
                />
            )}
        </View>
    );
}