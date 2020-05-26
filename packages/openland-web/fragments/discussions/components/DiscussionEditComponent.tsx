import * as React from 'react';
import { XView } from 'react-mental';
import { URickInput, URickInputInstance } from 'openland-web/components/unicorn/URickInput';
import { DiscussionSimple } from 'openland-api/spacex.types';
import { InvalidateSync } from '@openland/patterns';
import { useClient } from 'openland-api/useClient';

export const DiscussionEditComponent = React.memo((props: { data: DiscussionSimple }) => {
    const initial = React.useMemo(() => props.data, []);
    const contentRef = React.useRef<URickInputInstance>(null);
    const client = useClient();

    // Sync
    const [saving, setSaving] = React.useState(false);
    const syncData = React.useRef<{ title: string }>({ title: initial.title });
    const sync = React.useMemo(() => {
        return new InvalidateSync(async () => {
            setSaving(true);
            let title = syncData.current.title;
            await client.mutateDiscussionUpdate({ id: initial.id, title });
            setSaving(false);
        });
    }, []);
    React.useEffect(() => {
        return () => sync.stop();
    }, []);
    const onTitleChange = React.useCallback((src: string) => {
        syncData.current.title = src;
        console.log(src);
        sync.invalidate();
    }, []);

    return (
        <XView>
            <XView>{saving ? 'Saving...' : 'Saved'}</XView>
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
                    initialContent={[initial.title]}
                    onTextChange={onTitleChange}
                    hideEmoji={true}
                    placeholder="Title"
                />
            </XView>
            <URickInput
                ref={contentRef}
                hideEmoji={true}
                appearance="article"
                placeholder="Your story..."
            />
        </XView>
    );
});