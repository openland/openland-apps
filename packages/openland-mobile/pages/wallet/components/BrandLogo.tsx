import * as React from 'react';
import { View, Image } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { getBrandSafe } from 'openland-y-utils/wallet/brands';

interface BrandLogoProps {
    brand: string;
    border?: boolean;
}

export const BrandLogo = (props: BrandLogoProps) => {
    const theme = React.useContext(ThemeContext);
    const brand = getBrandSafe(props.brand);
    const logo = brand === 'amex' ? require('assets/wallet/ic-amex-40.png') :
        brand === 'apple-pay' ? require('assets/wallet/ic-apple-pay-40.png') :
            brand === 'diners' ? require('assets/wallet/ic-diners-40.png') :
                brand === 'discover' ? require('assets/wallet/ic-discover-40.png') :
                    brand === 'google-pay' ? require('assets/wallet/ic-google-pay-40.png') :
                        brand === 'jcb' ? require('assets/wallet/ic-jcb-40.png') :
                            brand === 'mastercard' ? require('assets/wallet/ic-mastercard-40.png') :
                                brand === 'unionpay' ? require('assets/wallet/ic-unionpay-40.png') :
                                    brand === 'visa' ? require('assets/wallet/ic-visa-40.png') :
                                        require('assets/wallet/ic-unknown-40.png');

    return (
        <View width={40} height={28} borderRadius={4} backgroundColor={theme.backgroundPrimary} overflow="hidden">
            <Image source={logo} style={{ width: 40, height: 28 }} />

            {props.border && <View position="absolute" top={0} right={0} bottom={0} left={0} borderWidth={1} borderColor={theme.border} borderRadius={4} />}
        </View>
    );
};