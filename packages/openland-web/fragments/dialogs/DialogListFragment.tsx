import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';
import { XFont } from 'openland-x/XFont';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { BurgerButton } from 'openland-web/components/MainLayout';
import { Menu } from 'openland-web/components/MainLayout';

const Title = Glamorous.div({
    ...XFont.h600,
});

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
