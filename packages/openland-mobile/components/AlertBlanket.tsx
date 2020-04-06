import * as React from 'react';
import { showBlanketModal } from './showBlanketModal';
import { AlertBlanketComponent } from './AlertBlanketComponent';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'pay' | 'default';
export class AlertBlanketBuilder {
    _title?: string;
    _message?: string;
    _view?: any;
    _cancelable = true;
    _cancelAction = true;
    _actions: { name: string, callback?: () => void, style?: BlanketButtonsStyle, action?: () => void, onActionSuccess?: () => void, onActionError?: (e: Error) => void }[] = [];
    _onCancel?: () => void;

    alert(message: string) {
        this._title = message;
        this._actions = [{ name: 'Cancel' }];
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

    cancelDefaultAction(cancelable: boolean): AlertBlanketBuilder {
        this._cancelAction = cancelable;
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
        this._actions.push({ name, callback, style });
        return this;
    }

    action(name: string, style?: BlanketButtonsStyle, action?: () => void): AlertBlanketBuilder {
        this._actions.push({ name, action, style });
        return this;
    }

    onCancel(onCancel: () => void): AlertBlanketBuilder {
        this._onCancel = onCancel;
        return this;
    }

    show() {
        showBlanketModal((ctx) => {
            return (
                <AlertBlanketComponent builder={this} modalController={ctx} />
            );
        }, {
            cancelable: this._cancelable,
            onCancel: this._onCancel,
            ignoreSafeArea: true
        });
    }
}

export default {
    alert: (message: string) => {
        new AlertBlanketBuilder().alert(message);
    },
    builder: () => {
        return new AlertBlanketBuilder();
    }
};