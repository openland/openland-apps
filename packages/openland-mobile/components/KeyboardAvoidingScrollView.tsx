import * as React from 'react';
import { SScrollView } from 'react-native-s/SScrollView';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { XMemo } from 'openland-y-utils/XMemo';

export const KeyboardAvoidingScrollView = XMemo((props) => {
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
