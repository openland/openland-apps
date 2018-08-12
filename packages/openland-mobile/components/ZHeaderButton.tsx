import * as React from 'react';
import { Button, Platform } from 'react-native';
import { AppStyles } from '../styles/AppStyles';
import { ZHeaderActionButtonAndroid } from './navigation/ZHeaderActionButtonAndroid';
import { randomKey } from '../utils/randomKey';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';

export interface ZHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class ZHeaderButton extends React.PureComponent<{ title?: string, onPress?: () => void }> {

    private buttonId = randomKey();

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
        return <ZHeaderConfigRegistrator config={new ZHeaderConfig({ buttons: [{ id: this.buttonId, render: this.renderButton }]})} />;
    }
}