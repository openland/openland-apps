import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import * as QuillType from 'quill';
import { css } from 'linaria';
import { emojiLink } from 'openland-y-utils/emojiLink';

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

let Quill: typeof QuillType.Quill;
let QuillDelta: typeof QuillType.Delta;

// const ImageEmbedComponent = React.memo((props: { data: any }) => {
//     return (
//         <XView width={100} height={100} backgroundColor="red">
//             {}
//         </XView>
//     );
// });

// let CustomBlots = {
//     'image': ImageEmbedComponent
// };

// let registeredEditors = new Map<string, { attach: (key: string, component: any) => void, detach: (key: string) => void }>();

export function getQuill() {
    if (!Quill) {
        // doing this shit because of SSR
        Quill = require('quill') as typeof QuillType.Quill;
        QuillDelta = require('quill-delta') as typeof QuillType.Delta;
        const Embed = Quill.import('blots/embed');

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

        // Custom Blot
        // class CustomBlot extends Embed {
        //     static create(data: any) {
        //         const node = super.create() as HTMLDivElement;
        //         node.dataset.id = randomKey();
        //         node.dataset.type = data.type;
        //         node.dataset.editorId = data.editorId;
        //         node.dataset.data = JSON.stringify(data.data);
        //         return node;
        //     }

        //     static value(domNode: HTMLImageElement) {
        //         return { id: domNode.dataset, type: domNode.dataset.type, data: JSON.parse(domNode.dataset.data!) };
        //     }

        //     attach() {
        //         super.attach();
        //         let node = this.domNode as HTMLDivElement;
        //         let id = node.dataset.id as string;
        //         let type = node.dataset.type as string;
        //         let editorId = node.dataset.editorId as string;
        //         let Component = CustomBlots[type];
        //         registeredEditors.get(editorId)!.attach(id, ReactDOM.createPortal(<Component data={JSON.parse(node.dataset.data!)} />, node));
        //     }

        //     detach() {
        //         super.detach();
        //         let node = this.domNode as HTMLDivElement;
        //         let editorId = node.dataset.editorId as string;
        //         let id = node.dataset.id as string;
        //         registeredEditors.get(editorId)!.detach(id);
        //     }
        // }
        // CustomBlot.blotName = 'custom';
        // CustomBlot.tagName = 'div';
        // CustomBlot.className = 'custom';
        // Quill.register(CustomBlot);

        // Basic formatting
        let Inline = Quill.import('blots/inline');
        let Block = Quill.import('blots/block');

        class BoldBlot extends Inline { }
        BoldBlot.blotName = 'bold';
        BoldBlot.tagName = 'strong';
        class ItalicBlot extends Inline { }
        ItalicBlot.blotName = 'italic';
        ItalicBlot.tagName = 'em';
        class HeaderBlot extends Block {
            static formats(node: any) {
                return HeaderBlot.tagName.indexOf(node.tagName) + 1;
            }
        }
        HeaderBlot.blotName = 'header';
        HeaderBlot.tagName = ['H1', 'H2'];
        Quill.register(BoldBlot);
        Quill.register(ItalicBlot);
        Quill.register(HeaderBlot);
    }

    return {
        Quill,
        QuillDelta
    };
}