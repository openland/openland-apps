import * as React from 'react';
import { Platform, ActionSheetIOS, View, Alert, Text } from 'react-native';
import { showSheetModal } from './showSheetModal';
import { ZListItem } from './ZListItem';
import { ZRoundedButton } from './ZRoundedButton';
import { showBlanketModal } from './showBlanketModal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';

export class AlertBlanketBuilder {
    private _title?: string;
    private _message?: string;
    private _cancalable?: boolean;
    private _actions: { name: string, callback?: () => void, style?: BlanketButtonsStyle }[] = [];

    alert(message: string) {
        this._title = message;
        this._actions = [{ name: 'Cancel' }]
        this.show();
    }

    title(title: string): AlertBlanketBuilder {
        this._title = title;
        return this;
    }

    cancalable(cancalable: boolean): AlertBlanketBuilder {
        this._cancalable = cancalable;
        return this;
    }

    message(message: string): AlertBlanketBuilder {
        this._message = message;
        return this;
    }

    button(name: string, style?: BlanketButtonsStyle, callback?: () => void): AlertBlanketBuilder {
        this._actions.push({ name, callback, style });
        return this;
    }

    show() {
        if (Platform.OS === 'ios') {
            Alert.alert(this._title || '', this._message, this._actions.map(a => ({ text: a.name, onPress: a.callback, style: a.style })))
        } else if (Platform.OS === 'android') {
            showBlanketModal((ctx) => {
                return (
                    <View
                        flexDirection="column"
                        justifyContent="flex-start"
                        paddingHorizontal={24}
                        paddingVertical={20}
                    >
                        {this._title && <Text style={{ marginBottom: this._message ? 12 : 16, color: '#000', fontSize: 20, fontWeight: TextStyles.weight.medium as any }}>{this._title}</Text>}
                        {this._message && <Text style={{ marginBottom: 16, color: '#000', fontSize: 16 }}>{this._message}</Text>}
                        <View flexDirection="row" alignItems="flex-end" alignSelf="flex-end" >
                            {this._actions.map((a, i) => (
                                <>
                                    <View style={{ width: 4 }} />
                                    <ZRoundedButton
                                        key={i + '-ac'}
                                        size="big"
                                        style={a.style === 'cancel' ? 'flat' : a.style === 'destructive' ? 'danger' : 'default'}
                                        title={a.name}
                                        onPress={() => {
                                            ctx.hide();
                                            if (a.callback) {
                                                a.callback();
                                            }
                                        }}
                                    />
                                </>
                            ))}
                        </View>
                    </View>

                )
            }, this._cancalable);
        }
    }
}