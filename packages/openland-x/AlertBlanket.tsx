import * as React from 'react';
import { showModalBox } from './showModalBox';
import { AlertBlanketComponent } from './AlertBlanketComponent';
import { UButtonStyle } from 'openland-web/components/unicorn/UButton';
import { XModalController } from './showModal';

export class AlertBlanketBuilder {
    _title?: string;
    _message?: string;
    _body?: (ctx: XModalController, confirm: () => void) => JSX.Element;
    _cancelable?: boolean;
    _cancelAction = true;
    _cancelText: string | undefined = undefined;
    _actions: { name: string, action: () => Promise<void>, style: UButtonStyle }[] = [];
    _width?: number;
    _hideOnEscape?: boolean;
    _confirmOnEnter?: boolean;
    _onCancel?: () => void;

    constructor() {
        this._cancelable = true;
    }

    alert(title: string, message?: string) {
        this._title = title;
        this._message = message;
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

    cancelText(text: string): AlertBlanketBuilder {
        this._cancelText = text;
        return this;
    }

    hideOnEscape(hideOnEscape: boolean): AlertBlanketBuilder {
        this._hideOnEscape = hideOnEscape;
        return this;
    }

    confirmOnEnter(confirmOnEnter: boolean): AlertBlanketBuilder {
        this._confirmOnEnter = confirmOnEnter;
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

    body(body: (ctx: XModalController, confirm: () => void) => JSX.Element): AlertBlanketBuilder {
        this._body = body;
        return this;
    }

    action(name: string, action: () => Promise<void>, style?: UButtonStyle): AlertBlanketBuilder {
        this._actions.push({ name, action, style: style || 'primary' });
        return this;
    }

    width(width: number): AlertBlanketBuilder {
        this._width = width;
        return this;
    }

    onCancel(onCancel: () => void, cancelText?: string): AlertBlanketBuilder {
        this._onCancel = onCancel;
        if (cancelText) {
            this._cancelText = cancelText;
        }
        return this;
    }

    show() {
        showModalBox({ title: this._title, width: this._width, hideOnEsc: this._hideOnEscape, onCancel: this._onCancel }, ctx => {
            return (
                <AlertBlanketComponent builder={this} controller={ctx} />
            );
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