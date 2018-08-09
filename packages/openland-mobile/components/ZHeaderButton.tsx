import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { Button, Platform, View, TouchableNativeFeedback, Text } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { ZHeaderActionButtonAndroid } from './navigation/ZHeaderActionButtonAndroid';

export interface ZHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class ZHeaderButton extends React.PureComponent<{ title?: string, onPress?: () => void, navigation: NavigationScreenProp<NavigationParams> }> {

    private id = Math.random() + '-';

    componentDidMount() {
        let existing = this.props.navigation.getParam('__z_header_actions', []) as ZHeaderButtonDescription[];
        let actions = [...existing, { id: this.id, render: this.renderButton }];
        this.props.navigation.setParams({ '__z_header_actions': actions });
    }

    componentWillUnmount() {
        let existing = this.props.navigation.getParam('__z_header_actions', []) as ZHeaderButtonDescription[];
        this.props.navigation.setParams({ '__z_header_actions': existing.filter((v) => v.id !== this.id) });
    }

    private handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    private renderButton = () => {
        if (this.props.title) {
            if (Platform.OS === 'android') {
                return (
                    <ZHeaderActionButtonAndroid title={this.props.title} onPress={this.handlePress} />
                );
            }
            return (<Button color={AppStyles.primaryColor} onPress={this.handlePress} title={this.props.title} />);
        } else {
            return (
                <>
                    {this.props.children}
                </>
            );
        }
    }

    render() {
        return null;
    }
}