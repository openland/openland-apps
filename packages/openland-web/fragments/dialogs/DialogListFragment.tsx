import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { GlobalSearch_items } from 'openland-api/Types';

interface DialogListFragmentProps {
    onSearchItemSelected: (a: GlobalSearch_items) => void;
    onDialogPress: (id: string) => void;
}

export const DialogListFragment = React.memo((props: DialogListFragmentProps) => (
    <XView flexGrow={1} flexBasis={0} backgroundColor="var(--backgroundPrimary)" contain="content">
        <DialogListView
            onSearchItemSelected={props.onSearchItemSelected}
            onDialogClick={props.onDialogPress}
        />
    </XView>
));
