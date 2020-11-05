import * as React from 'react';
import { QueryCacheProvider } from '@openland/spacex';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import Toast from 'openland-mobile/components/Toast';
import { View } from 'react-native';

interface DialogMenuProps {
    ctx: ZModalController;
    item: DialogDataSourceItem;
}

const DialogMenuPrivate = React.memo((props: DialogMenuProps) => {
    const { ctx, item } = props;
    const builder = new ActionSheetBuilder();
    const messenger = getMessenger();
    const client = messenger.engine.client;
    const user = client.useUserNano({ id: item.flexibleId }, { fetchPolicy: 'cache-and-network' }).user;
    const { isContact } = useLocalContact(user.id, user.inContacts);
    const isSavedMessages = item.flexibleId === messenger.engine.user.id;
    const muted = item.isMuted;

    if (item.messageId && item.unread > 0) {
        builder.action('Mark as read', () => {
            client.mutateRoomRead({ id: item.key, mid: item.messageId! });
        }, false, require('assets/ic-unread-off-24.png'));
    }

    if (!isSavedMessages) {
        builder.action(`${muted ? 'Unmute' : 'Mute'} notifications`, () => {
            client.mutateRoomSettingsUpdate({ roomId: item.key, settings: { mute: !muted } });
            client.refetchRoomTiny({ id: item.key });
        }, false, muted ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-off-24.png'));
    }

    builder.action('Media, files, links', () => {
        messenger.history.navigationManager.push('SharedMedia', { chatId: item.key });
    }, false, require('assets/ic-attach-24.png'));

    if (!isSavedMessages) {
        builder.action(
            isContact ? 'Remove from contacts' : 'Add to contacts',
            async () => {
                const loader = Toast.loader();
                loader.show();
                if (isContact) {
                    client.mutateRemoveFromContacts({ userId: user.id });
                } else {
                    client.mutateAddToContacts({ userId: user.id });
                }
                loader.hide();
                Toast.success({ duration: 1000 }).show();
            },
            false,
            isContact ? require('assets/ic-invite-off-24.png') : require('assets/ic-invite-24.png'),
        );
    }

    return builder.renderItems(ctx);
});

export const showDialogMenu = (item: DialogDataSourceItem) => {
    const builder = new ActionSheetBuilder();
    const messenger = getMessenger();
    const client = messenger.engine.client;
    const isSavedMessages = item.flexibleId === messenger.engine.user.id;

    builder.title(isSavedMessages ? 'Saved messages' : item.title, 'left');

    if (item.kind !== 'PRIVATE') {
        const muted = item.isMuted;

        if (item.messageId && item.unread > 0) {
            builder.action('Mark as read', () => {
                client.mutateRoomRead({ id: item.key, mid: item.messageId! });
            }, false, require('assets/ic-unread-off-24.png'));
        }

        builder.action(`${muted ? 'Unmute' : 'Mute'} notifications`, () => {
            client.mutateRoomSettingsUpdate({ roomId: item.key, settings: { mute: !muted } });
            client.refetchRoomTiny({ id: item.key });
        }, false, muted ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-off-24.png'));

        builder.action('Media, files, links', () => {
            messenger.history.navigationManager.push('SharedMedia', { chatId: item.key });
        }, false, require('assets/ic-attach-24.png'));

        builder.action('Leave group', () => {
            Alert.builder()
                .title(`Leave ${item.isChannel ? 'channel' : 'group'}?`)
                .message(
                    item.isPremium
                        ? 'Leaving the group only removes it from your chat list. To cancel the associated subscription, visit Subscriptions section in your Account tab and cancel it from there.'
                        : 'You may not be able to join it again',
                )
                .button('Cancel', 'cancel')
                .action('Leave', 'destructive', async () => {
                    await client.mutateRoomLeave({ roomId: item.key });
                    await client.refetchRoomChat({ id: item.key });
                })
                .show();
        }, false, require('assets/ic-leave-24.png'));
    } else {
        builder.view((ctx: ZModalController) => (
            <React.Suspense fallback={<View height={48}><ZLoader /></View>}>
                <QueryCacheProvider>
                    <DialogMenuPrivate ctx={ctx} item={item} />
                </QueryCacheProvider>
            </React.Suspense>
        ));
    }

    builder.show(true);
};
