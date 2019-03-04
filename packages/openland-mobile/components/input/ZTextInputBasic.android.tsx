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
    let { title, prefix, border, invalid, enabled, placeholder, ...others } = props;
    let theme = React.useContext(ThemeContext);

    return (
        <View paddingLeft={16} paddingRight={16} flexDirection="column">
            <View flexDirection="row" alignItems="stretch" flexGrow={1}>
                {prefix && (
                    <Text
                        style={{
                            color: '#000000',
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
                    placeholder={title || placeholder}
                    placeholderTextColor="#a0a0a0"
                    style={{
                        color: theme.textColor,
                        flex: 1,
                        minHeight: props.border ? 49 : 50,
                        fontSize: 16,
                        padding: 0,
                        margin: 0,
                        borderWidth: 0,
                        marginRight: 17,
                    }}
                />
            </View>

            {border && (
                <View
                    style={{
                        height: 1,
                        marginLeft: 0,
                        backgroundColor: (invalid || !enabled) ? '#f6564e' : theme.separatorColor
                    }}
                />
            )}
        </View>
    );
}