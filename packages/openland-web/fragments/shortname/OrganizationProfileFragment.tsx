import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { useClient } from 'openland-web/utils/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';
import { UFlatList } from 'openland-web/components/unicorn/UFlatList';
import { UListHeader } from 'openland-web/components/unicorn/UListHeader';
import { OrganizationManageButtons } from './components/OrganizationManageButtons';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const organization = client.useOrganizationWithoutMembers({ organizationId: props.id }, { fetchPolicy: 'cache-and-network' }).organization;
    const initialMembers = client.useOrganizationMembers({ organizationId: props.id, first: 15 }, { fetchPolicy: 'cache-and-network' }).organization.members;
    const { id, name, photo, about, shortname, website, twitter, facebook, rooms, membersCount, isCommunity } = organization;

    const [ members, setMembers ] = React.useState(initialMembers);
    const [ loading, setLoading ] = React.useState(false);

    const handleLoadMore = React.useCallback(async () => {
        if (members.length < membersCount && !loading) {
            setLoading(true);

            const loaded = (await client.queryOrganizationMembers({
                organizationId: organization.id,
                first: 10,
                after: members[members.length - 1].user.id,
            }, { fetchPolicy: 'network-only' })).organization.members;

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
                title={name}
                description={isCommunity ? 'Community' : 'Organization'}
                avatar={{ photo, id, title: name }}
            >
                <OrganizationManageButtons organization={organization} />
            </UListHero>
            <UListGroup header="About">
                {!!about && <UListField value={about} marginBottom={24} />}
                {!!shortname && <UListField label="Shortname" value={'@' + shortname} />}
                {!!website && <UListField label="Website" value={website} />}
                {!!twitter && <UListField label="Twitter" value={twitter} />}
                {!!facebook && <UListField label="Facebook" value={facebook} />}
            </UListGroup>
            <UListGroup header="Group and channels" counter={rooms.length}>
                {rooms.slice(0, 10).map(room => (
                    <UGroupView
                        key={'room-' + room.id}
                        group={room}
                    />
                ))}
            </UListGroup>
            <UListHeader text="Members" counter={membersCount} />
        </UFlatList>
    );
});