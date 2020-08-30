import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';

import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UPresence } from 'openland-web/components/unicorn/UPresence';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

import { UserInfoContext } from 'openland-web/components/UserInfo';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UListHeroNew } from 'openland-web/components/unicorn/UListHeroNew';
import { beautifyUrl, getSocialId } from 'openland-web/utils/getSocials';
import { UNotificationsSwitchNew } from 'openland-web/components/unicorn/templates/UNotificationsSwitchNew';
import { XDate } from 'openland-x/XDate';
import { XScrollValues } from 'openland-x/XScrollView3';
import { plural } from 'openland-y-utils/plural';

import AtIcon from 'openland-icons/s/ic-at-24.svg';
import MailIcon from 'openland-icons/s/ic-mail-24.svg';
import LocationIcon from 'openland-icons/s/ic-location-24.svg';
import TwitterIcon from 'openland-icons/s/ic-twitter-24.svg';
import FacebookIcon from 'openland-icons/s/ic-facebook-24.svg';
import LinkedInIcon from 'openland-icons/s/ic-linkedin-24.svg';
import LinkIcon from 'openland-icons/s/ic-link-24.svg';
import PhoneIcon from 'openland-icons/s/ic-phone-24.svg';
import FlagIcon from 'openland-icons/s/ic-flag-24.svg';

import { UserMenuNew } from './components/UserMenuNew';
import { ShowMoreText } from './components/ShowMoreText';
import { ProfileSharedMediaFragment } from './components/ProfileSharedMediaFragment';

const listItemWrapper = css`
    width: 250px;
`;

const LOAD_MORE_THRESHOLD = 200;
const COMPACT_VIEW_WIDTH = 1280;

export const UserProfileFragment = React.memo((props: { id?: string }) => {
    const [compactView, setCompactView] = React.useState(window.innerWidth <= COMPACT_VIEW_WIDTH);
    const engine = React.useContext(MessengerContext);
    const userContext = React.useContext(UserInfoContext)!.user!;
    const [bottomReached, setBottomReached] = React.useState(false);
    const uId = props.id ? props.id : userContext.id;
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: uId }, { fetchPolicy: 'cache-and-network' });
    const { commonChatsWithUser } = client.useCommonChatsWithUser({ uid: uId, first: 20 }, { fetchPolicy: 'cache-and-network' });
    const {
        id, isBot, name, photo, about, shortname, location, phone, email, linkedin, joinDate,
        website, twitter, facebook,
    } = user;
    const { items, count } = commonChatsWithUser;

    React.useEffect(() => {
        let prev = window.innerWidth <= COMPACT_VIEW_WIDTH;
        const handleResize = () => {
            let isCompact = window.innerWidth <= COMPACT_VIEW_WIDTH;
            if (prev !== isCompact) {
                prev = isCompact;
                setCompactView(isCompact);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const onScroll = React.useCallback((values: XScrollValues) => {
        const flag = values.scrollHeight - (values.clientHeight + values.scrollTop) < LOAD_MORE_THRESHOLD;

        if (flag !== bottomReached) {
            setBottomReached(flag);
        }
    }, []);

    const joinedTitle = <>Joined <XDate value={joinDate} /></>;

    return (
        <Page appearance={compactView ? "normal" : "wide" } padded={true} track="user_profile" onScroll={onScroll}>
            <UHeader documentTitle={name}/>
            <XView flexDirection={compactView ? "column" : "row"}>
                <XView width={272} marginRight={16}>
                    <UListHeroNew
                        title={name}
                        description={<UPresence user={user}/>}
                        avatar={{ photo, id, title: name }}
                    >
                        {engine.user.id !== id && <UButton text={isBot ? 'View messages' : 'Send message'} path={'/mail/' + props.id} shape="square"/>}
                    </UListHeroNew>
                    {engine.user.id !== id && conversation && conversation.__typename === 'PrivateRoom' && (
                        <UNotificationsSwitchNew
                            id={conversation.id}
                            mute={!!conversation.settings.mute}
                        />
                    )}
                    <UserMenuNew chat={conversation} user={user}/>
                </XView>
                <XView maxWidth={504}>
                    <UListGroup header="About">
                        {!!about && <ShowMoreText text={about} />}
                        <XView flexDirection="row" flexWrap="wrap" marginTop={8}>
                                {!!shortname && <UListItem title={shortname} icon={<AtIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={`https://openland.com/${shortname}`}/>}
                                {!!email && <UListItem title={email} icon={<MailIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={`mailto:${email}`}/>}
                                {!!location && <UListItem title={location} icon={<LocationIcon />} useRadius={true} wrapperClassName={listItemWrapper} />}
                                {!!phone && <UListItem title={phone} icon={<PhoneIcon />} useRadius={true} wrapperClassName={listItemWrapper} />}
                                {!!website && <UListItem title={beautifyUrl(website)} icon={<LinkIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={website}/>}
                                {!!twitter && <UListItem title={getSocialId(twitter)} icon={<TwitterIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={twitter}/>}
                                {!!facebook && <UListItem title={getSocialId(facebook)} icon={<FacebookIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={facebook}/>}
                                {!!linkedin && <UListItem title={getSocialId(linkedin)} icon={<LinkedInIcon />} useRadius={true} wrapperClassName={listItemWrapper} href={linkedin}/>}
                                {!!joinDate && <UListItem title={joinedTitle} icon={<FlagIcon />} useRadius={true}/>}
                        </XView>
                    </UListGroup>
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
                    {conversation?.__typename === 'PrivateRoom' && <ProfileSharedMediaFragment chatId={conversation.id} bottomReached={bottomReached}/>}
                </XView>
            </XView>
        </Page>
    );
});