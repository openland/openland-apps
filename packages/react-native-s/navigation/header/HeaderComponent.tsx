import * as React from 'react';
import { SNavigationViewStyle } from '../../SNavigationView';
import { View, Text, StyleSheet, TextStyle, Dimensions, TouchableWithoutFeedback, Image, Button, TextInput, Platform } from 'react-native';
import { SDevice } from '../../SDevice';
import { SAnimated } from '../../SAnimated';
import { SBackButton } from '../../SBackButton';
import { NavigationManager } from '../NavigationManager';
import { HeaderPage } from './HeaderPage';
import { HeaderTitleView } from './HeaderTitleView';
import { SBlurView } from '../../SBlurView';

export interface HeaderComponentProps {
    style: SNavigationViewStyle;
    manager: NavigationManager;
    navigateTo?: string;
    navigateFrom?: string;
    current: string;
    pages: HeaderPage[];
}

const styles = StyleSheet.create({
    title: {
        color: '#000',
        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 44
    } as TextStyle,
    titleLarge: {
        color: '#000',
        width: '100%',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        lineHeight: 52,
        paddingLeft: 15,
        paddingRight: 15
    } as TextStyle
});

const SCREEN_HEIGHT = Dimensions.get('window').height;
export class HeaderComponent extends React.PureComponent<HeaderComponentProps> {
    render() {
        return (
            <>
                <SAnimated.View name="header-background" style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    <SBlurView style={{ width: '100%', height: Platform.OS === 'ios' ? SCREEN_HEIGHT : SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top }} />
                </SAnimated.View>
                <View
                    style={{
                        flexDirection: 'column',
                        height: SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top,
                        paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                        width: '100%'
                    }}
                    pointerEvents={(!!this.props.navigateFrom || !!this.props.navigateTo) ? 'none' : 'box-none'}
                >
                    <SAnimated.View name="header-back" style={{ zIndex: 100, width: 100 }}>
                        <SBackButton onPress={this.props.manager.pop} tintColor={this.props.style.accentColor} />
                    </SAnimated.View>

                    {this.props.pages.map((v) => (
                        <HeaderTitleView manager={this.props.manager} page={v} current={this.props.current === v.page.key} style={this.props.style} />
                    ))}
                </View>
                <SAnimated.View name="header-hairline" style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    <View style={{ backgroundColor: '#e0e3e7', width: '100%', height: 1 }} />
                </SAnimated.View>
            </>
        );
    }
}