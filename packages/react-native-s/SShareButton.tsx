import * as React from 'react';
import { ActionButton } from './navigation/buttons/ActionButton';

interface SShareButtonProps {
    tintColor?: string;
    onPress?: () => void;
}

export const SShareButton = React.memo((props: SShareButtonProps) => (
    <ActionButton icon={require('assets/ic-share-24.png')} iconColor={props.tintColor} onPress={props.onPress} title="Share" />
));