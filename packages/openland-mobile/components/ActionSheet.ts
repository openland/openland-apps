import { Platform, ActionSheetIOS } from 'react-native';

export class ActionSheetBuilder {
    private _title?: string;
    private _actions: { name: string, callback: () => void }[] = [];

    title(title: string): ActionSheetBuilder {
        this._title = title;
        return this;
    }

    action(name: string, callback: () => void): ActionSheetBuilder {
        this._actions.push({ name, callback });
        return this;
    }

    show() {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: this._title,
                    options: [...this._actions.map((v) => v.name), 'Cancel'],
                    cancelButtonIndex: this._actions.length
                },
                (index: number) => {
                    if (index >= 0 && index < this._actions.length) {
                        this._actions[index].callback();
                    }
                });
        } else {
            // TODO: Implement
        }
    }
}