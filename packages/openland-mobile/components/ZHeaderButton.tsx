import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { Button, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { ZHeaderActionButtonAndroid } from './navigation/ZHeaderActionButtonAndroid';

export interface ZHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class ZHeaderButton extends React.PureComponent<{ route?: string, title?: string, onPress?: () => void, navigation: NavigationScreenProp<NavigationParams> }> {

    private id = Math.random() + '-';
    private key = this.props.route ? '__z_header_' + this.props.route + '_actions' : '__z_header_actions';
    private nav = this.props.route ? (this.props.navigation as any).dangerouslyGetParent() as NavigationScreenProp<NavigationParams> : this.props.navigation;

    componentDidMount() {
        let existing = this.nav.getParam(this.key, []) as ZHeaderButtonDescription[];
        let actions = [...existing, { id: this.id, render: this.renderButton }];
        this.nav.setParams({ [this.key]: actions });
    }

    componentWillUnmount() {
        let existing = this.nav.getParam(this.key, []) as ZHeaderButtonDescription[];
        this.nav.setParams({ [this.key]: existing.filter((v) => v.id !== this.id) });
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