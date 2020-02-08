import * as React from 'react';
import { User_user } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import CopyIcon from 'openland-icons/s/ic-copy-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';

interface UserMenuProps {
    user: User_user;
    marginLeft?: number;
}

const MenuComponent = React.memo((props: UserMenuProps & { ctx: UPopperController }) => {
    const { ctx, user } = props;
    const { id, isYou, shortname } = user;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => copy(`https://openland.com/${shortname || id}`),
    });

    if (isYou) {
        builder.item({
            title: 'Edit profile',
            icon: <EditIcon />,
            path: '/settings/profile',
        });
    }

    return builder.build(ctx);
});

export const UserMenu = React.memo((props: UserMenuProps) => (
    <UMoreButton
        marginLeft={typeof props.marginLeft === 'number' ? props.marginLeft : 8}
        marginRight={-8}
        menu={ctx => <MenuComponent {...props} ctx={ctx} />}
    />
));
