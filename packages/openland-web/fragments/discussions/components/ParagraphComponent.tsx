import * as React from 'react';
import { XView } from 'react-mental';
import { ParagraphSimple } from 'openland-api/spacex.types';

export const ParagraphComponent = React.memo((props: { data: ParagraphSimple }) => {
    if (props.data.__typename === 'TextParagraph') {
        return (
            <XView>
                {props.data.text}
            </XView>
        );
    }
    return null;
});
