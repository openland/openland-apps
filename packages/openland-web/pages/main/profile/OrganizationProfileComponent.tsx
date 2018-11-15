import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganization } from '../../../api/withOrganizationSimple';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { Organization, OrganizationMemberRole, User_user } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { XTag } from 'openland-x/XTag';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton, XButtonProps } from 'openland-x/XButton';
import { AboutPlaceholder, SocialPlaceholder, WebsitePlaceholder } from './placeholders';
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
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XSocialButton } from 'openland-x/XSocialButton';

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

interface MemberCardProps {
    user: User_user;
    iAmOwner: boolean;
    isCommunity: boolean;
}

const MemberCard = (props: MemberCardProps) => {
    const { user } = props;
    return (
        <XUserCard
            user={user}
            hideOrganization={true}
            customMenu={(
                <>
                    {props.iAmOwner && <XOverflow
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
                    {!props.iAmOwner && <XWithRole role={['super-admin']}>
                        <XOverflow
                            placement="bottom-end"
                            flat={true}
                            content={<XMenuItem query={{ field: 'editUser', value: user.id }}>Edit</XMenuItem>}
                        />
                    </XWithRole>}
                </>
            )}
        />
    );
};

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

const Header = (props: { organizationQuery: Organization }) => {
    let org = props.organizationQuery.organization;
    let hasSocials = (org.linkedin || org.twitter || org.facebook);

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
                <HeaderInfo flexGrow={1} separator={0}>
                    <HeaderTitle>{org.name}</HeaderTitle>
                    {org.website && (
                        <HeaderWebsite href={org.website}>
                            {(new URL(org.website)).hostname}
                        </HeaderWebsite>
                    )}
                    {!org.website && (
                        <XWithRole role="admin" orgPermission={org.id}>
                            <HeaderAddWebsite>
                                <WebsitePlaceholder target={<EditButton text="Add website" />} />
                            </HeaderAddWebsite>
                        </XWithRole>
                    )}
                </HeaderInfo>
                <HeaderTools separator={8}>
                    {org.linkedin && (<XSocialButton value={org.linkedin} style="linkedin" />)}
                    {org.twitter && (<XSocialButton value={org.twitter} style="twitter" />)}
                    {org.facebook && (<XSocialButton value={org.facebook} style="facebook" />)}

                    {!hasSocials && (
                        <XWithRole role="admin" orgPermission={org.id}>
                            <SocialPlaceholder target={<EditButton text="Add social links" />} />
                        </XWithRole>
                    )}

                    <XWithRole role={['editor', 'super-admin']} negate={true}>
                        <XWithRole role="admin" orgPermission={org.id}>
                            <XOverflow
                                placement="bottom-end"
                                flat={true}
                                content={(
                                    <>
                                        <XMenuItem path={'/settings/organization/' + org.id}>Edit</XMenuItem>
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
                                    <XMenuItem path={'/settings/organization/' + org.id}>Edit</XMenuItem>
                                    <XMenuItem path={'/super/orgs/' + org.superAccountId}>Super Edit</XMenuItem>
                                </>
                            )}
                        />
                    </XWithRole>
                </HeaderTools>
            </XContentWrapper>
        </HeaderWrapper>
    );
};

const About = (props: { organizationQuery: Organization }) => {
    let org = props.organizationQuery.organization;

    return (
        <>
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
                            <AboutPlaceholder target={<EditButton text="Add a short description" />} />
                        </SectionContent>
                    </Section>
                </XWithRole>
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
                <XScrollView height="calc(100% - 136px)">
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