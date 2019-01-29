import * as React from 'react';
import { View, Platform, Keyboard, NativeSyntheticEvent } from 'react-native';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SDevice } from 'react-native-s/SDevice';
import { SSafeAreaProvider } from 'react-native-s/SSafeArea';

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
        this.setState({ keyboardHeight: e ? e.endCoordinates.height : 0 });
    }

    componentDidMount() {
        if (Platform.OS !== 'ios') {
            Keyboard.addListener('keyboardDidShow', this.onKeyboardChange);
            Keyboard.addListener('keyboardDidHide', this.onKeyboardChange);
        }
    }

    componentWillMount() {
        provider = this;
        if (Platform.OS !== 'ios') {
            Keyboard.removeListener('keyboardDidShow', this.onKeyboardChange);
            Keyboard.removeListener('keyboardDidHide', this.onKeyboardChange);
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
        Keyboard.dismiss();
        let key = randomKey();
        let cont: ZModalController = {
            hide: () => {
                this.setState((state) => ({ modals: state.modals.filter((v) => v.key !== key) }));
            }
        }
        let element = modal(cont);
        this.setState((state) => ({ modals: [...state.modals, { key, element }] }));
    }

    render() {
        return (
            <>
                <View width="100%" height="100%">
                    {this.props.children}
                    {this.state.modals.map((v) => (
                        <View key={v.key} position="absolute" top={0} left={0} right={0} bottom={0}>
                            <SSafeAreaProvider bottom={SDevice.safeArea.bottom + this.state.keyboardHeight} top={SDevice.safeArea.top}>
                                {v.element}
                            </SSafeAreaProvider>
                        </View>
                    ))}
                </View>
            </>
        )
    }
}