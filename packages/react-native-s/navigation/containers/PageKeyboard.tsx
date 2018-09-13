import * as React from 'react';
import { ASKeyboardContext, ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { NativeSyntheticEvent, StyleProp, ViewStyle, Platform, View } from 'react-native';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { DeviceConfig } from '../DeviceConfig';

export interface PageKeyboardProps {
    contextKey: string;
    style?: StyleProp<ViewStyle>;
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
                <ASKeyboardContext style={this.props.style} contextKey={this.props.contextKey} onKeyboardChanged={this.handleKeyboard} bottomSafeInset={DeviceConfig.bottomNavigationBarInset}>
                    <ASSafeAreaProvider bottom={this.state.keyboardHeight + DeviceConfig.bottomNavigationBarInset} top={DeviceConfig.navigationBarContentInsetSmall}>
                        <ASKeyboardAcessoryViewContext.Provider value={this}>
                            {this.props.children}
                        </ASKeyboardAcessoryViewContext.Provider>
                    </ASSafeAreaProvider>
                </ASKeyboardContext>
            );
        }
        return (
            <View style={this.props.style}>
                <ASSafeAreaProvider bottom={this.state.keyboardHeight + DeviceConfig.bottomNavigationBarInset} top={DeviceConfig.navigationBarContentInsetSmall}>
                    {this.props.children}
                </ASSafeAreaProvider>
            </View>
        );
    }
}