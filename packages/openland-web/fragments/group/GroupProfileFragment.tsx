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
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';

export const GroupProfileFragment = React.memo((props) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const group = client.useRoomWithoutMembers({ id: unicorn.id }, { fetchPolicy: 'cache-and-network' }).room;

    if (!group || group.__typename === 'PrivateRoom') {
        return null;
    }

    const initialMembers = client.useRoomMembersPaginated({ roomId: unicorn.id, first: 15 }, { fetchPolicy: 'cache-and-network' }).members;
    const { id, membersCount, photo, title, description, organization, settings } = group;

    const [ members, setMembers ] = React.useState(initialMembers);
    const [ loading, setLoading ] = React.useState(false);

    const handleLoadMore = React.useCallback(async () => {
        if (membersCount && (members.length < membersCount && !loading)) {
            setLoading(true);

            const loaded = (await client.queryRoomMembersPaginated({
                roomId: id,
                first: 10,
                after: members[members.length - 1].user.id,
            }, { fetchPolicy: 'network-only' })).members;

            setMembers([...members, ...loaded.filter(m => !members.find(m2 => m2.user.id === m.user.id))]);
            setLoading(false);
        }
    }, [ membersCount, members, loading ]);

    return (
        <UFlatList
            loadMore={handleLoadMore}
            items={members}
            loading={loading}
            renderItem={member => (
                <UUserView
                    key={'member-' + member.user.id}
                    user={member.user}
                />
            )}
            padded={false}
        >
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
                {!!description && <UListField value={description} />}
            </UListGroup>

            {organization && (
                <UListGroup header={organization.isCommunity ? 'Community' : 'Organization'}>
                    <UOrganizationView organization={organization} />
                </UListGroup>
            )}

            <UListHeader text="Members" counter={membersCount || 0} />
        </UFlatList>
    );
});