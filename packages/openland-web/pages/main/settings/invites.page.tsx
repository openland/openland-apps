import '../../../globals';
import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { withUserInfo } from '../../../components/UserInfo';
import { withInvites } from '../../../api/withInvites';
import { withInviteCreate } from '../../../api/withInviteCreate';
import { withInviteDestroy } from '../../../api/withInviteDestroy';
import { Navigation } from './_navigation';
import { XTable } from 'openland-x/XTable';
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from '../../../components/withQueryLoader';

export const CreateInviteButton = withInviteCreate((props) => (
    <XButton action={() => props.createInvite({})} text="Create Invite" />
));

export const CancelInviteButton = withInviteDestroy((props) => (
    <XButton action={() => props.destroyInvite({})} text="Cancel" />
));

export default withApp('Invites', 'viewer', withInvites(withQueryLoader(withUserInfo((props) => {
    return (
        <Navigation title="Invites">
            <XHeader text="Invites">
                <CreateInviteButton />
            </XHeader>
            <XTable>
                <XTable.Body>
                    {props.data.invites && props.data.invites.map((v) => (
                        <XTable.Row>
                            <XTable.Cell>{props.router.protocol + '://' + props.router.hostName + '/join/' + v.key}</XTable.Cell>
                            <XTable.Cell><CancelInviteButton variables={{ id: v.id }} /></XTable.Cell>
                        </XTable.Row>
                    ))}
                </XTable.Body>
            </XTable>
        </Navigation>
    );
}))));