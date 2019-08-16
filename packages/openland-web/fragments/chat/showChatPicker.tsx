import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { XView } from 'react-mental';
import { DialogSearchInput } from '../dialogs/components/DialogSearchInput';
import { DialogSearchResults } from '../dialogs/components/DialogSearchResults';
import { XScrollView2 } from 'openland-x/XScrollView2';

const ChatPickerComponent = (props: { onSelect: (selecedChatId: string) => void, ctx: XModalController }) => {
    let layout = useLayout();
    let onDialogClick = (id: string) => {
        props.onSelect(id);
        props.ctx.hide();
    };

    let [query, setQuery] = React.useState('');

    return (
        <div style={{ height: layout === 'mobile' ? '100vh' : '70vh', display: 'flex', flexDirection: 'column' }}>
            {/* <DialogListView onDialogClick={onDialogClick} onSearchItemPress={onSearchItemPress} onSearchItemSelected={() => false} /> */}

            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                <DialogSearchInput value={query} onChange={setQuery} />
                <XScrollView2 flexGrow={1}>
                    <DialogSearchResults
                        variables={{ query: query, limit: 30 }}
                        onPick={onDialogClick}
                    />
                </XScrollView2>
            </XView>
        </div>
    );
};

export const showChatPicker = (onSelect: (selecedChatId: string) => void) => {
    showModalBox({ fullScreen: 'on-mobile', title: 'Forward to' }, (ctx) => <ChatPickerComponent onSelect={onSelect} ctx={ctx} />);
};