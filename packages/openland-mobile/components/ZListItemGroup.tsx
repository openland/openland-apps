import * as React from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZText } from './ZText';

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

    // if (isAndroid) {
    //     return (
    //         <View backgroundColor={AppStyles.backyardColor}>
    //             {this.props.header !== null && this.props.header !== undefined && <Text style={{ color: '#8e8e93', fontSize: 13, textTransform: 'uppercase', height: 45, lineHeight: 30, textAlignVertical: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }} numberOfLines={1} ellipsizeMode="tail">{this.props.header}</Text>}
    //             {this.props.header === null && <View height={30} />}
    //             <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
    //             <View backgroundColor="#fff">
    //                 {components}
    //             </View>
    //             {this.props.footer !== null && this.props.footer !== undefined && <Text style={{ color: '#8e8e93', fontSize: 13, textTransform: 'uppercase', height: 45, lineHeight: 30, textAlignVertical: 'center', paddingLeft: 15, paddingRight: 15, paddingTop: 15 }} numberOfLines={1} ellipsizeMode="tail">{this.props.footer}</Text>}
    //             <View backgroundColor={AppStyles.separatorColor} height={1} width="100%" />
    //         </View>
    //     );
    // }

    return (
        <View>
            {props.header !== null && props.header !== undefined &&
                <View
                    style={{
                        paddingTop: 30,
                        paddingBottom: 8,
                        flexDirection: 'row'
                    }}
                >
                    <Text
                        style={{
                            color: theme.groupHeaderColor,
                            fontSize: 16,
                            fontWeight: Platform.OS === 'android' ? '500' : '600',
                            height: Platform.OS === 'android' ? 21 : 20,
                            paddingLeft: 16,
                            flexShrink: 1,
                            opacity: Platform.OS === 'android' ? 0.7 : 1.0
                        }}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {Platform.OS === 'android' ? props.header : props.header.toUpperCase()}
                    </Text>

                    {props.counter !== undefined && props.counter !== null && (
                        <Text
                            style={{
                                color: '#b9c1cd',
                                fontSize: 18,
                                fontWeight: Platform.OS === 'android' ? '500' : '600',
                                height: 20,
                                paddingLeft: 8,
                            }}
                        >
                            {props.counter.toString()}
                        </Text>
                    )}

                    <View flexGrow={1} paddingRight={16} />

                    {props.actionRight && (
                        <TouchableOpacity onPress={props.actionRight.onPress} hitSlop={{ top: 16, bottom: 16 }}>
                            <Text
                                style={{
                                    color: theme.accentColor,
                                    fontSize: 15,
                                    fontWeight: Platform.OS === 'android' ? '500' : '600',
                                    height: 18,
                                    lineHeight: 18,
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