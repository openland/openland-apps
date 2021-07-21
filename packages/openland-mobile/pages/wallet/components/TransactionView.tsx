import * as React from 'react';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';

import { WalletTransactionFragment } from 'openland-api/spacex.types';
import { showPayComplete } from 'openland-mobile/pages/main/modals/PayComplete';
import { ZAvatar } from 'openland-mobile/components/ZAvatar';
import { TextStyles, RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { ZListItemBase } from 'openland-mobile/components/ZListItemBase';
import { showTransactionInfo } from 'openland-mobile/pages/main/modals/TransactionInfo';
import { ZButton } from 'openland-mobile/components/ZButton';
import { useText } from 'openland-mobile/text/useText';
import { useConvertedTransaction } from 'openland-mobile/utils/useConvertedTransaction';
import { useSupportRoom } from 'openland-mobile/utils/useSupportRoom';

interface TransactionViewProps {
    item: WalletTransactionFragment;
}

export const TransactionView = (props: TransactionViewProps) => {
    const theme = React.useContext(ThemeContext);
    const router = React.useContext(SRouterContext)!;
    const navigateToSupport = useSupportRoom();
    const { t } = useText();

    const { avatar, title, type, dateTime, status, amount, source, group } = useConvertedTransaction(
        props.item,
    );
    const payment = source.operation.payment;
    const actionRequired = status === 'failing';
    const color =
        actionRequired || status === 'canceled'
            ? theme.accentNegative
            : source.operation.amount > 0
                ? theme.accentPositive
                : theme.foregroundPrimary;
    const subtitleTime = dateTime.isToday ? dateTime.time : dateTime.date;
    const groupTitle = group ? `, ${group.title}` : '';
    const subtitleStatus = status !== 'success' ? `, ${status}` : '';
    const subtitle = `${type}${groupTitle}\n${subtitleTime}${subtitleStatus}`.replace(',,', ',');

    const complete = React.useCallback(() => {
        if (actionRequired && payment && payment.intent && router) {
            showPayComplete(payment.intent.id, payment.intent.clientSecret, router);
        }
    }, [actionRequired]);

    const handlePress = React.useCallback(() => {
        showTransactionInfo({ item: props.item, router });
    }, [props.item]);

    return (
        <>
            <ZListItemBase height={76} separator={false} onPress={handlePress}>
                <View
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 6,
                        paddingHorizontal: 16,
                        flexGrow: 1,
                        width: '100%',
                    }}
                >
                    <View style={{ paddingTop: 2, paddingRight: 16 }}>
                        {avatar && <ZAvatar size="medium" {...avatar} />}
                        {!avatar && <Image source={require('assets/ic-top-up-40.png')} />}
                    </View>
                    <View style={{ flexGrow: 1, flexShrink: 1 }}>
                        <Text
                            style={{ ...TextStyles.Label1, color: theme.foregroundPrimary }}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            allowFontScaling={false}
                        >
                            {title}
                        </Text>
                        <Text
                            style={{ ...TextStyles.Subhead, color: theme.foregroundTertiary }}
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            allowFontScaling={false}
                        >
                            {subtitle}
                        </Text>
                    </View>
                    <View style={{ flexShrink: 0, paddingLeft: 16 }}>
                        <Text style={{ ...TextStyles.Label1, color }} allowFontScaling={false}>
                            {amount}
                        </Text>
                    </View>
                </View>
            </ZListItemBase>
            {actionRequired && (
                <View
                    style={{
                        marginLeft: 72,
                        width: '100%',
                    }}
                >
                    <TouchableWithoutFeedback onPress={complete}>
                        <View
                            style={{
                                paddingVertical: 8,
                                alignItems: 'flex-start',
                                justifyContent: 'flex-start',
                                position: 'relative',
                            }}
                        >
                            <View
                                style={{
                                    position: 'absolute',
                                    top: 2,
                                    left: 16,
                                    width: 12,
                                    height: 6,
                                }}
                            >
                                <Image
                                    source={require('assets/wallet/ic-tail-12.png')}
                                    style={{ width: 12, height: 6 }}
                                />
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                    borderRadius: RadiusStyles.Medium,
                                    width: 287,
                                    maxWidth: '100%',
                                    backgroundColor: theme.accentNegative,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image
                                        source={require('assets/ic-failure-16.png')}
                                        style={{ tintColor: '#fff' }}
                                    />
                                    <Text
                                        style={{
                                            ...TextStyles.Subhead,
                                            color: theme.foregroundContrast,
                                            marginLeft: 8,
                                        }}
                                        allowFontScaling={false}
                                    >
                                        {t('transacitonFailed', 'Transaction failed')}
                                    </Text>
                                </View>
                                <ZButton
                                    title={t('tryAgain', 'Try again')}
                                    size="large"
                                    marginTop={12}
                                    backgroundColor="#fff"
                                    textColor={theme.accentNegative}
                                    onPress={complete}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                ...TextStyles.Subhead,
                                color: theme.foregroundTertiary,
                            }}
                            allowFontScaling={false}
                        >
                            {t('needHelp', 'Need help?')}
                        </Text>
                        <Text
                            style={{
                                ...TextStyles.Label2,
                                color: theme.accentPrimary,
                                marginLeft: 6,
                            }}
                            allowFontScaling={false}
                            onPress={navigateToSupport}
                        >
                            {t('contactUs', 'Contact us')}
                        </Text>
                    </View>
                </View>
            )}
        </>
    );
};
