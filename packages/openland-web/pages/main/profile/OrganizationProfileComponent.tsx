import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganization } from '../../../api/withOrganizationSimple';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import {
    OrganizationMemberRole,
    Organization_organization,
    Organization_organization_members,
    Organization_organization_requests,
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton, XButtonProps } from 'openland-x/XButton';
import {
    RemoveOrganizationModal,
    AboutPlaceholder,
    SocialPlaceholder,
    WebsitePlaceholder,
} from './placeholders';
import { XLoader } from 'openland-x/XLoader';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XLink } from 'openland-x/XLink';
import { InvitesToOrganizationModal } from '../settings/invites';
import { XOverflow } from '../../../components/XOverflow';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { withUserProfileUpdate } from '../../../api/withUserProfileUpdate';
import { XInput } from 'openland-x/XInput';
import { withOrganizationRemoveMember } from '../../../api/withOrganizationRemoveMember';
import { withOrganizationMemberChangeRole } from '../../../api/withOrganizationMemberChangeRole';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XSelect } from 'openland-x/XSelect';
import { XText } from 'openland-x/XText';
import { canUseDOM } from 'openland-x-utils/canUseDOM';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XSocialButton } from 'openland-x/XSocialButton';
import { XMoreCards } from 'openland-x/cards/XMoreCards';
import { XCreateCard } from 'openland-x/cards/XCreateCard';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XRouter } from 'openland-x-routing/XRouter';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';

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
    const { isMine } = props.organization;

    let isOwner = isMine ? role === 'OWNER' : undefined;
    let isAdmin = isMine ? role === 'ADMIN' : undefined;

    return (
        <XUserCard
            user={user}
            hideOrganization={true}
            isAdmin={isAdmin}
            isOwner={isOwner}
            customMenu={
                <>
                    <XOverflow
                        placement="bottom-end"
                        flat={true}
                        content={
                            <>
                                {isAdmin && (
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
                                {!isAdmin && !isOwner && (
                                    <XMenuItem
                                        query={{
                                            field: 'changeRole',
                                            value: user.id,
                                        }}
                                    >
                                        {TextProfiles.Organization.members.makeAdmin}
                                    </XMenuItem>
                                )}
                                {!isOwner && (
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
                            </>
                        }
                    />
                </>
            }
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

const UpdateUserProfileModal = withUserProfileUpdate(props => {
    let uid = props.router.query.editUser;
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
                await props.updateProfile({
                    variables: {
                        input: {
                            firstName: data.input.firstName,
                            lastName: data.input.lastName,
                            photoRef: sanitizeImageRef(data.input.photoRef),
                        },
                        uid: uid,
                    },
                });
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
}) as React.ComponentType<{ members: any[] }>;

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
                                value: 'OWNER',
                                label: TextProfiles.Organization.roles.OWNER,
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
    refetchVars: { orgId: string };
}>;

export const RemoveJoinedModal = withOrganizationRemoveMember(props => {
    let member = (props as any).members.filter(
        (m: any) => (m.user && m.user.id === props.router.query.remove) || '',
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
            title={TextProfiles.Organization.members.remove.title(
                member.user.name,
                (props as any).orgName,
            )}
            targetQuery="remove"
            defaultAction={async data => {
                await props.remove({
                    variables: {
                        memberId: member.user.id,
                        organizationId: (props as any).orgId,
                    },
                });
            }}
        >
            <XText>
                {TextProfiles.Organization.members.remove.text(
                    member.user.firstName,
                    (props as any).orgName,
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
        <XWithRole role={['feature-non-production']}>
            <XMenuItem style="danger" query={{ field: 'deleteOrganization', value: 'true' }}>
                Delete organization
            </XMenuItem>
        </XWithRole>
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

                    <XWithRole role={['editor', 'super-admin']} negate={true}>
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={
                                    <>
                                        {editButton}
                                        {deleteOrganizationButton}
                                    </>
                                }
                            />
                        </XWithRole>
                    </XWithRole>

                    <XWithRole role={['editor', 'super-admin']}>
                        <XOverflow
                            placement="bottom-end"
                            flat={true}
                            content={
                                <>
                                    {editButton}
                                    <XMenuItem path={'/super/orgs/' + organization.superAccountId}>
                                        {TextProfiles.Organization.superEdit}
                                    </XMenuItem>
                                    {deleteOrganizationButton}
                                </>
                            }
                        />
                    </XWithRole>
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { organization: Organization_organization }) => {
    let { organization } = props;

    return (
        <>
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
}

const Members = ({ organization, router }: MembersProps) => {
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
                        title={TextProfiles.Organization.membersTitle(organization.isCommunity)}
                        counter={joinedMembers.length}
                        paddingBottom={0}
                        marginBottom={-3}
                    />
                )}
                <SectionContent>
                    {organization.isMine && (
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <InvitesToOrganizationModal
                                target={
                                    <XCreateCard
                                        text={TextProfiles.Organization.addMembers(
                                            organization.isCommunity,
                                        )}
                                    />
                                }
                            />
                        </XWithRole>
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
                                {TextProfiles.Organization.membersTitle(organization.isCommunity)}
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
                    refetchVars={{ orgId: organization.id }}
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

    // let publicRooms = rooms.filter(c => c && !c.hidden);
    let privateRooms = organization.rooms;

    return (
        <>
            {/* publicRooms && (publicRooms.length > 0) && (
                <Section separator={0}>
                    <XSubHeader
                        title={TextProfiles.Organization.publicRooms}
                        counter={publicRooms.length}
                        paddingBottom={0}
                    />
                    <SectionContent>
                        {organization.isMine && (
                            <XWithRole role="admin" orgPermission={organization.id}>
                                <XCreateCard query={{ field: 'createRoom', value: 'true' }} text={TextProfiles.Organization.createPublicRoom} />
                            </XWithRole>
                        )}
                        <XMoreCards>
                            {publicRooms.map((c: any, i: any) => (
                                <XRoomCard
                                    key={i}
                                    room={c}
                                />
                            ))}
                        </XMoreCards>
                    </SectionContent>
                </Section>
            ) */}
            {privateRooms && privateRooms.length > 0 && (
                <Section separator={0}>
                    <XSubHeader
                        title={TextProfiles.Organization.publicRooms}
                        counter={privateRooms.length}
                        paddingBottom={0}
                    />
                    <SectionContent>
                        {organization.isMine && (
                            <XWithRole role="admin" orgPermission={organization.id}>
                                <XCreateCard
                                    query={{
                                        field: 'createRoom',
                                        value: 'true',
                                    }}
                                    text={TextProfiles.Organization.createPublicRoom}
                                />
                            </XWithRole>
                        )}
                        <XMoreCards>
                            {privateRooms.map((c: any, i: any) => (
                                <XRoomCard key={i} room={c} />
                            ))}
                        </XMoreCards>
                    </SectionContent>
                </Section>
            )}
        </>
    );
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
                    <Members organization={organization} router={props.router} />
                    <Rooms organization={organization} />
                </XScrollView2>
            </XView>
        </>
    );
};

const OrganizationProvider = withOrganization(
    withRouter(props =>
        props.data.organization ? (
            <OrganizationProfileInner
                organization={props.data.organization}
                router={props.router}
                onDirectory={(props as any).onDirectory}
            />
        ) : (
            <XLoader loading={true} />
        ),
    ),
) as React.ComponentType<{
    variables: { organizationId: string };
    onDirectory?: boolean;
}>;

export const OrganizationProfile = (props: { organizationId: string; onDirectory?: boolean }) => {
    return (
        <OrganizationProvider
            variables={{ organizationId: props.organizationId }}
            onDirectory={props.onDirectory}
        />
    );
};
