import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { XMemo } from 'openland-y-utils/XMemo';

export const DialogListFragment = XMemo(() => {
    let theme = React.useContext(ThemeContext);
    return (
        <XView flexGrow={1} flexBasis={0} backgroundColor={theme.backgroundColor}>
            <DialogListView />
            <DialogsInviteButton />
        </XView>
    );
});
