import * as React from 'react';
import { MyCards_myCards } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { XView } from 'react-mental';
import { getPayMethNameByBrand } from 'openland-y-utils/wallet/brands';
import { BrandLogo } from './BrandLogo';

const box = css`
    background: var(--backgroundTertiary);
    border-radius: 12px;
    padding: 20px 20px 24px 24px;
    position: relative;
`;

const title = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const cardDate = css`
    color: var(--foregroundSecondary);
`;

const cardNumber = css`
    margin-top: 4px;
    color: var(--foregroundSecondary);
`;

const brandLogo = css`
    position: absolute;
    bottom: 24px; right: 20px;
`;

interface CardViewProps {
    card: MyCards_myCards;
}

const CardMenu = React.memo((props: CardViewProps & { ctx: UPopperController }) => {
    const { ctx } = props;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Set as default',
        // icon: <CopyIcon />,
    });

    builder.item({
        title: 'Edit',
        // icon: <CopyIcon />,
    });

    builder.item({
        title: 'Remove',
        // icon: <CopyIcon />,
    });

    return builder.build(ctx);
});

export const CardView = React.memo((props: CardViewProps) => {
    const { card } = props;
    const { brand, last4, expMonth, expYear } = card;
    const year = expYear.toString().slice(-2);

    return (
        <div className={box}>
            <XView marginBottom={26} flexDirection="row">
                <XView {...TextStyles.Title2} flexGrow={1} flexShrink={1} justifyContent="center">
                    <span className={title}>
                        {getPayMethNameByBrand(brand)}
                    </span>
                </XView>
                <XView marginRight={-8}>
                    <UMoreButton menu={ctx => <CardMenu {...props} ctx={ctx} />} />
                </XView>
            </XView>
            <div className={cx(cardDate, TextBody)}>
                {expMonth}/{year}
            </div>
            <div className={cx(cardNumber, TextBody)}>
                •••• {last4}
            </div>
            <div className={brandLogo}>
                <BrandLogo brand={brand} />
            </div>
        </div>
    );
});