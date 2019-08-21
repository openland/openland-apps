import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { DataSource } from 'openland-y-utils/DataSource';
import { emoji } from 'openland-y-utils/emoji';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';

export interface DialogListWebItem extends DialogDataSourceItem {
    titleEmojify: string | JSX.Element;
    titlePlaceholderEmojify: string | JSX.Element;
    senderEmojify?: string | JSX.Element;
    messageEmojify?: string | JSX.Element;
    fallbackEmojify: string | JSX.Element;
    typingEmojify?: string | JSX.Element;
}

export function dialogListWebDataSource(
    dialogs: DataSource<DialogDataSourceItem>,
): DataSource<DialogListWebItem> {
    return dialogs.batched().throttledMap(src => ({
        ...src,
        titleEmojify: emoji(src.title),
        titlePlaceholderEmojify: emoji(extractPlaceholder(src.title)),
        senderEmojify: src.sender && emoji(src.sender),
        typingEmojify: src.typing && emoji(src.typing),
        messageEmojify: src.message && emoji(src.message),
        fallbackEmojify: emoji(src.fallback),
    }));
}
