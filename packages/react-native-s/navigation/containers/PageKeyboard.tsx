import * as React from 'react';
import { ASKeyboardContext, ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { NativeSyntheticEvent, Platform, View, DeviceEventEmitter } from 'react-native';
import { SDevice } from '../../SDevice';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';

function throttleWithLastCall(callback: Function, limit: number) {
    let waiting = false;
    let lastArgs: any;
    return function (...args: any) {
        lastArgs = args;
        if (!waiting) {
            callback(...lastArgs);
            waiting = true;
            setTimeout(function () {
                callback(...lastArgs);
                waiting = false;
            }, limit);
        }
    };
}

export interface PageKeyboardProps {
    contextKey: string;
}

export class PageKeyboard extends React.PureComponent<PageKeyboardProps, { keyboardHeight: number, acessoryHeight: number, actualAccessoryHeight: number }> {
    constructor(props: PageKeyboardProps) {
        super(props);
        this.state = {
            keyboardHeight: 0,
            acessoryHeight: 0,
            actualAccessoryHeight: 0
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

    handleIOSKeyboardChange = throttleWithLastCall((state: { height: number, duration: number, curve: number, name: string, acHeight: number }) => {
        this.setState({ keyboardHeight: state.height, actualAccessoryHeight: state.acHeight });
    }, 100);

    handleKeyboard = (event?: NativeSyntheticEvent<{ state: { height: number, duration: number, curve: number, name: string, acHeight: number } }>) => {
        if (event) {
            this.handleIOSKeyboardChange(event.nativeEvent.state);
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
                            openKeyboardHeight={this.state.keyboardHeight - this.state.actualAccessoryHeight}
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