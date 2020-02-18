import * as React from 'react';
import { View, Platform } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZModalController } from './ZModal';
import { ZListItem } from './ZListItem';
import { ZButton } from './ZButton';
import { BottomSheetActions, showBottomSheet } from './BottomSheet';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { isPad } from 'openland-mobile/pages/Root';

interface ActionSheetBuilderActionItem {
    __typename: "ActionItem";

    name: string;
    callback: () => void;
    distructive?: boolean;
    icon?: any;
    subtitle?: string;
    checkMark?: boolean;
}

interface ActionSheetBuilderViewItem {
    __typename: "ViewItem";

    view: (ctx: ZModalController) => JSX.Element;
}

export class ActionSheetBuilder {
    private _title: string | undefined;
    private _items: (ActionSheetBuilderActionItem | ActionSheetBuilderViewItem)[] = [];
    private _cancelable: boolean;
    private _buttonTitle: string = 'Cancel';

    constructor(buttonTitle?: string) {
        this._cancelable = Platform.OS === 'ios';

        if (buttonTitle) {
            this._buttonTitle = buttonTitle;
        }
    }

    title(title: string): ActionSheetBuilder {
        this._title = title;

        return this;
    }

    action(
        name: string,
        callback: () => void,
        distructive?: boolean,
        icon?: any,
        subtitle?: string,
        checkMark?: boolean
    ): ActionSheetBuilder {

        let item: ActionSheetBuilderActionItem = {
            __typename: "ActionItem",
            name,
            callback,
            distructive,
            icon,
            subtitle,
            checkMark
        };

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
                                subTitle={a.subtitle}
                                small={true}
                                onPress={() => { ctx.hide(); a.callback(); }}
                                checkmark={a.checkMark}
                                checkmarkStyle={a.subtitle ? { marginBottom: -20 } : undefined}
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

    show(haptic?: boolean) {
        if (haptic) {
            ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });
        }

        if (isPad) {
            showSheetModal((ctx) => {
                return (
                    <View flexDirection="column" alignItems="stretch">
                        {this.renderItems(ctx)}
                        {this._cancelable && (
                            <View margin={16}>
                                <ZButton
                                    size="large"
                                    title={this._buttonTitle}
                                    style="secondary"
                                    onPress={() => { ctx.hide(); }}
                                />
                            </View>
                        )}
                    </View>
                );
            }, this._title);
        } else {
            showBottomSheet({ view: this.renderItems, cancelable: this._cancelable, title: this._title, buttonTitle: this._buttonTitle });
        }
    }
}

export const ActionSheet = {
    builder: () => {
        return new ActionSheetBuilder();
    }
};

export default ActionSheet;
