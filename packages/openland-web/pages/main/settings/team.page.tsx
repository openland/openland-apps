import '../../init';
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
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XTitle } from 'openland-x/XTitle';
import glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { withOrganizationMembers } from '../../../api/withOrganizationMembers';
import { XAvatar } from 'openland-x/XAvatar';
import { XText } from 'openland-x/XText';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { withOrganizationMemberChangeRole } from '../../../api/withOrganizationMemberChangeRole';
import { OrganizationMemberRole } from 'openland-api/Types';
import { XSelect } from 'openland-x/XSelect';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { withOrganizationRemoveMember } from '../../../api/withOrganizationRemoveMember';

export const CreateInviteButton = withInviteCreate((props) => (
    <XButton action={() => props.createInvite({})} text="Create Invite" />
));

export const CancelInviteButton = withInviteDestroy((props) => (
    <XButton action={() => props.destroyInvite({})} text="Cancel" />
));

const Content = glamorous(XVertical)({
    paddingLeft: 24,
    paddingRight: 24,
});
const Table = glamorous(XTable)({
    marginLeft: 0,
    marginRight: 0,
});

const Row = glamorous(XTable.Row)({
    height: 100,
    '> td > div > div > a': {
        opacity: 0,
    },
    ':hover': {
        '> td > div > div > a': {
            opacity: 1,
        },
    }
});

const PermissionCell = glamorous(XVertical)({
    position: 'relative',
    height: 100,
    '> a': {
        opacity: 0,
    },
    '> div': {
        opacity: 1,
    },
    ':hover': {
        '> a': {
            opacity: 1,
        },
        '> div': {
            opacity: 0,
        }
    }
});
const PermissionsHoverButton = glamorous(XButton)({
    position: 'absolute',
    top: 'calc(50% - 24)',
    left: 0,

});

const RemoveModal = withOrganizationRemoveMember((props) => {
    return (
        <XModalForm
            submitProps={{
                text: 'Remove from organization',
                style: 'danger',
            }}
            title={'Imagine ' + (props as any).orgName + 'without'}

            defaultAction={async (data) => {
                await props.remove({
                    variables: {
                        memberId: (props as any).userId,
                    }
                });

            }}
            target={(<XButton text="Remove from organization" style="danger" />)}
        >
            <XHorizontal>
                <XAvatar size="medium" cloudImageUuid={(props as any).avatar || undefined} />
                <XVertical separator={4} justifyContent="center">
                    <XText textStyle="h500">{(props as any).name}</XText>
                    {(props as any).email && <XText opacity={0.5} >{(props as any).email}</XText>}
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{ orgName: string, name: string, avatar?: string, email?: string, userId: string, refetchVars: { orgId: string } }>;

const PermissionsModal = withOrganizationMemberChangeRole((props) => {
    return (
        <XModalForm
            title={'Imagine ' + (props as any).name + ' as'}
            defaultData={{
                role: (props as any).currentRole
            }}

            defaultAction={async (data) => {
                await props.changeRole({
                    variables: {
                        memberId: (props as any).userId,
                        newRole: data.role as OrganizationMemberRole
                    }
                });

            }}
            target={(<PermissionsHoverButton text="Manage Permissions" style="electric" />)}
        >
            <XVertical>
                <XSelect clearable={false} searchable={false} field="role" options={[{ value: 'OWNER', label: 'Owner' }, { value: 'MEMBER', label: 'Member' }]} />
                <XStoreContext.Consumer>
                    {(store) => {
                        let role = store ? store.readValue('fields.role') : '';
                        return (
                            <XText>{role === 'OWNER' ? 'Owner can do everything' : role === 'MEMBER' ? 'Members only watches' : ''}</XText>
                        );
                    }}
                </XStoreContext.Consumer>
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{ currentRole: string, name: string, userId: string, refetchVars: { orgId: string } }>;

const OrgMembers = withOrganizationMembers((props) => {
    return (
        <Table>
            <XTable.Header>
                <XTable.Cell>{''}</XTable.Cell>
                <XTable.Cell>Role</XTable.Cell>
            </XTable.Header>

            <XTable.Body>
                {props.data.alphaOrganizationMembers && props.data.alphaOrganizationMembers.map((m) => (
                    <Row>
                        <XTable.Cell>
                            <XHorizontal >
                                <XAvatar size="medium" cloudImageUuid={m.user.picture || undefined} />
                                <XVertical separator={4} justifyContent="center">
                                    <XText textStyle="h500">{m.user.name}</XText>
                                    {m.user.email && <XText opacity={0.5} >{m.user.email}</XText>}
                                </XVertical>

                            </XHorizontal>
                        </XTable.Cell>
                        <XTable.Cell>
                            <PermissionCell justifyContent="center" separator={0}>
                                <XText>{m.role}</XText>
                                <PermissionsModal currentRole={m.role} name={m.user.name} userId={m.user.id} refetchVars={{ orgId: props.variables && (props.variables as any).orgId }} />
                            </PermissionCell>
                        </XTable.Cell>
                        <XTable.Cell><RemoveModal orgName={(props as any).orgName} avatar={m.user.picture || undefined} email={m.user.email || undefined} name={m.user.name} userId={m.user.id} refetchVars={{ orgId: props.variables && (props.variables as any).orgId }} /></XTable.Cell>
                    </Row>
                ))}
            </XTable.Body>
        </Table>
    );
});

export default withApp('Team', 'viewer', withInvites(withQueryLoader(withUserInfo((props) => {
    return (
        <Navigation title="Team">
            <XHeader text="Team" />
            <Content>
                {/* <XHorizontal alignItems="center" justifyContent="space-between">
                    <XTitle marginTop={0} marginBottom={0}>Members</XTitle>
                </XHorizontal> */}
                {props.organization && <OrgMembers variables={{ orgId: props.organization.id }} {...{ orgName: props.organization.name }} />}

                <XHorizontal alignItems="center" justifyContent="space-between">
                    <XTitle marginTop={0} marginBottom={0}>Invites</XTitle>
                    <CreateInviteButton />
                </XHorizontal>
                <Table>
                    <XTable.Body>
                        {props.data.invites && props.data.invites.map((v) => (
                            <XTable.Row>
                                <XTable.Cell>{props.router.protocol + '://' + props.router.hostName + '/join/' + v.key}</XTable.Cell>
                                <XTable.Cell><CancelInviteButton variables={{ id: v.id }} /></XTable.Cell>
                            </XTable.Row>
                        ))}
                    </XTable.Body>
                </Table>
            </Content>

        </Navigation>
    );
}))));