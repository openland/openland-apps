import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { ZKeyboardAvoidingView } from './ZKeyboardAvoidingView';

export class ZSafeAreaView extends React.Component {
    render() {
        return (
            <ZKeyboardAvoidingView>
                <SafeAreaView style={{ backgroundColor: '#fff', height: '100%', flexDirection: 'column' }}>
                    {this.props.children}
                </SafeAreaView>
            </ZKeyboardAvoidingView>
        );
    }
}