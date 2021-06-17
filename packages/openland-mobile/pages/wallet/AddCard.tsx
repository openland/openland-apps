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
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { SRouter } from 'react-native-s/SRouter';
import { View } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { KeyboardHandlerContainer } from 'openland-mobile/components/KeyboardHandlerContainer';
import { t } from 'openland-mobile/text/useText';

let loader = Toast.loader();

const useAddCard = (props: { router: SRouter }) => {
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
                        if (res.message.startsWith('Missing required param')) {
                            AlertBlanket.alert(t('errorCardInvalid', 'Invalid card number'));
                        } else {
                            AlertBlanket.alert(res.message);
                        }
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
                AlertBlanket.alert(t('errorUnknown', 'Unknown error'));
            } finally {
                loader.hide();
            }
        })();
    }, []);

    const content = (
        <StripeInputView ref={ref} />
    );

    return {
        submit,
        content
    };
};

const AddCardComponent = React.memo<PageProps>((props) => {
    const { submit, content } = useAddCard({ router: props.router });
    return (
        <>
            <SHeader title={t('newCard', 'New card')} />
            <SHeaderButton title={t('add', 'Add')} onPress={submit} />
            <SScrollView style={{ flexDirection: 'column', alignSelf: 'stretch', padding: 16 }} contentContainerStyle={{ alignItems: 'stretch' }}>
                {content}
            </SScrollView>
        </>
    );
});

export const AddCard = withApp(AddCardComponent, { navigationAppearance: 'small' });

const AddCardModal = React.memo((props: { router: SRouter, hide: () => void }) => {
    const { submit, content } = useAddCard({ router: props.router });

    return (
        <KeyboardHandlerContainer>
            <View style={{ padding: 16 }}>
                {content}
            </View>
            <View style={{ flex: 1, marginHorizontal: 16, marginTop: 16 }}>
                <ZButton size="large" title={t('add', 'Add')} action={submit} />
            </View>
        </KeyboardHandlerContainer>
    );
});

export const showAddCard = (props: { router: SRouter }) => {
    showBottomSheet({
        title: t('newCard', 'New card'),
        cancelable: true,
        scrollViewProps: { keyboardShouldPersistTaps: 'handled' },
        view: (ctx) => <AddCardModal router={props.router} hide={ctx.hide} />,
    });
};
