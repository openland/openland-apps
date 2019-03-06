import * as React from 'react';
import { View, TextInputProps } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextField } from 'react-native-material-textfield';

export interface ZTextInputBasicProps extends TextInputProps {
    invalid?: boolean;
    enabled?: boolean;

    title?: string;
    border?: boolean | 'force-full';
    prefix?: string;

    onChangeText?: (src: string) => void;
}

export const ZTextInputBasic = (props: ZTextInputBasicProps) => {
    let { title, invalid, enabled, placeholder, ...others } = props;
    let theme = React.useContext(ThemeContext);

    return (
        <View
            paddingLeft={16}
            paddingRight={16}
            marginTop={title ? 10 : undefined}
            height={props.multiline ? undefined : 50}
        >
            <TextField
                {...others}
                label={title}
                placeholder={title ? undefined : placeholder}
                labelFontSize={14}
                tintColor={theme.accentColor}
                baseColor="#9B9B9B"
                textColor={theme.textColor}
                fontSize={16}
                animationDuration={150}
                labelPadding={0}
                labelHeight={18}
                lineWidth={1}
                error={(invalid || !enabled) ? ' ' : undefined}
                style={{
                    marginLeft: 0,
                    paddingLeft: 0
                }}
                {...{ lineDefaultColor: theme.separatorColor }}
            />
        </View>
    );
}