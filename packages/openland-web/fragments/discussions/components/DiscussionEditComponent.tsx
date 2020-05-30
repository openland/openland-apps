import * as React from 'react';
import { XView } from 'react-mental';
import { URickInput } from 'openland-web/components/unicorn/URickInput';
import { DiscussionSimple, DiscussionContentInput, DiscussionContentType, MessageSpanType } from 'openland-api/spacex.types';
import { InvalidateSync } from '@openland/patterns';
import { URickTextArea, URichTextAreaValue, URichTextAreaInstance, URichTextSpan } from 'openland-web/components/unicorn/URichTextArea';
import { useClient } from 'openland-api/useClient';

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
                res.push({ type: 'paragraph', text: r.text, spans });
            } else if (r.__typename === 'ImageParagraph') {
                res.push({ type: 'image', id: r.image.uuid, width: 100, height: 100 });
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
    }>({ title: initial.title, content: initialParagraph });
    const sync = React.useMemo(() => {
        return new InvalidateSync(async () => {

            // Check if media is ready
            for (let c of syncData.current.content) {
                if (c.type === 'image' && !c.id) {
                    return;
                }
            }

            // Save Draft
            setSaving(true);
            let title = syncData.current.title;
            let content: DiscussionContentInput[] = [];
            for (let c of syncData.current.content) {
                if (c.type === 'paragraph') {
                    content.push({
                        type: DiscussionContentType.Text,
                        text: c.text,
                        spans: c.spans.map((v) => ({
                            type: v.type === 'bold' ? MessageSpanType.Bold : (v.type === 'italic' ? MessageSpanType.Italic : MessageSpanType.Bold),
                            offset: v.start,
                            length: v.end - v.start
                        }))
                    });
                } else if (c.type === 'image') {
                    content.push({
                        type: DiscussionContentType.Image,
                        image: {
                            uuid: c.id!
                        }
                    });
                }
            }
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
        <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56}>
            <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
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
        </XView>
    );
});