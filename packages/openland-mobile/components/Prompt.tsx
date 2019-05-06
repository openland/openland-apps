import * as React from 'react';
import { showBlanketModal } from './showBlanketModal';
import { PromptComponent } from './PromptComponent';

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
            this._actions.push({ name: 'Cancel', style: 'cancel' });
            this._actions.push({ name: 'Save', callback: this._callback });
        }

        showBlanketModal((ctx) => {
            return <PromptComponent builder={this} modalController={ctx} />;
        });
    }
}

export class Prompt {
    static builder = () => {
        return new PromptBuilder();
    }
}
