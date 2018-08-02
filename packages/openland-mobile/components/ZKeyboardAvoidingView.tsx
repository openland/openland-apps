import * as React from 'react';
import { Dimensions, Platform, KeyboardAvoidingView } from 'react-native';

export class ZKeyboardAvoidingView extends React.Component {
    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                {this.props.children}
            </KeyboardAvoidingView>
        );
    }
}