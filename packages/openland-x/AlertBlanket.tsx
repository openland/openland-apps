import * as React from 'react';
import { showModalBox } from './showModalBox';
import { AlertBlanketComponent } from './AlertBlanketComponent';
import { UButtonStyle } from 'openland-web/components/unicorn/UButton';
import { XModalController } from './showModal';

export class AlertBlanketBuilder {
    _title?: string;
    _message?: string;
    _body?: (ctx: XModalController) => JSX.Element;
    _cancelable?: boolean;
    _action?: { name: string, action: () => Promise<void>, style: UButtonStyle } = undefined;

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

    message(message: string): AlertBlanketBuilder {
        this._message = message;
        return this;
    }

    body(body: (ctx: XModalController) => JSX.Element): AlertBlanketBuilder {
        this._body = body;
        return this;
    }

    action(name: string, action: () => Promise<void>, style?: UButtonStyle): AlertBlanketBuilder {
        this._action = { name, action, style: style || 'primary' };
        return this;
    }

    show() {
        showModalBox({ title: this._title }, ctx => {
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