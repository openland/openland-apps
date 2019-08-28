import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UPresence } from 'openland-web/components/unicorn/UPresence';
import { UNotificationsSwitch } from 'openland-web/components/unicorn/templates/UNotificationsSwitch';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { UserMenu } from './components/UserMenu';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MessageIcon from 'openland-icons/s/ic-message-24.svg';

const MessageButton = React.memo((props: { isBot: boolean, id: string }) => {
    const layout = useLayout();

    if (layout === 'mobile') {
        return (
            <UIconButton icon={<MessageIcon />} path={'/mail/' + props.id} />
        );
    }

    return (
        <UButton text={props.isBot ? 'View messages' : 'Message'} path={'/mail/' + props.id} />
    );
});

export const UserProfileFragment = React.memo((props: { id: string }) => {
    const isMobile = useLayout() === 'mobile';
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: props.id }, { fetchPolicy: 'cache-and-network' });
    const { id, isBot, name, photo, audienceSize, about, shortname, location, phone, email, linkedin, instagram,
        primaryOrganization, isYou, chatsWithBadge, website, twitter, facebook } = user;

    return (
        <Page padded={false}>
            <UListHero
                title={name}
                score={!isBot ? audienceSize : undefined}
                description={<UPresence user={user} />}
                avatar={{ photo, id, title: name }}
            >
                {!isYou && <MessageButton isBot={isBot} id={id} />}
                {!isYou && conversation && conversation.__typename === 'PrivateRoom' && (
                    <UNotificationsSwitch
                        id={conversation.id}
                        mute={!!conversation.settings.mute}
                        marginLeft={isMobile ? 0 : 16}
                    />
                )}
                <UserMenu user={user} marginLeft={isMobile ? 0 : undefined} />
            </UListHero>
            <UListGroup header="About">
                {!!about && <UListText value={about} marginBottom={16} />}
                {!!shortname && (
                    <UListField
                        label="Username"
                        value={
                            <div>
                                <a
                                    href={'https://openland.com/' + shortname}
                                    target="_blank"
                                >
                                    @{shortname}
                                </a>
                            </div>
                        }
                    />
                )}
                {!!website && <UListField label="Website" value={website} />}
                {!!phone && <UListField label="Phone" value={phone} />}
                {!!email && <UListField label="Email" value={email} />}
                {!!location && <UListField label="Location" value={location} />}
                {!!twitter && <UListField label="Twitter" value={twitter} />}
                {!!facebook && <UListField label="Facebook" value={facebook} />}
                {!!instagram && <UListField label="Instagram" value={instagram} />}
                {!!linkedin && <UListField label="LinkedIn" value={linkedin} />}
            </UListGroup>
            <UListGroup header="Organization">
                {!!primaryOrganization && (
                    <UOrganizationView organization={primaryOrganization} />
                )}
            </UListGroup>
            <UListGroup header="Featured in" counter={user.chatsWithBadge.length}>
                {chatsWithBadge.map((item) => (
                    <UListItem
                        key={'featured-chat-' + item.chat.id}
                        avatar={{
                            photo: item.chat.__typename === 'PrivateRoom' ? item.chat.user.photo : item.chat.photo,
                            id: item.chat.id,
                            title: item.chat.__typename === 'PrivateRoom' ? item.chat.user.name : item.chat.title,
                        }}
                        title={item.chat.__typename === 'PrivateRoom' ? item.chat.user.name : item.chat.title}
                        description={item.badge.name}
                        path={'/mail/' + item.chat.id}
                        useRadius={true}
                    />
                ))}
            </UListGroup>
        </Page>
    );
});