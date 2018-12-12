import { Platform, ActionSheetIOS } from 'react-native';
import DialogAndroid from 'react-native-dialogs';

export class ActionSheetBuilder {
    private _title?: string;
    private _actions: { name: string, callback: () => void, distructive?: boolean }[] = [];

    title(title: string): ActionSheetBuilder {
        this._title = title;
        return this;
    }

    action(name: string, callback: () => void, distructive?: boolean): ActionSheetBuilder {
        this._actions.push({ name, callback, distructive });
        return this;
    }

    show() {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    title: this._title,
                    options: [...this._actions.map((v) => v.name), 'Cancel'],
                    destructiveButtonIndex: this._actions.findIndex(o => !!o.distructive),
                    cancelButtonIndex: this._actions.length
                },
                (index: number) => {
                    if (index >= 0 && index < this._actions.length) {
                        this._actions[index].callback();
                    }
                });
        } else if (Platform.OS === 'android') {
            DialogAndroid.showPicker(null, null, {
                positiveText: null,
                items: this._actions.map((a, i) => ({ label: a.name, id: i + '' }))
            } as any).then(async args => {
                if (args.selectedItem) {
                    await this._actions[Number.parseInt(args.selectedItem.id, 10)].callback();
                }
            });
        }
    }
}