import * as React from 'react';
import { MyCards_myCards } from 'openland-api/Types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { getPayhmentMethodName } from 'openland-y-utils/wallet/brands';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import { View, Text } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import LinearGradient from 'react-native-linear-gradient';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { BrandLogo } from './BrandLogo';

interface CardViewProps {
    item: MyCards_myCards;
}

export const CardView = (props: CardViewProps) => {
    const { brand, last4, expMonth, expYear } = props.item;
    const year = expYear.toString().slice(-2);
    const theme = React.useContext(ThemeContext);
    const gradientStart = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0)' : 'rgba(242, 243, 245, 0)';
    const gradientEnd = theme.type === 'Dark' ? 'rgba(36, 38, 41, 0.56)' : 'rgba(242, 243, 245, 0.56)';

    const handlePress = React.useCallback(() => {
        const builder = new ActionSheetBuilder();

        builder.view(ctx => (
            <LinearGradient colors={[gradientStart, gradientEnd]} paddingTop={16} paddingBottom={32} alignItems="center" marginBottom={16}>
                <View width={263} height={166} backgroundColor={theme.accentPay} borderRadius={RadiusStyles.Medium} paddingTop={20} paddingHorizontal={24}>
                    <Text style={{ ...TextStyles.Title2, color: theme.foregroundInverted }} numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false}>
                        {getPayhmentMethodName(brand)}
                    </Text>

                    <View position="absolute" bottom={20} left={24}>
                        <Text style={{ ...TextStyles.Subhead, color: theme.foregroundInverted }} allowFontScaling={false}>
                            •• {last4}, {expMonth}/{year}
                        </Text>
                    </View>

                    <View position="absolute" bottom={24} right={24}>
                        <BrandLogo brand={brand} />
                    </View>
                </View>
            </LinearGradient>
        ));

        builder.action('Make default', () => { return; }, false, require('assets/ic-star-24.png'));
        builder.action('Delete card', () => { return; }, false, require('assets/ic-delete-24.png'));

        builder.show();
    }, []);

    return (
        <ZListItem
            leftIconView={<BrandLogo brand={brand} />}
            text={`${getPayhmentMethodName(brand)}, ${last4}`}
            onPress={handlePress}
        // description="Default"
        />
    );
};