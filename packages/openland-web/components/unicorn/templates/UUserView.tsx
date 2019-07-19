import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UserShort, UserBadge } from 'openland-api/Types';
import { UPresence } from '../UPresence';

interface UUserViewProps {
    user: UserShort;
    badge?: UserBadge | null;
    menu?: JSX.Element;
}

export const UUserView = React.memo((props: UUserViewProps) => {
    const { user, badge, menu } = props;
    const { id, photo, name, online, shortname, primaryOrganization } = user;
    const path = shortname ? '/' + shortname : '/' + id;

    return (
        <UListItem
            title={name}
            subtitle={primaryOrganization ? primaryOrganization.name : undefined}
            description={badge ? badge.name : <UPresence user={props.user} />}
            avatar={{ photo, id, title: name, online }}
            useRadius={true}
            path={path}
            menu={menu}
        />
    );
});