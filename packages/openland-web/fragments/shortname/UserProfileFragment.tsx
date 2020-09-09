import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UPresence } from 'openland-web/components/unicorn/UPresence';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UListHeroNew } from 'openland-web/components/unicorn/UListHeroNew';
import { ProfileLayout } from 'openland-web/components/ProfileLayout';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';
import { plural } from 'openland-y-utils/plural';
import { XDate } from 'openland-x/XDate';
import { getLocationUrl } from 'openland-y-utils/getLocationUrl';

import AtIcon from 'openland-icons/s/ic-at-24.svg';
import MailIcon from 'openland-icons/s/ic-mail-24.svg';
import LocationIcon from 'openland-icons/s/ic-geo-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import FlagIcon from 'openland-icons/s/ic-flag.svg';
import InstagramIcon from 'openland-icons/s/ic-instagram-24-transparent.svg';
import FacebookIcon from 'openland-icons/s/ic-facebook-24-transparent.svg';
import TwitterIcon from 'openland-icons/s/ic-twitter-24-transparent.svg';
import LinkedInIcon from 'openland-icons/s/ic-linkedin-24-transparent.svg';
import BirthDayIcon from 'openland-icons/s/ic-birthday-24.svg';
import PhoneIcon from 'openland-icons/s/ic-phone.svg';

import { UserActions } from './components/UserActions';
import { ShowMoreText } from './components/ShowMoreText';
import { ProfileTabsFragment } from './components/ProfileTabsFragment';

const listItemWrapper = css`
    width: 250px;
`;

export const UserProfileFragment = React.memo((props: { id?: string }) => {
    const userContext = React.useContext(UserInfoContext)!.user!;
    const engine = React.useContext(MessengerContext);
    const uId = props?.id || userContext.id;
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: uId }, { fetchPolicy: 'cache-and-network' });
    const { commonChatsWithUser } = client.useCommonChatsWithUser({ uid: uId, first: 20 }, { fetchPolicy: 'cache-and-network' });
    const {
        id, isBot, name, photo, about, shortname, location, phone, email, linkedin, joinDate,
        website, twitter, facebook, instagram, birthDay
    } = user;
    const { items, count } = commonChatsWithUser;

    const parsedSite = findSocialShortname.site(website);
    const parsedTwitter = findSocialShortname.twitter(twitter);
    const parsedFacebook = findSocialShortname.facebook(facebook);
    const parsedInstagram = findSocialShortname.instagram(instagram);
    const parsedLinkedIn = findSocialShortname.linkedin(linkedin);

    const isMe = engine.user.id === user.id;
    const buttonText = isBot ? 'View messages' : 'Send message';

    const joinedTitle = <>Joined <XDate value={joinDate} /></>;

    const leftColumn = (
        <UListHeroNew
            title={name}
            description={<UPresence user={user}/>}
            avatar={{ photo, id, title: name }}
        >
            {engine.user.id !== id && <UButton text={buttonText} path={`/mail/${id}`} size="large" shape="square" marginRight={16}/>}
           <UserActions chat={conversation} user={user} />
        </UListHeroNew>
    );

    const rightColumn = (
        <>
            <UListGroup header="About">
                {!!about && <ShowMoreText text={about} />}
                <XView flexDirection="row" flexWrap="wrap" marginTop={8}>
                    {!!shortname && <UListItem title={shortname} icon={<AtIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={`https://openland.com/${shortname}`}/>}
                    {!!email && <UListItem title={email} icon={<MailIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={`mailto:${email}`}/>}
                    {!!location && <UListItem title={location} icon={<LocationIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={getLocationUrl(location)}/>}
                    {!!phone && <UListItem title={phone} icon={<PhoneIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={`tel:${phone}`} />}
                    {!!parsedSite && <UListItem title={parsedSite.name} icon={<LinkIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedSite.url}/>}
                    {!!parsedTwitter && <UListItem title={parsedTwitter.name} icon={<TwitterIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedTwitter.url}/>}
                    {!!parsedFacebook && <UListItem title={parsedFacebook.name} icon={<FacebookIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedFacebook.url}/>}
                    {!!parsedInstagram && <UListItem title={parsedInstagram.name} icon={<InstagramIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedInstagram.url}/>}
                    {!!parsedLinkedIn && <UListItem title={parsedLinkedIn.name} icon={<LinkedInIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={parsedLinkedIn.url}/>}
                    {!!joinDate && <UListItem title={joinedTitle} icon={<FlagIcon />} useRadius={true} wrapperClassName={listItemWrapper} interactive={false}/>}
                    {!!birthDay && <UListItem title={<XDate value={birthDay} />} icon={<BirthDayIcon />} useRadius={true} wrapperClassName={listItemWrapper} interactive={false}/>}
                </XView>
            </UListGroup>
            {!isMe && (
                <UListGroup header="Mutual groups" counter={count}>
                    {items.map((item) => (
                        <UListItem
                            key={'featured-chat-' + item.id}
                            avatar={{
                                photo: item.photo,
                                id: item.id,
                                title: item.title,
                            }}
                            title={item.title}
                            description={plural(item.membersCount, ['member', 'members'])}
                            path={'/mail/' + item.id}
                            useRadius={true}
                        />
                    ))}
                </UListGroup>
            )}
            {conversation?.__typename === 'PrivateRoom' && <ProfileTabsFragment chatId={conversation.id} />}
        </>
    );

    return <ProfileLayout title={name} leftColumn={leftColumn} rightColumn={rightColumn} track="user_profile" />;
});