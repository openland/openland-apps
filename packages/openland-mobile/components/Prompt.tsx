import * as React from 'react';
import { showBlanketModal } from './showBlanketModal';
import { PromptComponent } from './PromptComponent';
import { t } from 'openland-mobile/text/useText';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';

export class PromptBuilder {
    _title?: string;
    _callback?: (text: string) => void;
    _value?: string;
    _actions: { name: string, callback?: (value?: string) => void, style?: BlanketButtonsStyle }[] = [];

    title(title: string): PromptBuilder {
        this._title = title;
        return this;
    }

    value(value: string): PromptBuilder {
        this._value = value;
        return this;
    }

    callback(callback: (text: string) => void): PromptBuilder {
        this._callback = callback;
        return this;
    }

    onTextChange = (value: string) => {
        this._value = value;
    }

    show() {
        if (this._actions.length === 0) {
            this._actions.push({ name: t('cancel', 'Cancel'), style: 'cancel' });
            this._actions.push({ name: t('save', 'Save'), callback: this._callback });
        }

        showBlanketModal((ctx) => {
            return <PromptComponent builder={this} modalController={ctx} />;
        });
    }
}

export default {
    builder: () => {
        return new PromptBuilder();
    }
};
