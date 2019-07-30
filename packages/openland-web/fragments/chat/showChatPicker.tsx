import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { DialogListView } from '../dialogs/components/DialogListView';
import { XModalController } from 'openland-x/showModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';

const ChatPickerComponent = (props: { onSelect: (selecedChatId: string) => void, ctx: XModalController }) => {
    let layout = useLayout();
    let onDialogClick = (id: string) => {
        props.onSelect(id);
        props.ctx.hide();
    };
    let onSearchItemPress = (id: string) => {
        console.warn('onSearchItemPress');
        onDialogClick(id);
    };
    return (
        <div style={{ height: layout === 'mobile' ? '100vh' : '70vh', display: 'flex', flexDirection: 'column' }}>
            <DialogListView onDialogClick={onDialogClick} onSearchItemPress={onSearchItemPress} onSearchItemSelected={() => false} />
        </div>
    );
};

export const showChatPicker = (onSelect: (selecedChatId: string) => void) => {
    showModalBox({ fullScreen: 'on-mobile', title: 'Forward to' }, (ctx) => <ChatPickerComponent onSelect={onSelect} ctx={ctx} />);
};