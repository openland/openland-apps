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

const SCREEN_HEIGHT = Dimensions.get('window').height;
export class HeaderComponent extends React.PureComponent<HeaderComponentProps> {
    render() {
        return (
            <>
                {/* Background and Hairline */}
                <SAnimated.View name={'header-background-' + this.props.manager.key} style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    {this.props.style.isOpaque && (<View style={{ width: '100%', height: Platform.OS === 'ios' ? SCREEN_HEIGHT : SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top, backgroundColor: this.props.style.backgroundColor }} />)}
                    {!this.props.style.isOpaque && (<SBlurView style={{ width: '100%', height: Platform.OS === 'ios' ? SCREEN_HEIGHT : SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top }} />)}

                </SAnimated.View>
                <SAnimated.View name={'header-hairline-' + this.props.manager.key} style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    <View style={{ backgroundColor: '#e0e3e7', width: '100%', height: 1 }} />
                </SAnimated.View>
                <View
                    style={{
                        position: 'absolute', top: 0, right: 0, left: 0, bottom: 0,
                        flexDirection: 'column',
                        // height: SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top,
                        paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                        width: '100%'
                    }}
                    pointerEvents={(!!this.props.navigateFrom || !!this.props.navigateTo) ? 'none' : 'box-none'}
                >
                    <SAnimated.View name={'header-back-' + this.props.manager.key} style={{ zIndex: 100, width: 100 }}>
                        <SBackButton onPress={this.props.manager.pop} tintColor={this.props.style.accentColor} />
                    </SAnimated.View>

                    {this.props.pages.map((v) => (
                        <HeaderTitleView key={v.page.key} manager={this.props.manager} page={v} current={this.props.current === v.page.key} style={this.props.style} />
                    ))}
                </View>
            </>
        );
    }
}