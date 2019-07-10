import * as React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZText } from './ZText';
import { TextStyles, TypeStyles } from 'openland-mobile/styles/AppStyles';

interface ZListItemGroupProps {
    header?: string | null;
    counter?: number | null;
    footer?: {
        text: string;
        onPress: (link: string) => void;
        onLongPress?: (link: string) => void;
    } | string | null;
    divider?: boolean;
    actionRight?: {
        title: string,
        onPress: () => void
    };
    children?: any;
}

export const ZListItemGroup = React.memo<ZListItemGroupProps>((props) => {
    let theme = React.useContext(ThemeContext);

    let components: any[] = [];
    React.Children.forEach(props.children, (c) => {
        if (c !== null && c !== undefined) {
            components.push(c);
            if (components.length > 0 && props.divider !== false && !(c as any).props.divider) {
                components.push(<View key={'div-' + components.length} style={{ paddingLeft: (c as any).props.leftIcon ? 64 : (c as any).props.leftAvatar ? 69 : 15 }} width="100%"><View backgroundColor={theme.separatorColor} height={1} /></View>);
            }
        }
    });

    if (components.length === 0) {
        return null;
    }

    return (
        <View>
            {props.header !== null && props.header !== undefined &&
                <View
                    style={{
                        marginTop: 16,
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
                    >
                        {props.header}
                    </Text>

                    {props.counter !== undefined && props.counter !== null && (
                        <Text
                            style={{
                                ...TypeStyles.label1,
                                color: theme.foregroundTertiary,
                                paddingLeft: 6,
                                marginTop: 1,
                            }}
                        >
                            {props.counter.toString()}
                        </Text>
                    )}

                    <View flexGrow={1} paddingRight={16} />

                    {props.actionRight && (
                        <TouchableOpacity onPress={props.actionRight.onPress}>
                            <Text
                                style={{
                                    ...TypeStyles.label2,
                                    color: theme.foregroundSecondary,
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                }}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {props.actionRight.title}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            }
            {props.header === null && <View height={22} />}
            {/* <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" /> */}
            <View>
                {components}
            </View>
            {/* {this.props.divider !== false && <View backgroundColor={AppStyles.separatorColor} marginLeft={15} height={1} width="100%" />} */}
            {props.footer !== null && props.footer !== undefined && (
                <ZText
                    linkify={true}
                    text={typeof props.footer === 'string' ? props.footer : props.footer.text}
                    onPress={typeof props.footer === 'string' ? undefined : props.footer.onPress}
                    onLongPress={typeof props.footer === 'string' ? undefined : props.footer.onLongPress}
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