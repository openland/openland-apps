import * as React from 'react';
import { XView } from 'react-mental';
import { css, cx } from 'linaria';
import copy from 'copy-to-clipboard';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { ProfileLayout } from 'openland-web/components/ProfileLayout';
import { findSocialShortname } from 'openland-y-utils/findSocialShortname';
import { XDate } from 'openland-x/XDate';
import { getLocationUrl } from 'openland-y-utils/getLocationUrl';
import { useToast } from 'openland-web/components/unicorn/UToast';
import { useLastSeenShort } from 'openland-y-utils/LastSeen';
import { UserActions } from './components/UserActions';
import { ShowMoreText } from './components/ShowMoreText';
import { ProfileTabsFragment } from './components/ProfileTabsFragment';
import { UserGroups } from './components/UserGroups';
import AtIcon from 'openland-icons/s/ic-at-24.svg';
import MailIcon from 'openland-icons/s/ic-mail-24.svg';
import LocationIcon from 'openland-icons/s/ic-geo-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import FlagIcon from 'openland-icons/s/ic-flag-24.svg';
import InstagramIcon from 'openland-icons/s/ic-instagram-24-transparent.svg';
import FacebookIcon from 'openland-icons/s/ic-facebook-24-transparent.svg';
import TwitterIcon from 'openland-icons/s/ic-twitter-24-transparent.svg';
import LinkedInIcon from 'openland-icons/s/ic-linkedin-24-transparent.svg';
import BirthDayIcon from 'openland-icons/s/ic-birthday-24.svg';
import PhoneIcon from 'openland-icons/s/ic-phone.svg';
import { TextBody, TextLabel1 } from 'openland-web/utils/TextStyles';
import { FollowersTabs, showUserFollowersModal } from './components/showUserFollowersModal';
import { pluralForm } from 'openland-y-utils/plural';
import AlertBlanket from 'openland-x/AlertBlanket';
import { ActiveVoiceChat } from './components/ActiveVoiceChat';

const listItemWrapper = css`
    width: 250px;
`;

const userFollowersWrapper = css`
    display: flex;
    flex-direction: row;
    margin-top: 4px;
`;

const followingWrapper = css`
    margin-right: 16px;
`;

const followersCounter = css`
    color: var(--foregroundPrimary);
    cursor: pointer;
`;

const followersText = css`
    color: var(--foregroundSecondary);
    margin-left: 5px;
`;

export const UserProfileFragment = React.memo((props: { id?: string }) => {
    const userContext = React.useContext(UserInfoContext)!.user!;
    const engine = React.useContext(MessengerContext);
    const uid = props?.id || userContext.id;
    const client = useClient();
    const toastHandlers = useToast();
    const { user, conversation } = client.useUser(
        { userId: uid },
        { fetchPolicy: 'cache-and-network' },
    );
    const {
        id,
        isBot,
        name,
        photo,
        about,
        shortname,
        location,
        phone,
        email,
        linkedin,
        joinDate,
        website,
        twitter,
        facebook,
        instagram,
        birthDay,
        currentVoiceChat,
        followedByMe,
        followersCount,
        followingCount,
    } = user;

    const onCopyLinkClick = React.useCallback(() => {
        copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

        toastHandlers.show({
            type: 'success',
            text: 'Link copied',
        });
    }, [shortname, id]);

    const parsedSite = findSocialShortname.site(website);
    const parsedTwitter = findSocialShortname.twitter(twitter);
    const parsedFacebook = findSocialShortname.facebook(facebook);
    const parsedInstagram = findSocialShortname.instagram(instagram);
    const parsedLinkedIn = findSocialShortname.linkedin(linkedin);

    const isMe = engine.user.id === user.id;
    const [lastseen] = useLastSeenShort(user);

    const onFollowButtonClick = React.useCallback(async (event) => {
        if (followedByMe) {
            AlertBlanket.builder()
                .title(`Unfollow ${name}`)
                .action(
                    'Unfollow',
                    async () => {
                        await client.mutateSocialUnfollow({ uid });
                        await client.refetchUser({ userId: uid });
                    },
                    'danger',
                )
                .show();
        } else {
            await client.mutateSocialFollow({ uid });
            await client.refetchUser({ userId: uid });
        }
    }, [followedByMe, uid]);

    const onFollowingClick = React.useCallback(() => {
        showUserFollowersModal({ uid, initialTab: FollowersTabs.FOLLOWING });
    }, []);

    const onFollowersClick = React.useCallback(() => {
        showUserFollowersModal({ uid, initialTab: FollowersTabs.FOLLOWERS });
    }, []);

    const joinedTitle = (
        <>
            Joined <XDate value={joinDate} />
        </>
    );

    const userFollowers = (
        <div className={userFollowersWrapper}>
            <div
                className={cx(TextLabel1, followersCounter, followingWrapper)}
                onClick={onFollowingClick}
            >
                {followingCount}
                <span className={cx(TextBody, followersText)}>following</span>
            </div>

            <div
                className={cx(TextLabel1, followersCounter)}
                onClick={onFollowersClick}
            >
                {followersCount}
                <span className={cx(TextBody, followersText)}>
                    {pluralForm(followersCount, ['follower', 'followers'])}
                </span>
            </div>
        </div>
    );

    const leftColumn = (
        <UListHero
            title={name}
            avatar={{ photo, id, title: name }}
            online={user.online}
            userFollowers={userFollowers}
            badge={lastseen}
        >
                {!isMe && (
                    <XView flexDirection="row">
                        <UButton
                            text={isBot ? 'View messages' : 'Message'}
                            path={`/mail/${id}`}
                            size="large"
                            shape="square"
                            style={!followedByMe ? 'secondary' : 'primary'}
                            marginRight={16}
                            width={115}
                        />
                        {!isBot && (
                            <UButton
                                text={followedByMe ? 'Following' : 'Follow'}
                                size="large"
                                shape="square"
                                style={followedByMe ? 'secondary' : 'primary'}
                                marginRight={16}
                                width={115}
                                onClick={onFollowButtonClick}
                            />
                        )}
                    </XView>
                )}
                {isMe && (
                    <UButton
                        text="Edit profile"
                        path="/settings/profile"
                        size="large"
                        shape="square"
                        marginRight={16}
                        style="secondary"
                    />
                )}
                <UserActions chat={conversation} user={user} />
        </UListHero>
    );

    const rightColumn = (
        <>
            {currentVoiceChat && <ActiveVoiceChat currentVoiceChat={currentVoiceChat} />}
            <UListGroup header="About">
                {!!about && <ShowMoreText text={about} />}
                <XView flexDirection="row" flexWrap="wrap" marginTop={8}>
                    {!!shortname && (
                        <UListItem
                            title={shortname}
                            icon={<AtIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            onClick={onCopyLinkClick}
                        />
                    )}
                    {!!email && (
                        <UListItem
                            title={email}
                            icon={<MailIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={`mailto:${email}`}
                        />
                    )}
                    {!!location && (
                        <UListItem
                            title={location}
                            icon={<LocationIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={getLocationUrl(location)}
                        />
                    )}
                    {!!phone && (
                        <UListItem
                            title={phone}
                            icon={<PhoneIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={`tel:${phone}`}
                        />
                    )}
                    {!!parsedSite && (
                        <UListItem
                            title={parsedSite.name}
                            icon={<LinkIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={parsedSite.url}
                        />
                    )}
                    {!!parsedTwitter && (
                        <UListItem
                            title={parsedTwitter.name}
                            icon={<TwitterIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={parsedTwitter.url}
                        />
                    )}
                    {!!parsedFacebook && (
                        <UListItem
                            title={parsedFacebook.name}
                            icon={<FacebookIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={parsedFacebook.url}
                        />
                    )}
                    {!!parsedInstagram && (
                        <UListItem
                            title={parsedInstagram.name}
                            icon={<InstagramIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={parsedInstagram.url}
                        />
                    )}
                    {!!parsedLinkedIn && (
                        <UListItem
                            title={parsedLinkedIn.name}
                            icon={<LinkedInIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            href={parsedLinkedIn.url}
                        />
                    )}
                    {!!joinDate && (
                        <UListItem
                            title={joinedTitle}
                            icon={<FlagIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            interactive={false}
                        />
                    )}
                    {!!birthDay && (
                        <UListItem
                            title={<XDate value={birthDay} format="birthDay" />}
                            icon={<BirthDayIcon />}
                            useRadius={true}
                            wrapperClassName={listItemWrapper}
                            interactive={false}
                        />
                    )}
                </XView>
            </UListGroup>
            {!isMe && <UserGroups id={id} />}
            {conversation?.__typename === 'PrivateRoom' && (
                <ProfileTabsFragment chatId={conversation.id} />
            )}
        </>
    );

    return (
        <ProfileLayout
            title={name}
            leftColumn={leftColumn}
            rightColumn={rightColumn}
            track="user_profile"
        />
    );
});
