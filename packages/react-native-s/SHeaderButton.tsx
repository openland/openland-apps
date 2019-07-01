import * as React from 'react';
import UUID from 'uuid/v4';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { Platform, Button } from 'react-native';
import { ActionButtonAndroid, ActionButtonAndroidView } from './navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS, ActionButtonIOSView } from './navigation/buttons/ActionButtonIOS';
import { SNavigationViewStyle } from './SNavigationView';

export interface FastHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class SHeaderButton extends React.PureComponent<{ title?: string, icon?: any, onPress?: () => void, style?: SNavigationViewStyle, marginLeft?: number, }> {

    private buttonId = UUID();

    private handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    private renderButton = (style: SNavigationViewStyle) => {
        if (this.props.title) {
            if (Platform.OS === 'android') {
                return (
                    <ActionButtonAndroid icon={this.props.icon} title={this.props.title} onPress={this.handlePress} tintColor={style.textColor} />
                );
            } else if (Platform.OS === 'ios') {
                return (
                    <ActionButtonIOS title={this.props.title} marginLeft={this.props.marginLeft} icon={this.props.icon} tintColor={style.accentColor} onPress={this.handlePress} />
                );
            }
            return (<Button color={style.accentColor} onPress={this.handlePress} title={this.props.title} />);
        } else {
            if (Platform.OS === 'android') {
                return (
                    <ActionButtonAndroidView onPress={this.handlePress}>
                        {this.props.children}
                    </ActionButtonAndroidView>
                );
            } else if (Platform.OS === 'ios') {
                return (
                    <ActionButtonIOSView onPress={this.handlePress}>
                        {this.props.children}
                    </ActionButtonIOSView>
                );
            }
            return (
                <>
                    {this.props.children}
                </>
            );
        }
    }

    render() {
        return this.props.style ? this.renderButton(this.props.style) : <HeaderConfigRegistrator config={{ buttons: [{ id: this.buttonId, render: this.renderButton }] }} />;
    }
}