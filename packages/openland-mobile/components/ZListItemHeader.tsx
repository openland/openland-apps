import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Platform, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { XPAvatarWithPreview } from './XPAvatarWithPreview';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 96,
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
        color: Platform.OS === 'android' ? '#000000' : '#1c2e4a',
        fontSize: 22,
        fontWeight: Platform.OS === 'android' ? '500' : '600',
        height: 30,
        textAlignVertical: 'center'
    } as TextStyle,
    subtitle: {
        color: Platform.OS === 'android' ? '#99a2b0' : '#5c6a81',
        fontSize: Platform.OS === 'android' ? 15 : 13,
        fontWeight: 'normal',
        height: Platform.OS === 'android' ? 20 : 18,
        textAlignVertical: 'center'
    } as TextStyle
});

export class ZListItemHeader extends React.PureComponent<{
    photo?: string | null,
    id?: string,
    title?: string | null,
    titleIcon?: any;
    titleColor?: string;
    subtitle?: string | null,
    subsubtitle?: string | null,
    path?: string,
    onPress?: () => void;
    action?: string
}> {

    render() {
        return (
            <View style={styles.container}>
                <XPAvatarWithPreview size={96} src={this.props.photo} placeholderKey={this.props.id} placeholderTitle={this.props.title} userId={this.props.id} />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <View flexDirection="row">
                            {this.props.titleIcon && <Image source={this.props.titleIcon} style={{ width: 18, height: 18, marginRight: 2, alignSelf: 'center', marginBottom: 5, tintColor: this.props.titleColor || '#000' }} />}
                            <Text style={[styles.title, this.props.titleColor ? { color: this.props.titleColor } : undefined]} numberOfLines={1}>{this.props.title}</Text>
                        </View>
                        <Text style={styles.subtitle} numberOfLines={1}>{this.props.subtitle}</Text>
                        {this.props.subsubtitle && <Text style={styles.subtitle} numberOfLines={1}>{this.props.subsubtitle}</Text>}
                    </View>
                    {this.props.action && (
                        <View style={styles.footer}>
                            <ZRoundedButton title={this.props.action} path={this.props.path} onPress={this.props.onPress} />
                        </View>
                    )}
                </View>
            </View>
        );
    }
}