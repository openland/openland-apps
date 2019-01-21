import * as React from 'react';
import { Platform, AlertIOS, View, Text, KeyboardAvoidingView } from 'react-native';
import DialogAndroid from 'react-native-dialogs';
import { showBlanketModal } from './showBlanketModal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { TextInput } from 'react-native-gesture-handler';
import { ZRoundedButton } from './ZRoundedButton';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';

export class PromptBuilder {
    private _title?: string;
    private _callback?: (text: string) => void;
    private _value?: string;
    private _actions: { name: string, callback?: (value?: string) => void, style?: BlanketButtonsStyle }[] = [];

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

    onTextChange = (value: string) => {
        this._value = value;
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

            if (this._actions.length === 0) {
                this._actions.push({ name: 'Cancel', style: 'cancel' });
                this._actions.push({ name: 'Ok', callback: this._callback });
            }

            showBlanketModal((ctx) => {
                return (
                    <View
                        flexDirection="column"
                        justifyContent="flex-start"
                        paddingHorizontal={24}
                        paddingVertical={20}
                    >
                        {this._title && <Text style={{ marginBottom: 12, color: '#000', fontSize: 20, fontWeight: TextStyles.weight.medium as any }}>{this._title}</Text>}
                        <TextInput defaultValue={this._value} onChangeText={this.onTextChange} autoFocus={true} multiline={true} maxHeight={100} />
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
                                                a.callback(this._value);
                                            }
                                        }}
                                    />
                                </>
                            ))}
                        </View>
                    </View>

                )
            });
        }
    }
}