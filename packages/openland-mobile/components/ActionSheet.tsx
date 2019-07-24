import * as React from 'react';
import { View, Platform } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZModalController } from './ZModal';
import { ZListItem } from './ZListItem';
import { ZRoundedButton } from './ZRoundedButton';
import { showBottomSheet, BottomSheetActions } from './BottomSheet';
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

    view: (ctx: ZModalController) => JSX.Element;
}

export class ActionSheetBuilder {
    private _items: (ActionSheetBuilderActionItem | ActionSheetBuilderViewItem)[] = [];
    private _cancelable: boolean;

    constructor() {
        this._cancelable = Platform.OS === 'ios';
    }

    action(name: string, callback: () => void, distructive?: boolean, icon?: any): ActionSheetBuilder {
        let item: ActionSheetBuilderActionItem = { __typename: "ActionItem", name, callback, distructive, icon };

        this._items.push(item);
        return this;
    }

    view(view: (ctx: ZModalController) => JSX.Element): ActionSheetBuilder {
        let item: ActionSheetBuilderViewItem = { __typename: "ViewItem", view };

        this._items.push(item);
        return this;
    }

    cancelable(value: boolean): ActionSheetBuilder {
        this._cancelable = value;

        return this;
    }

    renderItems = (ctx: ZModalController | BottomSheetActions) => {
        return (
            <> 
                {this._items.map((a, i) => (
                    <View key={i + 'list-item'}>
                        {a.__typename === 'ActionItem' && (
                            <ZListItem
                                key={i + '-ac'}
                                leftIcon={a.icon}
                                appearance={a.distructive ? 'danger' : 'default'}
                                text={a.name}
                                small={true}
                                onPress={() => { ctx.hide(); a.callback(); }}
                            />
                        )}
                        {a.__typename === 'ViewItem' && (
                            <View key={i + '-view'}>
                                {a.view(ctx)}
                            </View>
                        )}
                    </View>
                ))} 
            </>
        );
    }

    show() {
        if (isPad) {
            showSheetModal((ctx) => {
                return (
                    <View flexDirection="column" alignItems="stretch">
                        {this.renderItems(ctx)}
                        {this._cancelable && (
                            <View margin={16}>
                                <ZRoundedButton
                                    size="large"
                                    title="Cancel"
                                    style="secondary-inverted"
                                    onPress={() => { ctx.hide(); }}
                                />
                            </View>
                        )}
                    </View>
                );
            });
        } else {
            showBottomSheet(this.renderItems, { cancelable: this._cancelable });
        }
    }
}

export const ActionSheet = {
    builder: () => {
        return new ActionSheetBuilder();
    }
};

export default ActionSheet;
