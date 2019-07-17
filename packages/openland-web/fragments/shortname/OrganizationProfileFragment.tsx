import * as React from 'react';
import { UListGroup } from 'openland-web/components/unicorn/UListGroup';
import { UListHero } from 'openland-web/components/unicorn/UListHero';
import { Page } from 'openland-unicorn/Page';
import { useClient } from 'openland-web/utils/useClient';
import { UListField } from 'openland-web/components/unicorn/UListField';
import { UUserView } from 'openland-web/components/unicorn/templates/UUserView';
import { UGroupView } from 'openland-web/components/unicorn/templates/UGroupView';

export const OrganizationProfileFragment = React.memo((props: { id: string }) => {
    const client = useClient();
    const organization = client.useOrganizationMembersShortPaginated({ organizationId: props.id, first: 10 }).organization;
    const { id, name, photo, about, shortname, website, twitter, facebook, rooms, membersCount, members } = organization;

    return (
        <Page padded={false}>
            <UListHero
                title={name}
                description="Organization"
                avatar={{ photo, id, title: name }}
            />
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
            <UListGroup header="Members" counter={membersCount}>
                {members.map(member => (
                    <UUserView
                        key={'member-' + member.user.id}
                        user={member.user}
                    />
                ))}
            </UListGroup>
        </Page>
    );
});