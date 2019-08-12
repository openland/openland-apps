import * as React from 'react';
import { ActionButton } from './navigation/buttons/ActionButton';

interface SCloseButtonProps {
    tintColor?: string;
    onPress?: () => void;
}

export const SCloseButton = React.memo((props: SCloseButtonProps) => (
    <ActionButton icon={require('assets/ic-close-24.png')} iconColor={props.tintColor} onPress={props.onPress} title="Close" />
));