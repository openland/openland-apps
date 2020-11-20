import * as React from 'react';
import { Page } from 'openland-unicorn/Page';
import { UHeader } from 'openland-unicorn/UHeader';
import { useClient } from 'openland-api/useClient';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { XView } from 'react-mental';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { showCreatingOrgFragment } from '../create/CreateEntityFragment';
import { plural } from 'openland-y-utils/plural';
import { UOrganizationView } from 'openland-web/components/unicorn/templates/UOrganizationView';

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
                {adminCommunities.map(c => <UOrganizationView key={c.id} organization={c} description={plural(c.membersCount, ['member', 'members'])} />)}
            </UListGroup>

            <UListGroup header="Member">
                {memberCommunities.map(c => <UOrganizationView key={c.id} organization={c} description={plural(c.membersCount, ['member', 'members'])} />)}
            </UListGroup>

            <XView height={56} />
        </Page>
    );
});
