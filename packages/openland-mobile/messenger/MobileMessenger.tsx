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
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, MessageReactionType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage, Message_message, CommentSubscriptionType } from 'openland-api/spacex.types';
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
import { ChatMessagesActions, MessagesAction } from 'openland-y-utils/MessagesActionsState';
import { AsyncSharedItem } from 'openland-mobile/pages/shared-media/AsyncSharedItem';
import { useMessagesActionsForward } from 'openland-y-utils/MessagesActionsState';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { NavigationManager } from 'react-native-s/navigation/NavigationManager';
import { ReactionsPicker } from './components/ReactionsPicker';

export const useForward = (selectedFrom: string) => {
    const messenger = getMessenger().engine;
    const conversationEngine = messenger.getConversation(selectedFrom);
    const { prepareForward, forward } = useMessagesActionsForward({ sourceId: selectedFrom });

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
                item => <DialogItemViewAsync item={item} onPress={this.handleDialogPress} onLongPress={this.handleDialogLongPress} onDiscoverPress={onDiscoverPress} showDiscover={showDiscover} />
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
                        return <AsyncMessageView conversationId={id} message={item} engine={eng} onUserPress={this.handleUserPress} onGroupPress={this.handleGroupPress} onOrganizationPress={this.handleOrganizationPress} onHashtagPress={this.handleHashtagPress} onDocumentPress={this.handleDocumentPress} onMediaPress={this.handleMediaPress} onMessageLongPress={this.handleMessageLongPress} onMessageDoublePress={this.handleMessageDoublePress} onCommentsPress={this.handleCommentsPress} onReplyPress={this.handleReplyPress} onReactionsPress={this.handleReactionsPress} />;
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
        const engine = this.engine.getConversation(id).getSharedMedia(type);
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

    handleDocumentPress = (document: DataSourceMessageItem) => {
        let attach = document.attachments!.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        // { config: { uuid, name, size }
        // this.history.navigationManager.push('FilePreview', { config: { uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size } });

        showFileModal({ uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size });
    }

    handleDialogPress = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }

    handleMessageSourcePress = (chatId: string) => {
        const state = this.routerSuitable.getState().history;

        if (state.length <= 1 || (state[state.length - 2].route !== 'Conversation' && state[state.length - 2].params?.id !== chatId)) {
            this.routerSuitable.push('Conversation', { id: chatId });
        } else {
            this.routerSuitable.pop();
        }
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

    handleMessagePageMenuPress = (
        message: Message_message,
        isSubscribed: boolean,
        actions: {
            reply: ChatMessagesActions['reply'],
            edit: ChatMessagesActions['edit'],
            forward: (messages: DataSourceMessageItem[]) => void,
        }
    ) => {
        if (!message.source || message.source.__typename !== 'MessageSourceChat') {
            return;
        }

        const convertedMessage = convertMessage(message, message.source.chat.id, this.engine);
        const conversation: ConversationEngine = this.engine.getConversation(convertedMessage.chatId);
        const builder = new ActionSheetBuilder();
        const { forward } = actions;

        const role = conversation.role;

        builder.view((ctx: ZModalController) => (
            <ReactionsPicker
                reactionCounters={convertedMessage.reactionCounters}
                onPress={(reaction) => {
                    ctx.hide();
                    this.handleReactionSetUnset(convertedMessage, reaction);
                }}
            />
        ));

        builder.action(isSubscribed ? 'Unfollow thread' : 'Follow thread', async () => {
            const loader = Toast.loader();
            loader.show();
            try {
                if (isSubscribed) {
                    await this.engine.client.mutateUnSubscribeFromComments({ peerId: message.id });
                } else {
                    await this.engine.client.mutateSubscribeToComments({ peerId: message.id, type: CommentSubscriptionType.ALL });
                }
                Toast.showSuccess(isSubscribed ? 'Unfollowed' : 'Followed');
            } catch (e) {
                console.warn(e);
            } finally {
                loader.hide();
            }
        }, false, isSubscribed ? require('assets/ic-follow-off-24.png') : require('assets/ic-follow-24.png'));

        // if (conversation.canSendMessage) {
        //     builder.action('Reply', () => {
        //                 reply(convertedMessage);
        //     }, false, require('assets/ic-reply-24.png'));
        // }

        builder.action('Forward', () => {
            forward([convertedMessage]);
        }, false, require('assets/ic-forward-24.png'));

        if (convertedMessage.text) {
            builder.action('Copy', () => {
                Clipboard.setString(convertedMessage.text!!);
                Toast.showCopied();
            }, false, require('assets/ic-copy-24.png'));
        }

        if (conversation.canPin && convertedMessage.id) {
            const toUnpin = conversation.pinId && conversation.pinId === convertedMessage.id;

            builder.action(toUnpin ? 'Unpin' : 'Pin', async () => {
                const loader = Toast.loader();
                loader.show();
                try {
                    if (toUnpin) {
                        await this.engine.client.mutateUnpinMessage({ chatId: convertedMessage.chatId });
                    } else {
                        await this.engine.client.mutatePinMessage({ chatId: convertedMessage.chatId, messageId: convertedMessage.id! });
                    }
                    Toast.showSuccess(toUnpin ? 'Unpinned' : 'Pinned');
                } finally {
                    loader.hide();
                }
            }, false, toUnpin ? require('assets/ic-pin-off-24.png') : require('assets/ic-pin-24.png'));
        }

        // if (convertedMessage.text) {
        //     let hasPurchase = convertedMessage.attachments && convertedMessage.attachments.some(a => a.__typename === 'MessageAttachmentPurchase');
        //     if (convertedMessage.sender.id === this.engine.user.id && !hasPurchase) {
        //         builder.action('Edit', () => {
        //                     edit(convertedMessage);
        //         }, false, require('assets/ic-edit-24.png'));
        //     }
        // }

        if (message.sender.id === this.engine.user.id || SUPER_ADMIN || role === 'ADMIN' || role === 'OWNER') {
            builder.action('Delete', () => {
                this.handleDeleteMessage(message.id, () => {
                    this.routerSuitable.pop();
                });
            }, false, require('assets/ic-delete-24.png'));
        }

        builder.show(true);
    }

    private handleDialogLongPress = (id: string, item: DialogDataSourceItem, theme: ThemeGlobal) => {
        // do not show menu for Saved messages
        if (item.flexibleId === this.engine.user.id) {
            return;
        }

        const builder = new ActionSheetBuilder();
        const muted = item.isMuted;

        builder.view((ctx: ZModalController) => (
            <LinearGradient
                colors={[theme.gradient0to100Start, theme.gradient0to100End]}
                marginBottom={8}
                paddingBottom={8}
            >
                <ZListItem
                    text={item.title}
                    leftAvatar={{ photo: item.photo, id: item.key, title: item.title }}
                />
            </LinearGradient>
        ));

        if (item.messageId && item.unread > 0) {
            builder.action('Mark as read', () => {
                this.engine.client.mutateRoomRead({ id: item.key, mid: item.messageId! });
            }, false, require('assets/ic-unread-off-24.png'));
        }

        const notificationsTitle = `${muted ? 'Unmute' : 'Mute'} notifications`;
        const notificationsIcon = muted
            ? require('assets/ic-notifications-24.png')
            : require('assets/ic-notifications-off-24.png');
        builder.action(notificationsTitle, () => {
            this.engine.client.mutateRoomSettingsUpdate({ roomId: item.key, settings: { mute: !muted } });
            this.engine.client.refetchRoomTiny({ id: item.key });
        }, false, notificationsIcon);

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
            builder.action('Select', () => {
                toggleSelect(message);
            }, false, require('assets/ic-select-24.png'));
        }

        if (conversation.canSendMessage) {
            builder.action('Reply', () => {
                reply(message);
            }, false, require('assets/ic-reply-24.png'));
        }

        builder.action('Forward', () => {
            forward([message]);
        }, false, require('assets/ic-forward-24.png'));

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
}