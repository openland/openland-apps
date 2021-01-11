import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { GlobalSearch_items } from 'openland-api/spacex.types';
import { dialogListWebDataSource } from './components/DialogListWebDataSource';
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface DialogListFragmentProps {
    onSearchItemSelected: (a: GlobalSearch_items) => void;
    onDialogPress: (id: string) => void;
}

let enableExperiemental = true;

export const DialogListFragment = React.memo((props: DialogListFragmentProps) => {
    let messenger = React.useContext(MessengerContext);
    const source = React.useMemo(() => dialogListWebDataSource(messenger.experimentalUpdates && enableExperiemental ? messenger.experimentalUpdates.dialogs.dialogsAll.legacy : messenger.dialogList.dataSource), []);
    return (
        <XView flexGrow={1} flexBasis={0} backgroundColor="var(--backgroundPrimary)" contain="content">
            <DialogListView
                source={source}
                onSearchItemSelected={props.onSearchItemSelected}
                onDialogClick={props.onDialogPress}
            />
        </XView>
    );
});
