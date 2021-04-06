import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { dialogListWebDataSource } from './components/DialogListWebDataSource';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogType } from './DialogsFragment';

interface DialogListFragmentProps {
    onDialogPress: (id: string) => void;
    messenger: MessengerEngine;
    experimental?: boolean;
    selectedFilter?: DialogType;
}

export const DialogListFragment = React.memo((props: DialogListFragmentProps) => {
    const source = React.useMemo(() => {
        if (props.messenger && !!props.messenger.experimentalUpdates && props.experimental) {
            if (props.selectedFilter === 'unread') {
                return dialogListWebDataSource(props.messenger.experimentalUpdates.dialogs.dialogsUnread.legacy);
            }
            if (props.selectedFilter === 'groups') {
                return dialogListWebDataSource(props.messenger.experimentalUpdates.dialogs.dialogsGroups.legacy);
            }
            if (props.selectedFilter === 'private') {
                return dialogListWebDataSource(props.messenger.experimentalUpdates.dialogs.dialogsPrivate.legacy);
            } else {
                return dialogListWebDataSource(props.messenger.experimentalUpdates.dialogs.dialogsAll.legacy);
            }
        } else {
            return dialogListWebDataSource(props.messenger.dialogList.dataSource);
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
                onDialogClick={props.onDialogPress}
            />
        </XView>
    );
});
