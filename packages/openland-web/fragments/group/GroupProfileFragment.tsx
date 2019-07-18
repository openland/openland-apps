import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { Page } from 'openland-unicorn/Page';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { plural } from 'openland-y-utils/plural';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';
import { UNotificationsSwitch } from 'openland-web/components/unicorn/templates/UNotificationsSwitch';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UButton } from 'openland-web/components/unicorn/UButton';

export const GroupProfileFragment = React.memo((props) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const group = client.useRoomWithoutMembers({ id: unicorn.id }, { fetchPolicy: 'cache-and-network' }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }

    const { id, membersCount, photo, title, description, organization, settings } = group;

    return (
        <Page padded={false}>
            <UListHero
                title={title}
                description={plural(membersCount || 0, ['member', 'members'])}
                avatar={{ photo, id, title }}
            >
                <UButton text="View" path={'/mail/' + id} />
                <UNotificationsSwitch
                    id={id}
                    mute={!!settings.mute}
                    marginLeft={16}
                />
            </UListHero>
            <UListGroup header="About">
                {!!description && <UListField value={description} marginBottom={16} />}
            </UListGroup>
            {organization && (
                <UListGroup header={organization.isCommunity ? 'Community' : 'Organization'}>
                    <UOrganizationView organization={organization} />
                </UListGroup>
            )}
        </Page>
    );
});