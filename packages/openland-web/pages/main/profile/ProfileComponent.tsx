import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganization } from '../../../api/withOrganizationSimple';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Organization, OrganizationMemberRole } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { XTag } from 'openland-x/XTag';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { AboutPlaceholder, SocialPlaceholder } from './placeholders';
import { XLoader } from 'openland-x/XLoader';
import { XMenuItem, XMenuTitle } from 'openland-x/XMenuItem';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { TextInvites } from 'openland-text/TextInvites';
import { XLink } from 'openland-x/XLink';
import { InvitesToOrganizationModal } from '../settings/invites';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import WebsiteIcon from './icons/website-2.svg';
import LinkedinIcon from './icons/linkedin-2.svg';
import TwitterIcon from './icons/twitter-2.svg';
import EmailIcon from './icons/email.svg';
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
            <span>Back</span>
        </BackInner>
    </BackWrapper>
);

const HeaderWrapper = Glamorous.div({
    borderBottom: '1px solid #ececec',
    paddingTop: 16,
    paddingBottom: 17
});

const HeaderAvatar = Glamorous.div({
    paddingRight: 18
});

const HeaderInfo = Glamorous.div({
    flex: 1,
    position: 'relative',
    zIndex: 2,
});

const HeaderBox = Glamorous.div({
    paddingTop: 7,
    display: 'flex',
    alignItems: 'center'
});

const HeaderTitle = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.6,
    marginRight: 9,
    lineHeight: '30px',
    color: '#334562'
});

const HeaderFeatured = Glamorous.div({
    margin: '1px 0 -1px',
});

const HeaderTools = Glamorous.div({
    paddingTop: 13
});

const AddSectionWrapper = Glamorous.div({
    padding: '18px 24px 32px',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
});

const AddSection = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32,
    '&:last-child': {
        marginBottom: 0
    }
});

const AddSectionText = Glamorous.div({
    marginRight: 16,
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#5c6a81'
});

const EditButton = Glamorous.div({
    color: '#99a2b0',
    height: 32,
    lineHeight: '32px',
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 500,
    padding: '0 14px',
    cursor: 'pointer',
    '&:hover': {
        color: '#334562',
    },
    '&:active': {
        color: '#1790ff',
    },
});

const SocialIconWrapper = Glamorous.div({
    margin: '-1px 2px 1px 0',
    display: 'flex'
});

const MemberCardWrapper = makeNavigable(Glamorous.div<NavigableChildProps>(() => ({
    display: 'flex',
    padding: '12px 16px',
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#F9F9F9'
    }
})));

const MemberCardAvatar = Glamorous.div({
    padding: '0 16px 0 0'
});

const MemberCardTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#5c6a81',
});

const MemberCardOrg = Glamorous(XLink)({
    fontSize: 12,
    fontWeight: 500,
    opacity: 0.5,
    color: '#334562',
    letterSpacing: -0.2,
    alignSelf: 'flex-end',
    marginBottom: -2,
    cursor: 'pointer',
    '&:hover': {
        opacity: 1,
        color: '#1790ff'
    }
});

const MemberCardSocial = Glamorous(XLink)({
    display: 'block',
    '& svg': {
        display: 'block',
        '& *': {
            fill: '#d6dadf',
        }
    },
    '&:hover svg *': {
        fill: '#1790ff',
    },
});

const MemberCardRole = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#99a2b0',
});

const MemberCardTools = Glamorous(XHorizontal)({
    padding: '4px 0 0 18px'
});

interface MemberCardProps {
    user: {
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        photo: string | null,
        email: string | null,
        online: boolean,
        primaryOrganization: {
            id: string,
            name: string,
        } | null,
        linkedin: string | null,
        twitter: string | null
    };
    iAmOwner: boolean;
    isCommunity: boolean;
}

class MemberCard extends React.PureComponent<MemberCardProps> {
    state = {
        isHovered: false,
    };

    render() {
        const { user } = this.props;
        return (
            <MemberCardWrapper
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
                path={'/directory/u/' + user.id}
            >
                <MemberCardAvatar>
                    <XAvatar
                        cloudImageUuid={user.photo || undefined}
                        objectName={user.name}
                        objectId={user.id}
                        style="user"
                    />
                </MemberCardAvatar>
                <XHorizontal alignItems="center" flexGrow={1}>
                    <XVertical flexGrow={1} separator={0.5} flexShrink={0}>
                        <XHorizontal alignItems="center" separator={4}>
                            <MemberCardTitle>{user.name}</MemberCardTitle>
                            {user.email && <MemberCardSocial href={'mailto:' + user.email}><EmailIcon /></MemberCardSocial>}
                            {user.linkedin && <MemberCardSocial href={user.linkedin}><LinkedinIcon /></MemberCardSocial>}
                            {user.twitter && <MemberCardSocial href={user.twitter}><TwitterIcon /></MemberCardSocial>}
                            {this.props.isCommunity && user.primaryOrganization && <MemberCardOrg path={`/directory/o/${user.primaryOrganization.id}`}>{user.primaryOrganization.name}</MemberCardOrg>}
                        </XHorizontal>
                    </XVertical>
                </XHorizontal>
                <MemberCardTools separator={5}>
                    <XButton
                        text="Message"
                        style={this.state.isHovered ? 'primary' : 'default'}
                        path={`/mail/${user.id}`}
                    />
                    {this.props.iAmOwner && <XOverflow
                        placement="bottom-end"
                        flat={true}
                        content={
                            <>
                                <XMenuItem query={{ field: 'changeRole', value: user.id }}>{TextInvites.membersMgmt.menuChangeRole}</XMenuItem>
                                <XMenuItem style="danger" query={{ field: 'remove', value: user.id }}>{TextInvites.membersMgmt.menuRemoveMember}</XMenuItem>
                                <XWithRole role={['super-admin']}>
                                    <XMenuItem query={{ field: 'editUser', value: user.id }}>Edit</XMenuItem>
                                </XWithRole>
                            </>
                        }
                    />}
                    {!this.props.iAmOwner && <XWithRole role={['super-admin']}>
                        <XOverflow
                            placement="bottom-end"
                            flat={true}
                            content={<XMenuItem query={{ field: 'editUser', value: user.id }}>Edit</XMenuItem>}
                        />
                    </XWithRole>}
                </MemberCardTools>
            </MemberCardWrapper>
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
                <XInput field="input.firstName" size="large" placeholder="First name" />
                <XInput field="input.lastName" size="large" placeholder="Last name" />
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
            title={TextInvites.membersMgmt.changeRoleTitle(member.user.name, (props as any).orgName)}
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
                <XSelect clearable={false} searchable={false} field="role" options={[{ value: 'OWNER', label: 'Admin' }, { value: 'MEMBER', label: 'Member' }]} />
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
})) as React.ComponentType<{ orgName: string, members: any[], orgId: string, refetchVars: { orgId: string } }>;

export const RemoveJoinedModal = withOrganizationRemoveMember((props) => {
    let member = (props as any).members.filter((m: any) => m.user && m.user.id === props.router.query.remove || '')[0];
    if (!member) {
        return null;
    }
    return (
        <XModalForm
            submitProps={{
                text: TextInvites.membersMgmt.removeSubmit,
                style: 'danger',
            }}
            title={TextInvites.membersMgmt.removeTitle(member.user.name, (props as any).orgName)}
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
            <XText>{TextInvites.membersMgmt.removeText(member.user.firstName, (props as any).orgName)}</XText>
        </XModalForm>
    );
}) as React.ComponentType<{ orgName: string, members: any[], orgId: string, refetchVars: { orgId: string, organizationId: string } }>;

const Section = Glamorous(XVertical)({
    paddingTop: 5,
    borderBottom: '1px solid #ececec',
    '&:last-child': {
        borderBottom: 'none'
    }
});

const SectionContent = Glamorous(XContentWrapper)({
    paddingTop: 7,
    paddingBottom: 24,
    fontSize: 14,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000'
});

const Header = (props: { organizationQuery: Organization }) => {
    let org = props.organizationQuery.organization;

    return (
        <HeaderWrapper>
            <XContentWrapper withFlex={true}>
                <HeaderAvatar>
                    <XAvatar
                        cloudImageUuid={org.photo || undefined}
                        size="l-medium"
                        style="organization"
                        objectName={org.name}
                        objectId={org.id}
                    />
                </HeaderAvatar>
                <HeaderInfo>
                    <HeaderBox>
                        <HeaderTitle>{org.name}</HeaderTitle>
                        {org.featured && (
                            <HeaderFeatured>
                                <XTag
                                    text="Featured"
                                    color="green"
                                    rounded={true}
                                    iconLeft="star"
                                    size="small"
                                />
                            </HeaderFeatured>
                        )}
                    </HeaderBox>
                </HeaderInfo>
                <HeaderTools>
                    <XHorizontal>
                        <XWithRole role="super-admin" negate={true}>
                            <XWithRole role="admin" orgPermission={org.id}>
                                <XButton
                                    text="Edit profile"
                                    path={'/settings/organization/' + org.id}
                                />
                            </XWithRole>
                        </XWithRole>

                        <XWithRole role="super-admin">
                            <XButton
                                text="Edit profile"
                                path={'/settings/organization/' + org.id}
                            />
                            <XButton
                                text="Super edit"
                                path={'/super/orgs/' + org.superAccountId}
                            />
                        </XWithRole>

                        {org.isMine && (
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem query={{ field: 'createRoom', value: 'true' }}>Create room</XMenuItem>
                                    </>
                                )}
                            />
                        )}
                    </XHorizontal>
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { organizationQuery: Organization }) => {
    let org = props.organizationQuery.organization;
    let hasLinks = (org.linkedin || org.twitter || org.website || org.facebook);

    return (
        <>
            {org.isMine && (
                <XWithRole role="admin" orgPermission={org.id}>
                    {(!org.about || !hasLinks) && (
                        <Section separator={0}>
                            <XSubHeader title="Add sections" />
                            <AddSectionWrapper>
                                {!org.about && (
                                    <AddSection>
                                        <AddSectionText>Describe your organization in a few sentences</AddSectionText>
                                        <AboutPlaceholder target={<XButton text="About" style="light" icon="add" />} />
                                    </AddSection>
                                )}
                                {!hasLinks && (
                                    <AddSection>
                                        <AddSectionText>Add links to your website and social media</AddSectionText>
                                        <SocialPlaceholder target={<XButton text="Links" style="light" icon="add" />} />
                                    </AddSection>
                                )}
                            </AddSectionWrapper>
                        </Section>
                    )}
                </XWithRole>
            )}
            {org.about && (
                <Section separator={0}>
                    <XSubHeader
                        title="About"
                        paddingBottom={0}
                    />
                    <SectionContent>
                        {org.about}
                    </SectionContent>
                </Section>
            )}
            {!org.about && org.isMine && (
                <XWithRole role="admin" orgPermission={org.id}>
                    <Section separator={0}>
                        <XSubHeader
                            title="About"
                            paddingBottom={0}
                        />
                        <SectionContent>
                            <AboutPlaceholder target={<EditButton>Add a short description</EditButton>} />
                        </SectionContent>
                    </Section>
                </XWithRole>
            )}
            {hasLinks && (
                <Section separator={0}>
                    <XSubHeader
                        title="Links"
                        paddingBottom={0}
                        right={org.isMine ? (
                            <XWithRole role="admin" orgPermission={org.id}>
                                <SocialPlaceholder target={<EditButton>Edit</EditButton>} />
                            </XWithRole>
                        ) : undefined}
                    />
                    <SectionContent>
                        <XHorizontal>
                            {org.website && (
                                <XButton
                                    href={org.website}
                                    icon={<SocialIconWrapper><WebsiteIcon /></SocialIconWrapper>}
                                    text="Website"
                                />
                            )}
                            {org.facebook && (
                                <XButton
                                    href={org.facebook}
                                    icon={<SocialIconWrapper><WebsiteIcon /></SocialIconWrapper>}
                                    text="Facebook"
                                />
                            )}
                            {org.linkedin && (
                                <XButton
                                    href={org.linkedin}
                                    icon={<SocialIconWrapper><LinkedinIcon /></SocialIconWrapper>}
                                    text="Linkedin"
                                />
                            )}
                            {org.twitter && (
                                <XButton
                                    href={org.twitter}
                                    icon={<SocialIconWrapper><TwitterIcon /></SocialIconWrapper>}
                                    text="Twitter"
                                />
                            )}
                        </XHorizontal>
                    </SectionContent>
                </Section>
            )}
        </>
    );
};

const Members = (props: { organizationQuery: Organization }) => {
    let organization = props.organizationQuery.organization;

    if (organization.members && organization.members.length > 0) {
        return (
            <Section separator={0}>
                <XSubHeader
                    title={organization.isCommunity ? 'Admins' : 'Organization members'}
                    counter={organization.members.length}
                    paddingBottom={0}
                    right={organization.isMine ? (
                        <XWithRole role="admin" orgPermission={organization.id}>
                            <InvitesToOrganizationModal target={<XButton text={'Add ' + (organization.isCommunity ? 'admin' : 'members')} style="flat" icon="add" />} />
                        </XWithRole>
                    ) : undefined}
                />
                <SectionContent>
                    {organization.members.map((member, i) => {
                        return (
                            <MemberCard key={i} user={member.user} isCommunity={organization.isCommunity} iAmOwner={organization.isOwner} />
                        );
                    })}
                </SectionContent>
                <RemoveJoinedModal members={organization.members} orgName={organization.name} orgId={organization.id} refetchVars={{ orgId: organization.id, organizationId: organization.id }} />
                <PermissionsModal members={organization.members} orgName={organization.name} orgId={organization.id} refetchVars={{ orgId: organization.id }} />
                <UpdateUserProfileModal members={organization.members} />
            </Section>
        );
    } else {
        return null;
    }
};

export const Rooms = (props: { rooms: any }) => {
    if (props.rooms && (props.rooms.length > 0)) {
        return (
            <Section separator={0}>
                <XSubHeader
                    title="Rooms"
                    counter={props.rooms.length}
                    paddingBottom={0}
                />
                <SectionContent>
                    {props.rooms.map((c: any, i: any) => (
                        c ? <XRoomCard key={i} room={c} /> : null
                    ))}
                </SectionContent>
            </Section>
        );
    } else {
        return null;
    }
};

const OrgInfoWrapper = Glamorous.div({
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
        let org = this.props.organizationQuery.organization;

        return (
            <OrgInfoWrapper innerRef={this.handleRef}>
                <BackButton />
                <Header organizationQuery={this.props.organizationQuery} />
                <XScrollView height="calc(100% - 137px)">
                    <About organizationQuery={this.props.organizationQuery} />
                    <Members organizationQuery={this.props.organizationQuery} />
                    <Rooms rooms={org.channels.filter(c => c && !c.hidden)} />
                </XScrollView>
            </OrgInfoWrapper>
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