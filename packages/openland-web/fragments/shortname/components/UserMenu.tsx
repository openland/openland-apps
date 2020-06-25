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
import { MessengerContext } from 'openland-engines/MessengerEngine';

interface UserMenuProps {
    user: User_user;
    chat: User_conversation_SharedRoom | User_conversation_PrivateRoom | null;
    marginLeft?: number;
}

const MenuComponent = React.memo((props: UserMenuProps & { ctx: UPopperController, toastHandlers: UToastHandlers }) => {
    const engine = React.useContext(MessengerContext);
    const { ctx, user, toastHandlers } = props;
    const { id, shortname } = user;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Copy link',
        icon: <CopyIcon />,
        onClick: () => {
            copy(`https://openland.com/${shortname || id}`, { format: 'text/plain' });

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

    if (engine.user.id === user.id) {
        builder.item({
            title: 'Edit profile',
            icon: <EditIcon />,
            path: '/settings/profile',
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
