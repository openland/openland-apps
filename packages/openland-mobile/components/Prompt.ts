import { Platform, AlertIOS } from 'react-native';
import DialogAndroid from 'react-native-dialogs';

export class PromptBuilder {
    private _title?: string;
    private _callback?: (text: string) => void;
    private _value?: string;

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

    show() {
        if (Platform.OS === 'ios') {
            AlertIOS.prompt(
                this._title || '',
                undefined,
                this._callback,
                undefined,
                this._value);
        } else if (Platform.OS === 'android') {
            DialogAndroid.prompt(this._title).then(async args => {
                if (args.action === 'actionPositive') {
                    await this._callback!(args.text);
                }
            });
        }
    }
}