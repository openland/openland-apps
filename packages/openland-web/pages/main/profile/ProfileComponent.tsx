import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganization } from '../../../api/withOrganizationSimple';
import { OrganizationQuery } from 'openland-api/Types';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XIcon } from 'openland-x/XIcon';
import { XText } from 'openland-x/XText';
import { XTag } from 'openland-x/XTag';
import { XSwitcher } from 'openland-x/XSwitcher';
import { withRouter } from 'next/router';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { AboutPlaceholder, SocialPlaceholder, LocationPlaceholder, CategoriesPlaceholder } from './placeholders';
import ContactEmailIc from './icons/contacts/ic-email.svg';
import ContactLinkedInIc from './icons/contacts/ic-linkedin.svg';
import ContactPhoneIc from './icons/contacts/ic-phone.svg';
import { XLoader } from 'openland-x/XLoader';
import { InviteMembersModal } from '../channel/components/inviteMembersModal';
import { InvitesToOrganizationMoadal } from '../settings/invites';
import { RemoveInviteddModal, PermissionsModal, RemoveJoinedModal } from '../settings/members.page';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { TextInvites } from 'openland-text/TextInvites';

interface Channel {
    isRoot: string;
    name: string;
    members: number;
    requests: number;
    id: string;
}

const Back = (props: { callback: () => void }) => (
    <div onClick={props.callback}>
        <XHorizontal>
            <XIcon icon="arrow-back" />
            <XText>Back</XText>
        </XHorizontal>
    </div>
);

class Header extends React.Component<{ organizationQuery: OrganizationQuery } & XWithRouter> {
    render() {
        let org = this.props.organizationQuery.organization;
        return (
            <XHorizontal>
                <XAvatar cloudImageUuid={org.photo || undefined} />
                <XVertical>
                    <XHorizontal>
                        <XText>
                            {org.name}
                        </XText>
                        {org.featured && <XTag text="Featuted" color="green" />}
                    </XHorizontal>
                    <XSwitcher>
                        <XSwitcher.Item query={{ field: 'orgTab' }}>Channels</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'orgTab', value: 'about' }}>About</XSwitcher.Item>
                        <XSwitcher.Item query={{ field: 'orgTab', value: 'members' }}>{org.isCommunity ? 'Admins' : 'Members'}</XSwitcher.Item>
                    </XSwitcher>
                </XVertical>
            </XHorizontal>
        );
    }
}

const Channels = ((props: any) => {
    let channesls: Channel[] = [
        {
            name: 'Main channel',
            members: 100,
            requests: 1,
            isRoot: 'true',
            id: '61gk9KRrl9ComJkvYnvdcddr4o'
        },
        {
            name: 'Startups',
            members: 100,
            requests: 1,
            isRoot: 'false',
            id: '61gk9KRrl9ComJkvYnvdcddr4o'
        },
        {
            name: 'Investors',
            members: 100,
            requests: 1,
            isRoot: 'false',
            id: '61gk9KRrl9ComJkvYnvdcddr4o'
        }
    ];

    return (
        <XVertical>
            {channesls.map(c => (
                <XHorizontal justifyContent="space-between">
                    <XText>{(c.isRoot ? '' : '/') + c.name}</XText>
                    <XText>{c.members}</XText>
                    {(props as any).myOrg && <XWithRole role="admin" orgPermission={true}>
                        <XText>{c.requests}</XText>
                    </XWithRole>}
                    <XButton text="View" path={'/mail/' + c.id} />
                </XHorizontal>
            ))}
        </XVertical>
    );
}) as React.ComponentType<{ variables: { organizationId: string }, myOrg: boolean }>;

class About extends React.Component<{ organizationQuery: OrganizationQuery }> {
    render() {
        let org = this.props.organizationQuery.organization;
        let hasLinks = (org.linkedin || org.twitter || org.website);
        let hasCategories = (org.organizationType || []).length > 0;
        let hasLocations = (org.locations || []).length > 0;
        return (
            <XVertical>

                {org.isMine && <XWithRole role="admin" orgPermission={true}>
                    {(!org.about || !hasLinks || !hasLocations || !hasCategories) && (
                        <>
                            <XSubHeader title="Add section" />
                            {!org.about && <AboutPlaceholder />}
                            {!hasLinks && <SocialPlaceholder />}
                            {!hasCategories && <CategoriesPlaceholder />}
                            {!hasLocations && <LocationPlaceholder />}
                        </>
                    )}
                </XWithRole>}
                {org.about && (
                    <>
                        <XSubHeader title="About">
                            {org.isMine && <XWithRole role="admin" orgPermission={true}>
                                <AboutPlaceholder target={<XButton text="Edit" style="flat" />} />
                            </XWithRole>}
                        </XSubHeader>
                        <XText>{org.about}</XText>
                    </>
                )}
                {hasLinks && (
                    <>
                        <XSubHeader title="Links">
                            {org.isMine && <XWithRole role="admin" orgPermission={true}>
                                <SocialPlaceholder target={<XButton text="Edit" style="flat" />} />
                            </XWithRole>}
                        </XSubHeader>
                        <XHorizontal>
                            {org.website && <XTag text={org.website} />}
                            {org.twitter && <XTag text={org.twitter} />}
                            {org.linkedin && <XTag text={org.linkedin} />}
                        </XHorizontal>
                    </>
                )}
                {hasCategories && (
                    <>
                        <XSubHeader title="Categories">
                            {org.isMine && <XWithRole role="admin" orgPermission={true}>
                                <CategoriesPlaceholder target={<XButton text="Edit" style="flat" />} />
                            </XWithRole>}
                        </XSubHeader>
                        {(org.organizationType || []).map((l, i) => < XTag key={l + i} text={l} />)}
                    </>
                )}
                {hasLocations && (
                    <>
                        <XSubHeader title="Locations">
                            {org.isMine && <XWithRole role="admin" orgPermission={true}>
                                <LocationPlaceholder target={<XButton text="Edit" style="flat" />} />
                            </XWithRole>}
                        </XSubHeader>
                        {(org.locations || []).map((l, i) => < XTag key={l + i} text={l} />)}
                    </>
                )}
            </XVertical>
        );
    }
}

class Members extends React.Component<{ organizationQuery: OrganizationQuery }> {
    render() {
        let organization = this.props.organizationQuery.organization;
        return (
            <>
                {(organization.members || []).length > 0 && (
                    <>
                        <XVertical separator={8}>
                            <XSubHeader title={organization.isCommunity ? 'Adming' : 'Members'} >
                                {organization.isMine && (
                                    <XWithRole role="admin" orgPermission={true}>
                                        <InvitesToOrganizationMoadal target={<XButton text={'add ' + (organization.isCommunity ? 'admin' : 'members')} style="flat" />} />
                                    </XWithRole>
                                )}
                            </XSubHeader>
                            {(organization.members || []).map((member, i) => {
                                console.warn(member);
                                return (
                                    <XHorizontal
                                        key={i}
                                        separator={10}
                                        alignItems="center"
                                    >
                                        <XAvatar cloudImageUuid={member.user.picture || undefined} size="medium" />
                                        <XVertical separator={1}>
                                            <XHorizontal separator={5} alignItems="center">
                                                <XText>{member.user.name}</XText>
                                                <XText>{member.user.email}</XText>
                                                <XText>{member.user.linkedin}</XText>
                                                <XText>{member.user.twitter}</XText>
                                            </XHorizontal>
                                            <XText opacity={0.8}>{member.role}</XText>
                                        </XVertical>
                                        <XButton text="Message" path={'/mail/' + member.user.id} />
                                        <XOverflow
                                            placement="bottom-end"
                                            content={
                                                <>
                                                    <XMenuItem query={{ field: 'changeRole', value: member.user.id }}>{TextInvites.membersMgmt.menuChangeRole}</XMenuItem>
                                                    <XMenuItem query={{ field: 'remove', value: member.user.id }} style="danger" >{TextInvites.membersMgmt.menuRemoveMember}</XMenuItem>
                                                </>
                                            }
                                        />
                                    </XHorizontal>
                                );
                            })}
                        </XVertical>
                    </>
                )}
                <RemoveJoinedModal members={organization.members} orgName={organization.name} refetchVars={{ orgId: organization.id }} />
                <PermissionsModal members={organization.members} orgName={organization.name} refetchVars={{ orgId: organization.id }} />
            </>
        );
    }
}

class OrganizationProfileInner extends React.Component<{ organizationQuery: OrganizationQuery, onBack: () => void } & XWithRouter> {
    render() {
        let channelsTab = this.props.router.query.orgTab === undefined;
        let aboutTab = this.props.router.query.orgTab === 'about';
        let membersTab = this.props.router.query.orgTab === 'members';
        return (
            <XVertical>
                <Back callback={this.props.onBack} />
                <Header organizationQuery={this.props.organizationQuery} router={this.props.router} />
                {channelsTab && <Channels variables={{ organizationId: this.props.organizationQuery.organization.id }} myOrg={this.props.organizationQuery.organization.isMine} />}
                {aboutTab && <About organizationQuery={this.props.organizationQuery} />}
                {membersTab && <Members organizationQuery={this.props.organizationQuery} />}
            </XVertical >
        );
    }
}

const OrganizationProvider = withOrganization(withRouter((props) => {
    return (
        props.data.organization ? <OrganizationProfileInner organizationQuery={props.data} onBack={(props as any).onBack} router={props.router} /> : <XLoader loading={true} />
    );
})) as React.ComponentType<{ onBack: () => void, variables: { organizationId: string } }>;

export const OrganizationProfile = (props: { organizationId: string, onBack: () => void }) => (<OrganizationProvider variables={{ organizationId: props.organizationId }} onBack={props.onBack} />);
