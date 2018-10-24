import * as React from 'react';
import { NavigationManager } from '../NavigationManager';
import { HeaderPage } from './HeaderPage';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SDevice } from '../../SDevice';
import { StyleSheet, ViewStyle, TextStyle, View, Text, Image, TextInput } from 'react-native';
import { SAnimated } from '../../SAnimated';
import { SCloseButton } from 'react-native-s/SCloseButton';
import { SBackButton } from 'react-native-s/SBackButton';
import { ActionButtonAndroid } from '../buttons/ActionButtonAndroid';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { HeaderTitleViewProps } from './HeaderTitleView.ios';

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: SDevice.statusBarHeight + SDevice.safeArea.top,
        right: 0,
        left: 0
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

export class HeaderTitleView extends React.PureComponent<{ manager: NavigationManager, page: HeaderPage, current: boolean, style: SNavigationViewStyle }, { searchText: string }> {

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

    render() {
        let v = this.props.page;
        console.warn('fooo', this.props.manager.parent, this.props.page.page.startIndex);
        let title = <Text style={[styles.title, { color: this.props.style.textColor }]}>{this.props.page.config.title}</Text>;
        title = (v.config.titleView && v.config.titleView()) || title;
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
                        flexDirection="row"
                        flexGrow={1}
                    >
                        <View
                            flexDirection="row"
                            flexGrow={1}
                        >
                            {!v.config.searchActive && (!!this.props.manager.parent && this.props.page.page.startIndex === 0) && <SCloseButton onPress={this.props.manager.pop} tintColor={this.props.style.accentColor} />}
                            {(this.props.manager.parent || this.props.page.page.startIndex !== 0 || v.config.searchActive) && <SBackButton onPress={v.config.searchActive ? v.config.searchClosed!! : this.props.manager.pop} tintColor={this.props.style.accentColor} />}
                            {v.config.searchActive && <TextInput value={this.state.searchText} onChangeText={this.handleTextChange} autoFocus={true}  placeholder="Search" />}
                            {!v.config.searchActive && title}
                        </View>
                        <View flexDirection="row" alignItems="center" alignSelf="flex-end">
                            {v.config.search && !v.config.searchActive && <SHeaderButton title="Search" onPress={v.config.searchPress} style={this.props.style} />}
                            {v.config.buttons && v.config.buttons.map((b) => (<View key={'btn-' + b.id}>{b.render(this.props.style)}</View>))}
                        </View>

                    </View>
                </View>
            </SAnimated.View>
        );
    }
}