import * as React from 'react';
import { XView } from 'react-mental';
import { URickInput, URickInputInstance } from 'openland-web/components/unicorn/URickInput';

export const DiscussionEditorComponent = React.memo(() => {
    const contentRef = React.useRef<URickInputInstance>(null);
    return (
        <XView>
            <XView>
                <URickInput
                    appearance="article-title"
                    onPressEnter={async () => {
                        contentRef!.current!.focus();
                        return false;
                    }}
                    onPressTab={async () => {
                        contentRef!.current!.focus();
                        return false;
                    }}
                    hideEmoji={true}
                    placeholder="Title"
                />
            </XView>
            <URickInput ref={contentRef} hideEmoji={true} appearance="article" placeholder="Your story..." />
        </XView>
    );
});