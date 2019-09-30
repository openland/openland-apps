import * as React from 'react';
import UUID from 'uuid/v4';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { ActionButton, ActionButtonView } from './navigation/buttons/ActionButton';
import { SNavigationViewStyle } from './SNavigationView';

interface SHeaderButtonProps {
    title?: string;
    icon?: any;
    onPress?: () => void;
    style?: SNavigationViewStyle;
    disabled?: boolean;
}

export class SHeaderButton extends React.PureComponent<SHeaderButtonProps> {
    private buttonId = UUID();

    private handlePress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    }

    private renderButton = (style: SNavigationViewStyle) => {
        const { title, icon, disabled, children } = this.props;

        if (title) {
            return (
                <ActionButton icon={icon} title={title} onPress={this.handlePress} iconColor={style.iconColor} accentColor={style.accentColor} disabled={disabled} />
            );
        }

        return (
            <ActionButtonView onPress={this.handlePress}>
                {children}
            </ActionButtonView>
        );
    }

    render() {
        const { style } = this.props;

        return style ? this.renderButton(style) : <HeaderConfigRegistrator config={{ buttons: [{ id: this.buttonId, render: this.renderButton }] }} />;
    }
}