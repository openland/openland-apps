import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';

export const DialogListFragment = React.memo(() => {
    return (
        <XView flexGrow={1} flexBasis={0}>
            <DialogListView />
            <DialogsInviteButton />
        </XView>
    )
});
