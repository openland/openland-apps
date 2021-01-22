import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { dialogListWebDataSource } from './components/DialogListWebDataSource';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { DialogType } from './DialogsFragment';

interface DialogListFragmentProps {
    onSearchItemSelected: (a: GlobalSearch_items) => void;
    onDialogPress: (id: string) => void;
    selectedFilter?: DialogType;
}

let enableExperiemental = true;

export const DialogListFragment = React.memo((props: DialogListFragmentProps) => {
    let messenger = React.useContext(MessengerContext);
    const source = React.useMemo(() => {
        if (messenger.experimentalUpdates && enableExperiemental) {
            if (props.selectedFilter === 'unread') {
                return dialogListWebDataSource(messenger.experimentalUpdates.dialogs.dialogsUnread.legacy);
            }
            if (props.selectedFilter === 'groups') {
                return dialogListWebDataSource(messenger.experimentalUpdates.dialogs.dialogsGroups.legacy);
            }
            if (props.selectedFilter === 'private') {
                return dialogListWebDataSource(messenger.experimentalUpdates.dialogs.dialogsPrivate.legacy);
            } else {
                return dialogListWebDataSource(messenger.experimentalUpdates.dialogs.dialogsAll.legacy);
            }
        } else {
            return dialogListWebDataSource(messenger.dialogList.dataSource);
        }
    }, [props.selectedFilter]);
    return (
        <XView
            flexGrow={1}
            flexBasis={0}
            backgroundColor="var(--backgroundPrimary)"
            contain="content"
        >
            <DialogListView
                source={source}
                onSearchItemSelected={props.onSearchItemSelected}
                onDialogClick={props.onDialogPress}
            />
        </XView>
    );
});
