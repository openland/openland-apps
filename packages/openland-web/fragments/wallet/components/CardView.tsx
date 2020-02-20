import * as React from 'react';
import { MyCards_myCards } from 'openland-api/spacex.types';
import { UMoreButton } from 'openland-web/components/unicorn/templates/UMoreButton';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { BrandLogo } from './BrandLogo';
import StarIcon from 'openland-icons/s/ic-star-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import { useClient } from 'openland-api/useClient';
import AlertBlanket from 'openland-x/AlertBlanket';
import { UListItem } from 'openland-web/components/unicorn/UListItem';

interface CardViewProps {
    item: MyCards_myCards;
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
                .title('Delete method?')
                .message('It cannot be undone')
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
    const month = expMonth <= 9 ? `0${expMonth}` : expMonth;
    const year = expYear.toString().slice(-2);
    const monthYear = `${month}/${year}`;

    return (
        <UListItem
            leftElement={<BrandLogo brand={brand} border={true} />}
            title={`${getPaymentMethodName(brand)}, ${last4}`}
            description={`Valid to ${monthYear}${isDefault ? ', primary' : ''}`}
            interactive={false}
            rightElement={<UMoreButton key={`card-menu-${isDefault}`} menu={ctx => <CardMenu {...props} ctx={ctx} />} />}
        />
    );
});