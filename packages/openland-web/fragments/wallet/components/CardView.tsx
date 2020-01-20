import * as React from 'react';
import { MyCards_myCards } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { XView } from 'react-mental';
import { getPayhmentMethodName } from 'openland-y-utils/wallet/brands';
import { BrandLogo } from './BrandLogo';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';

const box = css`
    background: var(--backgroundTertiary);
    border-radius: 12px;
    padding: 20px 16px 20px 24px;
    position: relative;
`;

const title = css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const info = css`
    color: var(--foregroundSecondary);
`;

const brandLogo = css`
    position: absolute;
    bottom: 24px; right: 24px;
`;

interface CardViewProps {
    item: MyCards_myCards;
}

const CardMenu = React.memo((props: CardViewProps & { ctx: UPopperController }) => {
    const { ctx } = props;
    const builder = new UPopperMenuBuilder();

    builder.item({
        title: 'Make default',
        icon: <StarIcon />,
    });

    builder.item({
        title: 'Delete card',
        icon: <DeleteIcon />,
    });

    return builder.build(ctx, 200);
});

export const CardView = React.memo((props: CardViewProps) => {
    const { brand, last4, expMonth, expYear } = props.item;
    const year = expYear.toString().slice(-2);

    return (
        <div className={box}>
            <XView marginBottom={40} flexDirection="row">
                <XView flexGrow={1} flexShrink={1} height={48}>
                    <XView {...TextStyles.Title3}>
                        <span className={title}>
                            {getPayhmentMethodName(brand)}
                        </span>
                    </XView>
                    <XView {...TextStyles.Densed} color="var(--foregroundSecondary)" marginTop={4}>
                        Default card
                    </XView>
                </XView>
                <XView>
                    <UMoreButton
                        size="small-densed"
                        menu={ctx => <CardMenu {...props} ctx={ctx} />}
                    />
                </XView>
            </XView>
            <div className={cx(info, TextBody)}>
                •••• {last4}, {expMonth}/{year}
            </div>
            <div className={brandLogo}>
                <BrandLogo brand={brand} />
            </div>
        </div>
    );
});