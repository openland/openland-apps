import * as React from 'react';
import Glamorous from 'glamorous';
import { withInvitesHistory } from '../../../api/withInvitesHistory';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTable } from 'openland-x/XTable';
import { XAvatar } from 'openland-x/XAvatar';

const TableTag = Glamorous.div<{ green?: boolean }>((props) => ({
    height: 32,
    borderRadius: 4,
    backgroundColor: props.green === true ? 'rgba(192, 235, 196, 0.45)' : 'rgba(232, 233, 236, 0.45)',
    color: props.green === true ? '#4e8653' : 'rgba(51, 69, 98, 0.51)',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: 0.5,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
}));

const Table = Glamorous(XTable)({
    marginLeft: 0,
    marginRight: 0,
    borderCollapse: 'separate',
    borderSpacing: 0,

    '& tr': {
        height: 64,

        '& td': {
            borderTop: 'solid 1px #eff0f3',
            borderLeft: 'solid 1px #eff0f3',
            paddingTop: 12,
            paddingBottom: 12,

            '& > div': {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 18,
                paddingRight: 18,
            },
            '&:first-child': {
                '& > div': {
                    paddingLeft: 14
                }
            },
            '&:last-child': {
                '& > div': {
                    paddingRight: 0,
                    paddingLeft: 0
                }
            }
        }
    },
    '& tr:first-child td:first-child': {
        borderTopLeftRadius: 5,
    },
    '& tr:first-child td:last-child': {
        borderTopRightRadius: 5,
    },
    '& tr:last-child td': {
        borderBottom: 'solid 1px #eff0f3',
    },
    '& tr:last-child td:first-child': {
        borderBottomLeftRadius: 5,
    },
    '& tr:last-child td:last-child': {
        borderBottomRightRadius: 10
    },
    '& tr td:last-child': {
        borderRight: 'solid 1px #eff0f3',
        paddingRight: 16,
        paddingLeft: 16
    }
});

const Title = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.4,
    color: '#334562'
});

export const InvitesHistory = withInvitesHistory((props) => {
    return (
        <Table className={(props as any).className}>
            {((props.data && props.data.invites) || []).map((invite) => (
                <XTable.Row>
                    <XTable.Cell>
                        <XHorizontal alignItems="center">
                            <XAvatar size="small" cloudImageUuid={invite.acceptedBy ? invite.acceptedBy.picture || undefined : undefined} />
                            <Title>{invite.acceptedBy !== null && invite.acceptedBy.name}</Title>
                        </XHorizontal>
                    </XTable.Cell>
                    <XTable.Cell>
                        <Title>{invite.forEmail}</Title>
                    </XTable.Cell>
                    <XTable.Cell>
                        <Title>{invite.isGlobal ? 'Invited to Openland' : 'Invited to your organization '}</Title>
                    </XTable.Cell>
                    <XTable.Cell textAlign="right" width={120}>
                        <TableTag green={invite.acceptedBy ? true : false}>
                            {invite.acceptedBy ? 'Accepted' : 'Pending'}
                        </TableTag>
                    </XTable.Cell>
                </XTable.Row>
            ))}
        </Table>
    );
});