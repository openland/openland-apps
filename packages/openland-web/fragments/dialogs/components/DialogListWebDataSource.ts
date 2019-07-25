import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';

const emojifyMessage = (msg: string) => {
    return emoji(msg);
};

export interface DialogListWebItem extends DialogDataSourceItem {
    titleEmojify: any;
    titlePlaceholderEmojify: any;
    senderEmojify?: any;
    messageEmojify?: any;
    typingEmojify?: any;
}

export function dialogListWebDataSource(
    dialogs: DataSource<DialogDataSourceItem>,
): DataSource<DialogListWebItem> {
    return dialogs.batched().throttledMap(src => ({
        ...src,
        titleEmojify: emoji(src.title),
        titlePlaceholderEmojify: emoji(extractPlaceholder(src.title)),
        senderEmojify: src.sender && emojifyMessage(src.sender),
        typingEmojify: src.typing && emojifyMessage(src.typing),
        messageEmojify: src.message && emojifyMessage(src.message),
    }));
}
