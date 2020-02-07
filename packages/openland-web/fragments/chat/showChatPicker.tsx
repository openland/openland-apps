import * as React from 'react';
import { showModalBox } from 'openland-x/showModalBox';
import { XModalController } from 'openland-x/showModal';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { XView } from 'react-mental';
import { DialogSearchResults } from '../dialogs/components/DialogSearchResults';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { GlobalSearch_items, GlobalSearchEntryKind } from 'openland-api/Types';
import { USearchInput } from 'openland-web/components/unicorn/USearchInput';

const ChatPickerComponent = (props: {
    onSelect: (selecedChatId: string) => void;
    ctx: XModalController;
}) => {
    let layout = useLayout();
    let onDialogClick = (item: GlobalSearch_items) => {
        if (item.__typename === 'Organization') {
            return;
        }

        props.onSelect(item.id);
        props.ctx.hide();
    };
    let [query, setQuery] = React.useState('');

    return (
        <div
            style={{
                height: layout === 'mobile' ? '100vh' : '70vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <XView flexGrow={1} flexBasis={0} minHeight={0} flexShrink={1}>
                <USearchInput
                    value={query}
                    onChange={setQuery}
                    autoFocus={true}
                    marginHorizontal={23}
                    marginBottom={12}
                    marginTop={8}
                />
                <XScrollView3 flexGrow={1} flexShrink={1} useDefaultScroll={true}>
                    <DialogSearchResults
                        variables={{
                            query: query,
                            kinds: [GlobalSearchEntryKind.SHAREDROOM, GlobalSearchEntryKind.USER],
                        }}
                        onPick={onDialogClick}
                        paddingHorizontal={24}
                        isForwarding={true}
                    />
                </XScrollView3>
            </XView>
        </div>
    );
};

export const showChatPicker = (onSelect: (selecedChatId: string) => void) => {
    showModalBox({ fullScreen: 'on-mobile', title: 'Forward to' }, ctx => (
        <ChatPickerComponent onSelect={onSelect} ctx={ctx} />
    ));
};
