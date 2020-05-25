import * as React from 'react';
import { XView } from 'react-mental';
import { URickInput } from 'openland-web/components/unicorn/URickInput';

export const DiscussionEditorComponent = React.memo(() => {
    return (
        <XView>
            <URickInput hideEmoji={true} appearance="article" />
        </XView>
    );
});