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
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { UCheckbox } from 'openland-web/components/unicorn/UCheckbox';
import NotificationsIcon from 'openland-icons/s/ic-notifications-glyph-24.svg';
import AttachIcon from 'openland-icons/s/ic-attach-glyph-24.svg';
import RemoveContactIcon from 'openland-icons/s/ic-invite-off-glyph-24.svg';
import { TextStyles } from 'openland-web/utils/TextStyles';

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
    const engine = React.useContext(MessengerContext);
    const userContext = React.useContext(UserInfoContext)!.user!;
    const uId = props.id ? props.id : userContext.id;
    const client = useClient();
    const { user, conversation } = client.useUser({ userId: uId }, { fetchPolicy: 'cache-and-network' });
    const { id, isBot, name, photo, about, shortname, location, phone, email, linkedin, instagram, website, twitter, facebook } = user;

    const privateConversation = conversation && conversation.__typename === 'PrivateRoom' ? conversation : undefined;

    const [noficationsEnabled, setNotificationsEnabled] = React.useState(!privateConversation?.settings.mute);
    const handleNotificationsChange = React.useCallback(() => {
        setNotificationsEnabled(prev => {
            if (privateConversation) {
                client.mutateRoomSettingsUpdate({ roomId: privateConversation.id, settings: { mute: !prev } });
            }
            return !prev;
        });
    }, [privateConversation]);

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
            <UListGroup header="Settings">
                <UCheckbox
                    label="Notifications"
                    checked={noficationsEnabled}
                    onChange={handleNotificationsChange}
                    boldTitle={true}
                    withCorners={true}
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
                <UListItem
                    icon={<AttachIcon />}
                    iconBackground="var(--accentPrimary)"
                    title="Media, files, links"
                    titleStyle={TextStyles.Label1}
                    path={`/mail/${id}/shared`}
                />
                <UListItem
                    icon={<RemoveContactIcon />}
                    iconColor="var(--foregroundTertiary)"
                    iconBackground="var(--backgroundTertiary)"
                    title="Remove from contacts"
                    titleStyle={TextStyles.Label1}
                />
            </UListGroup>
        </Page>
    );
});