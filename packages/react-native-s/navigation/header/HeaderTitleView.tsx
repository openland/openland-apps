import * as React from 'react';
import { NavigationManager } from '../NavigationManager';
import { HeaderPage } from './HeaderPage';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SDevice } from '../../SDevice';
import { StyleSheet, ViewStyle, TextStyle, View, Text } from 'react-native';
import { SAnimated } from '../../SAnimated';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: SDevice.statusBarHeight + SDevice.safeArea.top,
        right: 0,
        left: 56
    } as ViewStyle,
    rootFirst: {
        paddingLeft: 16
    } as ViewStyle,
    titleContainer: {
        height: SDevice.navigationBarHeight,
        flexGrow: 1,
        flexBasis: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    } as ViewStyle,
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 56,
        height: 56,
    } as TextStyle,
    subtitle: {
        textAlign: 'left',
        fontSize: 13,
        fontWeight: '300',
        lineHeight: 20,
        color: '#49288f',
        opacity: 0.4
    } as TextStyle
});

export class HeaderTitleView extends React.PureComponent<{ manager: NavigationManager, page: HeaderPage, current: boolean, style: SNavigationViewStyle }> {
    render() {
        return (
            <SAnimated.View name={'header--' + this.props.page.page.key} style={[styles.root, this.props.page.page.startIndex === 0 && styles.rootFirst]} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                <View style={styles.titleContainer} pointerEvents="box-none">
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            right: 0,
                        }}
                        pointerEvents="none"
                    >
                        <Text style={[styles.title, { color: this.props.style.accentColor }]}>{this.props.page.config.title}</Text>
                    </View>
                </View>
            </SAnimated.View>
        );
    }
}