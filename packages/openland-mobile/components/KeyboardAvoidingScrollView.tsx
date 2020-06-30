import * as React from 'react';
import { SScrollView } from 'react-native-s/SScrollView';
import { KeyboardAvoidingView, Platform } from 'react-native';

export const KeyboardAvoidingScrollView = React.memo((props) => {
    if (Platform.OS === 'android') {
        return (
            <SScrollView safeAreaViaMargin={true}>
                {props.children}
            </SScrollView>
        );
    }
    
    return (
        <KeyboardAvoidingView flexGrow={1} behavior={'padding'}>
            <SScrollView>
                {props.children}
            </SScrollView>
        </KeyboardAvoidingView>
    );
});
