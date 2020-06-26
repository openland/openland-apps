import * as React from 'react';
import { UListItem } from 'openland-web/components/unicorn/UListItem';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { css, cx } from 'linaria';
import { XLoader } from 'openland-x/XLoader';
import IcCheck from 'openland-icons/s/ic-done-16.svg';
import { UIcon } from './UIcon';
import { XView } from 'react-mental';

const container = css`
    min-width: 150px;
    background: var(--backgroundPrimary);
    border-radius: 8px;
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.12);
    padding: 8px 0;
`;

export interface MenuItem {
    title: string | JSX.Element;
    icon?: JSX.Element;
    onClick?: () => void;
    action?: () => any;
    path?: string;
    closeAfterAction?: boolean;
    closeDelay?: number;
    counter?: number;
    disabled?: boolean;
    selected?: boolean;
}
interface MenuElementItem {
    element: (ctx: UPopperController) => JSX.Element;
}

const MenuItemComponent = (props: { item: MenuItem, ctx: UPopperController }) => {
    const { item, ctx } = props;
    const [loading, setLoading] = React.useState(false);
    const onClick = React.useCallback(async () => {
        if (item.action) {
            setLoading(true);
            await item.action();
            setLoading(false);
        }
        if (item.onClick) {
            item.onClick();
        }
        if (item.closeAfterAction !== false) {
            if (item.closeDelay) {
                setTimeout(() => {
                    ctx.hide();
                }, item.closeDelay);
            } else {
                ctx.hide();
            }
        }
    }, []);

    return (
        <UListItem
            title={item.title}
            icon={loading ? <XLoader size="medium" transparentBackground={true} loading={true} /> : item.icon}
            onClick={!item.path ? onClick : () => { ctx.hide(); }}
            path={item.path}
            linkSelectable={false}
            disabled={item.disabled}
            hovered={item.selected}
            rightElement={item.selected ? <XView paddingRight={8}><UIcon icon={<IcCheck />} color="var(--foregroundTertiary)" size={16} /></XView> : undefined}
        />
    );
};

export class UPopperMenuBuilder {
    private _items: ((MenuItem & { _type: 'item' }) | (MenuElementItem & { _type: 'element' }))[] = [];

    item = (item: MenuItem) => {
        this._items.push({ ...item, _type: 'item' });
        return this;
    }

    items = (items: MenuItem[]) => {
        items.map(item => {
            this._items.push({ ...item, _type: 'item' });
        });

        return this;
    }

    element = (element: (ctx: UPopperController) => JSX.Element) => {
        this._items.push({ element, _type: 'element' });
        return this;
    }

    build = (ctx: UPopperController, width?: number, containerClass?: string) => {
        return (
            <div className={cx(container, containerClass)} style={{ width }}>
                {this._items.map((item, index) => {
                    if (item._type === 'item') {
                        return (
                            <MenuItemComponent item={item} ctx={ctx} key={`item-${index}`} />
                        );
                    } else if (item._type === 'element') {
                        return <div key={`item-${index}`}>{item.element(ctx)}</div>;
                    }
                    return null;
                })}
            </div>
        );
    }
}