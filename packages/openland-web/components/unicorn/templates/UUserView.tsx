import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UserShort, UserBadge, OrganizationMemberRole, RoomMemberRole } from 'openland-api/Types';
import { UPresence } from '../UPresence';
import { XView } from 'react-mental';
import CrownIcon from 'openland-icons/ic-crown-4.svg';
import { css } from 'linaria';

const OwnerIconClass = css`
    & * {
        fill: #F2AA00;
    }
`;

const AdminIconClass = css`
    & * {
        fill: #B4B4B4;
    }
`;

const AdminIcon = (props: { role: RoomMemberRole | OrganizationMemberRole }) => {
    const { role } = props;

    if (role !== 'ADMIN' && role !== 'OWNER') {
        return null;
    }

    return (
        <XView width={14} height={14} marginRight={5}>
            <CrownIcon className={role === 'OWNER' ? OwnerIconClass : AdminIconClass} />
        </XView>
    );
};

interface UUserViewProps {
    user: UserShort;
    badge?: UserBadge | null;
    role?: RoomMemberRole | OrganizationMemberRole;
    rightElement?: JSX.Element;
}

export const UUserView = React.memo((props: UUserViewProps) => {
    const { user, badge, role, rightElement } = props;
    const { id, photo, name, online, shortname, primaryOrganization } = user;
    const path = shortname ? '/' + shortname : '/' + id;

    return (
        <UListItem
            title={name}
            titleIcon={role ? <AdminIcon role={role} /> : undefined}
            subtitle={primaryOrganization ? primaryOrganization.name : undefined}
            description={badge ? badge.name : <UPresence user={props.user} />}
            avatar={{ photo, id, title: name, online }}
            useRadius={true}
            path={path}
            rightElement={rightElement}
        />
    );
});