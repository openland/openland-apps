import * as React from 'react';
import { Platform, View, Text, Alert as AlertReact, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { showBlanketModal } from './showBlanketModal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZModalController } from './ZModal';
import { delay } from 'openland-y-utils/timer';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { SAnimated } from 'react-native-s/SAnimated';
import { formatError } from 'openland-y-forms/errorHandling';
import { AlertBlanketComponent } from './AlertBlanketComponent';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';
export class AlertBlanketBuilder {
    _title?: string;
    _message?: string;
    _view?: any;
    _cancalable?: boolean;
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

    cancalable(cancalable: boolean): AlertBlanketBuilder {
        this._cancalable = cancalable;
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

    show() {
        showBlanketModal((ctx) => {
            return (
                <AlertBlanketComponent builder={this} modalController={ctx} />

            )
        }, this._cancalable);
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