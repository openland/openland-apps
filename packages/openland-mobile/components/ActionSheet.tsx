import * as React from 'react';
import { View } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZActionSheetItem } from './ZActionSheetItem';
import { AppStyles } from 'openland-mobile/styles/AppStyles';
import { ZModalController } from './ZModal';

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
                            {a.__typename === 'ViewItem' && (
                                <>
                                    {a.view(ctx)}
                                    <View style={{ backgroundColor: AppStyles.separatorColor, height: 1 }} />
                                </>
                            )}
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
