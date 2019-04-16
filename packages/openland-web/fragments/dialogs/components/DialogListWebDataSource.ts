import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';

const emojifyMessage = (msg: string) => {
    return emoji({
        src: msg,
        size: 14,
    });
};

export interface DialogListWebItem extends DialogDataSourceItem {
    titleEmojify: any;
    titlePlaceholderEmojify: any;
    senderEmojify?: any;
    messageEmojify?: any;
    typingEmojify?: any;
}

export function dialogListWebDataSource(dialogs: DataSource<DialogDataSourceItem>): DataSource<DialogListWebItem> {
    return dialogs.batched().throttledMap((src) =>
        ({
            ...src,
            titleEmojify: emoji({
                src: src.title,
                size: 16,
            }),
            titlePlaceholderEmojify: emoji({
                src: extractPlaceholder(src.title),
                size: 20,
                cache: true,
            }),
            senderEmojify: src.sender && emojifyMessage(src.sender),
            typingEmojify: src.typing && emojifyMessage(src.typing),
            messageEmojify: src.message && emojifyMessage(src.message)
        }));
}