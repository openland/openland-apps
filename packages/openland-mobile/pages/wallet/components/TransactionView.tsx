import * as React from 'react';
import { WalletTransactionFragment, PaymentStatus } from 'openland-api/spacex.types';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Money } from 'openland-y-utils/wallet/Money';
import { View, Text } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { showPayComplete } from 'openland-mobile/pages/main/modals/PayComplete';
import { SRouter } from 'react-native-s/SRouter';

interface TransactionViewProps {
    item: WalletTransactionFragment;
    router: SRouter;
}

export const TransactionView = (props: TransactionViewProps) => {
    const { status, operation } = props.item;
    const operationAmount = operation.__typename !== 'WalletTransactionTransferOut' ? operation.amount : undefined;

    const { payment } = operation;

    const actionRequired = payment && (payment.status === PaymentStatus.ACTION_REQUIRED || payment.status === PaymentStatus.FAILING) && payment.intent;
    const complete = React.useCallback(() => {
        if (actionRequired && payment && payment.intent) {
            showPayComplete(payment.intent.id, payment.intent.clientSecret, props.router);
        }
    }, [actionRequired]);
    // const cancel = React.useCallback(async () => {
    //     if (actionRequired && !loading && payment && payment.intent) {
    //         setLoading(true);
    //         await backoff(() => {
    //             return client.mutatePaymentIntentCancel({ id: payment.intent!.id });
    //         });
    //         setLoading(false);
    //     }
    // }, [actionRequired]);

    return (
        <View flexDirection="column">
            <ZListItem
                text={`${status}`}
                subTitle={operationAmount ? <Money amount={operationAmount} /> : undefined}
                rightElement={
                    actionRequired ? <View padding={16} flexDirection="row">
                        {/* <ZButton title="Cancel" onPress={cancel} style="danger" loading={loading} enabled={!loading} /> */}
                        <ZButton title="Complete" onPress={complete} />
                    </View>
                        : undefined
                }
            />

            {/* <Text>{JSON.stringify(operation, undefined, 4)}</Text> */}
        </View>
    );
};