import * as React from 'react';
import { QueryCacheProvider } from '@openland/spacex';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ActionSheetBuilder } from 'openland-mobile/components/ActionSheet';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { ZLoader } from 'openland-mobile/components/ZLoader';
import { useUserBanInfo } from 'openland-y-utils/blacklist/LocalBlackList';
import { useLocalContact } from 'openland-y-utils/contacts/LocalContacts';
import { showDeleteChatConfirmation } from 'openland-mobile/pages/main/modals/deleteChatModal';
import Toast from 'openland-mobile/components/Toast';
import { View } from 'react-native';
import { t } from 'openland-mobile/text/useText';

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
    const banInfo = useUserBanInfo(user.id, user.isBanned, user.isMeBanned);
    const isBanned = banInfo.isBanned || banInfo.isMeBanned;
    const { isContact } = useLocalContact(user.id, user.inContacts);
    const isSavedMessages = item.flexibleId === messenger.engine.user.id;
    const muted = item.isMuted;

    if (!isSavedMessages) {
        builder.action(
            muted ? t('notificationsUnmute', 'Unmute notifications') : t('notificationsMute', 'Mute notifications'),
            () => {
                client.mutateRoomSettingsUpdate({ roomId: item.key, settings: { mute: !muted } });
                client.refetchRoomChat({ id: item.key });
            }, false, muted ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-off-24.png'));
    }

    if (!isBanned) {
        builder.action(t('sharedMediaTitle', 'Media, files, links'), () => {
            messenger.history.navigationManager.push('SharedMedia', { chatId: item.key });
        }, false, require('assets/ic-attach-24.png'));
    }

    const deleteChat = false;

    if (!isSavedMessages) {
        builder.action(
            isContact ? t('contactsRemove', 'Remove from contacts') : t('contactsSave', 'Save to contacts'),
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
        if (deleteChat) {
            builder.action(
                t('conversationDelete', 'Delete conversation'),
                () => showDeleteChatConfirmation(item.key, user.name),
                false,
                require('assets/ic-delete-24.png'),
            );
        }
    }

    return builder.renderItems(ctx);
});

export const showDialogMenu = (item: DialogDataSourceItem) => {
    const builder = new ActionSheetBuilder();
    const messenger = getMessenger();
    const client = messenger.engine.client;
    const isSavedMessages = item.flexibleId === messenger.engine.user.id;

    builder.title(isSavedMessages ? t('savedMessages', 'Saved messages') : item.title, 'left');

    if (item.kind !== 'PRIVATE') {
        const muted = item.isMuted;

        builder.action(
            muted ? t('notificationsUnmute', 'Unmute notifications') : t('notificationsMute', 'Mute notifications'), () => {
                client.mutateRoomSettingsUpdate({ roomId: item.key, settings: { mute: !muted } });
                client.refetchRoomChat({ id: item.key });
            }, false, muted ? require('assets/ic-notifications-24.png') : require('assets/ic-notifications-off-24.png'));

        builder.action(t('sharedMediaTitle', 'Media, files, links'), () => {
            messenger.history.navigationManager.push('SharedMedia', { chatId: item.key });
        }, false, require('assets/ic-attach-24.png'));

        builder.action(t('leaveGroup', 'Leave group'), () => {
            Alert.builder()
                .title(item.isChannel
                    ? t('leaveChannelQuestion', `Leave channel?`)
                    : t('leaveGroupQuestion', `Leave group?`))
                .message(
                    item.isPremium
                        ? t('leaveChatPremiumDescription', 'Leaving the group only removes it from your chat list. To cancel the associated subscription, visit Subscriptions section in your Account tab and cancel it from there.')
                        : t('leaveChatDescription', 'You may not be able to join it again'),
                )
                .button(t('cancel', 'Cancel'), 'cancel')
                .action(t('leave', 'Leave'), 'destructive', async () => {
                    await client.mutateRoomLeave({ roomId: item.key });
                    await client.refetchRoomChat({ id: item.key });
                })
                .show();
        }, false, require('assets/ic-leave-24.png'));
    } else {
        builder.view((ctx: ZModalController) => (
            <React.Suspense fallback={<View style={{ height: 48 }}><ZLoader /></View>}>
                <QueryCacheProvider>
                    <DialogMenuPrivate ctx={ctx} item={item} />
                </QueryCacheProvider>
            </React.Suspense>
        ));
    }

    builder.show(true);
};
