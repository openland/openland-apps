import * as React from 'react';
import { NavigationInjectedProps, NavigationScreenProp, NavigationParams } from 'react-navigation';
// import NanoId from 'nanoid';
import { Button, TouchableOpacity } from 'react-native';

export interface ZHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class ZHeaderButton extends React.PureComponent<{ title: string, onPress: () => void, navigation: NavigationScreenProp<NavigationParams> }> {

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
        this.props.onPress();
    }

    private renderButton = () => {
        if (this.props.title) {
            return (<Button onPress={this.handlePress} color="#fff" title={this.props.title} />);
        } else {
            return (
                <TouchableOpacity onPress={this.handlePress}>
                    {this.props.children}
                </TouchableOpacity>
            );
        }
    }

    render() {
        return null;
    }
}