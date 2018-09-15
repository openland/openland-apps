import * as React from 'react';
import { SNavigationViewStyle } from '../../SNavigationView';
import { View, Text, StyleSheet, TextStyle, Dimensions } from 'react-native';
import { SDevice } from '../../SDevice';
import { SAnimated } from '../../SAnimated';
import { SBackButton } from '../../SBackButton';
import { NavigationManager } from '../NavigationManager';
import { HeaderPage } from './HeaderPage';

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
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 44
    } as TextStyle,
    titleLarge: {
        color: '#000',
        width: '100%',
        height: '100%',
        textAlign: 'left',
        textAlignVertical: 'center',
        fontSize: 34,
        fontWeight: 'bold',
        lineHeight: 52,
        paddingLeft: 15
    } as TextStyle
});

const SCREEN_HEIGHT = Dimensions.get('window').height;
export class HeaderComponent extends React.PureComponent<HeaderComponentProps> {
    render() {
        return (
            <>
                <SAnimated.View name="header-background" style={{ position: 'absolute', top: 0, right: 0, left: 0 }} pointerEvents="none">
                    <View style={{ width: '100%', height: SCREEN_HEIGHT, backgroundColor: '#f00' }} />
                </SAnimated.View>
                <View
                    style={{
                        height: SDevice.statusBarHeight + SDevice.navigationBarHeight + SDevice.safeArea.top,
                        paddingTop: SDevice.statusBarHeight + SDevice.safeArea.top,
                        width: '100%'
                    }}
                    pointerEvents={(!!this.props.navigateFrom || !!this.props.navigateTo) ? 'none' : 'box-none'}
                >
                    <SAnimated.View name="header-back" style={{ zIndex: 100 }}>
                        <SBackButton onPress={this.props.manager.pop} inverted={true} />
                    </SAnimated.View>

                    {this.props.pages.map((v) => (
                        <SAnimated.View name={'header--' + v.page.key} style={{ position: 'absolute', top: SDevice.statusBarHeight + SDevice.safeArea.top, right: 0, left: 0 }} pointerEvents={this.props.current === v.page.key ? 'box-none' : 'none'}>
                            <SAnimated.View name={'header-small--' + v.page.key}>
                                <View pointerEvents="box-none" flexDirection="row">
                                    <View opacity={0}>
                                        <SBackButton onPress={this.props.manager.pop} />
                                    </View>
                                    <View flexGrow={1} flexShrink={1} flexBasis={0}>
                                        <Text numberOfLines={1} style={[styles.title, { color: this.props.style.accentColor }]}>{v.config.title}</Text>
                                    </View>
                                    <View opacity={0}>
                                        <SBackButton onPress={this.props.manager.pop} />
                                    </View>
                                </View>
                            </SAnimated.View>
                            {(v.config.appearance === 'large' || !v.config.appearance) && (
                                <View style={{ position: 'absolute', top: SDevice.navigationBarHeight, left: 0, right: 0, height: SCREEN_HEIGHT, overflow: 'hidden' }} pointerEvents="none">
                                    <SAnimated.View name={'header-large--' + v.page.key}>
                                        <Text numberOfLines={1} style={[styles.titleLarge, { color: this.props.style.accentColor }]}>{v.config.title}</Text>
                                    </SAnimated.View>
                                </View>
                            )}
                        </SAnimated.View>
                    ))}
                </View>
            </>
        );
    }
}