import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { StripeInputView, StripeInputViewInstance } from './stripe/StripeInputView';
import { SHeader } from 'react-native-s/SHeader';
import { useClient } from 'openland-api/useClient';
import uuid from 'uuid';
import { backoff } from 'openland-y-utils/timer';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import AlertBlanket from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';

let loader = Toast.loader();
const AddCardComponent = React.memo<PageProps>((props) => {
    let client = useClient();
    let ref = React.useRef<StripeInputViewInstance>(null);

    let submit = React.useCallback(() => {
        (async () => {
            loader.show();
            try {
                // Create Intent
                let retryKey = uuid();
                let intent = (await backoff(async () => client.mutateCreateCardSetupIntent({ retryKey }))).cardCreateSetupIntent;

                // Commit Card
                let res = await ref.current!.confirmSetupIntent(intent.clientSecret);
                if (res.status !== 'success') {
                    if (res.message) {
                        AlertBlanket.alert(res.message);
                    }
                    return;
                }

                // Commit Intent
                await backoff(() => client.mutateCommitCardSetupIntent({ id: intent.id, pmid: res.id! }));

                // Refetch Cards
                await backoff(() => client.refetchMyCards());
                props.router.back();
            } catch (e) {
                console.warn(e);
                AlertBlanket.alert('Unknown error');
            } finally {
                loader.hide();
            }
        })();
    }, []);

    return (
        <>
            <SHeader title="New card" />
            <SHeaderButton title="Add" onPress={submit} />
            <SScrollView flexDirection="column" alignSelf="stretch" alignItems="stretch" padding={16}>
                <StripeInputView ref={ref} />
            </SScrollView>
        </>
    );
});

export const AddCard = withApp(AddCardComponent, { navigationAppearance: 'small' });