import * as React from 'react';
import { HeaderPage } from './HeaderPage';
import { SAnimated } from '../../SAnimated';
import { SDevice } from '../../SDevice';
import { View, Text, TouchableHighlight, Image, TextInput, StyleSheet, TextStyle, Dimensions, TouchableOpacity } from 'react-native';
import { SBackButton } from '../../SBackButton';
import { NavigationManager } from '../NavigationManager';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SEquisiteCentered } from '../../SExquisiteCentered';
import { SCloseButton } from '../../SCloseButton';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    title: {
        ...TextStyles.Headline,

        width: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        lineHeight: 44,
    } as TextStyle,
    titleLarge: {
        ...TextStyles.Large,

        width: '100%',
        textAlign: 'left',
        textAlignVertical: 'center',
        paddingLeft: 16,
        paddingRight: 16
    } as TextStyle,
    passiveSearchInput: {
        flex: 1,
        borderRadius: RadiusStyles.Large
    }
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
        this.props.page.config.searchContext!.headerOnChanged = this.handleExternalChange;
        this.props.page.config.searchContext!.onChanged();
        if (this.props.page.config.searchChanged) {
            this.props.page.config.searchChanged(text);
        }
    }

    handleExternalChange = () => {
        this.setState({ searchText: this.props.page.config.searchContext!.value });
    }

    componentWillReceiveProps(nextProps: HeaderTitleViewProps) {
        if (!nextProps.page.config.search) {
            this.setState({ searchText: '' });
        } else {
            nextProps.page.config.searchContext!.headerOnChanged = this.handleExternalChange;
            nextProps.page.config.searchContext!.onChanged();
            this.setState({ searchText: nextProps.page.config.searchContext!.value });
            if (nextProps.page.config.searchChanged) {
                nextProps.page.config.searchChanged(nextProps.page.config.searchContext!.value);
            }
        }
    }

    render() {
        let v = this.props.page;

        let content = (
            <SEquisiteCentered style={{ width: '100%' }} enable={!v.config.titleView}>
                <SAnimated.View name={'header-left--' + v.page.key} pointerEvents={'box-none'} style={{ paddingLeft: 4 }}>
                    {(!!this.props.manager.parent && this.props.page.page.startIndex === 0) && <SCloseButton onPress={this.props.manager.pop} tintColor={this.props.style.iconColor} />}
                    {(!this.props.manager.parent || this.props.page.page.startIndex !== 0) && <SBackButton onPress={this.props.manager.pop} tintColor={this.props.page.config.iconColor || this.props.style.iconColor} hideText={this.props.page.config.hideBackText} />}
                </SAnimated.View>
                <SAnimated.View name={'header-title--' + v.page.key} style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, flexDirection: 'column' }}>
                    {!v.config.titleView && v.config.title && <Text numberOfLines={1} style={[styles.title, { color: this.props.style.textColor }]} allowFontScaling={false}>{v.config.title}</Text>}
                    {v.config.titleView && v.config.titleView()}
                </SAnimated.View>
                <View style={{ flexGrow: 0, flexDirection: 'row', paddingRight: 4, alignItems: 'center' }} pointerEvents="box-none">
                    <SAnimated.View name={'header-right--' + v.page.key} pointerEvents="box-none" style={{ flexDirection: 'row' }}>
                        {v.config.buttons && v.config.buttons.map((b) => (<View key={'btn-' + b.id}>{b.render(this.props.style)}</View>))}
                    </SAnimated.View>
                </View>
            </SEquisiteCentered>
        );

        return (
            <>
                <SAnimated.View name={'header--' + v.page.key} style={{ position: 'absolute', top: SDevice.statusBarHeight + SDevice.safeArea.top, right: 0, left: 0, bottom: 0 }} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                    <SAnimated.View name={'header-small--' + v.page.key} style={{ width: '100%' }}>
                        {content}
                    </SAnimated.View>
                    {(v.config.appearance === 'large' || !v.config.appearance) && (
                        <View style={{ position: 'absolute', top: SDevice.navigationBarHeight, left: 0, right: 0, height: MAX_SIZE, paddingTop: 5, paddingBottom: 12, overflow: 'hidden' }} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                            <SAnimated.View name={'header-large--' + v.page.key} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                                <Text numberOfLines={1} style={[styles.titleLarge, { color: this.props.style.textColor }]} allowFontScaling={false}>{v.config.title}</Text>
                            </SAnimated.View>
                        </View>
                    )}

                    {(v.config.appearance === 'large' || !v.config.appearance) && (v.config.search) && (
                        <SAnimated.View name={'header-search-container--' + v.page.key} style={{ position: 'absolute', top: SDevice.navigationBarHeightExpanded, left: 0, right: 0, height: MAX_SIZE, overflow: 'hidden' }} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                            <SAnimated.View name={'header-search--' + v.page.key}>
                                <View style={{ flexDirection: 'row', height: 36, marginLeft: 16, marginRight: 16, alignItems: 'center' }}>
                                    <SAnimated.View name={'header-search-input--' + v.page.key} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: this.props.style.searchBackground, height: 36, borderRadius: RadiusStyles.Large }} />
                                    {!v.config.searchActive && (
                                        <ThemeContext.Consumer>
                                            {theme => (
                                                <TouchableHighlight style={styles.passiveSearchInput} underlayColor={theme.backgroundTertiaryActive} delayPressIn={0} onPress={v.config.searchPress}>
                                                    <View style={{ flexDirection: 'row', height: 36, alignItems: 'center', flexGrow: 1 }}>
                                                        <Image source={require('assets/ic-search-16.png')} style={{ width: 16, height: 16, marginLeft: 12, marginRight: 8, tintColor: this.props.style.searchColor }} />
                                                        <Text style={{ fontSize: 17, marginTop: -1, color: this.props.style.searchColor, lineHeight: 22 }} allowFontScaling={false}>Search</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            )}
                                        </ThemeContext.Consumer>
                                    )}
                                    {v.config.searchActive && (
                                        <View style={{ flexDirection: 'row', height: 36, alignItems: 'center', flexGrow: 1, marginRight: 70 }}>
                                            <Image source={require('assets/ic-search-16.png')} style={{ width: 16, height: 16, marginLeft: 12, marginRight: 8, tintColor: this.props.style.searchColor }} />
                                            <TextInput value={this.state.searchText} onChangeText={this.handleTextChange} autoFocus={true} style={{ fontSize: 17, height: 24, flexGrow: 1, flexBasis: 0, marginRight: 6, color: this.props.style.textColor }} placeholder="Search" placeholderTextColor={this.props.style.searchColor} keyboardAppearance={this.props.style.keyboardAppearance} selectionColor={this.props.style.selectionColor} allowFontScaling={false} />
                                            {this.state.searchText.length > 0 && (
                                                <TouchableOpacity onPress={() => this.handleTextChange('')}>
                                                    <View style={{ height: 36, width: 36, marginRight: -2, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Image source={require('assets/ic-clear-16.png')} style={{ tintColor: this.props.style.searchColor, width: 16, height: 16 }} />
                                                    </View>
                                                </TouchableOpacity>
                                            )}
                                        </View>
                                    )}

                                    <SAnimated.View
                                        name={'header-search-button--' + v.page.key}
                                        style={{
                                            width: 85,
                                            height: 36,
                                            marginRight: -85
                                        }}
                                        pointerEvents="box-none"
                                    >
                                        <View style={{ height: '100%', width: '100%' }} pointerEvents={this.props.page.config.searchActive ? 'box-none' : 'none'}>
                                            <TouchableOpacity onPress={v.config.searchClosed!!} style={{ height: '100%', width: '100%' }}>
                                                <View style={{ height: '100%', width: '100%' }}>
                                                    <Text style={{ color: this.props.style.accentColor, fontSize: 17, height: 36, lineHeight: 36 }} allowFontScaling={false}>Cancel</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </SAnimated.View>
                                </View>
                            </SAnimated.View>
                        </SAnimated.View>
                    )}
                </SAnimated.View>
            </>
        );
    }
}