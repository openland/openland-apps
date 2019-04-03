import * as React from 'react';
import Glamorous from 'glamorous';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import {
    OrganizationMemberRole,
    Organization_organization,
    Organization_organization_members,
    Organization_organization_requests,
    OrganizationAddMember,
    OrganizationAddMemberVariables,
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { XWithRouter, withRouter } from 'openland-x-routing/withRouter';
import { XButton, XButtonProps } from 'openland-x/XButton';
import {
    RemoveOrganizationModal,
    LeaveOrganizationModal,
    AboutPlaceholder,
    SocialPlaceholder,
    WebsitePlaceholder,
} from './modals';
import { XLoader } from 'openland-x/XLoader';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XLink } from 'openland-x/XLink';
import { InvitesToOrganizationModal } from '../../settings/components/invites';
import { XOverflow } from '../../../../components/XOverflow';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { withOrganizationMemberChangeRole } from 'openland-web/api/withOrganizationMemberChangeRole';
import { withOrganizationAddMembers } from 'openland-web/api/withOrganizationAddMembers';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModalProps } from 'openland-x-modal/XModal';
import { XText } from 'openland-x/XText';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { XUserCard } from 'openland-x/cards/XUserCard';
import LinkIcon from 'openland-icons/ic-link.svg';
import { XSocialButton } from 'openland-x/XSocialButton';
import { XMoreCards } from 'openland-x/cards/XMoreCards';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XRouter } from 'openland-x-routing/XRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { withExplorePeople } from 'openland-web/api/withExplorePeople';
import { MutationFunc } from 'react-apollo';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';

const BackWrapper = Glamorous.div({
    background: '#f9f9f9',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    cursor: 'pointer',
});

const BackInner = Glamorous(XContentWrapper)({
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
    '& i': {
        fontSize: 20,
        marginRight: 6,
        marginLeft: -7,
        color: 'rgba(0, 0, 0, 0.3)',
    },
    '& span': {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.8)',
    },
});

export const BackButton = () => (
    <BackWrapper onClick={() => (canUseDOM ? window.history.back() : null)}>
        <BackInner withFlex={true}>
            <XIcon icon="chevron_left" />
            <span>{TextProfiles.backButton}</span>
        </BackInner>
    </BackWrapper>
);

export const HeaderWrapper = Glamorous.div({
    borderBottom: '1px solid #ececec',
    paddingTop: 16,
    paddingBottom: 16,
});

export const HeaderAvatar = Glamorous.div({
    paddingRight: 18,
});

export const HeaderInfo = Glamorous(XVertical)({
    paddingTop: 1,
    justifyContent: 'center',
});

export const HeaderTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: '#000000',
});

const HeaderWebsite = Glamorous(XLink)({
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    marginTop: '7px!important',
});

const HeaderAddWebsite = Glamorous.div({
    marginTop: '-1px!important',
    marginBottom: '-6px!important',
});

export const HeaderTools = Glamorous(XHorizontal)({
    paddingTop: 13,
    alignItems: 'center',
});

const EditButtonWrapper = Glamorous(XButton)<XButtonProps & { big?: boolean }>(props => ({
    fontSize: props.big ? 14 : 13,
    display: 'inline-block!important',
    background: 'none!important',
    border: 'none!important',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.5)',

    '& > div': {
        paddingLeft: '0!important',
        paddingRight: '0!important',
    },

    '& .icon.material': {
        marginLeft: -4,
        marginRight: props.big ? 3 : 4,
    },
}));

export const EditButton = (props: XButtonProps & { big?: boolean }) => {
    let { style, icon, ...other } = props;

    return <EditButtonWrapper style="flat" icon="add" {...other} />;
};

interface MemberJoinedProps {
    member: Organization_organization_members;
    organization: Organization_organization;
}

const MemberJoinedCard = (props: MemberJoinedProps) => {
    const { user, role } = props.member;
    const { isYou } = user;
    const isMeAdmin = props.organization.isAdmin;
    const isMeOwner = props.organization.isOwner;

    let customMenu: any = (
        <XOverflow
            placement="bottom-end"
            flat={true}
            content={
                <>
                    {isMeOwner && !isYou && role === 'ADMIN' && (
                        <XMenuItem
                            style="danger"
                            query={{
                                field: 'changeRole',
                                value: user.id,
                            }}
                        >
                            {TextProfiles.Organization.members.revokeAdminStatus}
                        </XMenuItem>
                    )}
                    {isMeOwner && !isYou && role !== 'ADMIN' && (
                        <XMenuItem
                            query={{
                                field: 'changeRole',
                                value: user.id,
                            }}
                        >
                            {TextProfiles.Organization.members.makeAdmin}
                        </XMenuItem>
                    )}
                    <XWithRole role={['super-admin']}>
                        <XMenuItem
                            query={{
                                field: 'editUser',
                                value: user.id,
                            }}
                        >
                            {TextProfiles.Organization.members.edit}
                        </XMenuItem>
                    </XWithRole>
                    {isMeAdmin && !isYou && role !== 'OWNER' && (
                        <XMenuItem
                            style="danger"
                            query={{
                                field: 'remove',
                                value: user.id,
                            }}
                        >
                            {TextProfiles.Organization.members.removeFromOrganization}
                        </XMenuItem>
                    )}
                    {role !== 'ADMIN' && role !== 'OWNER' && isYou && (
                        <XMenuItem
                            style="danger"
                            query={{
                                field: 'remove',
                                value: user.id,
                            }}
                        >
                            {TextProfiles.Organization.members.leaveFromOrganization}
                        </XMenuItem>
                    )}
                    {isMeAdmin && role !== 'OWNER' && isYou && (
                        <XMenuItem
                            style="danger"
                            query={{
                                field: 'remove',
                                value: user.id,
                            }}
                        >
                            {TextProfiles.Organization.members.leaveFromOrganization}
                        </XMenuItem>
                    )}
                </>
            }
        />
    );

    if (role === 'OWNER' || (role === 'ADMIN' && !isMeOwner) || !isMeAdmin) {
        customMenu = null;
    }

    return (
        <XUserCard
            user={user}
            hideOrganization={true}
            isAdmin={role === 'ADMIN'}
            isOwner={role === 'OWNER'}
            customMenu={customMenu}
        />
    );
};

interface MemberRequestCardProps {
    member: Organization_organization_requests;
    organization: Organization_organization;
}

interface MemberRequestCardState {
    status: 'request' | 'accepted' | 'declined';
}

class MemberRequestCard extends React.Component<MemberRequestCardProps, MemberRequestCardState> {
    constructor(props: MemberRequestCardProps) {
        super(props);

        this.state = {
            status: 'request',
        };
    }

    acceptRequest = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            status: 'accepted',
        });
    };

    declineRequest = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            status: 'declined',
        });
    };

    render() {
        const { user } = this.props.member;

        return (
            <XUserCard
                user={user}
                hideOrganization={true}
                customButton={
                    <>
                        {this.state.status === 'request' && (
                            <>
                                <XButton
                                    style="primary"
                                    text="Accept"
                                    onClick={this.acceptRequest}
                                />
                                <XButton text="Decline" onClick={this.declineRequest} />
                            </>
                        )}
                        {this.state.status === 'accepted' && (
                            <XButton style="success" text="Accepted" icon="check" />
                        )}
                        {this.state.status === 'declined' && (
                            <XButton style="ghost" text="Declined" enabled={false} />
                        )}
                    </>
                }
            />
        );
    }
}

const UpdateUserProfileModal = (props: { members: any[] }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    let uid = router.query.editUser;
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === uid)[0];
    if (!member) {
        return null;
    }

    return (
        <XModalForm
            title="Edit profile"
            targetQuery="editUser"
            defaultData={{
                input: {
                    firstName: member.user.firstName,
                    lastName: member.user.lastName,
                    photoRef: sanitizeImageRef(member.user.photoRef),
                },
            }}
            defaultAction={async data => {
                await client.mutateProfileUpdate({
                    input: {
                        firstName: data.input.firstName,
                        lastName: data.input.lastName,
                        photoRef: sanitizeImageRef(data.input.photoRef),
                    },
                    uid,
                });

                await client.refetchAccount();
                await client.refetchMyOrganizations();
            }}
        >
            <XVertical>
                <XInput
                    field="input.firstName"
                    size="large"
                    placeholder={TextProfiles.Organization.inputs.firstName}
                />
                <XInput
                    field="input.lastName"
                    size="large"
                    placeholder={TextProfiles.Organization.inputs.lastName}
                />
                <XAvatarUpload field="input.photoRef" />
            </XVertical>
        </XModalForm>
    );
};

export const PermissionsModal = withOrganizationMemberChangeRole(
    withRouter(props => {
        let member = (props as any).members.filter(
            (m: any) => (m.user && m.user.id === props.router.query.changeRole) || '',
        )[0];

        if (!member) {
            return null;
        }
        return (
            <XModalForm
                title={TextProfiles.Organization.members.changeRole.title(
                    member.user.name,
                    (props as any).orgName,
                )}
                defaultData={{
                    role: member.role,
                }}
                targetQuery="changeRole"
                defaultAction={async data => {
                    await props.changeRole({
                        variables: {
                            memberId: member.user.id,
                            newRole: data.role as OrganizationMemberRole,
                            organizationId: (props as any).orgId,
                        },
                    });
                }}
                target={(props as any).target}
            >
                <XVertical>
                    <XSelect
                        clearable={false}
                        searchable={false}
                        field="role"
                        options={[
                            {
                                value: 'ADMIN',
                                label: TextProfiles.Organization.roles.ADMIN,
                            },
                            {
                                value: 'MEMBER',
                                label: TextProfiles.Organization.roles.MEMBER,
                            },
                        ]}
                    />
                    <XStoreContext.Consumer>
                        {store => {
                            let role = store ? store.readValue('fields.role') : '';
                            return (
                                <XText>
                                    {TextProfiles.Organization.members.changeRole.hints[role]}
                                </XText>
                            );
                        }}
                    </XStoreContext.Consumer>
                </XVertical>
            </XModalForm>
        );
    }),
) as React.ComponentType<{
    orgName: string;
    members: any[];
    orgId: string;
    refetchVars: { orgId: string; organizationId: string };
}>;

export const RemoveJoinedModal = (props => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    let member = props.members.filter(
        (m: any) => (m.user && m.user.id === router.query.remove) || '',
    )[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            submitProps={{
                text: TextProfiles.Organization.members.remove.submit,
                style: 'danger',
            }}
            title={TextProfiles.Organization.members.remove.title(member.user.name, props.orgName)}
            targetQuery="remove"
            defaultAction={async () => {
                await client.mutateOrganizationRemoveMember({
                    memberId: member.user.id,
                    organizationId: props.orgId,
                });

                await client.refetchOrganization({ organizationId: props.orgId });
            }}
        >
            <XText>
                {TextProfiles.Organization.members.remove.text(
                    member.user.firstName,
                    props.orgName,
                )}
            </XText>
        </XModalForm>
    );
}) as React.ComponentType<{
    orgName: string;
    members: any[];
    orgId: string;
    refetchVars: { orgId: string; organizationId: string };
}>;

export const Section = Glamorous(XVertical)({
    paddingTop: 5,
    borderBottom: '1px solid #ececec',
    flexShrink: 0,
    '&:last-child': {
        borderBottom: 'none',
    },
});

export const SectionContent = Glamorous(XContentWrapper)({
    paddingTop: 7,
    paddingBottom: 24,
    fontSize: 14,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000',
});

export let extractHostname = (url: string) => {
    var hostname = url;

    // find & remove protocol (http, ftp, etc.) and get hostname
    hostname = url.split('/')[url.indexOf('//') > -1 ? 2 : 0];

    // find & remove port number
    hostname = hostname.split(':')[0];

    // find & remove "?"
    hostname = hostname.split('?')[0];

    return hostname;
};

const Header = (props: { organization: Organization_organization }) => {
    let { organization } = props;

    const editButton = (
        <XMenuItem path={'/settings/organization/' + organization.id}>
            {TextProfiles.Organization.edit}
        </XMenuItem>
    );

    const deleteOrganizationButton = (
        <XMenuItem style="danger" query={{ field: 'deleteOrganization', value: 'true' }}>
            Delete organization
        </XMenuItem>
    );

    const leaveOrganizationButton = (
        <XMenuItem style="danger" query={{ field: 'leaveOrganization', value: 'true' }}>
            Leave organization
        </XMenuItem>
    );

    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    <XAvatar
                        cloudImageUuid={organization.photo || undefined}
                        size="l-medium"
                        style="organization"
                        objectName={organization.name}
                        objectId={organization.id}
                    />
                </HeaderAvatar>
                <RemoveOrganizationModal />
                <LeaveOrganizationModal />
                <HeaderInfo flexGrow={1} separator={0}>
                    <HeaderTitle>{organization.name}</HeaderTitle>
                    {organization.website && (
                        <HeaderWebsite href={organization.website}>
                            {extractHostname(organization.website)}
                        </HeaderWebsite>
                    )}
                    {!organization.website && (
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <HeaderAddWebsite>
                                <WebsitePlaceholder target={<EditButton text="Add website" />} />
                            </HeaderAddWebsite>
                        </XWithRole>
                    )}
                </HeaderInfo>
                <HeaderTools separator={8}>
                    {organization.linkedin && (
                        <XSocialButton value={organization.linkedin} style="linkedin" />
                    )}
                    {organization.twitter && (
                        <XSocialButton value={organization.twitter} style="twitter" />
                    )}
                    {organization.facebook && (
                        <XSocialButton value={organization.facebook} style="facebook" />
                    )}

                    {!(organization.linkedin || organization.twitter || organization.facebook) && (
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <SocialPlaceholder
                                target={
                                    <EditButton text={TextProfiles.Organization.addSocialLinks} />
                                }
                            />
                        </XWithRole>
                    )}

                    <XOverflow
                        placement="bottom-end"
                        flat={true}
                        content={
                            <>
                                <XWithRole role="admin" orgPermission={organization.id}>
                                    {editButton}
                                </XWithRole>

                                <XWithRole role={['editor', 'super-admin']}>
                                    <XMenuItem path={'/super/orgs/' + organization.superAccountId}>
                                        {TextProfiles.Organization.superEdit}
                                    </XMenuItem>
                                </XWithRole>
                                {organization.isMine && leaveOrganizationButton}
                                <XWithRole
                                    role={organization.isOwner ? 'admin' : 'owner'}
                                    orgPermission={organization.id}
                                >
                                    {deleteOrganizationButton}
                                </XWithRole>
                            </>
                        }
                    />
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { organization: Organization_organization }) => {
    let { organization } = props;

    return (
        <>
            {organization.shortname && (
                <Section separator={0}>
                    <XSubHeader title="Shortname" paddingBottom={0} />
                    <SectionContent>@{organization.shortname}</SectionContent>
                </Section>
            )}
            {organization.about && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.Organization.aboutTitle} paddingBottom={0} />
                    <SectionContent>{organization.about}</SectionContent>
                </Section>
            )}
            {!organization.about && organization.isMine && (
                <XWithRole role="admin" orgPermission={organization.id}>
                    <Section separator={0}>
                        <XSubHeader
                            title={TextProfiles.Organization.aboutTitle}
                            paddingBottom={0}
                            marginBottom={-5}
                        />
                        <SectionContent style={{ paddingBottom: 16 }}>
                            <AboutPlaceholder
                                target={
                                    <EditButton
                                        text={TextProfiles.Organization.addAbout}
                                        big={true}
                                    />
                                }
                            />
                        </SectionContent>
                    </Section>
                </XWithRole>
            )}
        </>
    );
};

type tabsT = 'requests' | 'members';

const tabs: { [K in tabsT]: tabsT } = {
    requests: 'requests',
    members: 'members',
};

interface MembersProps {
    organization: Organization_organization;
    router: XRouter;
    onDirectory?: boolean;
}

interface SearchBoxProps {
    value: { label: string; value: string }[] | null;
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
}

const SearchBox = (props: SearchBoxProps) => (
    <XSelect
        multi={true}
        render={
            <XSelectCustomUsersRender
                popper={false}
                placeholder="Search"
                onInputChange={props.onInputChange}
                onChange={data => props.onChange(data as any)}
                options={props.value || []}
                value={props.value || []}
            />
        }
    />
);

interface ExplorePeopleProps {
    variables: { query?: string };
    searchQuery: string;
    organizationId: string;
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    organizationUsers: Organization_organization_members[];
    linkInvitePath?: string;
}

const ExplorePeople = withExplorePeople(props => {
    const typedProps = props as typeof props & ExplorePeopleProps;
    if (!typedProps.data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    let linkInvitePath = `/mail/${typedProps.organizationId}?inviteToOrganizationByLink=true`;

    if (typedProps.linkInvitePath !== undefined) {
        linkInvitePath = typedProps.linkInvitePath;
    }

    return (
        <XView flexGrow={1} flexShrink={0}>
            <XScrollView2 flexGrow={1} flexShrink={0}>
                <XView paddingHorizontal={16} flexDirection="column">
                    {!typedProps.searchQuery &&
                        (!typedProps.selectedUsers || typedProps.selectedUsers.size === 0) && (
                            <XCreateCard
                                text="Invite with a link"
                                path={linkInvitePath}
                                icon={<LinkIcon />}
                            />
                        )}
                    {typedProps.data.items.edges.map(i => {
                        if (
                            (typedProps.selectedUsers && typedProps.selectedUsers.has(i.node.id)) ||
                            (typedProps.organizationUsers &&
                                typedProps.organizationUsers.find(
                                    (j: Organization_organization_members) =>
                                        j.user.id === i.node.id,
                                ))
                        ) {
                            return null;
                        }
                        return (
                            <XView
                                key={i.node.id}
                                onClick={() => typedProps.onPick(i.node.name, i.node.id)}
                            >
                                <XUserCard user={i.node} noPath={true} customButton={null} />
                            </XView>
                        );
                    })}
                </XView>
            </XScrollView2>
        </XView>
    );
}) as React.ComponentType<ExplorePeopleProps>;

interface InviteModalProps extends XModalProps {
    organizationId: string;
    addMembers: MutationFunc<OrganizationAddMember, Partial<OrganizationAddMemberVariables>>;
    members: Organization_organization_members[];
    linkInvitePath?: string;
}

interface InviteModalState {
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
}

class OrganizationAddMemberModalInner extends React.Component<
    InviteModalProps & { isMobile: boolean },
    InviteModalState
> {
    constructor(props: InviteModalProps & { isMobile: boolean }) {
        super(props);

        this.state = { searchQuery: '', selectedUsers: null };
    }

    private onInputChange = (data: string) => {
        this.setState({
            searchQuery: data,
        });
        return data;
    };

    private onChange = (data: { label: string; value: string }[]) => {
        let newSelected = new Map();
        data.map(i => {
            newSelected.set(i.value, i.label);
        });

        this.setState({
            selectedUsers: newSelected,
        });
    };

    private selectMembers = (label: string, value: string) => {
        let selected = this.state.selectedUsers || new Map();

        selected.set(value, label);

        this.setState({
            selectedUsers: selected,
        });
    };

    render() {
        const { props } = this;
        const { selectedUsers } = this.state;
        let options: { label: string; value: string }[] = [];
        const invitesUsers: string[] = [];
        if (selectedUsers) {
            selectedUsers.forEach((l, v) => {
                options.push({
                    label: l,
                    value: v,
                });
            });

            selectedUsers.forEach((l, v) => {
                invitesUsers.push(v);
            });
        }
        return (
            <XModalForm
                title="Add members"
                target={props.target}
                submitBtnText="Add"
                width={props.isMobile ? undefined : 520}
                flexGrow={props.isMobile ? 1 : undefined}
                useTopCloser={true}
                targetQuery="addMembersToOrganization"
                defaultAction={async data => {
                    await props.addMembers({
                        variables: {
                            organizationId: this.props.organizationId,
                            userIds: invitesUsers,
                        },
                    });

                    this.setState({
                        selectedUsers: null,
                    });
                }}
                onClosed={() =>
                    this.setState({
                        selectedUsers: null,
                        searchQuery: '',
                    })
                }
            >
                <XView
                    height="60vh"
                    flexGrow={1}
                    marginHorizontal={-24}
                    marginTop={-6}
                    marginBottom={-24}
                >
                    <XView paddingHorizontal={16}>
                        <SearchBox
                            onInputChange={this.onInputChange}
                            value={options}
                            onChange={this.onChange}
                        />
                    </XView>
                    <ExplorePeople
                        variables={{ query: this.state.searchQuery }}
                        searchQuery={this.state.searchQuery}
                        organizationId={props.organizationId}
                        onPick={this.selectMembers}
                        selectedUsers={selectedUsers}
                        organizationUsers={props.members}
                        linkInvitePath={props.linkInvitePath}
                    />
                </XView>
            </XModalForm>
        );
    }
}

const OrganizationAddMemberModalRoot = (props: InviteModalProps) => {
    const isMobile = React.useContext(IsMobileContext);
    return <OrganizationAddMemberModalInner {...props} isMobile={isMobile} />;
};

type OrganizationAddMemberModalT = {
    organizationId: string;
    refetchVars: { orgId: string; organizationId: string };
    linkInvitePath?: string;
    members: Organization_organization_members[];
};

export const RoomAddMemberModal = withOrganizationAddMembers(props => {
    const typedProps = props as typeof props & OrganizationAddMemberModalT;
    return (
        <OrganizationAddMemberModalRoot
            {...typedProps}
            organizationId={typedProps.organizationId}
            addMembers={typedProps.addMembers}
            members={typedProps.members}
            linkInvitePath={typedProps.linkInvitePath}
        />
    );
}) as React.ComponentType<OrganizationAddMemberModalT & XModalProps>;

const Members = ({ organization, router, onDirectory }: MembersProps) => {
    let tab: tabsT = tabs.members;

    if (router.query.tab === tabs.requests) {
        tab = tabs.requests;
    }

    let joinedMembers = organization.members || [];
    let requestMembers = organization.requests || [];

    if (joinedMembers.length > 0) {
        let joinedMembersBox = (withHeader?: boolean) => (
            <>
                {withHeader && (
                    <XSubHeader
                        title={TextProfiles.Organization.membersTitle}
                        counter={joinedMembers.length}
                        paddingBottom={0}
                        marginBottom={-3}
                    />
                )}
                <SectionContent>
                    {organization.isMine && (
                        <>
                            <XCreateCard
                                text={TextProfiles.Organization.addMembers}
                                query={{
                                    field: 'addMembersToOrganization',
                                    value: organization.id,
                                }}
                            />
                            <InvitesToOrganizationModal
                                targetQuery="inviteToOrganizationByLink"
                                isCommunity={organization.isCommunity}
                            />
                            <RoomAddMemberModal
                                refetchVars={{
                                    orgId: organization.id,
                                    organizationId: organization.id,
                                }}
                                members={organization.members}
                                organizationId={organization.id}
                                linkInvitePath={
                                    onDirectory
                                        ? `/directory/o/${
                                              organization.id
                                          }?inviteToOrganizationByLink=true`
                                        : `/mail/o/${
                                              organization.id
                                          }?inviteToOrganizationByLink=true`
                                }
                            />
                        </>
                    )}
                    <XMoreCards>
                        {joinedMembers.map((member, i) => (
                            <MemberJoinedCard key={i} member={member} organization={organization} />
                        ))}
                    </XMoreCards>
                </SectionContent>
            </>
        );

        return (
            <Section separator={0}>
                {organization.isMine && requestMembers.length > 0 && (
                    <>
                        <XSwitcher style="button">
                            <XSwitcher.Item query={{ field: 'tab' }} counter={joinedMembers.length}>
                                {TextProfiles.Organization.membersTitle}
                            </XSwitcher.Item>
                            <XSwitcher.Item
                                query={{ field: 'tab', value: 'requests' }}
                                counter={requestMembers.length}
                                highlight={true}
                            >
                                {TextProfiles.Organization.requestsTitle}
                            </XSwitcher.Item>
                        </XSwitcher>

                        {tab === tabs.members && joinedMembersBox(false)}
                        {tab === tabs.requests && (
                            <SectionContent>
                                {requestMembers.map((member, i) => (
                                    <MemberRequestCard
                                        key={i}
                                        member={member}
                                        organization={organization}
                                    />
                                ))}
                            </SectionContent>
                        )}
                    </>
                )}

                {(!organization.isMine || (organization.isMine && requestMembers.length <= 0)) &&
                    joinedMembersBox(true)}

                <RemoveJoinedModal
                    members={organization.members}
                    orgName={organization.name}
                    orgId={organization.id}
                    refetchVars={{
                        orgId: organization.id,
                        organizationId: organization.id,
                    }}
                />
                <PermissionsModal
                    members={organization.members}
                    orgName={organization.name}
                    orgId={organization.id}
                    refetchVars={{
                        orgId: organization.id,
                        organizationId: organization.id,
                    }}
                />
                <UpdateUserProfileModal members={organization.members} />
            </Section>
        );
    } else {
        return null;
    }
};

const Rooms = (props: { organization: Organization_organization }) => {
    let { organization } = props;

    let groups = organization.rooms;

    if (organization.isCommunity || organization.isMine) {
        return (
            <Section separator={0}>
                <XSubHeader
                    title={TextProfiles.Organization.publicGroups}
                    counter={groups.length}
                    paddingBottom={0}
                />
                <SectionContent>
                    <XCreateCard
                        path="/mail/create"
                        text={TextProfiles.Organization.createPublicGroup}
                    />
                    <XMoreCards>
                        {groups.map((c: any, i: any) => (
                            <XRoomCard key={i} room={c} />
                        ))}
                    </XMoreCards>
                </SectionContent>
            </Section>
        );
    }

    return null;
};

interface OrganizationProfileInnerProps extends XWithRouter {
    organization: Organization_organization;
    onDirectory?: boolean;
    hideBack?: boolean;
}

export const OrganizationProfileInner = (props: OrganizationProfileInnerProps) => {
    let { organization } = props;

    return (
        <>
            <XDocumentHead title={organization.name} />
            <XView flexGrow={1}>
                {!props.hideBack && <BackButton />}
                <Header organization={organization} />
                <XScrollView2 flexGrow={1} height="100%">
                    <About organization={organization} />
                    <Members
                        organization={organization}
                        router={props.router}
                        onDirectory={props.onDirectory}
                    />
                    <Rooms organization={organization} />
                </XScrollView2>
            </XView>
        </>
    );
};

const OrganizationProvider = ({
    variables,
    onDirectory,
}: {
    variables: { organizationId: string };
    onDirectory?: boolean;
}) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    const data = client.useOrganization(variables);

    return data.organization ? (
        <OrganizationProfileInner
            organization={data.organization}
            router={router}
            onDirectory={onDirectory}
        />
    ) : (
        <XLoader loading={true} />
    );
};

export const OrganizationProfile = (props: { organizationId: string; onDirectory?: boolean }) => {
    return (
        <OrganizationProvider
            variables={{ organizationId: props.organizationId }}
            onDirectory={props.onDirectory}
        />
    );
};
