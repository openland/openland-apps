import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withUserInfo } from '../../../components/UserInfo';
import { Navigation } from './_navigation';
import { XTable } from 'openland-x/XTable';
import { XHeader } from 'openland-x/XHeader';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
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
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { DateFormater } from 'openland-x-format/XDateLegacy';
import { withRouter } from 'openland-x-routing/withRouter';
import { InvitesToOrganizationMoadal } from './invites';
import { TextInvites } from 'openland-text/TextInvites';

const TableTag = Glamorous.div<{ green?: boolean, purple?: boolean }>((props) => ({
    height: 32,
    borderRadius: 4,
    backgroundColor: props.green === true ? 'rgba(192, 235, 196, 0.45)' : props.purple ? '#eeecfa' : 'rgba(232, 233, 236, 0.45)',
    color: props.green === true ? '#4e8653' : props.purple ? 'rgb(86, 64, 214)' : 'rgba(51, 69, 98, 0.51)',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: 0.5,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
}));

const Content = Glamorous(XVertical)({
    paddingLeft: 24,
    paddingRight: 24,
});

const Title = Glamorous.div({
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.4,
    color: '#334562'
});

const Text = Glamorous.div({
    opacity: 0.8,
    fontSize: 15,
    lineHeight: 1.33,
    letterSpacing: -0.2,
    color: '#334562'
});

const Table = Glamorous(XTable)({
    marginLeft: 0,
    marginRight: 0,
    borderCollapse: 'separate',
    borderSpacing: 0,

    '& tr': {
        height: 82,

        '& td': {
            borderTop: 'solid 1px #eff0f3',
            borderLeft: 'solid 1px #eff0f3',
            paddingTop: 18,
            paddingBottom: 18,

            '& > div': {
                padding: 0
            },
            '&:first-child': {
                minWidth: 150,
                '& > div': {
                    paddingLeft: 18
                }
            },
            '&:nth-child(2)': {
                minWidth: 150,
                '& > div': {
                    paddingLeft: 20
                }
            },
            '&:nth-child(3)': {
                minWidth: 150,
                paddingLeft: 26,
                paddingRight: 26
            },
            '&:nth-child(4)': {
                maxWidth: 80,
                '& > div > div': {
                    justifyContent: 'center !important'
                }
            },
            '&:last-child': {
                '& > div > div': {
                    justifyContent: 'flex-end !important'
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
        paddingRight: 20,
        paddingLeft: 20
    }
});

const Row = Glamorous(XTable.Row)({
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

const PermissionCell = Glamorous(XVertical)({
    position: 'relative',
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

const PermissionsHoverButton = Glamorous(XButton)({
    position: 'absolute',
    top: 'calc(50% - 24)',
    left: 0
});

const RemoveJoinedModal = withOrganizationRemoveMember((props) => {
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === props.router.query.remove || '')[0];
    if (!member) {
        return null;
    }
    console.warn(member);
    return (
        <XModalForm
            submitProps={{
                text: TextInvites.membersMgmt.removeSubmit,
                style: 'danger',
            }}
            title={TextInvites.membersMgmt.removeTitle((props as any).orgName)}
            targetQuery="remove"
            defaultAction={async (data) => {
                await props.remove({
                    variables: {
                        memberId: member.user.id,
                    }
                });

            }}
        >
            <XHorizontal>
                <XAvatar size="medium" cloudImageUuid={member.user.picture || undefined} />
                <XVertical separator={4} justifyContent="center">
                    <XText textStyle="h500">{member.user.name}</XText>
                    {member.email && <XText opacity={0.5} >{member.email}</XText>}
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{ orgName: string, members: any[], refetchVars: { orgId: string } }>;

const RemoveInviteddModal = withOrganizationRemoveMember((props) => {
    let member = (props as any).members.filter((m: any) => m.inviteId === props.router.query.remove || '')[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            submitProps={{
                text: TextInvites.membersMgmt.cancelInviteSubmit,
                style: 'danger',
            }}
            title={TextInvites.membersMgmt.cancelInviteSubmit}
            targetQuery="remove"
            defaultAction={async (data) => {
                await props.remove({
                    variables: {
                        memberId: member.inviteId,
                    }
                });

            }}
        >
            <XHorizontal>
                <XAvatar size="medium" cloudImageUuid={undefined} />
                <XVertical separator={4} justifyContent="center">
                    <XText textStyle="h500">{(member.firstName || '') + ' ' + (member.lastName || '')}</XText>
                    {member.email && <XText opacity={0.5} >{member.email}</XText>}
                </XVertical>
            </XHorizontal>
        </XModalForm>
    );
}) as React.ComponentType<{ members: any[], refetchVars: { orgId: string } }>;

const PermissionsModal = withOrganizationMemberChangeRole(withRouter((props) => {
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === props.router.query.changeRole || '')[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            title={TextInvites.membersMgmt.changeRoleTitle(member.user.name, (props as any).orgName)}
            defaultData={{
                role: member.role
            }}

            targetQuery="changeRole"

            defaultAction={async (data) => {
                await props.changeRole({
                    variables: {
                        memberId: member.user.id,
                        newRole: data.role as OrganizationMemberRole
                    }
                });

            }}
            target={(props as any).target}
        >
            <XVertical>
                <XSelect clearable={false} searchable={false} field="role" options={[{ value: 'OWNER', label: 'Owner' }, { value: 'MEMBER', label: 'Member' }]} />
                <XStoreContext.Consumer>
                    {(store) => {
                        let role = store ? store.readValue('fields.role') : '';
                        return (
                            <XText>{role === 'OWNER' ? TextInvites.membersMgmt.changeRoleOwnerHint : role === 'MEMBER' ? TextInvites.membersMgmt.changeRoleMemberHint : ''}</XText>
                        );
                    }}
                </XStoreContext.Consumer>
            </XVertical>
        </XModalForm>
    );
})) as React.ComponentType<{ orgName: string, members: any[], refetchVars: { orgId: string } }>;

const OrgMembers = withOrganizationMembers((props) => {
    let members = [...props.data.alphaOrganizationMembers || []].sort((a: any, b: any) => {
        var nameA = String(a.user ? (a.user.name || '') : (a.firstName || '') + ' ' + (a.lastname || '')).toLowerCase();
        var nameB = String(b.user ? (b.user.name || '') : (b.firstName || '') + ' ' + (b.lastname || '')).toLowerCase();
        return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });

    return (
        <>
            <Table>
                <XTable.Body>
                    {members.map((m) => (
                        <Row>
                            <XTable.Cell>
                                <XHorizontal>
                                    <XAvatar size="medium" cloudImageUuid={(m.__typename === 'OrganizationJoinedMember' && m.user.picture) || undefined} />
                                    <XVertical separator={1} justifyContent="center">
                                        <Title>{(m.__typename === 'OrganizationJoinedMember' && m.user.name) || (m.__typename === 'OrganizationIvitedMember' && ((m.firstName || '') + ' ' + (m.lastName || '')))}</Title>
                                        {m.email && <Text>{m.email}</Text>}
                                    </XVertical>
                                </XHorizontal>
                            </XTable.Cell>
                            <XTable.Cell>
                                <XWithRole role="admin" orgPermission={true}>
                                    {m.__typename === 'OrganizationJoinedMember' && (
                                        <PermissionCell justifyContent="center" separator={1}>
                                            <Title>Role</Title>
                                            <Text>{m.role}</Text>
                                            <PermissionsHoverButton text={TextInvites.membersMgmt.tableChangeRole} style="electric" query={{ field: 'changeRole', value: m.user.id }} />
                                        </PermissionCell>
                                    )}
                                    {m.__typename === 'OrganizationIvitedMember' && (
                                        <XVertical justifyContent="center" separator={1}>
                                            <Title>Role</Title>
                                            <Text>{m.role}</Text>
                                        </XVertical>
                                    )}
                                </XWithRole>
                                <XWithRole role="admin" orgPermission={true} negate={true}>
                                    <Text>{m.role}</Text>
                                </XWithRole>

                            </XTable.Cell>
                            <XTable.Cell>
                                {(m.__typename === 'OrganizationJoinedMember' && m.joinedAt) && <TableTag green={true}>{TextInvites.membersMgmt.statusJoined +  DateFormater(m.joinedAt)}</TableTag>}
                                {(m.__typename === 'OrganizationJoinedMember' && !m.joinedAt) && <TableTag purple={true}>{TextInvites.membersMgmt.statusJoinedFix}</TableTag>}
                                {(m.__typename !== 'OrganizationJoinedMember') && <TableTag>{TextInvites.membersMgmt.statusNotJoined}</TableTag>}
                                {/* <TableTag
                                    green={m.__typename === 'OrganizationJoinedMember' && m.joinedAt !== undefined}
                                >
                                    {m.__typename === 'OrganizationJoinedMember' ? (m.joinedAt ? DateFormater(m.joinedAt) : 'always been here') : 'not joined yet'}
                                </TableTag> */}
                            </XTable.Cell>
                            <XWithRole role="admin" orgPermission={true}>
                                <XTable.Cell textAlign="center" width="80">
                                    <XOverflow
                                        placement="bottom-end"
                                        content={
                                            m.__typename === 'OrganizationJoinedMember' ? (
                                                <>
                                                    <XOverflow.Item query={{ field: 'changeRole', value: m.user.id }}>{TextInvites.membersMgmt.menuChangeRole}</XOverflow.Item>
                                                    <XOverflow.Item query={{ field: 'remove', value: m.user.id }} style="danger" >{TextInvites.membersMgmt.menuRemoveMember}</XOverflow.Item>
                                                </>
                                            ) : (
                                                    <XOverflow.Item query={{ field: 'remove', value: m.inviteId }} style="danger" >{TextInvites.membersMgmt.menuCancelInvite}</XOverflow.Item>
                                                )
                                        }
                                    />
                                </XTable.Cell>
                            </XWithRole>
                        </Row>
                    ))}
                </XTable.Body>
            </Table>
            {props.data.alphaOrganizationMembers && (
                <>
                    <PermissionsModal orgName={(props as any).orgName} members={props.data.alphaOrganizationMembers} refetchVars={{ orgId: props.variables && (props.variables as any).orgId }} />
                    <RemoveJoinedModal orgName={(props as any).orgName} members={props.data.alphaOrganizationMembers} refetchVars={{ orgId: props.variables && (props.variables as any).orgId }} />
                    <RemoveInviteddModal members={props.data.alphaOrganizationMembers} refetchVars={{ orgId: props.variables && (props.variables as any).orgId }} />
                </>
            )}

        </>

    );
});

export default withApp('Members', 'viewer', withQueryLoader(withUserInfo((props) => {
    return (
        <Navigation title="Members">
            <XHeader text="Members" />
            <Content>
                <XVertical alignItems="flex-start">
                    {props.organization && <OrgMembers variables={{ orgId: props.organization.id }} {...{ orgName: props.organization.name }} />}
                    <InvitesToOrganizationMoadal target={<XButton size="medium" style="primary" text={TextInvites.membersMgmt.inviteButton} />} />
                </XVertical>
            </Content>
        </Navigation>
    );
})));