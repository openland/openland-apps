import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { Menu } from 'openland-web/components/MainLayout';

export const DialogListFragment = React.memo(() => {
    let theme = React.useContext(ThemeContext);
    return (
        <XView flexGrow={1} flexBasis={0} backgroundColor={theme.backgroundColor}>
            <Menu title={'Messages'} />
            <DialogListView />
            <DialogsInviteButton />
        </XView>
    );
});
