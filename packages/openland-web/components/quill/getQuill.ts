import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import * as QuillType from 'quill';
import { css } from 'linaria';
import { emojiLink } from 'openland-y-utils/emojiLink';
import './InteractiveComponents';
import { registeredRenderers } from './InteractiveComponent';

const mentionStyle = css`
    color: var(--accentPrimary);
    border-radius: 4px;
    padding-top: 1px;
    padding-bottom: 1px;
    font-weight: 600;
`;

const emojiStyle = css`
    height: 1em;
    width: 1em;
    margin: 0 0.05em 0 0.1em;
    vertical-align: -0.1em;
`;

const interactiveEmbedStyle = css`
    width: 100%;
    background-color: red;
`;

let Quill: typeof QuillType.Quill;
let QuillDelta: typeof QuillType.Delta;
let Block: any;
let Inline: any;
let Embed: any;
let BlockEmbed: any;

export function getQuill() {
    if (!Quill) {

        // Load Quill
        Quill = require('quill') as typeof QuillType.Quill;
        QuillDelta = require('quill-delta') as typeof QuillType.Delta;
        Embed = Quill.import('blots/embed');
        Inline = Quill.import('blots/inline');
        Block = Quill.import('blots/block');
        BlockEmbed = Quill.import('blots/block/embed');

        // Mentions Blot
        class MentionBlot extends Embed {
            static create(mention: MentionToSend) {
                const node = super.create() as HTMLSpanElement;
                node.className = mentionStyle;
                node.innerText = mention.__typename === 'AllMention' ? 'All' : (mention.__typename === 'SharedRoom' ? mention.title : mention.name);
                node.dataset.user = JSON.stringify(mention);
                return node;
            }

            static value(domNode: HTMLSpanElement) {
                return JSON.parse(domNode.dataset.user!);
            }
        }
        MentionBlot.blotName = 'mention';
        MentionBlot.tagName = 'span';
        MentionBlot.className = 'mention';
        Quill.register(MentionBlot);

        // Emoji Blot
        class EmojiBlot extends Embed {
            static create(data: any) {
                const node = super.create() as HTMLImageElement;
                node.className = emojiStyle;
                node.src = emojiLink(data.name);
                node.dataset.value = data.value;
                node.dataset.name = data.name;
                return node;
            }

            static value(domNode: HTMLImageElement) {
                return { value: domNode.dataset.value, name: domNode.dataset.name };
            }
        }
        EmojiBlot.blotName = 'emoji';
        EmojiBlot.tagName = 'img';
        EmojiBlot.className = 'emoji';
        Quill.register(EmojiBlot);

        // Bold Formatting
        class BoldBlot extends Inline { }
        BoldBlot.blotName = 'bold';
        BoldBlot.tagName = 'strong';
        Quill.register(BoldBlot);

        // Italic Formatting
        class ItalicBlot extends Inline { }
        ItalicBlot.blotName = 'italic';
        ItalicBlot.tagName = 'em';
        Quill.register(ItalicBlot);

        // Header Formatting
        class HeaderBlot extends Block {
            static formats(node: any) {
                return HeaderBlot.tagName.indexOf(node.tagName) + 1;
            }
        }
        HeaderBlot.blotName = 'header';
        HeaderBlot.tagName = ['H1', 'H2'];
        Quill.register(HeaderBlot);

        // Interactive
        class InteractiveEmbed extends BlockEmbed {
            static create(data: { editorId: string, embedId: string }) {
                const node = super.create() as HTMLImageElement;
                node.className = interactiveEmbedStyle;
                node.setAttribute('contenteditable', 'false');
                node.dataset.editorId = data.editorId;
                node.dataset.embedId = data.embedId;
                registeredRenderers.get(data.editorId)!.register(data.embedId, node);
                return node;
            }
            static value(domNode: HTMLDivElement) {
                return { editorId: domNode.dataset.editorId, embedId: domNode.dataset.embedId };
            }
        }
        InteractiveEmbed.blotName = 'interactive';
        InteractiveEmbed.tagName = 'div';
        Quill.register(InteractiveEmbed);
    }

    return {
        Quill,
        QuillDelta,
        Embed,
        Inline,
        Block,
        BlockEmbed
    };
}