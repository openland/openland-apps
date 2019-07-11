import * as React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZText } from './ZText';
import { TextStyles, TypeStyles } from 'openland-mobile/styles/AppStyles';

interface ZListItemGroupProps {
    header?: string | null;
    marginTop?: number;
    counter?: number | null;
    footer?: {
        text: string;
        onPress: (link: string) => void;
        onLongPress?: (link: string) => void;
    } | string;
    actionRight?: {
        title: string,
        onPress: () => void
    };
    children?: any;
}

export const ZListItemGroup = React.memo<ZListItemGroupProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const { header, marginTop, counter, footer, actionRight, children, } = props;
    const components: any[] = [];

    React.Children.forEach(children, (c) => {
        if (c !== null && c !== undefined) {
            components.push(c);
        }
    });

    if (components.length === 0) {
        return null;
    }

    return (
        <View>
            {header !== null && header !== undefined &&
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
                            ...TypeStyles.title3,
                            color: theme.foregroundPrimary,
                            paddingLeft: 16,
                            flexShrink: 1,
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        allowFontScaling={false}
                    >
                        {header}
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

                    {actionRight && (
                        <TouchableOpacity onPress={actionRight.onPress}>
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
                                {actionRight.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            }
            {header === null && <View height={22} />}
            <View>
                {components}
            </View>
            {footer !== undefined && (
                <ZText
                    linkify={true}
                    text={typeof footer === 'string' ? footer : footer.text}
                    onPress={typeof footer === 'string' ? undefined : footer.onPress}
                    onLongPress={typeof footer === 'string' ? undefined : footer.onLongPress}
                    style={{
                        color: Platform.OS === 'android' ? '#939393' : '#8e8e93',
                        fontSize: 13,
                        lineHeight: 17,
                        paddingLeft: 16,
                        paddingRight: 16,
                        paddingBottom: 16,
                        paddingTop: 6
                    }}
                />
            )}
        </View>
    );
});