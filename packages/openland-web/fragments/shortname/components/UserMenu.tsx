import * as React from 'react';
import { User_user, User_conversation_SharedRoom, User_conversation_PrivateRoom } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import copy from 'copy-to-clipboard';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import CopyIcon from 'openland-icons/s/ic-link-24.svg';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { useToast, UToastHandlers } from 'openland-web/components/unicorn/UToast';
import AttachIcon from "../../../../openland-icons/s/ic-attach-24-1.svg";

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
    marginLeft?: number;
}

const MenuComponent = React.memo((props: UserMenuProps & { ctx: UPopperController, toastHandlers: UToastHandlers }) => {
    const { ctx, user, toastHandlers } = props;
    const { id, isYou, shortname } = user;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => {
            copy(`https://openland.com/${shortname || id}`);

            toastHandlers.show({
                type: 'success',
                text: 'Link copied',
            });
        },
    });

    if (props.chat && props.chat.__typename === 'PrivateRoom') {
        builder.item({
            title: 'Shared media',
            icon: <AttachIcon />,
            path: `/mail/${props.chat.id}/shared`,
        });
    }

    if (isYou) {
        builder.item({
            title: 'Edit profile',
            icon: <EditIcon />,
            path: '/account/profile',
        });
    }

    return builder.build(ctx, 240);
});

export const UserMenu = React.memo((props: UserMenuProps) => {
    const toastHandlers = useToast();

    return (
        <UMoreButton
            marginLeft={typeof props.marginLeft === 'number' ? props.marginLeft : 8}
            marginRight={-8}
            menu={ctx => <MenuComponent {...props} ctx={ctx} toastHandlers={toastHandlers} />}
        />
    );
});
