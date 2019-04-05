import { DialogDataSourceItem, emojifyMessage } from 'openland-engines/messenger/DialogListEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';

export interface DialogListWebItem extends DialogDataSourceItem {
    titleEmojify: any;
    senderEmojify?: any;
    messageEmojify?: any;
    typingEmojify?: any;
}

export function dialogListWebDataSource(dialogs: DataSource<DialogDataSourceItem>): DataSource<DialogListWebItem> {
    return dialogs.map((src) =>
        ({
            ...src,
            titleEmojify: emoji({
                src: src.title,
                size: 16,
            }),
            senderEmojify: src.sender && emojifyMessage(src.sender),
            typingEmojify: src.typing && emojifyMessage(src.typing),
            messageEmojify: src.message && emojifyMessage(src.message)
        }));
}