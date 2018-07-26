import * as React from 'react';
import { Keyboard } from 'react-native';
import { NavigationEventSubscription, NavigationScreenProp } from 'react-navigation';

export class KeyboardHider extends React.PureComponent<{ navigation: NavigationScreenProp<any> }> {
    private backSubscription: NavigationEventSubscription | null = null;

    componentWillMount() {
        this.backSubscription = this.props.navigation.addListener('willBlur', this.onBlur);
    }

    onBlur() {
        Keyboard.dismiss();
    }

    componentWillUnmount() {
        if (this.backSubscription) {
            this.backSubscription.remove();
            this.backSubscription = null;
        }
    }

    render() {
        return null;
    }
}