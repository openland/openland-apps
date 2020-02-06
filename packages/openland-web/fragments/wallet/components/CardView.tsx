import * as React from 'react';
import { MyCards } from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { TextBody, TextStyles } from 'openland-web/utils/TextStyles';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { XView } from 'react-mental';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { BrandLogo } from './BrandLogo';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import { useClient } from 'openland-web/utils/useClient';
import AlertBlanket from 'openland-x/AlertBlanket';

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

const dots = css`
    color: var(--foregroundTertiary);
`;

const brandLogo = css`
    position: absolute;
    bottom: 24px; right: 24px;
`;

interface CardViewProps {
    item: MyCards['myCards'][0];
}

const CardMenu = React.memo((props: CardViewProps & { ctx: UPopperController }) => {
    const { ctx, item } = props;
    const builder = new UPopperMenuBuilder();
    const client = useClient();

    if (!item.isDefault) {
        builder.item({
            title: 'Make primary',
            icon: <StarIcon />,
            action: async () => {
                await client.mutateMakeCardDefault({ id: item.id });
                await client.refetchMyCards();
            }
        });
    }

    builder.item({
        title: 'Delete card',
        icon: <DeleteIcon />,
        onClick: () => {
            AlertBlanket.builder()
                .title('Delete card?')
                .message('The card will be deleted')
                .action('Delete', async () => {
                    await client.mutateRemoveCard({ id: item.id });
                    await client.refetchMyCards();
                }, 'danger').show();
        }
    });

    return builder.build(ctx, 200);
});

export const CardView = React.memo((props: CardViewProps) => {
    const { brand, last4, expMonth, expYear, isDefault } = props.item;
    const year = expYear.toString().slice(-2);

    return (
        <div className={box}>
            <XView marginBottom={40} flexDirection="row">
                <XView flexGrow={1} flexShrink={1} height={48}>
                    <XView {...TextStyles.Title3}>
                        <span className={title}>
                            {getPaymentMethodName(brand)}
                        </span>
                    </XView>
                    {isDefault && (
                        <XView {...TextStyles.Densed} color="var(--foregroundSecondary)" marginTop={4}>
                            Primary card
                        </XView>
                    )}
                </XView>
                <XView>
                    <UMoreButton
                        key={`card-menu-${isDefault}`}
                        size="small-densed"
                        menu={ctx => <CardMenu {...props} ctx={ctx} />}
                    />
                </XView>
            </XView>
            <div className={cx(info, TextBody)}>
                <span className={dots}>••</span> {last4}, {expMonth}/{year}
            </div>
            <div className={brandLogo}>
                <BrandLogo brand={brand} />
            </div>
        </div>
    );
});