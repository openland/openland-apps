import * as React from 'react';
import { WalletTransactions_walletTransactions_items } from 'openland-api/Types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { View, Text, Image } from 'react-native';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { Money } from 'openland-y-utils/wallet/Money';
import { TextStyles } from 'openland-mobile/styles/AppStyles';

interface TransactionViewProps {
    item: WalletTransactions_walletTransactions_items;
}

export const TransactionView = (props: TransactionViewProps) => {
    const { amount, state } = props.item;
    const theme = React.useContext(ThemeContext);

    return (
        <ZListItem
            text="Community creators"
            subTitle="Jan 14, 2020"
            rightElement={(
                <View alignItems="flex-end">
                    <View flexDirection="row" alignItems="center" justifyContent="flex-end">
                        <Text style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }} allowFontScaling={false}>
                            <Money amount={amount} />
                        </Text>

                        {state === 'pending' && (
                            <View marginLeft={8}>
                                <Image source={require('assets/ic-recent-16.png')} style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary }} />
                            </View>
                        )}
                    </View>
                    <Text style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }} allowFontScaling={false}>
                        <Text style={{ color: theme.foregroundQuaternary }}>••</Text> 8036
                    </Text>
                </View>
            )}
            leftAvatar={{ photo: undefined, key: '1', title: 'Community creators' }}
        />
    );
};