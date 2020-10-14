import * as React from 'react';
import ShareFile from 'react-native-share';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DataSourceMessageItem, DataSourceDateItem, ConversationEngine, DataSourceNewDividerItem, convertPartialMessage, convertMessage } from 'openland-engines/messenger/ConversationEngine';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';
import { showPictureModal } from '../components/modal/ZPictureModal';
import { AsyncMessageView } from './components/AsyncMessageView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { Clipboard, Platform, Share } from 'react-native';
import { ActionSheetBuilder } from '../components/ActionSheet';
import { SRouting } from 'react-native-s/SRouting';
import Toast from 'openland-mobile/components/Toast';
import Alert from 'openland-mobile/components/AlertBlanket';
import { DialogItemViewAsync } from './components/DialogItemViewAsync';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, MessageReactionType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage, Message_message } from 'openland-api/spacex.types';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { showReactionsList } from 'openland-mobile/components/message/showReactionsList';
import { formatDateTime } from 'openland-y-utils/formatTime';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { NotificationCenterItemAsync } from 'openland-mobile/notificationCenter/NotificationCenterItemAsync';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { trackEvent } from 'openland-mobile/analytics';
import { AsyncNewMessageDivider } from './components/AsyncNewMessageDivider';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';
import { AsyncServiceMessage } from './components/AsyncServiceMessage';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { showFileModal } from 'openland-mobile/components/file/showFileModal';
import { SharedMediaItemType, SharedMediaDataSourceItem } from 'openland-engines/messenger/SharedMediaEngine';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';
import { showCheckLock } from 'openland-mobile/pages/main/modals/PayConfirm';
import { showDonationReactionWarning } from './components/showDonationReactionWarning';
import UUID from 'uuid/v4';
import { ChatMessagesActions, MessagesAction, useChatMessagesActionsMethods } from 'openland-y-utils/MessagesActionsState';
import { AsyncSharedItem } from 'openland-mobile/pages/shared-media/AsyncSharedItem';
import { useMessagesActionsForward } from 'openland-y-utils/MessagesActionsState';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { ReactionsPicker } from './components/ReactionsPicker';
import { NotificationCenterHandlers } from 'openland-mobile/notificationCenter/NotificationCenterHandlers';

export const useForward = (sourceId: string, disableSource?: boolean) => {
    const messenger = getMessenger().engine;
    const conversationEngine = messenger.getConversation(sourceId);
    const { prepareForward, forward } = useMessagesActionsForward(sourceId);

    return (messages?: DataSourceMessageItem[]) => {
        getMessenger().history.navigationManager.push('HomeDialogs', {
            title: 'Forward to', pressCallback: async (id: string) => {
                const room = await messenger.client.queryRoomChat({ id });
                if (room.room && room.room.__typename === 'PrivateRoom' && messenger.user.id === room.room.user.id) {
                    let forwardIds = prepareForward({ targetId: id, messages }).map(e => e.id!);
                    await messenger.client.mutateSendMessage({
                        repeatKey: UUID(),
                        chatId: room.room.id,
                        replyMessages: forwardIds,
                    });
                    Toast.success({ duration: 1000 }).show();
                    getMessenger().history.navigationManager.pop();
                } else {
                    if (disableSource && room.room && room.room.id === sourceId) {
                        Toast.failure({
                            text: 'Replies are disabled for this chat',
                            duration: 1000
                        }).show();
                        getMessenger().history.navigationManager.pop();
                        return;
                    }
                    forward({ targetId: id, messages });
                    const userId = conversationEngine.user && conversationEngine.user.id;
                    if (conversationEngine.conversationId === id || id === userId) {
                        getMessenger().history.navigationManager.pushAndReset('Conversation', { id });
                    } else {
                        getMessenger().history.navigationManager.pushAndRemove('Conversation', { id });
                    }
                }
            }
        });
    };
};

export class MobileMessenger {
    readonly engine: MessengerEngine;
    readonly history: SRouting;
    readonly notifications: ASDataView<NotificationsDataSourceItem>;

    private dialogs?: ASDataView<DialogDataSourceItem>;
    private prevDialogsCb: (index: number) => void = () => {/* noop */ };
    private readonly conversations = new Map<string, ASDataView<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>>();
    private readonly sharedMedias = new Map<string, Map<string, ASDataView<SharedMediaDataSourceItem>>>();
    private customHistory: SRouting | null = null;

    constructor(engine: MessengerEngine, history: SRouting) {
        this.engine = engine;
        this.history = history;

        this.notifications = new ASDataView(
            engine.notificationCenter.dataSource,
            item => <NotificationCenterItemAsync item={item} />
        );
    }

    // return right-side router on tablets if exists, otherwise default router
    private get routerSuitable(): NavigationManager {
        return this.customHistory?.navigationManager || this.history.navigationManager;
    }

    setRouterSuitable = (r: SRouting | null) => {
        this.customHistory = r;
    }

    getDialogs = (setTab: (index: number) => void) => {
        if (!this.dialogs || this.prevDialogsCb !== setTab) {
            let onDiscoverPress = () => {
                setTab(0);
            };
            let showDiscover = (key: string) => {
                let { dataSource } = this.engine.dialogList;
                let lastItem = dataSource.getAt(dataSource.getSize() - 1);
                let lastKey = lastItem.key;
                return dataSource.isCompleted() && lastKey === key;
            };
            this.dialogs = new ASDataView(
                this.engine.dialogList.dataSource,
                item => <DialogItemViewAsync item={item} onPress={this.handleDialogPress} onDiscoverPress={onDiscoverPress} showDiscover={showDiscover} />
            );
        }
        this.prevDialogsCb = setTab;
        return this.dialogs;
    }

    getConversation(id: string) {
        if (!this.conversations.has(id)) {
            let eng = this.engine.getConversation(id);
            this.conversations.set(id, new ASDataView(eng.dataSource, (item) => {
                if (item.type === 'message') {
                    if (item.isService) {
                        return <AsyncServiceMessage message={item} onUserPress={this.handleUserPress} onGroupPress={this.handleGroupPress} onOrganizationPress={this.handleOrganizationPress} onHashtagPress={this.handleHashtagPress} />;
                    } else {
                        return <AsyncMessageView canReply={eng.canReply} conversationId={id} message={item} engine={eng} onUserPress={this.handleUserPress} onGroupPress={this.handleGroupPress} onOrganizationPress={this.handleOrganizationPress} onHashtagPress={this.handleHashtagPress} onDocumentPress={this.handleDocumentPress} onMediaPress={this.handleMediaPress} onMessageLongPress={this.handleMessageLongPress} onMessageDoublePress={this.handleMessageDoublePress} onCommentsPress={this.handleCommentsPress} onReplyPress={this.handleReplyPress} onReactionsPress={this.handleReactionsPress} />;
                    }
                } else if (item.type === 'date') {
                    return <AsyncDateSeparator year={item.year} month={item.month} date={item.date} />;
                } else {
                    return <AsyncNewMessageDivider />;
                }
            }));
        }
        return this.conversations.get(id)!!;
    }

    handleSharedLongPress = (forward: (messages: DataSourceMessageItem[]) => void) =>
        ({ filePath, message, chatId }: { chatId: string, filePath?: string, message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage, }) => {
            let builder = new ActionSheetBuilder();

            builder.action('Forward', () => {
                const fullMessage = convertPartialMessage(message, chatId, this.engine);
                forward([fullMessage]);
            }, false, require('assets/ic-forward-24.png'));

            builder.action('Share', async () => {
                const attachment = message.attachments[0];
                if (attachment.__typename === 'MessageRichAttachment') {
                    Share.share({ message: attachment.titleLink!! });
                } else if (attachment.__typename === 'MessageAttachmentFile') {
                    let path;
                    if (attachment.fileMetadata.isImage) {
                        path = await DownloadManagerInstance.copyFileWithNewName(filePath!!, attachment.fileMetadata.name);
                    } else {
                        const loader = Toast.loader();
                        loader.show();
                        await DownloadManagerInstance.init(attachment.fileId, null);
                        path = await DownloadManagerInstance.getFilePathWithRealName(attachment.fileId, null, attachment.fileMetadata.name || 'file');
                        loader.hide();
                    }
                    ShareFile.open({ url: 'file://' + path });
                }
            }, false, require('assets/ic-share-24.png'));

            builder.show(true);
        }

    renderSharedMediaItem = (chatId: string, wrapperWidth: number) => (item: SharedMediaDataSourceItem) => {
        return <AsyncSharedItem chatId={chatId} wrapperWidth={wrapperWidth} item={item} onLongPress={this.handleSharedLongPress} />;
    }

    getSharedMedia = (id: string, type: SharedMediaItemType, wrapperWidth: number) => {
        const key = `${type}-${wrapperWidth}`;
        const convEngine = this.engine.getConversation(id);
        const engine = convEngine.getSharedMedia(type);
        if (!this.sharedMedias.has(id)) {
            this.sharedMedias.set(
                id,
                new Map([[key, new ASDataView(engine.dataSource, this.renderSharedMediaItem(id, wrapperWidth))]])
            );
        } else if (!this.sharedMedias.get(id)!!.has(key)) {
            this.sharedMedias.get(id)!!.set(key, new ASDataView(engine.dataSource, this.renderSharedMediaItem(id, wrapperWidth)));
        }

        return this.sharedMedias.get(id)!!.get(key)!!;
    }

    destroySharedMedia = (id: string) => {
        this.engine.getConversation(id).destroySharedMedia();
        this.sharedMedias.delete(id);
    }

    handleMediaPress = (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => {
        showPictureModal({
            title: senderName,
            subtitle: date ? formatDateTime(date) : undefined,
            url: (Platform.OS === 'android' ? 'file://' : '') + event.path,
            width: fileMeta.imageWidth,
            height: fileMeta.imageHeight,
            isGif: false,
            crossFade: true,
            animate: {
                x: event.x,
                y: event.y,
                width: event.w,
                height: event.h,
                borderRadius: typeof radius !== 'undefined' ? radius : RadiusStyles.Large
            },
            ...Platform.OS === 'ios' ? {
                onBegin: () => {
                    RNAsyncConfigManager.setSuspended(event.instanceKey!!, true);
                },
                onEnd: () => {
                    RNAsyncConfigManager.setSuspended(event.instanceKey!!, false);
                }
            } : {}
        });
    }

    handleCommentsPress = (messageId: string) => {
        this.routerSuitable.push('Message', { messageId });
    }

    handleReplyPress = (quotedMessage: DataSourceMessageItem) => {
        this.routerSuitable.push('Message', { messageId: quotedMessage.id });
    }

    handleDocumentPress = (message: DataSourceMessageItem) => {
        let attach = message.attachments!.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        // { config: { uuid, name, size }
        // this.history.navigationManager.push('FilePreview', { config: { uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size } });

        showFileModal({ uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size });
    }

    handleDialogPress = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }

    handleMessageSourcePress = (chatId: string, beforePush?: () => void) => {
        const state = this.routerSuitable.getState().history;

        if (state.length > 1) {
            const prev = state[state.length - 2];

            if (prev.route === 'Conversation' && (prev.params?.id === chatId || prev.params?.flexibleId === chatId)) {
                this.routerSuitable.pop();

                return;
            }
        }

        // Sorry universe. Without it crash with exception ("penland.RNASyncListNode: Invalid number of items in section 1") sometimes
        this.resetConversation(chatId);

        this.routerSuitable.push('Conversation', { id: chatId });
    }

    handleGroupPress = (id: string) => {
        this.routerSuitable.push('Conversation', { id });
    }

    handleUserPress = (id: string) => {
        this.routerSuitable.push('ProfileUser', { id });
    }

    handleOrganizationPress = (id: string) => {
        this.routerSuitable.push('ProfileOrganization', { id });
    }

    handleHashtagPress = (hashtag?: string) => {
        this.routerSuitable.push('HomeDialogs', { searchValue: hashtag, title: hashtag });
    }

    handleReactionSetUnset = async (message: DataSourceMessageItem, reaction: MessageReactionType, doubleTap?: boolean) => {
        const donate = async () => {
            let loader = Toast.loader();
            try {
                loader.show();
                await this.engine.client.mutateMessageSetDonationReaction({ messageId: message.id! });
                loader.hide();
                Toast.success({ text: 'You’ve donated $1', duration: 1000 }).show();
            } catch (e) {
                loader.hide();
                if (this.engine.wallet.state.get().isLocked) {
                    showCheckLock({ onSuccess: () => this.history.navigationManager.push('Wallet') });
                } else {
                    Toast.failure({ text: e.message, duration: 1000 }).show();
                }

                throw e;
            }
        };
        try {
            const conversation: ConversationEngine = this.engine.getConversation(message.chatId);
            const remove = !!message.reactionCounters.find(r => r.reaction === reaction && r.setByMe);
            if (remove) {
                if (reaction === MessageReactionType.DONATE) {
                    return;
                }
                conversation.unsetReaction(message.key, reaction);

                await this.engine.client.mutateMessageUnsetReaction({ messageId: message.id!, reaction: reaction });
            } else {
                if (reaction === MessageReactionType.DONATE) {
                    try {
                        await showDonationReactionWarning();
                        try {
                            conversation.setReaction(message.key, reaction);
                            await donate();
                        } catch (e) {
                            conversation.unsetReaction(message.key, reaction);
                        }
                    } catch (e) { /* noop */ }
                } else {
                    conversation.setReaction(message.key, reaction);
                    trackEvent('reaction_sent', { reaction_type: reaction.toLowerCase(), double_tap: doubleTap ? 'yes' : 'not' });
                    await this.engine.client.mutateMessageSetReaction({ messageId: message.id!, reaction: reaction });
                }
            }
        } catch (e) {
            Alert.alert(e.message);
        }
    }

    handleDeleteMessage = (messageId: string, onDelete?: () => void) => {
        try {
            Alert.builder()
                .title('Delete message?')
                .message('The message will be deleted for everyone. This cannot be undone')
                .button('Cancel', 'cancel')
                .action('Delete', 'destructive', async () => {
                    await this.engine.client.mutateRoomDeleteMessage({ messageId });

                    if (onDelete) {
                        onDelete();
                    }
                }).show();
        } catch (e) {
            Alert.alert(e.message);
        }
    }

    handleSaveMessages = async (messageIds: string[]) => {
        const loader = Toast.loader();
        loader.show();

        const savedMessages = (await this.engine.client.queryRoomPico({ id: this.engine.user.id })).room;

        if (savedMessages) {
            await this.engine.client.mutateSendMessage({
                repeatKey: UUID(),
                replyMessages: messageIds,
                chatId: savedMessages.id,
            });

            Toast.showSuccess('Saved');
        } else {
            Toast.failure({ duration: 1000 }).show();
        }

        loader.hide();
    }

    handleMessagePageMenuPress = (
        message: Message_message,
        isSubscribed: boolean,
    ) => {
        if (!message.source || message.source.__typename !== 'MessageSourceChat') {
            return;
        }

        const chat = message.source.chat;
        const convertedMessage = convertMessage(message, chat.id, this.engine);

        const canEdit = ((chat.__typename === 'SharedRoom' && chat.canEdit) || SUPER_ADMIN) || false;
        const canPin = canEdit || (chat.__typename === 'PrivateRoom') || false;
        const canSendMessage = (chat.__typename === 'SharedRoom') ? chat.canSendMessage : (chat.__typename === 'PrivateRoom') ? !chat.user.isBot : true;
        const role = (chat.__typename === 'SharedRoom' && chat.role) || null;
        const repliesEnabled = chat.__typename === 'SharedRoom' ? chat.repliesEnabled : true;
        const isSavedMessages = chat.__typename === 'PrivateRoom' ? chat.user.id === this.engine.user.id : false;

        const builder = new ActionSheetBuilder();
        const { reply, edit, clear } = useChatMessagesActionsMethods(chat.id);
        const forward = useForward(chat.id);

        builder.view((ctx: ZModalController) => (
            <ReactionsPicker
                reactionCounters={convertedMessage.reactionCounters}
                onPress={(reaction) => {
                    ctx.hide();
                    this.handleReactionSetUnset(convertedMessage, reaction);
                }}
            />
        ));

        builder.action(
            isSubscribed ? 'Unfollow thread' : 'Follow thread',
            () => NotificationCenterHandlers.toggleSubscription(message.id, isSubscribed),
            false,
            isSubscribed ? require('assets/ic-follow-off-24.png') : require('assets/ic-follow-24.png')
        );

        if (canSendMessage && repliesEnabled) {
            builder.action('Reply', () => {
                reply(convertedMessage);

                this.handleMessageSourcePress(chat.id, () => this.resetConversation(chat.id));
            }, false, require('assets/ic-reply-24.png'));
        }

        builder.action('Forward', () => forward([convertedMessage]), false, require('assets/ic-forward-24.png'));

        if (!isSavedMessages) {
            builder.action('Save', () => this.handleSaveMessages([message.id]), false, require('assets/ic-bookmark-24.png'));
        }

        if (convertedMessage.text) {
            builder.action('Copy', () => {
                Clipboard.setString(convertedMessage.text!!);
                Toast.showCopied();
            }, false, require('assets/ic-copy-24.png'));
        }

        if (canPin && convertedMessage.id) {
            const toUnpin = chat.pinnedMessage && chat.pinnedMessage.id === convertedMessage.id;

            builder.action(toUnpin ? 'Unpin' : 'Pin', async () => {
                const loader = Toast.loader();
                loader.show();
                try {
                    if (toUnpin) {
                        await this.engine.client.mutateUnpinMessage({ chatId: chat.id });
                    } else {
                        await this.engine.client.mutatePinMessage({ chatId: chat.id, messageId: message.id });
                    }
                    Toast.showSuccess(toUnpin ? 'Unpinned' : 'Pinned');
                } finally {
                    loader.hide();
                }
            }, false, toUnpin ? require('assets/ic-pin-off-24.png') : require('assets/ic-pin-24.png'));
        }

        if (convertedMessage.text) {
            let hasPurchase = convertedMessage.attachments && convertedMessage.attachments.some(a => a.__typename === 'MessageAttachmentPurchase');
            if (convertedMessage.sender.id === this.engine.user.id && !hasPurchase) {
                builder.action('Edit', () => {
                    clear();
                    edit(convertedMessage);

                    this.handleMessageSourcePress(chat.id, () => this.resetConversation(chat.id));
                }, false, require('assets/ic-edit-24.png'));
            }
        }

        if (message.sender.id === this.engine.user.id || SUPER_ADMIN || role === 'ADMIN' || role === 'OWNER') {
            builder.action('Delete', () => {
                this.handleDeleteMessage(message.id, () => {
                    if (convertedMessage.commentsCount <= 0) {
                        this.routerSuitable.pop();
                    }
                });
            }, false, require('assets/ic-delete-24.png'));
        }

        builder.show(true);
    }

    private handleMessageLongPress = (
        message: DataSourceMessageItem,
        actions: {
            action: MessagesAction,
            reply: ChatMessagesActions['reply'],
            edit: ChatMessagesActions['edit'],
            toggleSelect: ChatMessagesActions['toggleSelect'],
            forward: (messages: DataSourceMessageItem[]) => void,
        }
    ) => {
        let conversation: ConversationEngine = this.engine.getConversation(message.chatId);
        let builder = new ActionSheetBuilder();
        let { action, reply, edit, toggleSelect, forward } = actions;

        if (message.isSending) {
            if (message.text) {
                builder.action('Copy', () => {
                    Clipboard.setString(message.text!!);
                    Toast.showCopied();
                }, false, require('assets/ic-copy-24.png'));

                builder.show(true);
            }

            return;
        }
        const role = conversation.role;

        builder.view((ctx: ZModalController) => (
            <ReactionsPicker
                reactionCounters={message.reactionCounters}
                onPress={(reaction) => {
                    ctx.hide();
                    this.handleReactionSetUnset(message, reaction);
                }}
            />
        ));

        const hideSelect = action === 'reply' || action === 'forward';
        if (!hideSelect) {
            builder.action('Select', () => toggleSelect(message), false, require('assets/ic-select-24.png'));
        }

        if (conversation.canSendMessage && conversation.canReply) {
            builder.action('Reply', () => reply(message), false, require('assets/ic-reply-24.png'));
        }

        builder.action('Forward', () => forward([message]), false, require('assets/ic-forward-24.png'));

        if (!conversation.isSavedMessage) {
            builder.action('Save', () => this.handleSaveMessages([message.id!]), false, require('assets/ic-bookmark-24.png'));
        }

        builder.action('Comment', () => {
            this.routerSuitable.push('Message', { messageId: message.id });
        }, false, require('assets/ic-message-24.png'));

        if (message.text) {
            builder.action('Copy', () => {
                Clipboard.setString(message.text!!);
                Toast.showCopied();
            }, false, require('assets/ic-copy-24.png'));
        }

        if (conversation.canPin && message.id) {
            const toUnpin = conversation.pinId && conversation.pinId === message.id;

            builder.action(toUnpin ? 'Unpin' : 'Pin', async () => {
                const loader = Toast.loader();
                loader.show();
                try {
                    if (toUnpin) {
                        await this.engine.client.mutateUnpinMessage({ chatId: message.chatId });
                    } else {
                        await this.engine.client.mutatePinMessage({ chatId: message.chatId, messageId: message.id! });
                    }
                } finally {
                    loader.hide();
                }
            }, false, toUnpin ? require('assets/ic-pin-off-24.png') : require('assets/ic-pin-24.png'));
        }

        if (message.text) {
            let hasPurchase = message.attachments && message.attachments.some(a => a.__typename === 'MessageAttachmentPurchase');
            if (message.sender.id === this.engine.user.id && !hasPurchase) {
                builder.action('Edit', () => {
                    edit(message);
                }, false, require('assets/ic-edit-24.png'));
            }
        }

        if (message.id && message.sender.id === this.engine.user.id || SUPER_ADMIN || role === 'ADMIN' || role === 'OWNER') {
            builder.action('Delete', () => {
                this.handleDeleteMessage(message.id!);
            }, false, require('assets/ic-delete-24.png'));
        }

        builder.show(true);
    }

    private handleMessageDoublePress = (message: DataSourceMessageItem) => {
        ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });

        this.handleReactionSetUnset(message, MessageReactionType.LIKE, true);
    }

    private handleReactionsPress = (message: DataSourceMessageItem) => {
        if (message.reactionCounters.length > 0 && message.id) {
            showReactionsList(message.id);
        }
    }

    private resetConversation(id: string) {
        if (this.conversations.has(id)) {
            this.engine.removeConversation(id);
            this.conversations.delete(id);
        }
    }
}