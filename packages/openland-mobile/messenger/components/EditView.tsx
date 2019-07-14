import * as React from 'react';
import { Message_message } from 'openland-api/Types';
import { InputTopView } from './InputTopView';

interface EditViewProps {
    message: Message_message;
    isComment?: boolean;

    onClearPress: () => void;
}

export const EditView = (props: EditViewProps) => {
    const { message, isComment, onClearPress } = props;

    const title = isComment ? 'Edit comment' : 'Edit message';
    const text = message.message || '';

    return <InputTopView title={title} text={text} icon={require('assets/ic-edit-24.png')} onClearPress={onClearPress} />;
};