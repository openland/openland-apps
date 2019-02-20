import * as React from 'react';
import { View, Platform, Keyboard, NativeSyntheticEvent, DeviceEventEmitter } from 'react-native';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SDevice } from 'react-native-s/SDevice';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';

export interface ZModalController {
    hide(): void;
}

export type ZModal = (modal: ZModalController) => React.ReactElement<{}>;

interface ZModalProviderInt {
    showModal(modal: ZModal): void;
}

let provider: ZModalProviderInt | undefined;

export function showModal(modal: ZModal) {
    if (provider) {
        provider.showModal(modal);
    }
}

export class ZModalProvider extends React.Component<{ children?: any }, { modals: { element: React.ReactElement<{}>, key: string }[], keyboardHeight: number, acessoryHeight: number }> implements ZModalProviderInt {

    constructor(props: { children?: any }) {
        super(props);
        this.state = {
            modals: [],
            keyboardHeight: 0,
            acessoryHeight: 0
        };
    }

    onKeyboardChange = (e: any) => {
        console.log(e);
        this.setState({ keyboardHeight: e ? e.height : 0 });
    }

    componentWillMount() {
        provider = this;
        if (Platform.OS !== 'ios') {
            DeviceEventEmitter.addListener('async_keyboard_height', this.onKeyboardChange);
        }
    }

    componentWillUnmount() {
        if (Platform.OS !== 'ios') {
            DeviceEventEmitter.removeListener('async_keyboard_height', this.onKeyboardChange);
        }
    }

    handleKeyboard = (event?: NativeSyntheticEvent<{ state: { height: number, duration: number, curve: number, name: string } }>) => {
        if (event) {
            this.setState({ keyboardHeight: event.nativeEvent.state.height });
        }
    }

    updateSize = (height: number) => {
        this.setState({ acessoryHeight: height });
    }

    showModal(modal: ZModal) {
        setTimeout(() => {
            Keyboard.dismiss();
            let key = randomKey();
            let cont: ZModalController = {
                hide: () => {
                    this.setState((state) => ({ modals: state.modals.filter((v) => v.key !== key) }));
                }
            }
            let element = modal(cont);
            this.setState((state) => ({ modals: [...state.modals, { key, element }] }));
        }, 1);
    }

    render() {
        return (
            <>
                {this.state.modals.map((v) => (
                    <View key={v.key} position="absolute" top={0} left={0} right={0} bottom={0}>
                        <ASSafeAreaProvider bottom={SDevice.safeArea.bottom + this.state.keyboardHeight} top={SDevice.safeArea.top}>
                            {v.element}
                        </ASSafeAreaProvider>
                    </View>
                ))}
            </>
        )
    }
}