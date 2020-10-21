import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import IcDropdown from 'openland-icons/s/ic-dropdown-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

interface SelectorProps {
    text: string;
    items: string[];
    selectedIndex: number;
    onClick: (index: number) => void;
}

const boxClass = css`
    user-select: none;
`;

const wrapperClass = css`
    user-select: none;

    /* Disable hoverBackground for selected item if mouse on another */
    &:hover > div > div:not(:hover) {
        background-color: transparent;
    }
`;

const MenuComponent = React.memo((props: SelectorProps & { ctx: UPopperController }) => {
    const { ctx, selectedIndex, onClick, items } = props;
    const builder = new UPopperMenuBuilder();

    items.forEach((item, i) => {
        builder.item({
            title: item,
            onClick: () => onClick(i),
            selected: i === selectedIndex
        });
    });

    return builder.build(ctx, 160, wrapperClass);
});

export const Selector = React.memo((props: SelectorProps) => {
    const { text, selectedIndex, items } = props;
    const marginTop = ((selectedIndex + 1) * -48) - 16;
    const [menuVisible, menuShow] = usePopper({ placement: 'bottom-end', hideOnClick: true, marginTop }, (ctx) => <MenuComponent ctx={ctx} {...props} />);

    return (
        <div className={boxClass}>
            <XView
                cursor="pointer"
                borderRadius={8}
                backgroundColor={menuVisible ? 'var(--backgroundTertiary)' : 'var(--backgroundPrimary)'}
                hoverBackgroundColor="var(--backgroundTertiary)"
                onClick={menuShow}
                flexDirection="row"
                paddingHorizontal={16}
                paddingVertical={12}
                marginHorizontal={-16}
            >
                <XView {...TextStyles.Body} flexGrow={1} color="var(--foregroundPrimary)">
                    {text}
                </XView>
                <XView {...TextStyles.Body} color="var(--foregroundSecondary)">
                    {items[selectedIndex]}
                </XView>
                <XView marginLeft={8}><UIcon icon={<IcDropdown />} color="var(--foregroundTertiary)" size={16} /></XView>
            </XView>
        </div>
    );
});