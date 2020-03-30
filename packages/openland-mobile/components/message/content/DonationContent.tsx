import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase, PurchaseState } from 'openland-api/spacex.types';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { formatMoney } from 'openland-y-utils/wallet/Money';
import { View, Text } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';

interface DonationContentProps {
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase;
    hasText: boolean;
}

export const DonationContent = (props: DonationContentProps) => {
    let theme = useTheme();
    let {attach, hasText} = props;
    let {amount, state} = attach.purchase;

    return (
        <View 
            borderRadius={RadiusStyles.Small} 
            backgroundColor={theme.payBackgroundPrimary}
            paddingHorizontal={16}
            paddingVertical={32}
            flex={1}
            justifyContent="center"
            alignItems="center"
            marginBottom={hasText ? 16 : 0}
        >
            <Text style={{...TextStyles.Large, color: theme.payForegroundPrimary}}>
                {formatMoney(amount)}
            </Text>
            {state === PurchaseState.PENDING && (
                <Text style={{...TextStyles.Caption, color: theme.payForegroundSecondary}}>Pending</Text>
            )}
        </View>
    );
};
