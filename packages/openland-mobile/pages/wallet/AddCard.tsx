import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { View } from 'react-native';
import { StripeInputView, StripeInputViewInstance } from './stripe/StripeInputView';
import { SHeader } from 'react-native-s/SHeader';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';
import { useClient } from 'openland-mobile/utils/useClient';
import uuid from 'uuid';
import { backoff } from 'openland-y-utils/timer';

const AddCardComponent = React.memo<PageProps>((props) => {
    let client = useClient();
    let [loading, setLoading] = React.useState(false);
    let [error, setError] = React.useState<string | undefined>(undefined);
    let ref = React.useRef<StripeInputViewInstance>(null);
    let submit = React.useCallback(() => {
        (async () => {
            setLoading(true);
            try {
                // Create Intent
                let retryKey = uuid();
                let intent = (await backoff(async () => client.mutateCreateCardSetupIntent({ retryKey }))).cardCreateSetupIntent;

                // Commit Card
                let res = await ref.current!.confirmSetupIntent(intent.clientSecret);
                if (res.status !== 'success') {
                    if (res.message) {
                        setError(res.message);
                    }
                    return;
                }

                // Commit Intent
                await backoff(() => client.mutateCommitCardSetupIntent({ id: intent.id, pmid: res.id! }));

                // Refetch Cards
                await backoff(() => client.refetchMyCards());
                setError(undefined);
                props.router.dismiss();
            } catch (e) {
                console.warn(e);
                setError('Unknown error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <>
            <SHeader title="Add Card" />
            <View flexDirection="column" alignSelf="stretch" alignItems="stretch">
                <StripeInputView ref={ref} />
                <View margin={16}>
                    <ZRoundedButton title="Add" onPress={submit} loading={loading} />
                </View>
            </View>
        </>
    );
});

export const AddCard = withApp(AddCardComponent, { navigationAppearance: 'small' });