import * as React from 'react';
import { ASKeyboardContext, ASKeyboardAcessoryViewContext } from 'react-native-async-view/ASKeyboardContext';
import { NativeSyntheticEvent, Platform, View, Keyboard } from 'react-native';
import { SNavigationViewStyle } from '../../SNavigationView';
import { SDevice } from '../../SDevice';
import { SSafeAreaProvider } from 'react-native-s/SSafeArea';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';

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
                <ASSafeAreaProvider bottom={this.state.keyboardHeight} keyboardHeight={this.state.keyboardHeight}>
                    {this.props.children}
                </ASSafeAreaProvider>
            </View>
        );
    }
}