import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganization } from '../../../api/withOrganizationSimple';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { OrganizationQuery } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader, XSubHeaderRight } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { XTag } from 'openland-x/XTag';
import { XSwitcher } from 'openland-x/XSwitcher';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { AboutPlaceholder, SocialPlaceholder, LocationPlaceholder, CategoriesPlaceholder } from './placeholders';
import { XLoader } from 'openland-x/XLoader';
import { XMenuItem, XMenuTitle } from 'openland-x/XMenuItem';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import { TextInvites } from 'openland-text/TextInvites';
import { XLink } from 'openland-x/XLink';
import { InvitesToOrganizationModal } from '../settings/invites';
import { PermissionsModal, RemoveJoinedModal } from '../settings/membersTable';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { ChannelSetFeatured, ChannelSetHidden } from '../../../components/messenger/MessengerComponent';
import WebsiteIcon from './icons/website-2.svg';
import LinkedinIcon from './icons/linkedin-2.svg';
import TwitterIcon from './icons/twitter-2.svg';
import EmailIcon from './icons/email.svg';

const BackWrapper = Glamorous.div({
    background: '#f9fafb',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '13px 12px 12px',
    '& i': {
        fontSize: 20,
        marginRight: 6,
        color: '#c1c7cf'
    },
    '& span': {
        fontWeight: 500,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: -0.4,
        color: '#5c6a81'
    }
});

const Back = (props: { callback: () => void }) => (
    <BackWrapper onClick={props.callback}>
        <XIcon icon="chevron_left" />
        <span>Back</span>
    </BackWrapper>
);

const HeaderWrapper = Glamorous.div({
    display: 'flex',
    position: 'relative',
    '&:before': {
        content: ' ',
        zIndex: 1,
        height: 1,
        background: 'rgba(220, 222, 228, 0.45)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    }
});

const HeaderAvatar = Glamorous.div({
    padding: 24
});

const HeaderInfo = Glamorous.div({
    flex: 1,
    position: 'relative',
    zIndex: 2,
});

const HeaderBox = Glamorous.div({
    padding: '23px 0 5px',
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

const HeaderTabs = Glamorous(XSwitcher)({
    border: 'none',
    boxShadow: 'none',
    padding: 0,
    borderRadius: 0,
    background: 'none',
    margin: '0 0 -1px -7px',
    '& > a': {
        padding: '17px 7px 16px!important',
        borderBottom: '3px solid transparent',
        fontSize: 14,
        lineHeight: '20px',
        fontWeight: '500!important',
        margin: '0 15px 0 0!important',
        color: '#334562',
        opacity: 0.5,
        '&.is-active': {
            opacity: 1,
            color: '#334562',
            borderBottomColor: '#1790ff'
        }
    }
});

const HeaderTools = Glamorous.div({
    padding: 24
});

const Header = (props: { organizationQuery: OrganizationQuery, tabs: string[] }) => {
    let org = props.organizationQuery.organization;

    return (
        <HeaderWrapper>
            <HeaderAvatar>
                <XAvatar
                    cloudImageUuid={org.photo || undefined}
                    size="s-medium"
                    style="organization"
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
                <HeaderTabs>
                    {(props.tabs.indexOf('channels') > -1) && <XSwitcher.Item query={{ field: 'orgTab' }}>Channels</XSwitcher.Item>}
                    {(props.tabs.indexOf('about') > -1) && <XSwitcher.Item query={{ field: 'orgTab', value: 'about' }}>About</XSwitcher.Item>}
                    <XSwitcher.Item query={{ field: 'orgTab', value: 'members' }}>{org.isCommunity ? 'Admins' : 'Members'}</XSwitcher.Item>
                </HeaderTabs>
            </HeaderInfo>
            {org.isMine && (
                <XWithRole role="admin" orgPermission={true}>
                    <HeaderTools>
                        <XButton
                            size="r-default"
                            text="Edit profile"
                            path="/settings/organization"
                        />
                    </HeaderTools>
                </XWithRole>
            )}
        </HeaderWrapper>
    );
};

const SectionContent = Glamorous.div<{ withTags?: boolean }>([
    {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '18px 24px 32px',
        borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
        '&:last-child': {
            borderBottom: 'none'
        }
    },
    (props) => (props.withTags) ? {
        padding: '10px 12px 22px 24px',

        '& > div': {
            margin: '6px 12px 6px 0!important'
        }
    } : {}
]);

const AboutText = Glamorous.div({
    fontWeight: 500,
    fontSize: 14,
    lineHeight: '24px',
    letterSpacing: -0.4,
    color: '#5c6a81'
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

const About = (props: { organizationQuery: OrganizationQuery }) => {
    let org = props.organizationQuery.organization;
    let hasLinks = (org.linkedin || org.twitter || org.website);
    let hasCategories = (org.organizationType || []).length > 0;
    let hasLocations = (org.locations || []).length > 0;

    return (
        <>
            {org.isMine && (
                <XWithRole role="admin" orgPermission={true}>
                    {(!org.about || !hasLinks || !hasLocations || !hasCategories) && (
                        <>
                            <XSubHeader title="Add sections" />
                            <AddSectionWrapper>
                                {!org.about && (
                                    <AddSection>
                                        <AddSectionText>Describe your organization in a few sentences</AddSectionText>
                                        <AboutPlaceholder target={<XButton text="About" style="light-blue" size="r-default" icon="add" />} />
                                    </AddSection>
                                )}
                                {!hasLinks && (
                                    <AddSection>
                                        <AddSectionText>Add links to your website and social media</AddSectionText>
                                        <SocialPlaceholder target={<XButton text="Links" style="light-blue" size="r-default" icon="add" />} />
                                    </AddSection>
                                )}
                                {!hasCategories && (
                                    <AddSection>
                                        <AddSectionText>Add categories</AddSectionText>
                                        <CategoriesPlaceholder target={<XButton text="Categories" style="light-blue" size="r-default" icon="add" />} />
                                    </AddSection>
                                )}
                                {!hasLocations && (
                                    <AddSection>
                                        <AddSectionText>Add locations where are you based or operate</AddSectionText>
                                        <LocationPlaceholder target={<XButton text="Locations" style="light-blue" size="r-default" icon="add" />} />
                                    </AddSection>
                                )}
                            </AddSectionWrapper>
                        </>
                    )}
                </XWithRole>
            )}
            {org.about && (
                <>
                    <XSubHeader title="About">
                        {org.isMine && (
                            <XWithRole role="admin" orgPermission={true}>
                                <XSubHeaderRight>
                                    <AboutPlaceholder target={<EditButton>Edit</EditButton>} />
                                </XSubHeaderRight>
                            </XWithRole>
                        )}
                    </XSubHeader>
                    <SectionContent>
                        <AboutText>{org.about}</AboutText>
                    </SectionContent>
                </>
            )}
            {hasLinks && (
                <>
                    <XSubHeader title="Links">
                        {org.isMine && (
                            <XWithRole role="admin" orgPermission={true}>
                                <XSubHeaderRight>
                                    <SocialPlaceholder target={<EditButton>Edit</EditButton>} />
                                </XSubHeaderRight>
                            </XWithRole>
                        )}
                    </XSubHeader>
                    <SectionContent>
                        <XHorizontal>
                            {org.website && (
                                <XButton
                                    href={org.website}
                                    icon={<SocialIconWrapper><WebsiteIcon /></SocialIconWrapper>}
                                    size="r-default"
                                    text="Website"
                                />
                            )}
                            {org.linkedin && (
                                <XButton
                                    href={org.linkedin}
                                    icon={<SocialIconWrapper><LinkedinIcon /></SocialIconWrapper>}
                                    size="r-default"
                                    text="Linkedin"
                                />
                            )}
                            {org.twitter && (
                                <XButton
                                    href={org.twitter}
                                    icon={<SocialIconWrapper><TwitterIcon /></SocialIconWrapper>}
                                    size="r-default"
                                    text="Twitter"
                                />
                            )}
                        </XHorizontal>
                    </SectionContent>
                </>
            )}
            {hasCategories && (
                <>
                    <XSubHeader title="Organization category" counter={org.organizationType ? org.organizationType.length : undefined}>
                        {org.isMine && (
                            <XWithRole role="admin" orgPermission={true}>
                                <XSubHeaderRight>
                                    <CategoriesPlaceholder target={<EditButton>Edit</EditButton>} />
                                </XSubHeaderRight>
                            </XWithRole>
                        )}
                    </XSubHeader>
                    <SectionContent withTags={true}>
                        {(org.organizationType || []).map((l, i) => (
                            <XTag
                                key={l + i}
                                size="large"
                                rounded={true}
                                text={l}
                            />
                        ))}
                    </SectionContent>
                </>
            )}
            {hasLocations && (
                <>
                    <XSubHeader title="Locations" counter={org.locations ? org.locations.length : undefined}>
                        {org.isMine && (
                            <XWithRole role="admin" orgPermission={true}>
                                <XSubHeaderRight>
                                    <LocationPlaceholder target={<EditButton>Edit</EditButton>} />
                                </XSubHeaderRight>
                            </XWithRole>
                        )}
                    </XSubHeader>
                    <SectionContent withTags={true}>
                        {(org.locations || []).map((l, i) => (
                            <XTag
                                key={l + i}
                                size="large"
                                rounded={true}
                                text={l}
                            />
                        ))}
                    </SectionContent>
                </>
            )}
        </>
    );
};

const MemberCardWrapper = Glamorous.div({
    display: 'flex',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '16px 0 15px',
    '&:hover': {
        backgroundColor: '#f9fafb'
    }
});

const MemberCardAvatar = Glamorous.div({
    padding: '0 12px 0 24px'
});

const MemberCardTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#5c6a81',
});

const MemberCardOrg = Glamorous.div({
    fontSize: 12,
    fontWeight: 500,
    opacity: 0.5,
    color: '#334562',
    letterSpacing: -0.2,
    alignSelf: 'flex-end',
    marginBottom: -2,
    cursor: 'pointer'
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
    padding: '4px 18px 0'
});

interface MemberCardProps {
    user: {
        id: string,
        name: string,
        firstName: string,
        lastName: string | null,
        picture: string | null,
        email: string | null,
        primaryOrganization: {
            id: string,
            name: string,
        } | null,
        role: string | null,
        linkedin: string | null,
        twitter: string | null
    };
    iAmOwner: boolean;
}

class MemberCard extends React.PureComponent<MemberCardProps> {

    state = {
        isHovered: false,
    };

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <MemberCardWrapper
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <MemberCardAvatar>
                    <XAvatar cloudImageUuid={user.picture || undefined} userName={user.name} userId={user.id} style="colorus" />
                </MemberCardAvatar>
                <XHorizontal alignItems="center" flexGrow={1}>
                    <XVertical flexGrow={1} separator={0.5} flexShrink={0}>
                        <XHorizontal alignItems="center" separator={4}>
                            <MemberCardTitle>{user.name}</MemberCardTitle>
                            {user.email && <MemberCardSocial href={'mailto:' + user.email}><EmailIcon /></MemberCardSocial>}
                            {user.linkedin && <MemberCardSocial href={user.linkedin}><LinkedinIcon /></MemberCardSocial>}
                            {user.twitter && <MemberCardSocial href={user.twitter}><TwitterIcon /></MemberCardSocial>}
                            {user.primaryOrganization && <MemberCardOrg>{user.primaryOrganization.name}</MemberCardOrg>}
                        </XHorizontal>
                        {user.role && <MemberCardRole>{user.role}</MemberCardRole>}
                    </XVertical>
                </XHorizontal>
                <MemberCardTools separator={5}>
                    <XButton
                        text="Message"
                        size="r-default"
                        style={this.state.isHovered ? 'primary-sky-blue' : 'default'}
                        path={'/mail/' + user.id}
                    />
                    {this.props.iAmOwner && <XOverflow
                        placement="bottom-end"
                        flat={true}
                        content={
                            <>
                                <XMenuItem style="primary-sky-blue" query={{ field: 'changeRole', value: user.id }}>{TextInvites.membersMgmt.menuChangeRole}</XMenuItem>
                                <XMenuItem style="danger" query={{ field: 'remove', value: user.id }}>{TextInvites.membersMgmt.menuRemoveMember}</XMenuItem>
                            </>
                        }
                    />}
                </MemberCardTools>
            </MemberCardWrapper>
        );
    }
}

const Members = (props: { organizationQuery: OrganizationQuery }) => {
    let organization = props.organizationQuery.organization;
    return (
        <>
            {(organization.members || []).length > 0 && (
                <>
                    <XSubHeader title={organization.isCommunity ? 'Admins' : 'Organization members'} counter={organization.members.length}>
                        {organization.isMine && (
                            <XWithRole role="admin" orgPermission={true}>
                                <XSubHeaderRight>
                                    <InvitesToOrganizationModal target={<XButton text={'Add ' + (organization.isCommunity ? 'admin' : 'members')} style="flat" size="r-default" icon="add" />} />
                                </XSubHeaderRight>
                            </XWithRole>
                        )}
                    </XSubHeader>
                    <XScrollView height="calc(100% - 216px)">
                        {(organization.members || []).map((member, i) => {
                            return (
                                <MemberCard key={i} user={member.user} iAmOwner={organization.isOwner} />
                            );
                        })}
                    </XScrollView>
                </>
            )}
            <RemoveJoinedModal members={organization.members} orgName={organization.name} refetchVars={{ orgId: organization.id }} />
            <PermissionsModal members={organization.members} orgName={organization.name} refetchVars={{ orgId: organization.id }} />
        </>
    );
};

const ChannelCardWrapper = makeNavigable(Glamorous.div({
    display: 'flex',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    padding: '15px 0 12px 25px',
    '&:hover': {
        backgroundColor: '#f9fafb'
    },
    cursor: 'pointer'
}));

const ChannelCardInfo = Glamorous.div({
    flex: 1,
});

const ChannelCardTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#1790ff',
    marginBottom: 1,
});

const ChannelCardRole = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    letterSpacing: -0.4,
    color: '#99a2b0',
});

const ChannelCardTools = Glamorous(XHorizontal)({
    padding: '4px 18px 0'
});

interface ChannelCardProps {
    channel: {
        id: string;
        isRoot: boolean;
        title: string;
        membersCount: number;
        memberRequestsCount: number;
        hidden: boolean;
        featured: boolean;
    };
    organization: {
        isOwner?: boolean
    };
}

class ChannelCard extends React.Component<ChannelCardProps> {
    state = {
        isHovered: false,
    };

    render() {
        const { channel } = this.props;
        const organization = this.props.organization;
        const membersCountText = channel.membersCount + ' ' + ((channel.membersCount) > 1 ? 'members' : 'member');
        const requesetsCountText = (organization && organization.isOwner && channel.memberRequestsCount > 0) ? '• ' + (channel.memberRequestsCount + ' ' + (channel.memberRequestsCount > 1 ? 'requests' : 'request')) : undefined;

        return (
            <ChannelCardWrapper
                path={'/mail/' + channel.id}
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <ChannelCardInfo>
                    <ChannelCardTitle>{(channel.isRoot ? '' : '/') + channel.title}</ChannelCardTitle>
                    <ChannelCardRole>{membersCountText} {requesetsCountText}</ChannelCardRole>
                </ChannelCardInfo>
                <ChannelCardTools separator={5}>
                    <XButton
                        text="View"
                        size="r-default"
                        style={this.state.isHovered ? 'primary-sky-blue' : 'default'}
                        path={'/mail/' + channel.id}
                    />
                    <XWithRole role={['super-admin', 'editor']}>
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={(
                                <div style={{ width: 160 }} onClick={(e) => e.stopPropagation()}>
                                    <XMenuTitle>Super admin</XMenuTitle>
                                    <ChannelSetFeatured conversationId={channel.id} val={channel.featured} />
                                    <ChannelSetHidden conversationId={channel.id} val={channel.hidden} />
                                </div>
                            )}
                        />
                    </XWithRole>
                </ChannelCardTools>
            </ChannelCardWrapper>
        );
    }
}

interface OrganizationProfileInnerProps extends XWithRouter {
    organizationQuery: OrganizationQuery;
    onBack: () => void;
}

const OrganizationProfileInner = (props: OrganizationProfileInnerProps) => {
    let channelsTab = props.router.query.orgTab === undefined;
    let aboutTab = props.router.query.orgTab === 'about';
    let membersTab = props.router.query.orgTab === 'members';

    let org = props.organizationQuery.organization;

    // check isEmptyChannels
    let isEmptyChannels = org.channels.filter(c => c && !c.hidden).length <= 0;

    // check isEmptyAbout
    let hasLinks = (org.linkedin || org.twitter || org.website);
    let hasCategories = (org.organizationType || []).length > 0;
    let hasLocations = (org.locations || []).length > 0;
    let isEmptyAbout = !org.isMine && !org.about && !hasLinks && !hasLocations && !hasCategories;

    let headerTabs = ['members'];

    if (!isEmptyChannels) {
        headerTabs.push('channels');
    }

    if (!isEmptyAbout) {
        headerTabs.push('about');
    }

    if (channelsTab && isEmptyChannels && !isEmptyAbout) {
        props.router.pushQuery('orgTab', 'about');
    }

    if (channelsTab && isEmptyChannels && isEmptyAbout) {
        props.router.pushQuery('orgTab', 'members');
    }

    return (
        <>
            <Back callback={props.onBack} />
            <Header
                organizationQuery={props.organizationQuery}
                tabs={headerTabs}
            />
            {channelsTab && org.channels.filter(c => c && !c.hidden).map((c, i) => (
                c ? <ChannelCard key={i} channel={c} organization={org} /> : null
            ))}
            {aboutTab && <About organizationQuery={props.organizationQuery} />}
            {membersTab && <Members organizationQuery={props.organizationQuery} />}
        </>
    );
};

const OrganizationProvider = withOrganization(withRouter((props) => (
    props.data.organization
        ? (
            <OrganizationProfileInner
                organizationQuery={props.data}
                onBack={(props as any).onBack}
                router={props.router}
            />
        )
        : <XLoader loading={true} />
))) as React.ComponentType<{ onBack: () => void, variables: { organizationId: string } }>;

export const OrganizationProfile = (props: { organizationId: string, onBack: () => void }) => (
    <OrganizationProvider
        variables={{ organizationId: props.organizationId }}
        onBack={props.onBack}
    />
);
