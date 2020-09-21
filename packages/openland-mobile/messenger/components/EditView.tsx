import * as React from 'react';
import { FullMessage } from 'openland-api/spacex.types';
import { InputTopView } from './InputTopView';

interface EditViewProps {
    message: FullMessage;
    isComment?: boolean;
    isClosing?: boolean;

    onClearPress: () => void;
}

export const EditView = (props: EditViewProps) => {
    const { message, isComment, isClosing, onClearPress } = props;

    const title = isComment ? 'Edit comment' : 'Edit message';
    const text = message.message || '';

    return <InputTopView isClosing={isClosing} title={title} text={text} icon={require('assets/ic-edit-24.png')} onClearPress={onClearPress} />;
};