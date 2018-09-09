import * as React from 'react';
import { Platform, EmitterSubscription, Keyboard, LayoutAnimation, Dimensions } from 'react-native';

export class ZKeyboardListener extends React.PureComponent<{ bottomOffset: number, children: (height: number) => React.ReactNode }, { height: number }> {
    private subscriptions: EmitterSubscription[] = [];
    private keyboardVisible = false;
    private keyboardShown = false;
    private keybardHiding = false;

    state = {
        height: 0
    };

    private _relativeKeyboardHeight = (keyboardFrame: any) => {
        return Math.max(Dimensions.get('window').height - (keyboardFrame.screenY as number) - this.props.bottomOffset, 0);
    }

    keyboardWillHideHandler = (src: any) => {
        // if (this.keybardHiding) {
        //     return;
        // }
        // this.keybardHiding = true;

        if (this.state.height !== 0) {
            if (src.duration && src.easing) {
                LayoutAnimation.configureNext({
                    duration: src.duration,
                    update: {
                        duration: src.duration,
                        type: LayoutAnimation.Types[src.easing] || 'keyboard',
                    },
                });
            }
            this.setState({ height: 0 });
        }
        // setTimeout(
        //     () => {
        //         if (this.keyboardVisible) {
        //             this.keyboardVisible = false;
        //             this.keyboardShown = false;
        //         }
        //         if (this.keybardHiding) {
        //             this.keybardHiding = false;
        //         }
        //     },
        //     src.duration || 250);
    }

    keyboardChangeFrame = (src: any) => {
        // if (!this.keyboardVisible || !this.keyboardShown) {
        //     return;
        // }

        const height = this._relativeKeyboardHeight(src.endCoordinates);
        console.log('[KEYBOARD] JS frame height: ' + height);
        if (this.state.height !== height) {
            if (src.duration && src.easing) {
                LayoutAnimation.configureNext({
                    duration: src.duration,
                    update: {
                        duration: src.duration,
                        type: LayoutAnimation.Types[src.easing] || 'keyboard',
                    },
                });
            }
            this.setState({ height: height });
        }
    }

    keyboardWillShowHandler = (src: any) => {
        // if (this.keyboardVisible) {
        //     return;
        // }
        // this.keyboardVisible = true;
        // this.keyboardShown = false;
        // this.keybardHiding = false;

        const height = this._relativeKeyboardHeight(src.endCoordinates);
        if (this.state.height !== height) {
            if (src.duration && src.easing) {
                LayoutAnimation.configureNext({
                    duration: src.duration,
                    update: {
                        duration: src.duration,
                        type: LayoutAnimation.Types[src.easing] || 'keyboard',
                    },
                });
            }
            this.setState({ height: height });
        }
        // setTimeout(
        //     () => {
        //         if (this.keyboardVisible) {
        //             this.keyboardShown = true;
        //         }
        //     },
        //     src.duration || 250);
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            // this.subscriptions.push(Keyboard.addListener('keyboardWillShow', this.keyboardWillShowHandler));
            // this.subscriptions.push(Keyboard.addListener('keyboardWillHide', this.keyboardWillHideHandler));
            this.subscriptions.push(Keyboard.addListener('keyboardWillChangeFrame', this.keyboardChangeFrame));
        }
    }
    componentWillUnmount() {
        for (let s of this.subscriptions) {
            s.remove();
        }
    }
    render() {
        return this.props.children(this.state.height);
    }
}