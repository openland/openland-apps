import * as React from 'react';
import { XViewRouterContext } from 'react-mental';
import { UAddItem } from 'openland-web/components/unicorn/templates/UAddButton';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { usePopper } from 'openland-web/components/unicorn/usePopper';

interface CreateGroupButtonProps {
    id: string;
}

const MenuComponent = React.memo((props: CreateGroupButtonProps & { ctx: UPopperController }) => {
    const router = React.useContext(XViewRouterContext)!;
    const { ctx, id } = props;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'New group',
        onClick: () => router.navigate(`/new/group/in/${id}`)
    });

    builder.item({
        title: 'New channel',
        onClick: () => router.navigate(`/new/channel/in/${id}`)
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
