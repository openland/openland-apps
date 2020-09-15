import * as React from 'react';
import { ASKeyboardContext, ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { NativeSyntheticEvent, Platform, View, DeviceEventEmitter } from 'react-native';
import { SDevice } from '../../SDevice';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';

export interface PageKeyboardProps {
    contextKey: string;
}

export class PageKeyboard extends React.PureComponent<PageKeyboardProps, { keyboardHeight: number, acessoryHeight: number }> {
    constructor(props: PageKeyboardProps) {
        super(props);
        this.state = {
            keyboardHeight: 0,
            acessoryHeight: 0
        };
    }

    onKeyboardChange = (e: any) => {
        let height = e ? e.height : 0;
        let compensation = SDevice.safeArea.bottom === 0 ? SDevice.navigationBarHeight : 0;
        this.setState({ keyboardHeight: height === 0 ? height : height + compensation });
    }

    componentWillMount() {
        if (Platform.OS !== 'ios') {
            DeviceEventEmitter.addListener('async_keyboard_height', this.onKeyboardChange);
            // Keyboard.addListener('keyboardDidShow', this.onKeyboardChange);
            // Keyboard.addListener('keyboardDidHide', this.onKeyboardChange);
        }
    }

    componentWillUnmount() {
        if (Platform.OS !== 'ios') {
            DeviceEventEmitter.removeListener('async_keyboard_height', this.onKeyboardChange);
            // Keyboard.removeListener('keyboardDidShow', this.onKeyboardChange);
            // Keyboard.removeListener('keyboardDidHide', this.onKeyboardChange);
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

    render() {
        if (Platform.OS === 'ios') {
            return (
                <View style={{ width: '100%', height: '100%' }}>
                    <ASKeyboardContext
                        style={{ width: '100%', height: '100%' }}
                        contextKey={this.props.contextKey}
                        onKeyboardChanged={this.handleKeyboard}
                        bottomSafeInset={SDevice.safeArea.bottom}
                    >
                        <ASSafeAreaProvider
                            bottom={this.state.keyboardHeight}
                            openKeyboardHeight={this.state.keyboardHeight}
                        >
                            <ASKeyboardAcessoryViewContext.Provider value={this}>
                                {this.props.children}
                            </ASKeyboardAcessoryViewContext.Provider>
                        </ASSafeAreaProvider>
                    </ASKeyboardContext>
                </View>
            );
        }
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <ASSafeAreaProvider
                    bottom={this.state.keyboardHeight}
                    keyboardHeight={this.state.keyboardHeight}
                    openKeyboardHeight={this.state.keyboardHeight}
                >
                    {this.props.children}
                </ASSafeAreaProvider>
            </View>
        );
    }
}