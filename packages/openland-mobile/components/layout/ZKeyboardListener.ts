import * as React from 'react';
import { Platform, EmitterSubscription, Keyboard, LayoutAnimation, Dimensions } from 'react-native';

export class ZKeyboardListener extends React.PureComponent<{ bottomOffset: number, children: (height: number) => React.ReactNode }, { height: number }> {
    private subscription: EmitterSubscription | null = null;
    private _eventId = 0;

    state = {
        height: 0
    };

    _relativeKeyboardHeight = (keyboardFrame: any) => {
        return Math.max(Dimensions.get('window').height - (keyboardFrame.screenY as number) - this.props.bottomOffset, 0);
    }

    keyboardChangeHandler = (src: any) => {
        if (!src) {
            this._eventId = 0;
            this.setState({ height: 0 });
            return;
        }
        const height = this._relativeKeyboardHeight(src.endCoordinates);
        if (height === 0) {
            this._eventId = 0;
        } else {
            this._eventId++;
        }

        // We are ignoring second event since it ususally is incorrect and excludes Acessory View height on iOS
        if (this._eventId === 2) {
            return;
        }

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
        return this.props.children(this.state.height);
    }
}