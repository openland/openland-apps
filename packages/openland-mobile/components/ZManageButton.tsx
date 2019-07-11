import * as React from 'react';
import { Platform } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

interface ZManageButtonProps {
    onPress: () => void;
}

export const ZManageButton = (props: ZManageButtonProps) => (
    <SHeaderButton
        title="Manage"
        icon={Platform.OS === 'android' ? require('assets/ic-more-android-24.png') : require('assets/ic-more-24.png')}
        onPress={props.onPress}
    />
);