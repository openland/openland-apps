import * as React from 'react';
import { XView } from 'react-mental';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const organization = useClient().useOrganizationWithoutMembers({ organizationId: props.id }).organization;

    return (
        <Page padded={false}>
            <UListHero
                title={organization.name}
                description="Organization"
                avatar={{
                    photo: organization.photo,
                    key: organization.id,
                    title: organization.name
                }}
            />
            <UListGroup header="About">
                <XView>{organization.about}</XView>
            </UListGroup>
        </Page>
    );
});