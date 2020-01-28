import * as React from 'react';
import { MyCards_myCards } from 'openland-api/Types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getPaymentMethodName } from 'openland-y-utils/wallet/brands';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { BrandLogo } from './BrandLogo';
import { useClient } from 'openland-mobile/utils/useClient';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import { stopLoader, startLoader } from 'openland-mobile/components/ZGlobalLoader';

interface CardViewProps {
    item: MyCards_myCards;
}

export const CardView = (props: CardViewProps) => {
    const { id, brand, last4, expMonth, expYear, isDefault } = props.item;
    const year = expYear.toString().slice(-2);
    const theme = React.useContext(ThemeContext);
    const client = useClient();

    const handlePress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();

        builder.view(ctx => (
            <LinearGradient colors={[theme.gradient0to100Start, theme.gradient0to100End]} paddingTop={16} paddingBottom={32} alignItems="center" marginBottom={16}>
                <View width={263} height={166} backgroundColor={theme.backgroundTertiaryTrans} borderRadius={RadiusStyles.Medium} paddingTop={20} paddingHorizontal={24}>
                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                        {getPaymentMethodName(brand)}
                    </Text>

                    {isDefault && (
                        <View position="absolute" top={50} left={24}>
                            <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} allowFontScaling={false}>
                                Primary
                            </Text>
                        </View>
                    )}

                    <View position="absolute" bottom={20} left={24}>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundSecondary }} allowFontScaling={false}>
                            •• {last4}, {expMonth}/{year}
                        </Text>
                    </View>

                    <View position="absolute" bottom={24} right={24}>
                        <BrandLogo brand={brand} />
                    </View>
                </View>
            </LinearGradient>
        ));

        if (!isDefault) {
            builder.action('Make primary', async () => {
                startLoader();

                try {
                    await client.mutateMakeCardDefault({ id });
                    await client.refetchMyCards();
                } catch (e) {
                    console.warn(e);
                } finally {
                    stopLoader();
                }
            }, false, require('assets/ic-star-24.png'));
        }

        builder.action('Delete card', async () => {
            AlertBlanket.builder()
                .title('Delete card?')
                .message('The card will be deleted')
                .button('Cancel', 'cancel')
                .action('Delete', 'destructive', async () => {
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
            onPress={handlePress}
            description={isDefault ? 'Primary' : undefined}
        />
    );
};