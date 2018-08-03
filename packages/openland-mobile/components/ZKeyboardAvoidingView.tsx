import * as React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { ZAppConfig } from './ZAppConfig';

export class ZKeyboardAvoidingView extends React.Component {

    render() {
        return (
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={-ZAppConfig.bottomNavigationBarInset} >
                {this.props.children}
            </KeyboardAvoidingView>
        );
    }
}