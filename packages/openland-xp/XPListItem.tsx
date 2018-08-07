import * as React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, View, Platform, TouchableWithoutFeedback, StyleProp, ViewStyle, TouchableNativeFeedback } from 'react-native';
import { XPStyles } from './XPStyles';

export interface XPListItemProps {
    selected?: boolean;
    onPress?: () => void;
    backgroundColor?: string;
    style?: StyleProp<ViewStyle>;
}

export class XPListItem extends React.Component<XPListItemProps, { pressed: boolean }> {

    static childContextTypes = {
        __enforce_white_text: PropTypes.bool
    };

    state = {
        pressed: false
    };

    getChildContext() {
        if (Platform.OS === 'macos') {
            return {
                __enforce_white_text: this.state.pressed || this.props.selected
            };
        } else {
            return {};
        }
    }

    private handlePress = () => {
        if (this.props.onPress) {
            let p = this.props.onPress;
            if (Platform.OS === 'android') {
                window.setTimeout(() => {  p(); });
            } else {
                p();
            }
        }
    }

    private handlePressIn = () => {
        this.setState({ pressed: true });
        this.forceUpdate();
        if (this.props.onPress) { this.props.onPress(); }
    }

    private handlePressOut = () => {
        this.setState({ pressed: false });
        this.forceUpdate();
    }

    componentDidUpdate(prevProps: XPListItemProps) {
        if (prevProps.selected !== this.props.selected) {
            window.setTimeout(() => this.forceUpdate());
        }
    }

    render() {
        if (Platform.OS === 'macos') {
            return (
                <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
                    <View style={[{ flexDirection: 'row' }, this.props.style, { backgroundColor: (this.state.pressed || this.props.selected) ? XPStyles.colors.brand : '#fff' }]}>
                        {this.props.children}
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback useForeground={true} onPress={this.handlePress} style={{ backgroundColor: this.props.backgroundColor }} disabled={!this.props.onPress} delayPressIn={0}>
                    <View style={[{ flexDirection: 'row' }, this.props.style]}>
                        {this.props.children}
                    </View>
                </TouchableNativeFeedback>
            );
        }
        return (
            <TouchableHighlight onPress={this.handlePress} underlayColor="#f8f8fb" style={{ backgroundColor: this.props.backgroundColor }} disabled={!this.props.onPress} delayPressIn={0}>
                <View style={[{ flexDirection: 'row' }, this.props.style]}>
                    {this.props.children}
                </View>
            </TouchableHighlight>
        );
    }
}