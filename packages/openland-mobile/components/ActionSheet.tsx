import * as React from 'react';
import { View, Platform, ViewStyle } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZModalController } from './ZModal';
import { ZListItem } from './ZListItem';
import { ZButton } from './ZButton';
import { showBottomSheet } from './BottomSheet';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { isPad } from 'openland-mobile/pages/Root';
import { ModalConfiguration, ModalProps } from 'react-native-fast-modal';
import { t } from 'openland-mobile/text/useText';

interface ActionSheetBuilderActionItem {
    __typename: "ActionItem";

    name: string;
    callback: () => void;
    distructive?: boolean;
    icon?: any;
    subtitle?: string;
    checkMark?: boolean;
    rightElement?: JSX.Element;
}

interface ActionSheetBuilderViewItem {
    __typename: "ViewItem";

    view: (ctx: ZModalController) => JSX.Element;
}

interface ActionSheetViewShowOptions {
    containerStyle?: ViewStyle;
    showAnimation?: ModalConfiguration['showAnimation'];
    disableMargins?: boolean;
    disableBottomSafeArea?: boolean;
}

export class ActionSheetBuilder {
    private _title: string | undefined;
    private _titleAlign: 'left' | undefined;
    private _items: (ActionSheetBuilderActionItem | ActionSheetBuilderViewItem)[] = [];
    private _cancelable: boolean;
    private _buttonTitle: string = t('cancel', 'Cancel');

    constructor(buttonTitle?: string) {
        this._cancelable = Platform.OS === 'ios';

        if (buttonTitle) {
            this._buttonTitle = buttonTitle;
        }
    }

    title(title: string, titleAlign?: 'left'): ActionSheetBuilder {
        this._title = title;
        this._titleAlign = titleAlign;

        return this;
    }

    action(
        name: string,
        callback: () => void,
        distructive?: boolean,
        icon?: any,
        subtitle?: string,
        checkMark?: boolean,
        rightElement?: JSX.Element,
    ): ActionSheetBuilder {

        let item: ActionSheetBuilderActionItem = {
            __typename: "ActionItem",
            name,
            callback,
            distructive,
            icon,
            subtitle,
            checkMark,
            rightElement,
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

    renderItems = (ctx: ZModalController | ModalProps) => {
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
                                rightElement={a.rightElement}
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

    show(haptic?: boolean, options?: ActionSheetViewShowOptions) {
        if (haptic) {
            ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });
        }

        if (isPad) {
            showSheetModal((ctx) => {
                return (
                    <View style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                        {this.renderItems(ctx)}
                        {this._cancelable && (
                            <View style={{ margin: 16 }}>
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
            showBottomSheet({ view: this.renderItems, title: this._title, titleAlign: this._titleAlign, cancelable: this._cancelable, buttonTitle: this._buttonTitle, ...options });
        }
    }
}

export const ActionSheet = {
    builder: () => {
        return new ActionSheetBuilder();
    }
};

export default ActionSheet;
