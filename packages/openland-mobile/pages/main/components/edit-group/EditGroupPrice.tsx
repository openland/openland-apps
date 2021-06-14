import * as React from 'react';
import { WalletSubscriptionInterval } from 'openland-api/spacex.types';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { SScrollView } from 'react-native-s/SScrollView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { GroupPriceSettings, DistributionType } from '../../../compose/CreateGroupAttrs';
import { EditPageHeader } from '../EditPageHeader';
import { useText } from 'openland-mobile/text/useText';

const EditGroupPriceComponent = React.memo((props: PageProps) => {
    const theme = React.useContext(ThemeContext);
    const client = getClient();
    const { t } = useText();
    const group = client.useRoomChat(
        { id: props.router.params.id },
        { fetchPolicy: 'network-only' },
    ).room;

    if (!group || group.__typename !== 'SharedRoom') {
        return null;
    }

    const form = useForm();

    const distributionField = useField<DistributionType>(
        'distribution',
        DistributionType.FREE,
        form,
    );
    const priceField = useField<string>('price', '1', form, [
        {
            checkIsValid: (x) => {
                return /^[0-9]*$/.test(x);
            },
            text: t('validationNumbersOnly', 'Numbers only'),
        },
        {
            checkIsValid: (x) => {
                return Number(x) <= 1000;
            },
            text: t('validationAmountMax', { amount: 1000, defaultValue: '${{amount}} maximum' }),
        },
        {
            checkIsValid: (x) => {
                return Number(x) >= 1;
            },
            text: t('validationAmountMin', { amount: 1, defaultValue: '${{amount}} minimum' }),
        },
    ]);
    const intervalField = useField<WalletSubscriptionInterval | null>('interval', null, form);

    return (
        <>
            <SHeaderButton title={t('save', 'Save')} onPress={() => props.router.back()} />
            <SScrollView>
                <EditPageHeader
                    icon={require('assets/ic-wallet-glyph-48.png')}
                    tint={theme.tintPurple}
                    title={t('payments', 'Payments')}
                    description={t('groupPriceDescription', 'Set up monetization of your group. All changes will affect only new members')}
                />
                <ZListGroup header={null}>
                    <GroupPriceSettings
                        distributionField={distributionField}
                        intervalField={intervalField}
                        priceField={priceField}
                    />
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const EditGroupPrice = withApp(EditGroupPriceComponent, { navigationAppearance: 'small' });
