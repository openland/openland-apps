import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { formatLastSeen } from 'openland-y-utils/formatTime';
import { ThemeDefault } from 'openland-y-utils/themes';

export const UserProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const user = client.useUser({ userId: props.id }).user;
    const { id, name, photo, online, lastSeen, about, shortname, location, phone, email, linkedin, primaryOrganization } = user;

    return (
        <Page padded={false}>
            <UListHero
                title={name}
                description={online ? 'online' : formatLastSeen(lastSeen || 'never_online')}
                descriptionColor={online ? ThemeDefault.accentPrimary : undefined}
                avatar={{ photo, id, title: name }}
            />
            <UListGroup header="About">
                {!!about && <UListField value={about} marginBottom={24} />}
                {!!shortname && <UListField label="Shortname" value={'@' + shortname} />}
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
        </Page>
    );
});