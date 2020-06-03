import * as React from 'react';
import { XView } from 'react-mental';
import { URickInput } from 'openland-web/components/unicorn/URickInput';
import { PostDraftSimple, PostContentInput, PostContentType, PostSpanType } from 'openland-api/spacex.types';
import { InvalidateSync } from '@openland/patterns';
import { URickTextArea, URichTextAreaValue, URichTextAreaInstance, URichTextSpan } from 'openland-web/components/unicorn/URichTextArea';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { UHeader } from 'openland-unicorn/UHeader';
import { USelect, OptionType } from 'openland-web/components/unicorn/USelect';

export const DiscussionEditComponent = React.memo((props: { data: PostDraftSimple }) => {
    const initial = React.useMemo(() => props.data, []);
    const initialParagraph = React.useMemo(() => {
        const res: URichTextAreaValue = [];
        for (let r of initial.content) {
            if (r.__typename === 'TextParagraph') {
                let spans: URichTextSpan[] = [];
                for (let s of r.spans) {
                    if (s.__typename === 'PostSpanBold') {
                        spans.push({ type: 'bold', start: s.offset, end: s.offset + s.length });
                    }
                    if (s.__typename === 'PostSpanItalic') {
                        spans.push({ type: 'italic', start: s.offset, end: s.offset + s.length });
                    }
                }
                res.push({ type: 'paragraph', text: r.text, spans });
            } else if (r.__typename === 'ImageParagraph') {
                res.push({ type: 'image', id: r.image.uuid, width: r.fileMetadata.imageWidth!, height: r.fileMetadata.imageHeight! });
            } else if (r.__typename === 'H1Paragraph') {
                res.push({ type: 'header1', text: r.text });
            } else if (r.__typename === 'H2Paragraph') {
                res.push({ type: 'header2', text: r.text });
            } else {
                throw Error('Unsupported');
            }
        }
        console.warn(res);
        return res;
    }, []);
    const contentRef = React.useRef<URichTextAreaInstance>(null);
    const client = useClient();
    const hubs = client.useChannels().channels;

    // Sync
    const [saving, setSaving] = React.useState(false);
    const syncData = React.useRef<{
        title: string,
        content: URichTextAreaValue,
        hub: string | null
    }>({ title: initial.title, content: initialParagraph, hub: props.data.channel ? props.data.channel.id : null });
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
            let content: PostContentInput[] = [];
            let hubId = syncData.current.hub;
            for (let c of syncData.current.content) {
                if (c.type === 'paragraph') {
                    content.push({
                        type: PostContentType.Text,
                        text: c.text,
                        spans: c.spans.map((v) => ({
                            type: v.type === 'bold' ? PostSpanType.Bold : (v.type === 'italic' ? PostSpanType.Italic : PostSpanType.Bold),
                            offset: v.start,
                            length: v.end - v.start
                        }))
                    });
                } else if (c.type === 'image') {
                    content.push({
                        type: PostContentType.Image,
                        image: {
                            uuid: c.id!
                        }
                    });
                } else if (c.type === 'header1') {
                    content.push({
                        type: PostContentType.H1,
                        text: c.text
                    });
                } else if (c.type === 'header2') {
                    content.push({
                        type: PostContentType.H1,
                        text: c.text
                    });
                }
            }
            console.warn(content);
            await client.mutatePostDraftUpdate({ id: initial.id, title, content, channel: hubId });
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
    const onHubChange = React.useCallback((src: string) => {
        syncData.current.hub = src;
        sync.invalidate();
    }, []);

    const publish = React.useCallback(() => {
        client.mutatePostPublish({ id: props.data.id });
    }, []);

    const pageTitle = (
        <XView flexDirection="row" alignSelf="center" flexGrow={1} flexShrink={1}>
            <XView flexGrow={1} {...TextStyles.Title1} alignSelf="center">Post</XView>
            <UButton text="Publish" onClick={publish} alignSelf="flex-start" />
        </XView>
    );

    const [hub, setHub] = React.useState(props.data.channel ? props.data.channel.id : null);

    return (
        <XView flexDirection="row" alignItems="flex-start" justifyContent="center" paddingRight={56}>
            <UHeader title="Drafts" titleView={pageTitle} appearance="fullwidth" maxWidth={824} />
            <XView flexGrow={1} flexShrink={1} maxWidth={824} paddingHorizontal={16}>
                <USelect
                    label="Channel"
                    options={hubs.map((v) => ({ value: v.id, label: v.title }))}
                    value={hub ? [{ value: hub, label: hubs.find((v) => v.id === hub)!.title }] : null}
                    onChange={(v: OptionType) => {
                        setHub(v.value as string | null);
                        onHubChange(v.value as string);
                    }}
                />
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