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
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UListText } from 'openland-web/components/unicorn/UListText';

export const UserProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: props.id }, { fetchPolicy: 'cache-and-network' });
    const { id, isBot, name, photo, audienceSize, about, shortname, location, phone, email, linkedin, primaryOrganization, isYou, chatsWithBadge } = user;

    return (
        <Page padded={false}>
            <UListHero
                title={name}
                score={!isBot ? audienceSize : undefined}
                description={<UPresence user={user} />}
                avatar={{ photo, id, title: name }}
            >
                {!isYou && <UButton text="Message" path={'/mail/' + id} />}
                {!isYou && conversation && conversation.__typename === 'PrivateRoom' && (
                    <UNotificationsSwitch
                        id={conversation.id}
                        mute={!!conversation.settings.mute}
                        marginLeft={16}
                    />
                )}
                {isYou && (
                    <UMoreButton>
                        <UListItem title="Edit profile" path="/settings/profile/" />
                    </UMoreButton>
                )}
            </UListHero>
            <UListGroup header="About">
                {!!about && <UListText value={about} marginBottom={16} />}
                {!!shortname && (
                    <UListField
                        label="Username"
                        value={
                            <a
                                href={'https://openland.com/' + shortname}
                                target="_blank"
                            >
                                @{shortname}
                            </a>
                        }
                    />
                )}
                {!!location && <UListField label="Location" value={location} />}
                {!!phone && <UListField label="Phone" value={phone} />}
                {!!email && <UListField label="Email" value={email} />}
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