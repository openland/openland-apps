import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Platform, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { XPAvatarWithPreview } from './XPAvatarWithPreview';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 94,
        paddingTop: 8,
        paddingLeft: Platform.OS === 'android' ? 16 : 13,
        paddingRight: 16
    } as ViewStyle,
    body: {
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 0,
        paddingLeft: 16,
        paddingRight: 16
    } as ViewStyle,
    header: {
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
        minWidth: 0,
    } as ViewStyle,
    footer: {
        flexDirection: 'column',
        height: 30,
        alignItems: 'flex-start'
    } as ViewStyle,
    title: {
        color: '#000000',
        fontSize: 22,
        fontWeight: Platform.OS === 'android' ? '500' : '600',
        height: 30,
        textAlignVertical: 'center'
    } as TextStyle,
    subtitle: {
        color: Platform.OS === 'android' ? '#99a2b0' : '#5c6a81',
        fontSize: Platform.OS === 'android' ? 14 : 15,
        fontWeight: Platform.OS === 'android' ? '400' : '400',
        height: Platform.OS === 'android' ? 20 : 20,
        textAlignVertical: 'center',
        marginTop: -3
    } as TextStyle
});

export interface ZListItemHeaderProps {
    photo?: string | null,
    id?: string,
    userId?: string,
    title?: string | null,
    titleIcon?: any;
    titleColor?: string;
    subtitle?: string | null,
    subtitleColor?: string,
    subsubtitle?: string | null,
    path?: string,
    onPress?: () => void;
    action?: string
}

export const ZListItemHeader = React.memo<ZListItemHeaderProps>((props) => {
    let theme = React.useContext(ThemeContext);
    return (
        <View style={styles.container}>
            <XPAvatarWithPreview size={86} src={props.photo} placeholderKey={props.id} placeholderTitle={props.title} userId={props.userId} />
            <View style={styles.body}>
                <View style={styles.header}>
                    <View flexDirection="row">
                        {props.titleIcon && <Image source={props.titleIcon} style={{ width: 18, height: 18, marginRight: 2, alignSelf: 'center', marginBottom: Platform.OS === 'ios' ? 5 : -3, tintColor: props.titleColor || '#000' }} />}
                        <Text style={[styles.title, props.titleColor ? { color: props.titleColor } : { color: theme.textColor }]} numberOfLines={1}>{props.title}</Text>
                    </View>
                    <Text style={[styles.subtitle, props.subtitleColor ? { color: props.subtitleColor } : { color: theme.textLabelColor }]} numberOfLines={1}>{props.subtitle}</Text>
                    {/* {this.props.subsubtitle && <Text style={styles.subtitle} numberOfLines={1}>{this.props.subsubtitle}</Text>} */}
                </View>
                {props.action && (
                    <View style={styles.footer}>
                        <ZRoundedButton title={props.action} path={props.path} onPress={props.onPress} />
                    </View>
                )}
            </View>
        </View>
    );
})