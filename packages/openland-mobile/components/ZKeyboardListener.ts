import * as React from 'react';
import { Platform, EmitterSubscription, Keyboard, LayoutAnimation, Dimensions } from 'react-native';
import { ZAppConfig } from './ZAppConfig';

export class ZKeyboardListener extends React.PureComponent<{ children: (height: number) => React.ReactNode }, { height: number }> {
    private subscription: EmitterSubscription | null = null;
    private _frame: any = null;

    state = {
        height: 0
    };

    _relativeKeyboardHeight = (keyboardFrame: any) => {
        // const frame = this._frame;
        // if (!frame || !keyboardFrame) {
        //     return 0;
        // }

        const keyboardY = keyboardFrame.screenY;

        // Calculate the displacement needed for the view such that it
        // no longer overlaps with the keyboard
        // return Math.max(frame.y + frame.height - keyboardY, 0);
        return Math.max(Dimensions.get('window').height - (keyboardY as number) - ZAppConfig.bottomNavigationBarInset, 0);
    }

    keyboardChangeHandler = (src: any) => {
        if (!src) {
            this.setState({ height: 0 });
            return;
        }
        const height = this._relativeKeyboardHeight(src.endCoordinates);

        if (this.state.height === height) {
            return;
        }

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

    componentDidMount() {
        if (Platform.OS === 'ios') {
            this.subscription = Keyboard.addListener('keyboardWillChangeFrame', this.keyboardChangeHandler);
        }
    }
    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.remove();
        }
    }
    render() {
        console.log(this.state.height);
        return this.props.children(this.state.height);
    }
}