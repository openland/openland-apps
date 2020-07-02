import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { XView } from 'react-mental';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { showCreatingOrgFragment } from '../create/CreateEntityFragment';
import { MyCommunities_myCommunities } from 'openland-api/spacex.types';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { plural } from 'openland-y-utils/plural';

const Item = React.memo((props: { community: MyCommunities_myCommunities }) => {
    const { id, photo, name, membersCount, shortname } = props.community;

    return (
        <UListItem
            title={name}
            description={plural(membersCount, ['member', 'members'])}
            avatar={{ photo, id, title: name }}
            useRadius={true}
            path={`/${shortname || id}`}
        />
    );
});

export const SettingsCommunitiesFragment = React.memo(() => {
    const client = useClient();
    const communities = client.useMyCommunities({ fetchPolicy: 'cache-and-network' }).myCommunities;
    const adminCommunities = communities.filter(c => c.isOwner || c.isAdmin);
    const memberCommunities = communities.filter(c => !c.isOwner && !c.isAdmin);

    return (
        <Page track="account_communities" padded={false}>
            <UHeader title="Communities" />

            <XView height={16} />

            <UAddItem title="Create community" onClick={() => showCreatingOrgFragment({ entityType: 'community' })} />

            <UListGroup header="Admin">
                {adminCommunities.map(c => <Item key={c.id} community={c} />)}
            </UListGroup>

            <UListGroup header="Member">
                {memberCommunities.map(c => <Item key={c.id} community={c} />)}
            </UListGroup>

            <XView height={56} />
        </Page>
    );
});
