import * as React from 'react';
import { showBlanketModal } from './showBlanketModal';
import { AlertBlanketComponent } from './AlertBlanketComponent';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';
export class AlertBlanketBuilder {
    _title?: string;
    _message?: string;
    _view?: any;
    _cancelable?: boolean;
    _actions: { name: string, callback?: () => void, style?: BlanketButtonsStyle, action?: () => void, onActionSuccess?: () => void, onActionError?: (e: Error) => void }[] = [];

    alert(message: string) {
        this._title = message;
        this._actions = [{ name: 'Cancel' }]
        this.show();
    }

    title(title: string): AlertBlanketBuilder {
        this._title = title;
        return this;
    }

    cancelable(cancelable: boolean): AlertBlanketBuilder {
        this._cancelable = cancelable;
        return this;
    }

    message(message: string): AlertBlanketBuilder {
        this._message = message;
        return this;
    }

    view(view: any): AlertBlanketBuilder {
        this._view = view;
        return this;
    }

    button(name: string, style?: BlanketButtonsStyle, callback?: () => void): AlertBlanketBuilder {
        this._actions.push({ name: name.toUpperCase(), callback, style });
        return this;
    }

    action(name: string, style?: BlanketButtonsStyle, action?: () => void): AlertBlanketBuilder {
        this._actions.push({ name: name.toUpperCase(), action, style });
        return this;
    }

    show() {
        showBlanketModal((ctx) => {
            return (
                <AlertBlanketComponent builder={this} modalController={ctx} />
            )
        }, this._cancelable);
    }
}

export class Alert {
    static alert = (message: string) => {
        new AlertBlanketBuilder().alert(message);
    }

    static builder = () => {
        return new AlertBlanketBuilder();
    }
}