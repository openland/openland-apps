import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { UPresence } from 'openland-web/components/unicorn/UPresence';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UListText } from 'openland-web/components/unicorn/UListText';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MessageIcon from 'openland-icons/s/ic-message-24.svg';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import NotificationsIcon from 'openland-icons/s/ic-notifications-glyph-24.svg';
import AttachIcon from 'openland-icons/s/ic-attach-glyph-24.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-glyph-24.svg';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import AddContactIcon from 'openland-icons/s/ic-invite-glyph-24.svg';

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

export const ContactProfileFragment = React.memo((props: { id?: string }) => {
    if (!props.id) {
        return null;
    }
    const engine = React.useContext(MessengerContext);
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: props.id }, { fetchPolicy: 'cache-and-network' });
    const { id, isBot, name, inContacts, photo, about, shortname, location, phone, email, linkedin, instagram, website, twitter, facebook } = user;

    const privateConversation = conversation && conversation.__typename === 'PrivateRoom' ? conversation : undefined;
    const { isContact } = useLocalContact(id, inContacts);

    const [noficationsEnabled, setNotificationsEnabled] = React.useState(!privateConversation?.settings.mute);
    const handleNotificationsChange = React.useCallback(() => {
        setNotificationsEnabled(prev => {
            if (privateConversation) {
                client.mutateRoomSettingsUpdate({ roomId: privateConversation.id, settings: { mute: prev } });
            }
            return !prev;
        });
    }, [privateConversation]);
    const handleRemove = async () => {
        if (isContact) {
            await client.mutateRemoveFromContacts({ userId: id });
        } else {
            await client.mutateAddToContacts({ userId: id });
        }
    };

    return (
        <Page padded={false} track="contact_profile">
            <UHeader documentTitle={name} />
            <UListHero
                title={name}
                description={<UPresence user={user} />}
                avatar={{ photo, id, title: name }}
            >
                {engine.user.id !== id && <MessageButton isBot={isBot} id={id} />}
            </UListHero>
            <UListGroup header="About">
                {!!about && <UListText value={about} marginBottom={16} />}
                {!!shortname && (
                    <UListField
                        label="Shortname"
                        value={
                            <div>
                                <a
                                    href={'https://openland.com/' + shortname}
                                    target="_blank"
                                >
                                    openland.com/{shortname}
                                </a>
                            </div>
                        }
                    />
                )}
                {!!website && <UListField label="Website" value={website} />}
                {!!phone && <UListField label="Phone" value={phone} />}
                {!!email && <UListField label="Email" value={email} />}
                {!!location && <UListField label="Location" value={location} />}
                {!!instagram && <UListField label="Instagram" value={instagram} />}
                {!!twitter && <UListField label="Twitter" value={twitter} />}
                {!!facebook && <UListField label="Facebook" value={facebook} />}
                {!!linkedin && <UListField label="LinkedIn" value={linkedin} />}
            </UListGroup>
            <UListGroup header="Settings" marginBottom={32}>
                <UCheckbox
                    label="Notifications"
                    checked={noficationsEnabled}
                    onChange={handleNotificationsChange}
                    boldTitle={true}
                    tall={true}
                    leftElement={(
                        <UIconButton
                            active={true}
                            icon={<NotificationsIcon />}
                            rippleColor="var(--accentPrimary)"
                            color="var(--foregroundContrast)"
                            marginRight={16}
                        />
                    )}
                    asSwitcher={true}
                />
                {privateConversation ? (
                    <UListItem
                        icon={<AttachIcon />}
                        iconBackground="var(--accentPrimary)"
                        title="Media, files, links"
                        titleStyle={TextStyles.Label1}
                        path={`/mail/${privateConversation.id}/shared`}
                        useRadius={true}
                    />
                ) : null}
                <UListItem
                    icon={isContact ? <RemoveContactIcon /> : <AddContactIcon />}
                    iconColor={isContact ? 'var(--foregroundContrast)' : 'var(--foregroundTertiary)'}
                    iconBackground={isContact ? 'var(--accentNegative)' : 'var(--backgroundTertiary)'}
                    title={isContact ? 'Remove from contacts' : 'Save to contacts'}
                    titleStyle={TextStyles.Label1}
                    useRadius={true}
                    onClick={handleRemove}
                />
            </UListGroup>
        </Page>
    );
});
