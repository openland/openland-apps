import * as React from 'react';
import UUID from 'uuid/v4';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { Platform, Button } from 'react-native';
import { ActionButtonAndroid } from './navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS } from './navigation/buttons/ActionButtonIOS';

export interface FastHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class SHeaderButton extends React.PureComponent<{ title?: string, icon?: any, onPress?: () => void }> {

    private buttonId = UUID();

    private handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    private renderButton = () => {
        if (this.props.title) {
            if (Platform.OS === 'android') {
                return (
                    <ActionButtonAndroid title={this.props.title} onPress={this.handlePress} />
                );
            } else if (Platform.OS === 'ios') {
                return (
                    <ActionButtonIOS title={this.props.title} icon={this.props.icon} onPress={this.handlePress} />
                );
            }
            return (<Button color={'#000'} onPress={this.handlePress} title={this.props.title} />);
        } else {
            return (
                <>
                    {this.props.children}
                </>
            );
        }
    }

    render() {
        return <HeaderConfigRegistrator config={{ buttons: [{ id: this.buttonId, render: this.renderButton }] }} />;
    }
}