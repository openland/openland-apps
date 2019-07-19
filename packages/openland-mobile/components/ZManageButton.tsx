import * as React from 'react';
import { SHeaderButton } from 'react-native-s/SHeaderButton';

interface ZManageButtonProps {
    onPress: () => void;
}

export const ZManageButton = (props: ZManageButtonProps) => (
    <SHeaderButton
        title="Manage"
        icon={require('assets/ic-more-24.png')}
        onPress={props.onPress}
    />
);