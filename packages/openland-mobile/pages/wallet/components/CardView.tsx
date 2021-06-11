import * as React from 'react';
import { MyCards_myCards } from 'openland-api/spacex.types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { BrandLogo } from './BrandLogo';
import { useClient } from 'openland-api/useClient';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { useText } from 'openland-mobile/text/useText';

interface CardViewProps {
    item: MyCards_myCards;
    selected?: boolean;
    onPress?: () => void;
}

const isCardExpired = (month: number, year: number) => {
    let now = new Date();
    return year === now.getFullYear() && month < now.getMonth() || year < now.getFullYear();
};

export const CardView = (props: CardViewProps) => {
    const { id, brand, last4, expMonth, expYear, isDefault } = props.item;
    const { t } = useText();
    const selected = props.selected;
    const month = expMonth <= 9 ? `0${expMonth}` : expMonth;
    const year = expYear.toString().slice(-2);
    const monthYear = `${month}/${year}`;
    const theme = React.useContext(ThemeContext);
    const client = useClient();
    let subtitle = isCardExpired(expMonth, expYear)
        ? t('cardExpired', { expireDate: monthYear, defaultValue: `Expired on {{expireDate}}` })
        : t('cardValid', { validDate: monthYear, defaultValue: `Valid to {{validDate}}` });

    if (isDefault && selected === undefined) {
        subtitle += ', ' + t('primary', 'primary');
    }

    const handlePress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();

        builder.view(ctx => (
            <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]} style={{ paddingTop: 16, paddingBottom: 16, alignItems: 'center', marginBottom: 16 }}>
                <View style={{ width: 263, height: 166, backgroundColor: theme.backgroundTertiaryTrans, borderRadius: RadiusStyles.Medium, paddingTop: 20, paddingHorizontal: 24 }}>
                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                        {getPaymentMethodName(brand)}
                    </Text>

                    {isDefault && (
                        <View style={{ position: 'absolute', top: 50, left: 24 }}>
                            <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary, textTransform: 'capitalize' }} allowFontScaling={false}>
                                {t('primary', 'primary')}
                            </Text>
                        </View>
                    )}

                    <View style={{ position: 'absolute', bottom: 20, left: 24 }}>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} allowFontScaling={false}>
                            •• {last4}, {monthYear}
                        </Text>
                    </View>

                    <View style={{ position: 'absolute', bottom: 25, right: 24 }}>
                        <BrandLogo brand={brand} />
                    </View>
                </View>
            </LinearGradient>
        ));

        if (!isDefault) {
            builder.action(t('makePrimary', 'Make primary'), async () => {
                const loader = Toast.loader();
                loader.show();

                try {
                    await client.mutateMakeCardDefault({ id });
                    await client.refetchMyCards();
                } catch (e) {
                    console.warn(e);
                } finally {
                    loader.hide();
                }
            }, false, require('assets/ic-star-24.png'));
        }

        builder.action(t('deleteCard', 'Delete card'), async () => {
            AlertBlanket.builder()
                .title(t('deleteCardQuestion', 'Delete card?'))
                .message(t('deleteCardDescription', 'It cannot be undone'))
                .button(t('cancel', 'Cancel'), 'cancel')
                .action(t('delete', 'Delete'), 'destructive', async () => {
                    try {
                        await client.mutateRemoveCard({ id });
                        await client.refetchMyCards();
                    } catch (e) {
                        console.warn(e);
                    }
                }).show();
        }, false, require('assets/ic-delete-24.png'));

        builder.show();
    }, [isDefault]);

    return (
        <ZListItem
            leftIconView={<BrandLogo brand={brand} />}
            text={`${getPaymentMethodName(brand)}, ${last4}`}
            subTitle={subtitle}
            onPress={props.onPress || handlePress}
            checkmark={selected}
            checkmarkStyle={{ marginBottom: -20, }}
        />
    );
};