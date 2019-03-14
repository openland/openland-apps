import * as React from 'react';
import { View } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZActionSheetItem } from './ZActionSheetItem';

interface ActionSheetBuilderActionItem {
    __typename: "ActionItem";

    name: string;
    callback: () => void;
    distructive?: boolean;
    icon?: any;
}

interface ActionSheetBuilderViewItem {
    __typename: "ViewItem";

    view: any;
}

export class ActionSheetBuilder {
    private _title?: string;
    private _items: (ActionSheetBuilderActionItem | ActionSheetBuilderViewItem)[] = [];

    title(title: string): ActionSheetBuilder {
        this._title = title;
        return this;
    }

    action(name: string, callback: () => void, distructive?: boolean, icon?: any): ActionSheetBuilder {
        let item: ActionSheetBuilderActionItem = { __typename: "ActionItem", name, callback, distructive, icon };

        this._items.push(item);
        return this;
    }

    view(view: any): ActionSheetBuilder {
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
                                />
                            )}
                            {a.__typename === 'ViewItem' && a.view}
                        </>
                    ))}
                </View>
            )
        });
    }
}

export class ActionSheet {
    static builder = () => {
        return new ActionSheetBuilder();
    }
}
