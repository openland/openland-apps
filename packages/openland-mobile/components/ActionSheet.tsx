import * as React from 'react';
import { View, Platform } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZActionSheetItem, ZActionSheetViewItem } from './ZActionSheetItem';
import { ZModalController } from './ZModal';
import { isPad } from 'openland-mobile/pages/Root';

interface ActionSheetBuilderActionItem {
    __typename: "ActionItem";

    name: string;
    callback: () => void;
    distructive?: boolean;
    icon?: any;
}

interface ActionSheetBuilderViewItem {
    __typename: "ViewItem";

    view: (ctx: ZModalController) => void;
}

export class ActionSheetBuilder {
    private _title?: string;
    private _items: (ActionSheetBuilderActionItem | ActionSheetBuilderViewItem)[] = [];
    private _flat: boolean;

    constructor() {
        this._flat = Platform.OS === 'android' ? true : false;
    }

    flat(): ActionSheetBuilder {
        this._flat = true;

        return this;
    }

    title(title: string): ActionSheetBuilder {
        this._title = title;
        return this;
    }

    action(name: string, callback: () => void, distructive?: boolean, icon?: any): ActionSheetBuilder {
        let item: ActionSheetBuilderActionItem = { __typename: "ActionItem", name, callback, distructive, icon };

        this._items.push(item);
        return this;
    }

    view(view: (ctx: ZModalController) => void): ActionSheetBuilder {
        let item: ActionSheetBuilderViewItem = { __typename: "ViewItem", view };

        this._items.push(item);
        return this;
    }

    show() {
        showSheetModal((ctx) => {
            return (
                <View flexDirection="column" alignItems="stretch">
                    {this._items.map((a, i) => (
                        <>
                            {a.__typename === 'ActionItem' && (
                                <ZActionSheetItem
                                    key={i + '-ac'}
                                    icon={a.icon}
                                    appearance={a.distructive ? 'danger' : 'default'}
                                    name={a.name}
                                    onPress={() => { ctx.hide(); a.callback(); }}
                                    separator={(isPad && !this._flat) ? true : (i !== this._items.length - 1)}
                                />
                            )}
                            {a.__typename === 'ViewItem' && (
                                <ZActionSheetViewItem key={i + '-view'} separator={(isPad && !this._flat) ? true : (i !== this._items.length - 1)}>
                                    {a.view(ctx)}
                                </ZActionSheetViewItem>
                            )}
                        </>
                    ))}
                </View>
            );
        }, this._flat);
    }
}

export class ActionSheet {
    static builder = () => {
        return new ActionSheetBuilder();
    }
}
