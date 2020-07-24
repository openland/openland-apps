import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { PrivacyWhoCanSee } from 'openland-api/spacex.types';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import IcDropdown from 'openland-icons/s/ic-dropdown-16.svg';
import { UIcon } from 'openland-web/components/unicorn/UIcon';

interface WhoCanSeeItemProps {
    text: string;
    value: PrivacyWhoCanSee;
    onClick: (value: PrivacyWhoCanSee) => void;
}

const WhoCanSeeLabel: { [key in PrivacyWhoCanSee]: string } = {
    EVERYONE: 'Everyone',
    NOBODY: 'Nobody'
};

const WhoCanSeeLabelOrder: PrivacyWhoCanSee[] = [PrivacyWhoCanSee.EVERYONE, PrivacyWhoCanSee.NOBODY];

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

const MenuComponent = React.memo((props: WhoCanSeeItemProps & { ctx: UPopperController }) => {
    const { ctx, value, onClick } = props;
    const builder = new UPopperMenuBuilder();

    WhoCanSeeLabelOrder.map(label => {
        builder.item({
            title: WhoCanSeeLabel[label],
            onClick: () => onClick(label),
            selected: label === value
        });
    });

    return builder.build(ctx, 160, wrapperClass);
});

export const WhoCanSee = React.memo((props: WhoCanSeeItemProps) => {
    const { text, value } = props;
    const marginTop = ((WhoCanSeeLabelOrder.indexOf(value) + 1) * -48) - 16;
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
                    {WhoCanSeeLabel[value]}
                </XView>
                <XView marginLeft={8}><UIcon icon={<IcDropdown />} color="var(--foregroundTertiary)" size={16} /></XView>
            </XView>
        </div>
    );
});