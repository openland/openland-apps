import * as React from 'react';
import { withInvitesHistory } from '../../../api/withInvitesHistory';
import { XTable } from 'openland-x/XTable';
import { XAvatar } from 'openland-x/XAvatar';
import { XText } from 'openland-x/XText';
import { XTag } from 'openland-x/XTag';

export const InvitesHistory = withInvitesHistory((props) => {
    return (
        <XTable className={(props as any).className}>
            {((props.data && props.data.invites) || []).map((invite) => (
                <XTable.Row>
                    <XTable.Cell>
                        <XAvatar cloudImageUuid={invite.acceptedBy ? invite.acceptedBy.picture || undefined : undefined} />
                    </XTable.Cell>
                    <XTable.Cell>
                        <XText>{invite.forEmail}</XText>
                    </XTable.Cell>
                    <XTable.Cell>
                        <XText>{invite.isGlobal ? 'Invited to Openland' : 'Invited to your organization '}</XText>
                    </XTable.Cell>
                    <XTable.Cell>
                        <XTag text={invite.acceptedBy ? 'Accepted' : 'Pending'} color={invite.acceptedBy ? 'green' : 'gray'} />
                    </XTable.Cell>
                </XTable.Row>
            ))}
        </XTable>
    );
});