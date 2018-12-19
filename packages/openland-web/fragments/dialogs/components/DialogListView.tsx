import * as React from 'react';
import { XView } from 'react-mental';
import { DialogSearchInput } from './DialogSearcInput';
import { XListView } from 'openland-web/components/XListView';
import Glamorous from 'glamorous';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XButton } from 'openland-x/XButton';
import { DialogView } from './DialogView';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { DialogSearchResults } from './DialogSearchResults';

const LoadingWrapper = Glamorous.div({
    height: 60,
});

export interface DialogListViewProps {
    onDialogClick?: (id: string) => void;
}

export const DialogListView = React.memo<DialogListViewProps>((props) => {

    let messenger = React.useContext(MessengerContext);
    let [query, setQuery] = React.useState('');
    let isSearching = query.trim().length > 0;

    const renderLoading = React.useMemo((() => {
        return () => {
            return (
                <LoadingWrapper>
                    <XButton alignSelf="center" style="flat" loading={true} />
                </LoadingWrapper>
            );
        }
    }), []);
    const renderDialog = React.useMemo(() => {
        return (item: DialogDataSourceItem) => (
            <DialogView item={item} />
        );
    }, [props.onDialogClick]);

    return (
        <XView flexGrow={1} flexBasis={0} minHeight={0}>
            <DialogSearchInput
                value={query}
                onChange={setQuery}
            />
            <XView flexGrow={1} flexBasis={0} minHeight={0}>
                {isSearching && (
                    <DialogSearchResults variables={{ query: query }} />
                )}
                {!isSearching && (
                    <XListView
                        dataSource={messenger.dialogList.dataSource}
                        itemHeight={72}
                        loadingHeight={60}
                        renderItem={renderDialog}
                        renderLoading={renderLoading}
                    />
                )}
            </XView>
        </XView>
    )
})