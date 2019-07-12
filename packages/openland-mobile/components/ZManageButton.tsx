import * as React from 'react';
import { Platform } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

interface ZManageButtonProps {
    onPress: () => void;
}

export const ZManageButton = (props: ZManageButtonProps) => (
    <SHeaderButton
        title="Manage"
        icon={require('assets/ic-header-manage-24.png')}
        onPress={props.onPress}
    />
);