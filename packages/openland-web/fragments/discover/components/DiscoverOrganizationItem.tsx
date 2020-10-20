import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { DiscoverOrganization } from 'openland-api/spacex.types';
import { plural } from 'openland-y-utils/plural';

export const DiscoverOrganizationItem = React.memo((props: { organization: DiscoverOrganization & { newMessages?: number }, disableHover?: boolean, rightElement?: JSX.Element, path?: string }) => {
    const { id, photo, name, membersCount, shortname, newMessages } = props.organization;
    const description = newMessages
        ? plural(newMessages, ['new message', 'new messages'])
        : membersCount ? plural(membersCount, ['member', 'members'])
            : undefined;

    return (
        <UListItem
            title={name}
            description={description}
            avatar={{ photo, id, title: name }}
            useRadius={true}
            path={props.path || ('/' + (shortname || id))}
            disableHover={props.disableHover}
            rightElement={props.rightElement}
        />
    );
});