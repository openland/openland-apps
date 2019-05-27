import * as React from 'react';
import Glamorous from 'glamorous';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import {
    OrganizationMemberRole,
    Organization_organization_members,
    OrganizationWithoutMembers_organization,
    OrganizationWithoutMembers_organization_requests,
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton, XButtonProps } from 'openland-x/XButton';
import {
    RemoveOrganizationModal,
    AboutPlaceholder,
    SocialPlaceholder,
    WebsitePlaceholder,
} from './modals';
import { XLoader } from 'openland-x/XLoader';
import { XMenuVertical, XMenuItem } from 'openland-x/XMenuItem';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XLink } from 'openland-x/XLink';
import { XOverflow } from 'openland-web/components/XOverflow';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XSelect } from 'openland-x/XSelect';
import { XText } from 'openland-x/XText';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XSocialButton } from 'openland-x/XSocialButton';
import { XMoreCards, XMoreCardsButton } from 'openland-x/cards/XMoreCards';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XRouter } from 'openland-x-routing/XRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { useClient } from 'openland-web/utils/useClient';
import { AddMembersModal } from 'openland-web/fragments/AddMembersModal';
import { AvatarModal } from './UserProfileComponent';
import { XPopper } from 'openland-x/XPopper';
import { XMemo } from 'openland-y-utils/XMemo';
import { showLeaveConfirmation } from 'openland-web/fragments/showLeaveConfirmation';
import { PrivateCommunityNotMemberLanding } from './PrivateCommunityNotMemberLanding';

const BackWrapper = Glamorous.div({
    background: '#f9f9f9',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    cursor: 'pointer',
    flexShrink: 0,
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

const BackButton = () => (
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
    flexShrink: 0,
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
    organization: OrganizationWithoutMembers_organization;
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
    member: OrganizationWithoutMembers_organization_requests;
    organization: OrganizationWithoutMembers_organization;
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

export const PermissionsModal = (props: {
    orgName: string;
    members: any[];
    orgId: string;
    refetchVars: { orgId: string; organizationId: string };
}) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    let member = (props as any).members.filter(
        (m: any) => (m.user && m.user.id === router.query.changeRole) || '',
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
                await client.mutateOrganizationChangeMemberRole({
                    memberId: member.user.id,
                    newRole: data.role as OrganizationMemberRole,
                    organizationId: (props as any).orgId,
                });

                await client.refetchOrganization({
                    organizationId: (props as any).orgId,
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
};

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
    flexShrink: 0,
});

export const SectionContent = Glamorous(XContentWrapper)(
    ({ noPaddingBottom }: { noPaddingBottom?: boolean }) => {
        return {
            paddingTop: 7,
            paddingBottom: noPaddingBottom ? 0 : 24,
            fontSize: 14,
            lineHeight: '22px',
            letterSpacing: 0,
            color: '#000000',
        };
    },
);

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

const Header = (props: { organization: OrganizationWithoutMembers_organization }) => {
    let { organization } = props;

    const editButton = (
        <XMenuItem path={'/settings/organization/' + organization.id}>
            {TextProfiles.Organization.edit}
        </XMenuItem>
    );

    const deleteOrganizationButton = (
        <XMenuItem style="danger" query={{ field: 'deleteOrganization', value: 'true' }}>
            {organization.isCommunity ? 'Delete community' : 'Delete organization'}
        </XMenuItem>
    );

    const leaveOrganizationButton = (
        <XMenuItem style="danger" onClick={() => showLeaveConfirmation(organization.id)}>
            {organization.isCommunity ? 'Leave community' : 'Leave organization'}
        </XMenuItem>
    );

    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    {organization.photo && (
                        <AvatarModal
                            photo={organization.photo}
                            title={organization.name}
                            id={organization.id}
                        />
                    )}
                    {!organization.photo && (
                        <XAvatar2
                            src={organization.photo || undefined}
                            size={58}
                            title={organization.name}
                            id={organization.id}
                        />
                    )}
                </HeaderAvatar>
                <RemoveOrganizationModal />
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

const About = (props: { organization: OrganizationWithoutMembers_organization }) => {
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
    organization: OrganizationWithoutMembers_organization;
    router: XRouter;
    onDirectory?: boolean;
}

const MoreMembersButton = ({
    haveMore,
    children,
    toggleShown,
}: {
    haveMore: boolean;
    children: any;
    toggleShown: () => void;
}) => {
    return (
        <>
            <XView marginBottom={4}>{children}</XView>
            {haveMore && <XMoreCardsButton isShown={false} toggleShown={toggleShown} />}
        </>
    );
};

const Members = ({ organization, router }: MembersProps) => {
    let tab: tabsT = tabs.members;

    if (router.query.tab === tabs.requests) {
        tab = tabs.requests;
    }
    const client = useClient();

    const data = client.useOrganizationMembersShortPaginated({
        organizationId: organization.id,
        first: 10,
    });

    const [joinedMembers, setJoinedMembers] = React.useState<Organization_organization_members[]>(
        () => {
            return data.organization.members;
        },
    );

    React.useEffect(
        () => {
            setJoinedMembers(data.organization.members);
        },
        [organization.id],
    );

    const toggleShown = async () => {
        const loaded = await client.queryOrganizationMembersShortPaginated({
            organizationId: organization.id,
            first: 10,
            after: joinedMembers[joinedMembers.length - 1].user.id,
        });

        setJoinedMembers([...joinedMembers, ...loaded.organization.members]);
    };

    let requestMembers = organization.requests || [];

    if (joinedMembers.length > 0) {
        let joinedMembersBox = (withHeader?: boolean) => (
            <>
                {withHeader && (
                    <XSubHeader
                        title={TextProfiles.Organization.membersTitle}
                        counter={organization.membersCount.toString()}
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
                                    field: 'inviteMembers',
                                    value: organization.id,
                                }}
                            />
                            <AddMembersModal
                                id={organization.id}
                                isRoom={false}
                                isOrganization={true}
                                isCommunity={organization.isCommunity}
                            />
                        </>
                    )}
                    <MoreMembersButton
                        haveMore={
                            joinedMembers.length !== 0 &&
                            joinedMembers.length !== organization.membersCount
                        }
                        toggleShown={toggleShown}
                    >
                        {joinedMembers.map((member, i) => (
                            <MemberJoinedCard key={i} member={member} organization={organization} />
                        ))}
                    </MoreMembersButton>
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
                    members={joinedMembers}
                    orgName={organization.name}
                    orgId={organization.id}
                    refetchVars={{
                        orgId: organization.id,
                        organizationId: organization.id,
                    }}
                />
                <PermissionsModal
                    members={joinedMembers}
                    orgName={organization.name}
                    orgId={organization.id}
                    refetchVars={{
                        orgId: organization.id,
                        organizationId: organization.id,
                    }}
                />
                <UpdateUserProfileModal members={joinedMembers} />
            </Section>
        );
    } else {
        return null;
    }
};

class CreateGroupButton extends React.PureComponent<{ onClick: () => void }> {
    render() {
        return (
            <XCreateCard
                text={TextProfiles.Organization.createPublicGroup}
                onClick={this.props.onClick}
            />
        );
    }
}

export const CreateGroupPopperButton = XMemo((props: { orgId: string }) => {
    const [show, setShow] = React.useState(false);

    const closer = () => {
        setShow(false);
    };

    const toggle = () => {
        setShow(!show);
    };

    return (
        <XPopper
            contentContainer={<XMenuVertical />}
            placement="bottom-start"
            show={show}
            marginTop={-3}
            marginBottom={-3}
            marginRight={-5}
            arrow={null}
            onClickOutside={closer}
            width={178}
            content={
                <>
                    <XMenuItem style="gray" path={'/mail/create?org=' + props.orgId}>
                        New group
                    </XMenuItem>
                    <XMenuItem style="gray" path={'/mail/create?orgchannel=' + props.orgId}>
                        New channel
                    </XMenuItem>
                </>
            }
        >
            <CreateGroupButton onClick={() => toggle()} />
        </XPopper>
    );
});

const Rooms = (props: { organization: OrganizationWithoutMembers_organization }) => {
    let { organization } = props;

    let groups = organization.rooms;

    if (!organization.isMine && organization.isCommunity) {
        return (
            <Section separator={0}>
                <XSubHeader
                    title={TextProfiles.Organization.publicGroups}
                    counter={groups.length}
                    paddingBottom={0}
                />
                <SectionContent>
                    <XWithRole role="super-admin">
                        <CreateGroupPopperButton orgId={organization.id} />
                    </XWithRole>
                    <XMoreCards>
                        {groups.map((c: any, i: any) => (
                            <XRoomCard key={i} room={c} />
                        ))}
                    </XMoreCards>
                </SectionContent>
            </Section>
        );
    }

    if (!organization.isMine && !organization.isCommunity) {
        return (
            <XWithRole role="super-admin">
                <Section separator={0}>
                    <XSubHeader
                        title={TextProfiles.Organization.publicGroups}
                        counter={groups.length}
                        paddingBottom={0}
                    />
                    <SectionContent>
                        <CreateGroupPopperButton orgId={organization.id} />
                    </SectionContent>
                </Section>
            </XWithRole>
        );
    }

    if (organization.isMine) {
        return (
            <Section separator={0}>
                <XSubHeader
                    title={TextProfiles.Organization.publicGroups}
                    counter={groups.length}
                    paddingBottom={0}
                />
                <SectionContent>
                    <CreateGroupPopperButton orgId={organization.id} />
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
    organization: OrganizationWithoutMembers_organization;
    onDirectory?: boolean;
    hideBack?: boolean;
}

export const OrganizationProfileInner = (props: OrganizationProfileInnerProps) => {
    let { organization } = props;

    return (
        <>
            <XDocumentHead title={organization.name} />
            <XView flexGrow={1} flexShrink={1}>
                {!props.hideBack && <BackButton />}
                <Header organization={organization} />
                <XScrollView3 flexGrow={1} flexShrink={1}>
                    <About organization={organization} />
                    <Rooms organization={organization} />
                    <React.Suspense fallback={<XLoader loading={true} />}>
                        <Members
                            organization={organization}
                            router={props.router}
                            onDirectory={props.onDirectory}
                        />
                    </React.Suspense>
                </XScrollView3>
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

    const data = client.useOrganizationWithoutMembers(variables);

    if (!data.organization.isMine && data.organization.isPrivate) {
        return <PrivateCommunityNotMemberLanding organization={data.organization} />;
    }

    return (
        <OrganizationProfileInner
            organization={data.organization}
            router={router}
            onDirectory={onDirectory}
        />
    );
};

export const OrganizationProfile = (props: { organizationId: string; onDirectory?: boolean }) => {
    return (
        <React.Suspense fallback={<XLoader loading={true} />}>
            <OrganizationProvider
                variables={{ organizationId: props.organizationId }}
                onDirectory={props.onDirectory}
            />
        </React.Suspense>
    );
};
