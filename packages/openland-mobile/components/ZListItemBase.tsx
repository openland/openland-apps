import * as React from 'react';
import { View, Image, TouchableHighlight, Platform, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native';
import { isAndroid } from '../utils/isAndroid';
import { SRouter } from 'react-native-s/SRouter';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

export interface ZListItemBaseProps {
    separatorPaddingStart?: number;
    separator?: boolean;
    separatorColor?: string;
    height?: number | null;
    onPress?: () => void;
    onLongPress?: () => void;
    path?: string;
    pathParams?: any;
    pathRemove?: boolean;
    navigationIcon?: boolean;
    backgroundColor?: string;
    enabled?: boolean;
    underlayColor?: string;
    children?: any;
}

class ZListItemBaseImpl extends React.PureComponent<ZListItemBaseProps & { router: SRouter, theme: ThemeGlobal }> {

    handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
        if (this.props.path) {
            if (this.props.pathRemove) {
                this.props.router.pushAndRemove(this.props.path, this.props.pathParams);
            } else {
                this.props.router.push(this.props.path, this.props.pathParams);
            }
        }
    }

    handleLongPress = () => {
        if (this.props.onLongPress) {
            this.props.onLongPress();
        }
    }

    render() {
        let height = this.props.height === null ? undefined : (this.props.height ? this.props.height : Platform.OS === 'android' ? 48 : 44);

        const content = (
            <View style={{ height: height ? (height + (this.props.separator !== false ? 1 : 0)) : undefined, flexDirection: 'column', width: '100%', alignItems: 'stretch' }}>
                <View style={{ height: height, flexDirection: 'row' }}>
                    <View flexBasis={0} flexGrow={1} flexDirection="row" height={height}>{this.props.children}</View>
                    {(!isAndroid && this.props.navigationIcon) && (
                        <Image source={require('assets/ic-arrow-cell.png')} alignSelf="center" marginRight={15} style={{ tintColor: this.props.theme.foregroundTertiary }} />
                    )}
                </View>
                {this.props.separator !== false && <View style={{ backgroundColor: this.props.separatorColor || this.props.theme.separatorColor, height: 1, marginLeft: this.props.separatorPaddingStart }} />}
            </View>
        );

        if ((!!this.props.onPress || !!this.props.onLongPress || !!this.props.path) && (this.props.enabled !== false)) {
            if (Platform.OS === 'android') {
                return (
                    <TouchableNativeFeedback onLongPress={this.handleLongPress} onPress={this.handlePress} style={{ backgroundColor: this.props.backgroundColor }} background={TouchableNativeFeedback.Ripple(this.props.theme.backgroundPrimaryActive, false)} delayPressIn={20}>
                        {content}
                    </TouchableNativeFeedback>
                );
            } else {
                return (
                    <TouchableHighlight activeOpacity={1} underlayColor={this.props.underlayColor || this.props.theme.backgroundPrimaryActive} onLongPress={this.handleLongPress} onPress={this.handlePress} style={{ backgroundColor: this.props.backgroundColor }}>
                        {content}
                    </TouchableHighlight>
                );
            }
        } else {
            return (
                <TouchableWithoutFeedback style={{ backgroundColor: this.props.backgroundColor }}>
                    {content}
                </TouchableWithoutFeedback>
            );
        }
    }
}

export const ZListItemBase = React.memo<ZListItemBaseProps>((props) => {
    let router = React.useContext(SRouterContext)!;
    let theme = React.useContext(ThemeContext);
    return (<ZListItemBaseImpl {...props} router={router} theme={theme} />);
});