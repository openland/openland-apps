import * as React from 'react';
import UUID from 'uuid/v4';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { ActionButton, ActionButtonView } from './navigation/buttons/ActionButton';
import { SNavigationViewStyle } from './SNavigationView';

export interface FastHeaderButtonDescription {
    id: string;
    render: () => React.ReactElement<{}>;
}

export class SHeaderButton extends React.PureComponent<{ title?: string, icon?: any, onPress?: () => void, style?: SNavigationViewStyle }> {
    private buttonId = UUID();

    private handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    private renderButton = (style: SNavigationViewStyle) => {
        if (this.props.title) {
            return (
                <ActionButton icon={this.props.icon} title={this.props.title} onPress={this.handlePress} tintColor={style.accentColor} />
            );
        } else {
            return (
                <ActionButtonView onPress={this.handlePress}>
                    {this.props.children}
                </ActionButtonView>
            );
        }
    }

    render() {
        return this.props.style ? this.renderButton(this.props.style) : <HeaderConfigRegistrator config={{ buttons: [{ id: this.buttonId, render: this.renderButton }] }} />;
    }
}