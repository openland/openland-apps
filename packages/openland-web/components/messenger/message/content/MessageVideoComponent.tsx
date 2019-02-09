import * as React from 'react';
import { XView } from 'react-mental';

interface MessageVideoComponentProps {
    file?: string;
    fileName?: string;
}

export const MessageVideoComponent = (props: MessageVideoComponentProps) => {
    let href = undefined;

    if (props.file) {
        href = `https://ucarecdn.com/${props.file}/${props.fileName ? props.fileName!! : ''}`;
    }
    return (
        <XView minWidth={250} maxWidth={550} maxHeight={300}>
            <video controls={true}>
                <source src={href} type="video/mp4" />
            </video>
        </XView>
    );
};
