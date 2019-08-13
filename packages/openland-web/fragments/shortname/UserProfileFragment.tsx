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
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import CopyIcon from 'openland-icons/s/ic-copy-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { User_user } from 'openland-api/Types';

const MenuComponent = React.memo((props: { ctx: UPopperController, user: User_user }) => {
    const { ctx, user } = props;
    const { id, isYou, shortname } = user;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => copy(`https://openland.com/${shortname || id}`)
    });

    if (isYou) {
        builder.item({
            title: 'Edit profile',
            icon: <EditIcon />,
            path: '/settings/profile'
        });
    }

    return builder.build(ctx);
});

export const UserProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: props.id }, { fetchPolicy: 'cache-and-network' });
    const { id, isBot, name, photo, audienceSize, about, shortname, location, phone, email, linkedin,
        primaryOrganization, isYou, chatsWithBadge, website } = user;

    return (
        <Page padded={false}>
            <UListHero
                title={name}
                score={!isBot ? audienceSize : undefined}
                description={<UPresence user={user} />}
                avatar={{ photo, id, title: name }}
            >
                {!isYou && <UButton text={isBot ? 'View messages' : 'Message'} path={'/mail/' + id} />}
                {!isYou && conversation && conversation.__typename === 'PrivateRoom' && (
                    <UNotificationsSwitch
                        id={conversation.id}
                        mute={!!conversation.settings.mute}
                        marginLeft={16}
                    />
                )}
                <UMoreButton menu={ctx => <MenuComponent ctx={ctx} user={user} />} marginLeft={8} />
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
                {!!linkedin && <UListField label="LinkedIn" value={linkedin} />}
                {!!location && <UListField label="Location" value={location} />}
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