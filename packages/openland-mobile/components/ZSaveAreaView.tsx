import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { ZKeyboardAvoidingView } from './ZKeyboardAvoidingView';
import { AppStyles } from '../styles/AppStyles';

export class ZSafeAreaView extends React.Component<{ backgroundColor?: string }> {
    render() {
        return (
            <ZKeyboardAvoidingView>
                <SafeAreaView style={{ backgroundColor: this.props.backgroundColor || AppStyles.backyardColor, height: '100%', flexDirection: 'column' }}>
                    {this.props.children}
                </SafeAreaView>
            </ZKeyboardAvoidingView>
        );
    }
}