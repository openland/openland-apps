import * as React from 'react';
import { HeaderPage } from './HeaderPage';
import { SAnimated } from '../../SAnimated';
import { SDevice } from '../../SDevice';
import { View, Text, TouchableWithoutFeedback, Image, TextInput, Button, StyleSheet, TextStyle, Dimensions } from 'react-native';
import { SBackButton } from '../../SBackButton';
import { NavigationManager } from '../NavigationManager';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SEquisiteCentered } from '../../SExquisiteCentered';
import { SCloseButton } from '../../SCloseButton';

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

const MAX_SIZE = Math.max(Dimensions.get('window').height, Dimensions.get('window').width);

export interface HeaderTitleViewProps {
    manager: NavigationManager;
    page: HeaderPage;
    current: boolean;
    style: SNavigationViewStyle;
}

export class HeaderTitleView extends React.PureComponent<HeaderTitleViewProps, { searchText: string }> {
    constructor(props: HeaderTitleViewProps) {
        super(props);
        this.state = {
            searchText: ''
        };
    }

    handleTextChange = (text: string) => {
        this.setState({ searchText: text });
        this.props.page.config.searchContext!.value = text;
        if (this.props.page.config.searchChanged) {
            this.props.page.config.searchChanged(text);
        }
    }

    componentWillReceiveProps(nextProps: HeaderTitleViewProps) {
        if (!nextProps.page.config.search) {
            if (this.state.searchText !== '') {
                this.setState({ searchText: '' });
            }
        } else {
            this.setState({ searchText: nextProps.page.config.searchContext!.value });
            if (this.props.page.config.searchChanged) {
                this.props.page.config.searchChanged(nextProps.page.config.searchContext!.value);
            }
        }
    }

    render() {
        let v = this.props.page;
        return (
            <>
                <SAnimated.View name={'header--' + v.page.key} style={{ position: 'absolute', top: SDevice.statusBarHeight + SDevice.safeArea.top, right: 0, left: 0, bottom: 0 }} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                    <SAnimated.View name={'header-small--' + v.page.key} style={{ width: '100%' }}>
                        <SEquisiteCentered style={{ width: '100%' }}>
                            <SAnimated.View name={'header-left--' + v.page.key} pointerEvents={v.page.startIndex === 0 && !!this.props.manager.parent ? 'box-none' : 'none'}>
                                {this.props.manager.parent && v.page.startIndex === 0 && <SCloseButton onPress={this.props.manager.pop} tintColor={this.props.style.accentColor} />}
                                {!(this.props.manager.parent && v.page.startIndex === 0) && <SBackButton onPress={this.props.manager.pop} tintColor={this.props.style.accentColor} />}
                            </SAnimated.View>
                            <SAnimated.View name={'header-title--' + v.page.key} style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, flexDirection: 'column' }}>
                                {!v.config.titleView && v.config.title && <Text numberOfLines={1} style={[styles.title, { color: this.props.style.textColor }]}>{v.config.title}</Text>}
                                {/* {!v.config.titleView && v.config. && <Text style={{ textAlign: 'center' }}>{this.props.subtitleText}</Text>} */}
                                {v.config.titleView && v.config.titleView()}
                            </SAnimated.View>
                            <View style={{ flexGrow: 0, flexDirection: 'row', maxWidth: 100, paddingRight: 15, alignItems: 'center' }} pointerEvents="box-none">
                                <SAnimated.View name={'header-right--' + v.page.key} pointerEvents="box-none">
                                    {v.config.buttons && v.config.buttons.map((b) => (<View key={'btn-' + b.id}>{b.render(this.props.style)}</View>))}
                                </SAnimated.View>
                            </View>
                        </SEquisiteCentered>
                    </SAnimated.View>
                    {(v.config.appearance === 'large' || !v.config.appearance) && (
                        <View style={{ position: 'absolute', top: SDevice.navigationBarHeight, left: 0, right: 0, height: MAX_SIZE, overflow: 'hidden' }} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                            <SAnimated.View name={'header-large--' + v.page.key} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                                <Text numberOfLines={1} style={[styles.titleLarge, { marginTop: -2, color: this.props.style.textColor }]}>{v.config.title}</Text>
                            </SAnimated.View>
                        </View>
                    )}

                    {(v.config.appearance === 'large' || !v.config.appearance) && (v.config.search) && (
                        <SAnimated.View name={'header-search-container--' + v.page.key} style={{ position: 'absolute', top: SDevice.navigationBarHeightExpanded, left: 0, right: 0, height: MAX_SIZE, overflow: 'hidden' }} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                            <SAnimated.View name={'header-search--' + v.page.key}>
                                <View style={{ flexDirection: 'row', height: 36, marginTop: 1, marginLeft: 15, marginRight: 15, alignItems: 'center' }}>
                                    <SAnimated.View name={'header-search-input--' + v.page.key} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#8a8a8f', height: 36, opacity: 0.12, borderRadius: 8 }} />
                                    {!v.config.searchActive && (
                                        <TouchableWithoutFeedback onPress={v.config.searchPress}>
                                            <View style={{ flexDirection: 'row', height: 36, alignItems: 'center', flexGrow: 1 }}>
                                                <Image source={require('assets/ic-search.png')} style={{ width: 14, height: 14, marginLeft: 13, marginRight: 7 }} />
                                                <Text style={{ fontSize: 16, color: 'rgba(138, 138, 143, 0.75)', lineHeight: 22 }}>Search</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )}
                                    {v.config.searchActive && (
                                        <View style={{ flexDirection: 'row', height: 36, alignItems: 'center', flexGrow: 1, marginRight: 70 }}>
                                            <Image source={require('assets/ic-search.png')} style={{ width: 14, height: 14, marginLeft: 13, marginRight: 7 }} />
                                            <TextInput value={this.state.searchText} onChangeText={this.handleTextChange} autoFocus={true} style={{ fontSize: 16, lineHeight: 22, flexGrow: 1, flexBasis: 0, marginRight: 20 }} placeholder="Search" placeholderTextColor="rgba(138, 138, 143, 0.75)" />
                                        </View>
                                    )}

                                    <View style={{ marginLeft: -70 }}>
                                        <SAnimated.View
                                            name={'header-search-button--' + v.page.key}
                                            style={{
                                                width: 70 - 15,
                                            }}
                                        >
                                            <Button title="Close" onPress={v.config.searchClosed!!} color={this.props.style.accentColor} />
                                        </SAnimated.View>
                                    </View>
                                </View>
                            </SAnimated.View>
                        </SAnimated.View>
                    )}
                </SAnimated.View>
            </>
        );
    }
}