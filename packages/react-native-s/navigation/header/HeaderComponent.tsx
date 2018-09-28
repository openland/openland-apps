import * as React from 'react';
import { SNavigationViewStyle } from '../../SNavigationView';
import { View, Dimensions, Platform } from 'react-native';
import { SDevice } from '../../SDevice';
import { SAnimated } from '../../SAnimated';
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

const MAX_SIZE = Math.max(Dimensions.get('window').height, Dimensions.get('window').width);
export class HeaderComponent extends React.PureComponent<HeaderComponentProps> {
    render() {
        return (
            <SAnimated.View name={'header-container-' + this.props.manager.key} style={{ position: 'absolute', top: 0, right: 0, left: 0, height: SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top + 1, overflow: 'hidden' }} pointerEvents="box-none">
                
                {/* Background and Hairline */}
                <SAnimated.View name={'header-background-' + this.props.manager.key} style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    {this.props.style.isOpaque && (<View style={{ width: '100%', height: Platform.OS === 'ios' ? MAX_SIZE : SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top, backgroundColor: this.props.style.backgroundColor }} />)}
                    {!this.props.style.isOpaque && (<SBlurView style={{ width: '100%', height: Platform.OS === 'ios' ? MAX_SIZE : SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top }} />)}
                </SAnimated.View>
                <SAnimated.View name={'header-hairline-' + this.props.manager.key} style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    <View style={{ backgroundColor: '#e0e3e7', width: '100%', height: 1 }} />
                </SAnimated.View>

                {/* Titles */}
                <View
                    style={{
                        width: '100%',
                        height: '100%',
                        flexDirection: 'column',
                        paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                    }}
                    pointerEvents={(!!this.props.navigateFrom || !!this.props.navigateTo) ? 'none' : 'box-none'}
                >
                    {this.props.pages.map((v) => (
                        <HeaderTitleView key={v.page.key} manager={this.props.manager} page={v} current={this.props.current === v.page.key} style={this.props.style} />
                    ))}
                </View>
            </SAnimated.View>
        );
    }
}