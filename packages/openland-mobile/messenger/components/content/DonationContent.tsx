import * as React from 'react';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase, PurchaseState } from 'openland-api/spacex.types';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { RadiusStyles, TextStylesAsync } from 'openland-mobile/styles/AppStyles';
import { useThemeGlobal } from 'openland-mobile/themes/ThemeContext';
import { formatMoney } from 'openland-y-utils/wallet/Money';

interface DonationContentProps {
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentPurchase;
    hasText: boolean;
    isOut: boolean;
}

export const DonationContent = (props: DonationContentProps) => {
    let theme = useThemeGlobal();
    let {isOut, attach, hasText} = props;
    let {amount, state} = attach.purchase;

    return (
        <ASFlex 
            borderRadius={RadiusStyles.Small} 
            backgroundColor={theme.payBackgroundSecondary}
            marginTop={isOut ? 7 : 6}
            marginBottom={hasText ? 7 : 18}
        >
            <ASFlex 
                flexGrow={1}
                marginTop={32}
                marginBottom={32}
                marginLeft={12}
                marginRight={12}
            >
                <ASFlex 
                    flexGrow={1}
                    minWidth={203} 
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ASText {...TextStylesAsync.Large} color={theme.payForegroundPrimary}>
                        {formatMoney(amount)}
                    </ASText>
                    {state !== PurchaseState.COMPLETED && (
                        <ASText {...TextStylesAsync.Caption} color={theme.payForegroundSecondary}>Payment failed</ASText>
                    )}
                </ASFlex>
            </ASFlex>
        </ASFlex>
    );
};
