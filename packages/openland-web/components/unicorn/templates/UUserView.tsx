import * as React from 'react';
import { UListItem, UListItemProps } from 'openland-web/components/unicorn/UListItem';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { UserShort, UserBadge, OrganizationMemberRole, RoomMemberRole } from 'openland-api/Types';
import { UPresence } from '../UPresence';
import { XView } from 'react-mental';
import CrownIcon from 'openland-icons/ic-crown-4.svg';
import { css } from 'linaria';
import { emoji } from 'openland-y-utils/emoji';

const OwnerIconClass = css`
    & * {
        fill: #f2aa00;
    }
`;

const AdminIconClass = css`
    & * {
        fill: #b4b4b4;
    }
`;

const AdminIcon = (props: { role: RoomMemberRole | OrganizationMemberRole }) => {
    const { role } = props;
    const [show] = useCaptionPopper({ text: role });
    if (role !== 'ADMIN' && role !== 'OWNER') {
        return null;
    }

    return (
        <XView width={14} height={14} marginRight={5} onMouseEnter={show}>
            <CrownIcon className={role === 'OWNER' ? OwnerIconClass : AdminIconClass} />
        </XView>
    );
};

interface UUserViewProps {
    user: UserShort;
    badge?: UserBadge | null;
    role?: RoomMemberRole | OrganizationMemberRole;
}

export const UUserView = React.memo((props: UUserViewProps & Partial<UListItemProps>) => {
    const { user, badge, role, onClick, ...other } = props;
    const { id, photo, name, online, shortname, primaryOrganization } = user;
    const badgeNameEmojify = badge ? React.useMemo(() => emoji(' · ' + badge.name), [badge.name]) : undefined;

    return (
        <UListItem
            title={name}
            titleIcon={role ? <AdminIcon role={role} /> : undefined}
            subtitle={primaryOrganization ? primaryOrganization.name : undefined}
            description={<UPresence suffix={badgeNameEmojify} user={props.user} />}
            avatar={{ photo, id, title: name, online }}
            path={!onClick ? `/${shortname || id}` : undefined}
            onClick={onClick}
            useRadius={true}
            {...other}
        />
    );
});
