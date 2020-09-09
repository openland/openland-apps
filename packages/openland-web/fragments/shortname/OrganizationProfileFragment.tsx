import * as React from 'react';
import { css } from "linaria";
import { XView } from 'react-mental';

import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { useClient } from 'openland-api/useClient';
import { PrivateCommunityView } from 'openland-web/fragments/settings/components/PrivateCommunityView';
import { OrgMember } from 'openland-y-utils/members/EntityMembersManager';
import { ProfileLayout } from 'openland-web/components/ProfileLayout';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListHeroNew } from 'openland-web/components/unicorn/UListHeroNew';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';

import { CreateGroupButton } from './components/CreateGroupButton';
import { OrganizationGroups } from './components/OrganizationGroups';
import { OrganizationActions } from './components/OrganizationActions';
import { OrganizationMembers } from './components/OrganizationMembers';
import { ShowMoreText } from './components/ShowMoreText';

import AtIcon from 'openland-icons/s/ic-at-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import TwitterIcon from 'openland-icons/s/ic-twitter-24-transparent.svg';
import FacebookIcon from 'openland-icons/s/ic-facebook-24-transparent.svg';
import InstagramIcon from 'openland-icons/s/ic-instagram-24-transparent.svg';
import LinkedInIcon from 'openland-icons/s/ic-linkedin-24-transparent.svg';

const listItemWrapper = css`
    width: 250px;
`;

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();

    const organization = client.useOrganization(
        { organizationId: props.id },
        { fetchPolicy: 'cache-and-network' },
    ).organization;

    if (!organization.isMine && organization.private) {
        return <PrivateCommunityView organization={organization} />;
    }

    const {
        id,
        name,
        photo,
        about,
        shortname,
        website,
        twitter,
        facebook,
        isCommunity,
        linkedin,
        instagram,
        isMine,
        roomsCount,
        membersCount,
        owner,
    } = organization;

    const [members, setMembers] = React.useState<OrgMember[]>([]);

    const handleRemoveMember = React.useCallback(
        (memberId: string) => {
            setMembers((current) => current.filter((m) => m.user.id !== memberId));
        },
        [members],
    );

    const parsedSite = findSocialShortname.site(website);
    const parsedTwitter = findSocialShortname.twitter(twitter);
    const parsedFacebook = findSocialShortname.facebook(facebook);
    const parsedInstagram = findSocialShortname.instagram(instagram);
    const parsedLinkedIn = findSocialShortname.linkedin(linkedin);

    const leftColumn = (
        <>
            <UListHeroNew
                title={name}
                description={isCommunity ? 'Community' : 'Organization'}
                avatar={{ photo, id, title: name }}
            >
                <UButton text="Message Admin" size="large" path={'/mail/' + owner.id} marginRight={16}/>
                <OrganizationActions organization={organization} onLeave={handleRemoveMember} />
            </UListHeroNew>
        </>
    );

    const rightColumn = (
        <>
            <UListGroup header="About">
                {!!about && <ShowMoreText text={about} />}
                <XView flexDirection="row" flexWrap="wrap" marginTop={8}>
                    {!!shortname && <UListItem title={shortname} icon={<AtIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={`https://openland.com/${shortname}`}/>}
                    {!!parsedSite && <UListItem title={parsedSite.name} icon={<LinkIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedSite.url}/>}
                    {!!parsedTwitter && <UListItem title={parsedTwitter.name} icon={<TwitterIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedTwitter.url}/>}
                    {!!parsedFacebook && <UListItem title={parsedFacebook.name} icon={<FacebookIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedFacebook.url}/>}
                    {!!parsedInstagram && <UListItem title={parsedInstagram.name} icon={<InstagramIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedInstagram.url}/>}
                    {!!parsedLinkedIn && <UListItem title={parsedLinkedIn.name} icon={<LinkedInIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedLinkedIn.url}/>}
                </XView>
            </UListGroup>
            <React.Suspense fallback={null}>
                <UListGroup header="Groups" counter={roomsCount}>
                    {isMine && <CreateGroupButton id={id} />}
                    <OrganizationGroups id={id} roomsCount={roomsCount} />
                </UListGroup>
            </React.Suspense>
            <UListHeader text="Members" counter={membersCount} paddingVertical={16} height={56} />
            <OrganizationMembers members={members} setMembers={setMembers} organization={organization} onRemoveMember={handleRemoveMember} />
        </>
    );

    const track = `${organization.isCommunity ? 'community' : 'org'}_profile`;

    return (
        <ProfileLayout leftColumn={leftColumn} rightColumn={rightColumn} title={name} track={track}/>
    );
});
