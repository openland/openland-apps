import * as React from 'react';
import { ASKeyboardContext, ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { NativeSyntheticEvent, StyleProp, ViewStyle, Platform, View } from 'react-native';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { DeviceConfig } from '../DeviceConfig';
import { SDevice } from '../../SDevice';
import { SNavigationViewStyle } from '../../SNavigationView';

export interface PageKeyboardProps {
    contextKey: string;
    style: SNavigationViewStyle;
}

export class PageKeyboard extends React.PureComponent<PageKeyboardProps, { keyboardHeight: number, acessoryHeight: number }> {
    constructor(props: PageKeyboardProps) {
        super(props);
        this.state = {
            keyboardHeight: 0,
            acessoryHeight: 0
        };
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
                <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
                    <ASKeyboardContext
                        contextKey={this.props.contextKey}
                        onKeyboardChanged={this.handleKeyboard}
                        bottomSafeInset={DeviceConfig.bottomNavigationBarInset}
                    >
                        <ASSafeAreaProvider
                            bottom={this.state.keyboardHeight}
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
            <View style={{ width: '100%', height: '100%', flexDirection: 'column', alignItems: 'stretch' }}>
                {this.props.children}
            </View>
        );
    }
}