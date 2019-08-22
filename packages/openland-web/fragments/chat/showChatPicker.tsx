import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { XView } from 'react-mental';
import { DialogSearchInput } from '../dialogs/components/DialogSearchInput';
import { DialogSearchResults } from '../dialogs/components/DialogSearchResults';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { GlobalSearch_items } from 'openland-api/Types';

const ChatPickerComponent = (props: { onSelect: (selecedChatId: string) => void, ctx: XModalController }) => {
    let layout = useLayout();
    let onDialogClick = (item: GlobalSearch_items) => {
        if (item.__typename === 'Organization') {
            return;
        }

        props.onSelect(item.id);
        props.ctx.hide();
    };
    let onMessageClick = (chatId: string) => {
        props.onSelect(chatId);
        props.ctx.hide();
    };

    let [query, setQuery] = React.useState('');

    return (
        <div style={{ height: layout === 'mobile' ? '100vh' : '70vh', display: 'flex', flexDirection: 'column' }}>
            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                <DialogSearchInput value={query} onChange={setQuery} modal={true} autofocus={true} />
                <XScrollView2 flexGrow={1}>
                    <DialogSearchResults
                        variables={{ query: query, limit: 30 }}
                        onPick={onDialogClick}
                        onMessagePick={onMessageClick}
                        paddingHorizontal={24}
                    />
                </XScrollView2>
            </XView>
        </div>
    );
};

export const showChatPicker = (onSelect: (selecedChatId: string) => void) => {
    showModalBox({ fullScreen: 'on-mobile', title: 'Forward to' }, (ctx) => <ChatPickerComponent onSelect={onSelect} ctx={ctx} />);
};