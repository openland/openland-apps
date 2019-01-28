import * as React from 'react';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { HideOnMobile } from 'openland-web/components/Adaptive';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

export const DialogListFragment = React.memo(() => {
    console.log('DialogListFragment');
    if (!canUseDOM) {
        return <div />;
    }
    let theme = React.useContext(ThemeContext);
    return (
        <XView flexGrow={1} flexBasis={0} backgroundColor={theme.backgroundColor}>
            <DialogListView />
            <HideOnMobile>
                <DialogsInviteButton />
            </HideOnMobile>
        </XView>
    );
});
