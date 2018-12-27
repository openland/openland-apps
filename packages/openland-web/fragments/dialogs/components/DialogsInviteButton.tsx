import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import InviteIcon from 'openland-icons/ic-invite-plus.svg';

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
        textDecoration: 'none',
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

export const DialogsInviteButton = React.memo(() => {
    return (
        <InviteWrapper query={{ field: 'invite_global', value: 'true' }}>
            <InviteIcon />
            <span>Invite people</span>
        </InviteWrapper>
    );
});
