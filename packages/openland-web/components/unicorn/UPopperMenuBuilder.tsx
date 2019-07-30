import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { css } from 'linaria';
import { XLoader } from 'openland-x/XLoader';

const container = css`
    min-width: 150px;
    background: #ffffff; // Need to be ThemeDefault.backgroundPrimary
    border-radius: 8px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    padding: 8px 0;
`;

interface MenuItem {
    title: string;
    icon?: JSX.Element;
    onClick?: () => void;
    action?: () => void;
}
interface MenuElementItem {
    element: (ctx: UPopperController) => JSX.Element;
}

const MenuItemComponent = (props: { item: MenuItem, ctx: UPopperController }) => {
    let { item, ctx } = props;
    let [loading, setLoading] = React.useState(false);
    let onClick = React.useCallback(async () => {

        if (item.action) {
            setLoading(true);
            await item.action();
            setLoading(false);
        }
        if (item.onClick) {
            item.onClick();
        }
        ctx.hide();
    }, []);
    return (
        <UListItem
            title={item.title}
            icon={loading ? <XLoader size="small" transparentBackground={true} /> : item.icon}
            onClick={onClick}
        />
    );
};

export class UPopperMenuBuilder {
    private items: ((MenuItem & { _type: 'item' }) | (MenuElementItem & { _type: 'element' }))[] = [];

    item = (item: MenuItem) => {
        this.items.push({ ...item, _type: 'item' });
        return this;
    }

    element = (element: (ctx: UPopperController) => JSX.Element) => {
        this.items.push({ element, _type: 'element' });
        return this;
    }

    build = (ctx: UPopperController) => {

        return (
            <div className={container}>
                {this.items.map(item => {
                    if (item._type === 'item') {
                        return (
                            <MenuItemComponent item={item} ctx={ctx} />
                        );
                    } else if (item._type === 'element') {
                        return item.element(ctx);
                    }
                    return null;
                })}
            </div>
        );
    }
}