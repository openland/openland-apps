import * as React from 'react';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { showCreateGroupModal } from 'openland-web/fragments/chat/showCreateGroupModal';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

interface CreateGroupButtonProps {
    id: string;
}

const MenuComponent = React.memo((props: CreateGroupButtonProps & { ctx: UPopperController }) => {
    const { ctx, id } = props;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'New group',
        onClick: () => showCreateGroupModal('group', id)
    });

    builder.item({
        title: 'New channel',
        onClick: () => showCreateGroupModal('channel', id)
    });

    return builder.build(ctx);
});

export const CreateGroupButton = React.memo((props: CreateGroupButtonProps) => {
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-start', hideOnClick: true }, (ctx) => <MenuComponent ctx={ctx} {...props} />);

    return (
        <UAddItem
            title="Create new"
            onClick={menuShow}
            active={menuVisible}
        />
    );
});