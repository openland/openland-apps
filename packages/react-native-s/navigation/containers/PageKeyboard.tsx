import * as React from 'react';
import { ASKeyboardContext, ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { NativeSyntheticEvent, Platform, View } from 'react-native';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SDevice } from '../../SDevice';
import { SSafeAreaProvider } from 'react-native-s/SSafeArea';

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
                <View style={{ width: '100%', height: '100%' }}>
                    <ASKeyboardContext
                        style={{ width: '100%', height: '100%' }}
                        contextKey={this.props.contextKey}
                        onKeyboardChanged={this.handleKeyboard}
                        bottomSafeInset={SDevice.safeArea.bottom}
                    >
                        <SSafeAreaProvider
                            bottom={this.state.keyboardHeight}
                        >
                            <ASKeyboardAcessoryViewContext.Provider value={this}>
                                {this.props.children}
                            </ASKeyboardAcessoryViewContext.Provider>
                        </SSafeAreaProvider>
                    </ASKeyboardContext>
                </View>
            );
        }
        return (
            <View style={{ width: '100%', height: '100%' }}>
                {this.props.children}
            </View>
        );
    }
}