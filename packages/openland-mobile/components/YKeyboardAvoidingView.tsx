import * as React from 'react';
import { Dimensions, Platform, KeyboardAvoidingView } from 'react-native';

let keyboardVerticalOffset = 0;
const isIPhoneX = Dimensions.get('window').height === 812;
if (isIPhoneX) {
    keyboardVerticalOffset = 55;
} else if (Platform.OS === 'ios') {
    keyboardVerticalOffset = 65;
}

export class YKeyboardAvoidingView extends React.PureComponent {
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={keyboardVerticalOffset}>
                {this.props.children}
            </KeyboardAvoidingView>
        );
    }
}