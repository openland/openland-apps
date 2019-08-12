import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TypeStyles } from 'openland-mobile/styles/AppStyles';

interface ZListHeaderProps {
    text: string;
    counter?: string | number | null;
    marginTop?: number;
    action?: {
        title: string,
        onPress: () => void
    };
}

export const ZListHeader = React.memo<ZListHeaderProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { text, marginTop, counter, action } = props;

    return (
        <View>
            <View
                style={{
                    marginTop: (marginTop !== undefined) ? marginTop : 16,
                    flexDirection: 'row',
                    height: 48,
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        ...TypeStyles.title2,
                        color: theme.foregroundPrimary,
                        paddingLeft: 16,
                        flexShrink: 1,
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    allowFontScaling={false}
                >
                    {text}
                </Text>

                {counter !== undefined && counter !== null && (
                    <Text
                        style={{
                            ...TypeStyles.label1,
                            color: theme.foregroundTertiary,
                            paddingLeft: 6,
                            marginTop: 1,
                        }}
                        allowFontScaling={false}
                    >
                        {counter}
                    </Text>
                )}

                <View flexGrow={1} paddingRight={16} />

                {action && (
                    <TouchableOpacity onPress={action.onPress} activeOpacity={0.7}>
                        <Text
                            style={{
                                ...TypeStyles.label2,
                                color: theme.foregroundSecondary,
                                paddingLeft: 16,
                                paddingRight: 16,
                            }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            allowFontScaling={false}
                        >
                            {action.title}
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
});