import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganization } from '../../../api/withOrganizationSimple';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Organization, OrganizationMemberRole, Organization_organization, Organization_organization_members, Organization_organization_requests } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton, XButtonProps } from 'openland-x/XButton';
import { AboutPlaceholder, SocialPlaceholder, WebsitePlaceholder } from './placeholders';
import { XLoader } from 'openland-x/XLoader';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XScrollView } from 'openland-x/XScrollView';
import { XLink } from 'openland-x/XLink';
import { InvitesToOrganizationModal } from '../settings/invites';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { sanitizeIamgeRef } from 'openland-y-utils/sanitizeImageRef';
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
        color: 'rgba(0, 0, 0, 0.3)'
    },
    '& span': {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.8)'
    }
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
    paddingBottom: 16
});

const HeaderAvatar = Glamorous.div({
    paddingRight: 18
});

const HeaderInfo = Glamorous(XVertical)({
    paddingTop: 1,
    justifyContent: 'center'
});

const HeaderTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: '#000000'
});

const HeaderWebsite = Glamorous(XLink)({
    color: 'rgba(0, 0, 0, 0.5)',
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    marginTop: '7px!important'
});

const HeaderAddWebsite = Glamorous.div({
    marginTop: '-1px!important',
    marginBottom: '-6px!important',
});

const HeaderTools = Glamorous(XHorizontal)({
    paddingTop: 13
});

const EditButtonWrapper = Glamorous(XButton)({
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
        marginLeft: -4
    }
});

const EditButton = (props: XButtonProps) => {
    let { style, icon, ...other } = props;

    return (
        <EditButtonWrapper
            style="flat"
            icon="add"
            {...other}
        />
    );
};

interface MemberJoinedProps {
    member: Organization_organization_members;
    organization: Organization_organization;
}

const MemberJoinedCard = (props: MemberJoinedProps) => {
    const { user, role } = props.member;
    const { isMine, isOwner } = props.organization;

    let isAdmin = (isMine) ? role === 'OWNER' : undefined;

    return (
        <XUserCard
            user={user}
            hideOrganization={true}
            isAdmin={isAdmin}
            customMenu={(
                <>
                    {isOwner && (
                        <XOverflow
                            placement="bottom-end"
                            flat={true}
                            content={
                                <>
                                    {isAdmin && <XMenuItem style="danger" query={{ field: 'changeRole', value: user.id }}>{TextProfiles.Organization.members.revokeAdminStatus}</XMenuItem>}
                                    {!isAdmin && <XMenuItem query={{ field: 'changeRole', value: user.id }}>{TextProfiles.Organization.members.makeAdmin}</XMenuItem>}
                                    {!isAdmin && <XMenuItem style="danger" query={{ field: 'remove', value: user.id }}>{TextProfiles.Organization.members.removeFromOrganization}</XMenuItem>}

                                    <XWithRole role={['super-admin']}>
                                        <XMenuItem query={{ field: 'editUser', value: user.id }}>{TextProfiles.Organization.members.edit}</XMenuItem>
                                    </XWithRole>
                                </>
                            }
                        />
                    )}
                    {!isOwner && (
                        <XWithRole role={['super-admin']}>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={<XMenuItem query={{ field: 'editUser', value: user.id }}>{TextProfiles.Organization.members.edit}</XMenuItem>}
                            />
                        </XWithRole>
                    )}
                </>
            )}
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
            status: 'request'
        };
    }

    acceptRequest = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            status: 'accepted'
        });
    }

    declineRequest = (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            status: 'declined'
        });
    }

    render () {
        const { user } = this.props.member;

        return (
            <XUserCard
                user={user}
                hideOrganization={true}
                customButton={(
                    <>
                        {this.state.status === 'request' && (
                            <>
                                <XButton style="primary" text="Accept" onClick={this.acceptRequest} />
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
                )}
            />
        );
    }
}

const UpdateUserProfileModal = withUserProfileUpdate((props) => {
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
                    photoRef: sanitizeIamgeRef(member.user.photoRef)
                }
            }}
            defaultAction={
                async (data) => {
                    await props.updateProfile({
                        variables: {
                            input: {
                                firstName: data.input.firstName,
                                lastName: data.input.lastName,
                                photoRef: sanitizeIamgeRef(data.input.photoRef)
                            },
                            uid: uid
                        }
                    });
                }
            }
        >
            <XVertical>
                <XInput field="input.firstName" size="large" placeholder={TextProfiles.Organization.inputs.firstName} />
                <XInput field="input.lastName" size="large" placeholder={TextProfiles.Organization.inputs.lastName} />
                <XAvatarUpload field="input.photoRef" />
            </XVertical>
        </XModalForm>
    );
}) as React.ComponentType<{ members: any[] }>;

export const PermissionsModal = withOrganizationMemberChangeRole(withRouter((props) => {
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === props.router.query.changeRole || '')[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            title={TextProfiles.Organization.members.changeRole.title(member.user.name, (props as any).orgName)}
            defaultData={{
                role: member.role
            }}
            targetQuery="changeRole"
            defaultAction={async (data) => {
                await props.changeRole({
                    variables: {
                        memberId: member.user.id,
                        newRole: data.role as OrganizationMemberRole,
                        organizationId: (props as any).orgId
                    }
                });
            }}
            target={(props as any).target}
        >
            <XVertical>
                <XSelect clearable={false} searchable={false} field="role" options={[{ value: 'OWNER', label: TextProfiles.Organization.roles.OWNER }, { value: 'MEMBER', label: TextProfiles.Organization.roles.MEMBER }]} />
                <XStoreContext.Consumer>
                    {(store) => {
                        let role = store ? store.readValue('fields.role') : '';
                        return (
                            <XText>{TextProfiles.Organization.members.changeRole.hints[role]}</XText>
                        );
                    }}
                </XStoreContext.Consumer>
            </XVertical>
        </XModalForm>
    );
})) as React.ComponentType<{ orgName: string, members: any[], orgId: string, refetchVars: { orgId: string } }>;

export const RemoveJoinedModal = withOrganizationRemoveMember((props) => {
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === props.router.query.remove || '')[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            submitProps={{
                text: TextProfiles.Organization.members.remove.submit,
                style: 'danger',
            }}
            title={TextProfiles.Organization.members.remove.title(member.user.name, (props as any).orgName)}
            targetQuery="remove"
            defaultAction={async (data) => {
                await props.remove({
                    variables: {
                        memberId: member.user.id,
                        organizationId: (props as any).orgId
                    }
                });
            }}
        >
            <XText>{TextProfiles.Organization.members.remove.text(member.user.firstName, (props as any).orgName)}</XText>
        </XModalForm>
    );
}) as React.ComponentType<{ orgName: string, members: any[], orgId: string, refetchVars: { orgId: string, organizationId: string } }>;

export const Section = Glamorous(XVertical)({
    paddingTop: 5,
    borderBottom: '1px solid #ececec',
    '&:last-child': {
        borderBottom: 'none'
    }
});

export const SectionContent = Glamorous(XContentWrapper)({
    paddingTop: 7,
    paddingBottom: 24,
    fontSize: 14,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000'
});

let extractHostname = (url: string) => {
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
                    {organization.linkedin && (<XSocialButton value={organization.linkedin} style="linkedin" />)}
                    {organization.twitter && (<XSocialButton value={organization.twitter} style="twitter" />)}
                    {organization.facebook && (<XSocialButton value={organization.facebook} style="facebook" />)}

                    {!(organization.linkedin || organization.twitter || organization.facebook) && (
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <SocialPlaceholder target={<EditButton text={TextProfiles.Organization.addSocialLinks} />} />
                        </XWithRole>
                    )}

                    <XWithRole role={['editor', 'super-admin']} negate={true}>
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem path={'/settings/organization/' + organization.id}>{TextProfiles.Organization.edit}</XMenuItem>
                                    </>
                                )}
                            />
                        </XWithRole>
                    </XWithRole>

                    <XWithRole role={['editor', 'super-admin']}>
                        <XOverflow
                            placement="bottom-end"
                            flat={true}
                            content={(
                                <>
                                    <XMenuItem path={'/settings/organization/' + organization.id}>{TextProfiles.Organization.edit}</XMenuItem>
                                    <XMenuItem path={'/super/orgs/' + organization.superAccountId}>{TextProfiles.Organization.superEdit}</XMenuItem>
                                </>
                            )}
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
                    <SectionContent>
                        {organization.about}
                    </SectionContent>
                </Section>
            )}
            {!organization.about && organization.isMine && (
                <XWithRole role="admin" orgPermission={organization.id}>
                    <Section separator={0}>
                        <XSubHeader title={TextProfiles.Organization.aboutTitle} paddingBottom={0} />
                        <SectionContent>
                            <AboutPlaceholder target={<EditButton text={TextProfiles.Organization.addAbout} />} />
                        </SectionContent>
                    </Section>
                </XWithRole>
            )}
        </>
    );
};

interface MembersProps {
    organization: Organization_organization;
    router: XRouter;
}

const Members = (props: MembersProps) => {
    let tab: 'members' | 'requests' = 'members';

    if (props.router.query.tab === 'requests') {
        tab = 'requests';
    }

    let { organization } = props;

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
                    />
                )}
                <SectionContent>
                    {organization.isMine && (
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <InvitesToOrganizationModal
                                target={<XCreateCard text={TextProfiles.Organization.addMembers(organization.isCommunity)} />}
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
                {(organization.isMine && requestMembers.length > 0) && (
                    <>
                        <XSwitcher style="button">
                            <XSwitcher.Item
                                query={{ field: 'tab' }}
                                counter={joinedMembers.length}
                            >
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

                        {tab === 'members' && joinedMembersBox(false)}
                        {tab === 'requests' && (
                            <SectionContent>
                                {requestMembers.map((member, i) => (
                                    <MemberRequestCard key={i} member={member} organization={organization} />
                                ))}
                            </SectionContent>
                        )}
                    </>
                )}

                {(!organization.isMine || (organization.isMine && requestMembers.length <= 0)) && joinedMembersBox(true)}

                <RemoveJoinedModal members={organization.members} orgName={organization.name} orgId={organization.id} refetchVars={{ orgId: organization.id, organizationId: organization.id }} />
                <PermissionsModal members={organization.members} orgName={organization.name} orgId={organization.id} refetchVars={{ orgId: organization.id }} />
                <UpdateUserProfileModal members={organization.members} />
            </Section>
        );
    } else {
        return null;
    }
};

const Rooms = (props: { organization: Organization_organization }) => {
    let { organization } = props;

    let publicRooms = organization.channels.filter(c => c && !c.hidden);
    let privateRooms = organization.channels.filter(c => c && c.hidden);

    return (
        <>
            {publicRooms && (publicRooms.length > 0) && (
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
            )}
            {/* organization.isMine && privateRooms && (privateRooms.length > 0) && (
                <Section separator={0}>
                    <XSubHeader
                        title={TextProfiles.Organization.privateRooms}
                        counter={privateRooms.length}
                        paddingBottom={0}
                    />
                    <SectionContent>
                        <XMoreCards>
                            {privateRooms.map((c: any, i: any) => (
                                <XRoomCard
                                    key={i}
                                    room={c}
                                />
                            ))}
                        </XMoreCards>
                    </SectionContent>
                </Section>
            ) */}
        </>
    );
};

const OrganizationInfoWrapper = Glamorous.div({
    overflow: 'hidden',
    height: '100%'
});

interface OrganizationProfileInnerProps extends XWithRouter {
    organizationQuery: Organization;
    handlePageTitle?: any;
    onDirectory?: boolean;
}

class OrganizationProfileInner extends React.Component<OrganizationProfileInnerProps> {
    pageTitle: string | undefined = undefined;

    constructor(props: OrganizationProfileInnerProps) {
        super(props);

        if (this.props.handlePageTitle) {
            this.pageTitle = props.organizationQuery.organization.name;
            this.props.handlePageTitle(this.pageTitle);
        }
    }

    componentWillReceiveProps(newProps: OrganizationProfileInnerProps) {
        if (newProps.handlePageTitle) {
            let title = newProps.organizationQuery.organization.name;

            if (title !== this.pageTitle) {
                this.pageTitle = title;

                newProps.handlePageTitle(title);
            }
        }
    }

    handleRef = (ref?: any) => {
        if (!ref && this.props.onDirectory) {
            if (this.props.handlePageTitle) {
                this.pageTitle = undefined;
                this.props.handlePageTitle(undefined);
            }
        }
    }

    render() {
        let organization = this.props.organizationQuery.organization;

        return (
            <OrganizationInfoWrapper innerRef={this.handleRef}>
                <BackButton />
                <Header organization={organization} />
                <XScrollView height="calc(100% - 136px)">
                    <About organization={organization} />
                    <Members organization={organization} router={this.props.router} />
                    <Rooms organization={organization} />
                </XScrollView>
            </OrganizationInfoWrapper>
        );
    }
}

const OrganizationProvider = withOrganization(withRouter((props) => (
    props.data.organization
        ? (
            <OrganizationProfileInner
                organizationQuery={props.data}
                router={props.router}
                handlePageTitle={(props as any).handlePageTitle}
                onDirectory={(props as any).onDirectory}
            />
        )
        : <XLoader loading={true} />
))) as React.ComponentType<{ variables: { organizationId: string }, onDirectory?: boolean; handlePageTitle?: any }>;

export const OrganizationProfile = (props: { organizationId: string, onDirectory?: boolean; handlePageTitle?: any }) => (
    <OrganizationProvider
        variables={{ organizationId: props.organizationId }}
        handlePageTitle={props.handlePageTitle}
        onDirectory={props.onDirectory}
    />
);