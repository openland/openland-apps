import * as React from 'react';
import { NavigationManager } from '../NavigationManager';
import { HeaderPage } from './HeaderPage';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SDevice } from '../../SDevice';
import { Image, StyleSheet, ViewStyle, TextStyle, View, Text, TextInput, BackHandler, TouchableOpacity, Dimensions, Keyboard } from 'react-native';
import { SAnimated } from 'react-native-fast-animations';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { SBackButton } from 'react-native-s/SBackButton';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TFn, useText } from 'openland-mobile/text/useText';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: SDevice.statusBarHeight + SDevice.safeArea.top,
        right: 0,
        left: 0,
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
        ...TextStyles.Headline,
        textAlign: 'left',
        textAlignVertical: 'center',
        height: SDevice.navigationBarHeight,
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

interface HeaderTitleViewProps {
    manager: NavigationManager;
    page: HeaderPage;
    current: boolean;
    style: SNavigationViewStyle;
}

class HeaderTitleViewInner extends React.PureComponent<HeaderTitleViewProps & { t: TFn }, { searchText: string }> {

    constructor(props: HeaderTitleViewProps & { t: TFn }) {
        super(props);
        this.state = { searchText: '' };
    }

    handleExternalChange = () => {
        this.setState({ searchText: this.props.page.config.searchContext!.value });
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

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.props.page.config.searchActive) {
            this.props.page.config.searchClosed!(true);
            return true;
        }
        return false;
    }

    handleSoftBackPress = () => {
        Keyboard.dismiss();
        setTimeout(() => {
            this.props.manager.pop();
        }, 10);
    }

    render() {
        let v = this.props.page;
        let t = this.props.t;
        let title = <Text style={[styles.title, { color: this.props.style.textColor }, this.props.page.page.startIndex === 0 ? styles.rootFirst : {}]}>{v.config.title}</Text>;
        title = (v.config.titleView && <View style={{ flexGrow: 1, flexShrink: 1, minWidth: 0, flexBasis: 0, alignItems: 'stretch' }}>{v.config.titleView()}</View>) || title;
        if (v.config.titleAction) {
            title = (
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={v.config.titleAction.action}>
                    <Text style={[styles.title, { color: this.props.style.textColor }, this.props.page.page.startIndex === 0 ? styles.rootFirst : {}]}>{v.config.titleAction.title}</Text>
                    <ThemeContext.Consumer>
                        {theme => (
                            <Image source={require('assets/ic-arrow-down-appbar-24.png')} style={{ marginLeft: 8, marginTop: 5, tintColor: theme.foregroundTertiary }} />
                        )}
                    </ThemeContext.Consumer>
                </TouchableOpacity>
            );
        }

        let showCloseButton = !!this.props.manager.parent && this.props.page.page.startIndex === 0;
        let showBackButton = !showCloseButton && (this.props.page.page.startIndex !== 0 || v.config.searchActive);
        return (
            <SAnimated.View name={'header--' + this.props.page.page.key} style={styles.root} pointerEvents={this.props.current ? 'box-none' : 'none'}>
                <View style={[styles.titleContainer, { backgroundColor: this.props.style.headerColor }]} pointerEvents="box-none">
                    <View
                        style={{
                            position: 'absolute',
                            left: 0,
                            top: 0,
                            right: 0,
                            flexDirection: 'row',
                            flexGrow: 1
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexGrow: 1,
                                height: SDevice.navigationBarHeight
                            }}
                        >
                            {!v.config.hideIcon && (
                                <>
                                    {showCloseButton && <SCloseButton onPress={this.props.manager.pop} tintColor={this.props.style.iconColor} />}
                                    {showBackButton && <SBackButton onPress={v.config.searchActive ? () => v.config.searchClosed!(true) : this.handleSoftBackPress} tintColor={this.props.style.iconColor} />}
                                    {!showCloseButton && !showBackButton && v.config.backButtonRootFallback && <SBackButton onPress={v.config.backButtonRootFallback} tintColor={this.props.style.iconColor} />}
                                </>
                            )}
                            {v.config.searchActive && (
                                <>
                                    <TextInput
                                        style={{ flexGrow: 1, fontSize: 18, width: Dimensions.get('window').width - 56 - 56, color: this.props.style.textColor }}
                                        value={this.state.searchText}
                                        onChangeText={this.handleTextChange}
                                        autoFocus={true}
                                        placeholder={v.config.searchPlaceholder ? v.config.searchPlaceholder : t('searchDefault', 'Groups, people, and more')}
                                        selectionColor={this.props.style.selectionColor}
                                        placeholderTextColor={this.props.style.searchColor}
                                        returnKeyType="search"
                                        autoCorrect={false}
                                    />
                                    {this.state.searchText.length > 0 && (
                                        <TouchableOpacity onPress={() => this.handleTextChange('')}>
                                            <View style={{ height: 44, width: 56, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('assets/ic-close-24.png')} style={{ tintColor: this.props.style.iconColor, width: 24, height: 24 }} />
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                            {!v.config.searchActive && title}
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingRight: 2 }}>
                            {v.config.search && !v.config.searchActive && <SHeaderButton title={v.config.searchPlaceholder ? v.config.searchPlaceholder : t('searchDefault', 'Groups, people, and more')} icon={require('assets/ic-search-24.png')} onPress={v.config.searchPress} style={this.props.style} />}
                            {v.config.buttons && !v.config.searchActive && v.config.buttons.map((b) => (<View key={'btn-' + b.id}>{b.render(this.props.style)}</View>))}
                        </View>
                    </View>
                </View>
            </SAnimated.View>
        );
    }
}

export const HeaderTitleView = React.memo((props: HeaderTitleViewProps) => {
    const { t } = useText();
    return (
        <HeaderTitleViewInner {...props} t={t} />
    );
});