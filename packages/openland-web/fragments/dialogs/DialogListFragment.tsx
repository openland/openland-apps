import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';
import { ThemeContext } from 'openland-web/modules/theme/ThemeContext';
import { HideOnMobile } from 'openland-web/components/Adaptive';
import { Menu } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { XButton } from 'openland-x/XButton';

const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

export const DialogListFragment = React.memo(() => {
    let theme = React.useContext(ThemeContext);
    return (
        <XView flexGrow={1} flexBasis={0} backgroundColor={theme.backgroundColor}>
            <Menu
                title={'Messages'}
                rightContent={
                    <AddButton
                        style="light"
                        path="/mail/new"
                        text="New"
                        icon={<PlusIcon />}
                        size="small"
                    />
                }
            />
            <DialogListView />
            <HideOnMobile>
                <DialogsInviteButton />
            </HideOnMobile>
        </XView>
    );
});
