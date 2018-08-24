import * as React from 'react';
import { Button, Platform } from 'react-native';
import UUID from 'uuid/v4';
import { FastHeaderActionButtonAndroid } from './header/FastHeaderActionButtonAndroid';
import { FastHeaderConfigRegistrator } from './FastHeaderConfigRegistrator';
import { FastHeaderConfig } from './FastHeaderConfig';
import { FastHeaderActionButtonIOS } from './header/FastHeaderActionButtonIOS';

export interface FastHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class FastHeaderButton extends React.PureComponent<{ title?: string, icon?: any, onPress?: () => void }> {

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
                    <FastHeaderActionButtonAndroid title={this.props.title} onPress={this.handlePress} />
                );
            } else if (Platform.OS === 'ios') {
                return (
                    <FastHeaderActionButtonIOS title={this.props.title} icon={this.props.icon} onPress={this.handlePress} />
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
        return <FastHeaderConfigRegistrator config={new FastHeaderConfig({ buttons: [{ id: this.buttonId, render: this.renderButton }] })} />;
    }
}