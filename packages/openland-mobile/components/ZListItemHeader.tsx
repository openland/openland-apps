import * as React from 'react';
import { ZListItemBase } from './ZListItemBase';
import { View, Text, StyleSheet, Platform, TextStyle, ViewStyle, TouchableHighlight } from 'react-native';
import { ZAvatar } from './ZAvatar';
import { isAndroid } from '../utils/isAndroid';
import { ZRoundedButton } from './ZRoundedButton';
import { ZListItem } from './ZListItem';
import { XPAvatar } from 'openland-xp/XPAvatar';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 96,
        paddingLeft: 13,
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
        color: '#1c2e4a',
        fontSize: 22,
        fontWeight: '600',
        height: 26,
    } as TextStyle,
    subtitle: {
        color: '#5c6a81',
        fontSize: 13,
        fontWeight: 'normal',
        height: 18,
    } as TextStyle
});

export class ZListItemHeader extends React.PureComponent<{
    photo?: string | null,
    id?: string,
    title?: string | null,
    subtitle?: string | null,
    path?: string,
    onPress?: () => void;
    action?: string
}> {
    render() {
        // if (isAndroid) {
        //     return (
        //         <>
        //             <ZListItemBase path={this.props.path} height={80} backgroundColor="#fff" separator={false}>
        //                 <View width={80} height={80} alignItems="center" justifyContent="center">
        //                     <XPAvatar src={this.props.photo} placeholderTitle={this.props.title} placeholderKey={this.props.id} size={60} />
        //                 </View>
        //                 <View flexGrow={1} flexBasis={0} justifyContent="center" marginLeft={5} paddingRight={10}>
        //                     <Text style={{ lineHeight: 19, marginBottom: 5, fontWeight: '500', fontSize: 16, color: '#181818' }} numberOfLines={this.props.action ? 1 : 2}>{this.props.title}</Text>
        //                     <Text style={{ color: '#aaaaaa', fontSize: 14, lineHeight: 18, height: 18 }} numberOfLines={1}>{this.props.subtitle}</Text>
        //                 </View>
        //             </ZListItemBase>
        //         </>
        //     );
        // }
        return (
            <View style={styles.container}>
                <XPAvatar size={96} src={this.props.photo} placeholderKey={this.props.id} placeholderTitle={this.props.title} />
                <View style={styles.body}>
                    <View style={styles.header}>
                        <Text style={styles.title} numberOfLines={1}>{this.props.title}</Text>
                        <Text style={styles.subtitle} numberOfLines={1}>{this.props.subtitle}</Text>
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