import * as React from 'react';
import { XView } from 'react-mental';
import { useCheckPerf } from 'openland-web/hooks/useCheckPerf';

interface MessageVideoComponentProps {
    file?: string;
    fileName?: string;
}

export const MessageVideoComponent = React.memo((props: MessageVideoComponentProps) => {
    // useCheckPerf({ name: 'MessageVideoComponent' });
    let href = undefined;

    if (props.file) {
        href = `https://ucarecdn.com/${props.file}/${props.fileName ? props.fileName!! : ''}`;
    }
    return (
        <XView
            minWidth={250}
            maxWidth={550}
            minHeight={300}
            maxHeight={300}
            height={300}
            flexShrink={0}
        >
            <video controls={true}>
                <source src={href} type="video/mp4" />
            </video>
        </XView>
    );
});
