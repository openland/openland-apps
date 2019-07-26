import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { DialogListView } from '../dialogs/components/DialogListView';
import { XModalController } from 'openland-x/showModal';

const ChatPickerComponent = (props: { onSelect: (selecedChatId: string) => void, ctx: XModalController, layout: 'mobile' | 'desktop' }) => {
    let onDialogClick = (id: string) => {
        props.onSelect(id);
        props.ctx.hide();
    };
    let onSearchItemPress = (id: string) => {
        console.warn('onSearchItemPress');
        onDialogClick(id);
    };
    return (
        <div style={{ height: props.layout === 'mobile' ? '100vh' : '70vh', display: 'flex', flexDirection: 'column' }}>
            <DialogListView onDialogClick={onDialogClick} onSearchItemPress={onSearchItemPress} onSearchItemSelected={() => false} />
        </div>
    );
};

export const showChatPicker = (onSelect: (selecedChatId: string) => void, layout: 'mobile' | 'desktop') => {
    showModalBox({ fullScreen: layout === 'mobile', title: 'Forward to' }, (ctx) => <ChatPickerComponent onSelect={onSelect} ctx={ctx} layout={layout} />);
};