import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';
import { DialogsInviteButton } from './components/DialogsInviteButton';
import { XButton } from 'openland-x/XButton';
import { XThemeDefault } from 'openland-x/XTheme';
import { XFont } from 'openland-x/XFont';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';

const ChatListContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    width: 344,
    flexShrink: 0,
    borderRightWidth: '1px',
    borderRightStyle: 'solid',
    borderRightColor: XThemeDefault.separatorColor,
    backgroundColor: XThemeDefault.backgroundColor,
    '@media (max-width: 1100px)': {
        width: 300,
    },
    '@media (max-width: 950px)': {
        width: 230,
    },
});

const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

const Header = Glamorous(XHorizontal)({
    height: 48,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 4,
    marginBottom: 3,
    flexShrink: 0,
});

const Title = Glamorous.div({
    ...XFont.h600,
});

export const DialogListFragment = React.memo(() => {
    return (
        <ChatListContainer>
            <XView flexGrow={1} flexBasis={0}>
                <Header alignItems="center" justifyContent="space-between">
                    <Title data-test-id="messages-title">Messages</Title>
                    <AddButton
                        style="light"
                        path="/mail/new"
                        text="New"
                        icon={<PlusIcon />}
                        size="small"
                    />
                </Header>
                <DialogListView />
                <DialogsInviteButton />
            </XView>
        </ChatListContainer>
    )
});
