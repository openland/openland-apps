import * as React from 'react';
import { View, Text, StyleSheet, TextStyle, ViewStyle, Platform } from 'react-native';
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
        paddingLeft: 15
    } as ViewStyle,
    header: {
        flexDirection: 'column',
        flexGrow: 1,
        flexBasis: 0,
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
                        <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
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