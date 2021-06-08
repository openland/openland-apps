import * as React from 'react';
import { UListItem, UListItemProps } from 'openland-web/components/unicorn/UListItem';
import { UserFollower } from 'openland-api/spacex.types';
import { getCounterValue } from 'openland-y-utils/getCounterValue';
import { pluralForm } from 'openland-y-utils/plural';

interface UUserFollowerViewProps {
    user: UserFollower;
}

export const UUserFollowerView = React.memo((props: UUserFollowerViewProps & Partial<UListItemProps>) => {
    const { user, rightElement, onClick, ...other } = props;
    const [hovered, setHovered] = React.useState(false);
    const { id, name, photo, shortname, about, followersCount } = user;
    const description = about || `${getCounterValue({ count: followersCount, cutoff: 10000 })} ${pluralForm(followersCount, ['follower', 'followers'])}`;

    const onMouseEnter = React.useCallback(() => {
        if (!hovered) {
            setHovered(true);
        }
    }, [hovered]);

    const onMouseLeave = React.useCallback(() => {
        if (hovered) {
            setHovered(false);
        }
    }, [hovered]);

    return (
        <UListItem
            title={name}
            description={description}
            avatar={{ photo, id, title: name }}
            path={!onClick ? `/${shortname || id}` : undefined}
            paddingHorizontal={24}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            rightElement={hovered ? rightElement : undefined}
            {...other}
        />
    );
});
