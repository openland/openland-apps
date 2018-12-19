import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import InviteIcon from '../../components/messenger/components/icons/ic-invite-plus.svg';
import { XView } from 'react-mental';
import { DialogListView } from './components/DialogListView';

const InviteWrapper = Glamorous(XLink)({
    borderTop: '1px solid #ececec',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2196f3',
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '16px',
    '&:hover': {
        backgroundColor: '#F9F9F9',
    },
    '& svg': {
        width: 16,
        height: 16,
        display: 'block',
        opacity: 0.6,
        marginRight: 6,
        '& *': {
            fill: '#2196f3',
        },
    },
    span: {
        display: 'block',
    },
});

export const DialogListFragment = React.memo(() => {
    const onDialogClick = React.useMemo(() => {
        return (id: string) => {
            //
        };
    }, [])
    return (
        <XView flexGrow={1} flexBasis={0}>
            <DialogListView onDialogClick={onDialogClick} />
            <InviteWrapper query={{ field: 'invite_global', value: 'true' }}>
                <InviteIcon />
                <span>Invite people</span>
            </InviteWrapper>
        </XView>
    )
});
