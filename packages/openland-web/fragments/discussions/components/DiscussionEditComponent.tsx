import * as React from 'react';
import { XView } from 'react-mental';
import { URickInput } from 'openland-web/components/unicorn/URickInput';
import { DiscussionSimple, DiscussionContentInput, DiscussionContentType, MessageSpanType } from 'openland-api/spacex.types';
import { InvalidateSync } from '@openland/patterns';
import { useClient } from 'openland-api/useClient';
import { URickTextArea, URichTextAreaValue, URichTextAreaInstance, URichTextSpan } from 'openland-web/components/unicorn/URichTextArea';

export const DiscussionEditComponent = React.memo((props: { data: DiscussionSimple }) => {
    const initial = React.useMemo(() => props.data, []);
    const initialParagraph = React.useMemo(() => {
        const res: URichTextAreaValue = [];
        for (let r of initial.content) {
            if (r.__typename === 'TextParagraph') {
                let spans: URichTextSpan[] = [];
                for (let s of r.spans) {
                    if (s.__typename === 'MessageSpanBold') {
                        spans.push({ type: 'bold', start: s.offset, end: s.offset + s.length });
                    }
                    if (s.__typename === 'MessageSpanItalic') {
                        spans.push({ type: 'italic', start: s.offset, end: s.offset + s.length });
                    }
                }
                res.push({ text: r.text, spans });
            } else {
                throw Error('Unsupported');
            }
        }
        console.warn(res);
        return res;
    }, []);
    const contentRef = React.useRef<URichTextAreaInstance>(null);
    const client = useClient();

    // Sync
    const [saving, setSaving] = React.useState(false);
    const syncData = React.useRef<{
        title: string,
        content: URichTextAreaValue
    }>({ title: initial.title, content: [] });
    const sync = React.useMemo(() => {
        return new InvalidateSync(async () => {
            setSaving(true);
            let title = syncData.current.title;
            let content: DiscussionContentInput[] = syncData.current.content.map((v) => ({
                type: DiscussionContentType.Text,
                text: v.text,
                spans: v.spans.map((s) => ({ offset: s.start, length: s.end - s.start, type: s.type === 'bold' ? MessageSpanType.Bold : MessageSpanType.Italic }))
            }));
            console.warn(content);
            await client.mutateDiscussionUpdate({ id: initial.id, title, content });
            setSaving(false);
        });
    }, []);
    React.useEffect(() => {
        return () => sync.stop();
    }, []);
    const onTitleChange = React.useCallback((src: string) => {
        syncData.current.title = src;
        sync.invalidate();
    }, []);
    const onContentChange = React.useCallback((src: URichTextAreaValue) => {
        syncData.current.content = src;
        sync.invalidate();
    }, []);

    return (
        <XView>
            <XView>{saving ? 'Saving...' : 'Saved'}</XView>
            <XView>
                <URickInput
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
            <URickTextArea
                ref={contentRef}
                initialValue={initialParagraph}
                onValueChange={onContentChange}
                placeholder="Your story..."
            />
        </XView>
    );
});