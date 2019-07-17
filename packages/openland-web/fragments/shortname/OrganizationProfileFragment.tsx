import * as React from 'react';
import { XView } from 'react-mental';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const organization = useClient().useOrganizationWithoutMembers({ organizationId: props.id }).organization;
    const { name, photo, id, about, shortname, website, twitter, facebook } = organization;

    return (
        <Page padded={false}>
            <UListHero
                title={name}
                description="Organization"
                avatar={{
                    photo,
                    key: id,
                    title: name
                }}
            />
            <UListGroup header="About">
                {!!about && <UListField value={about} marginBottom={24} />}
                {!!shortname && <UListField label="Shortname" value={'@' + shortname} />}
                {!!website && <UListField label="Website" value={website} />}
                {!!twitter && <UListField label="Twitter" value={twitter} />}
                {!!facebook && <UListField label="Facebook" value={facebook} />}
            </UListGroup>
        </Page>
    );
});