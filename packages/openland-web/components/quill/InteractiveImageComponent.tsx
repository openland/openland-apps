import * as React from 'react';
import { interactiveComponent } from './InteractiveComponent';
import { XView } from 'react-mental';

export const InteractiveImageComponent = interactiveComponent<{ id: string }>((props) => {
    return (
        <XView width="100%" alignItems="center" height={300} backgroundColor="red">
            {}
        </XView>
    );
});