import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { OrganizationShort } from 'openland-api/Types';

export const UOrganizationView = React.memo((props: { organization: OrganizationShort }) => {
    const { id, photo, name, about, shortname } = props.organization;

    return (
        <UListItem
            title={name}
            description={about}
            avatar={{ photo, id, title: name }}
            useRadius={true}
            path={`/${shortname || id}`}
        />
    );
});