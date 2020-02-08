import * as React from 'react';
import { UListItem, UListItemProps } from 'openland-web/components/unicorn/UListItem';
import { OrganizationShort } from 'openland-api/spacex.types';

interface UOrganizationViewProps {
    organization: OrganizationShort;
    usePath?: boolean;
    hovered?: boolean;
}

export const UOrganizationView = React.memo(
    (props: UOrganizationViewProps & Partial<UListItemProps>) => {
        const { id, photo, name, about, shortname } = props.organization;

        return (
            <UListItem
                title={name}
                description={about}
                avatar={{ photo, id, title: name }}
                useRadius={true}
                path={props.usePath !== false ? `/${shortname || id}` : undefined}
                hovered={props.hovered}
                {...props}
            />
        );
    },
);
