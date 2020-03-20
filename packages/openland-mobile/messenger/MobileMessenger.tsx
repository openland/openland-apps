import * as React from 'react';
import ShareFile from 'react-native-share';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DataSourceMessageItem, DataSourceDateItem, ConversationEngine, DataSourceNewDividerItem, convertPartialMessage } from 'openland-engines/messenger/ConversationEngine';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';
import { showPictureModal } from '../components/modal/ZPictureModal';
import { AsyncMessageView } from './components/AsyncMessageView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { Clipboard, Platform, View, TouchableOpacity, Image, Share } from 'react-native';
import { ActionSheetBuilder } from '../components/ActionSheet';
import { SRouting } from 'react-native-s/SRouting';
import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { DialogItemViewAsync } from './components/DialogItemViewAsync';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, MessageReactionType, SharedMedia_sharedMedia_edges_node_message_GeneralMessage } from 'openland-api/spacex.types';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { reactionsImagesMap } from './components/AsyncMessageReactionsView';
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
import { AsyncSharedLink } from 'openland-mobile/pages/shared-media/AsyncSharedLink';
import { AsyncSharedDocument } from 'openland-mobile/pages/shared-media/AsyncSharedDocument';
import { AsyncSharedMediaRow } from 'openland-mobile/pages/shared-media/AsyncSharedMediaRow';
import { AsyncSharedDate } from 'openland-mobile/pages/shared-media/AsyncSharedDate';
import { DownloadManagerInstance } from 'openland-mobile/files/DownloadManager';

const SortedReactions = [
    MessageReactionType.LIKE,
    MessageReactionType.THUMB_UP,
    MessageReactionType.JOY,
    MessageReactionType.SCREAM,
    MessageReactionType.CRYING,
    MessageReactionType.ANGRY
];

export const forward = (conversationEngine: ConversationEngine, messages: DataSourceMessageItem[]) => {

    getMessenger().history.navigationManager.push('HomeDialogs', {
        title: 'Forward to', pressCallback: (id: string) => {
            getMessenger().engine.forward(messages, id);
            const userId = conversationEngine.user && conversationEngine.user.id;
            if (conversationEngine.conversationId === id || id === userId) {
                getMessenger().history.navigationManager.pushAndReset('Conversation', { id });
            } else {
                getMessenger().history.navigationManager.pushAndRemove('Conversation', { id });
            }
        }
    });
};

export class MobileMessenger {
    readonly engine: MessengerEngine;
    readonly history: SRouting;
    readonly notifications: ASDataView<NotificationsDataSourceItem>;

    private dialogs?: ASDataView<DialogDataSourceItem>;
    private prevDialogsCb: (index: number) => void = () => {/* noop */ };
    private readonly conversations = new Map<string, ASDataView<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>>();
    private readonly sharedMedias = new Map<string, Map<string, ASDataView<SharedMediaDataSourceItem>>>();

    constructor(engine: MessengerEngine, history: SRouting) {
        this.engine = engine;
        this.history = history;

        this.notifications = new ASDataView(
            engine.notificationCenter.dataSource,
            item => <NotificationCenterItemAsync item={item} />
        );
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
                item => <DialogItemViewAsync item={item} onPress={this.handleDialogClick} onDiscoverPress={onDiscoverPress} showDiscover={showDiscover} />
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
                        return <AsyncServiceMessage message={item} onUserPress={this.handleUserClick} onGroupPress={this.handleDialogClick} onOrganizationPress={this.handleOrganizationClick} />;
                    } else {
                        return <AsyncMessageView conversationId={id} message={item} engine={eng} onUserPress={this.handleMessageUserClick} onGroupPress={this.handleMessageGroupClick} onOrganizationPress={this.handleMessageOrganizationClick} onDocumentPress={this.handleDocumentClick} onMediaPress={this.handleMessageMediaClick} onMessageLongPress={this.handleMessageLongPress} onMessagePress={this.handleMessagePress} onMessageDoublePress={this.handleMessageDoublePress} onCommentsPress={this.handleCommentsClick} onReplyPress={this.handleReplyClick} onReactionsPress={this.handleReactionsClick} />;
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

    handleSharedLongPress = ({ filePath, message, chatId }: { chatId: string, filePath?: string, message: SharedMedia_sharedMedia_edges_node_message_GeneralMessage, }) => {
        let builder = new ActionSheetBuilder();

        builder.action('Forward', () => {
            let conversation: ConversationEngine = this.engine.getConversation(chatId);
            const fullMessage = convertPartialMessage(message, chatId, this.engine);
            forward(conversation, [fullMessage]);
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
                    startLoader();
                    await DownloadManagerInstance.init(attachment.fileId, null);
                    path = await DownloadManagerInstance.getFilePathWithRealName(attachment.fileId, null, attachment.fileMetadata.name || 'file');
                    stopLoader();
                }
                ShareFile.open({ url: 'file://' + path });
            }
        }, false, require('assets/ic-share-24.png'));

        builder.show(true);
    }

    renderSharedMediaItem = (chatId: string, wrapperWidth: number) => (item: SharedMediaDataSourceItem) => {
        if (item.type === SharedMediaItemType.MEDIA) {
            return <AsyncSharedMediaRow item={item} chatId={chatId} wrapperWidth={wrapperWidth} onLongPress={this.handleSharedLongPress} />;
        }

        if (item.type === SharedMediaItemType.LINK) {
            return <AsyncSharedLink item={item} chatId={chatId} onLongPress={this.handleSharedLongPress} />;
        }

        if (item.type === SharedMediaItemType.DOCUMENT) {
            return <AsyncSharedDocument item={item} chatId={chatId} onLongPress={this.handleSharedLongPress} />;
        }

        return <AsyncSharedDate item={item} />;
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

    handleMessageMediaClick = (message: DataSourceMessageItem) => (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
            return;
        }
        return this.handleMediaClick(fileMeta, event, radius, senderName, date);
    }

    handleMediaClick = (fileMeta: { imageWidth: number, imageHeight: number }, event: { path: string } & ASPressEvent, radius?: number, senderName?: string, date?: number) => {
        showPictureModal({
            title: senderName,
            subtitle: date ? formatDateTime(date) : undefined,
            url: (Platform.OS === 'android' ? 'file://' : '') + event.path,
            width: fileMeta.imageWidth,
            height: fileMeta.imageHeight,
            isGif: false,
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

    handleCommentsClick = (message: DataSourceMessageItem) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
            return;
        }
        this.history.navigationManager.push('Message', { messageId: message.id });
    }

    handleReplyClick = (message: DataSourceMessageItem, quotedMessage: DataSourceMessageItem) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
            return;
        }
        this.history.navigationManager.push('Message', { messageId: quotedMessage.id });
    }

    handleDocumentClick = (document: DataSourceMessageItem) => {
        let attach = document.attachments!.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        // { config: { uuid, name, size }
        // this.history.navigationManager.push('FilePreview', { config: { uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size } });

        showFileModal({ uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size });
    }

    handleDialogClick = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }
    handleUserClick = (id: string) => {
        this.history.navigationManager.push('ProfileUser', { id });
    }
    handleOrganizationClick = (id: string) => {
        this.history.navigationManager.push('ProfileOrganization', { id });
    }
    handleMessageUserClick = (message: DataSourceMessageItem) => (id: string) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
            return;
        }
        return this.handleUserClick(id);
    }
    handleMessageGroupClick = (message: DataSourceMessageItem) => (id: string) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
            return;
        }
        return this.handleDialogClick(id);
    }
    handleMessageOrganizationClick = (message: DataSourceMessageItem) => (id: string) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
            return;
        }
        return this.handleOrganizationClick(id);
    }
    handleConversationClick = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }

    handleReactionSetUnset = (message: DataSourceMessageItem, r: MessageReactionType, doubleTap?: boolean) => {
        try {
            const conversation: ConversationEngine = this.engine.getConversation(message.chatId);

            let remove = message.reactions.filter(userReaction => userReaction.user.id === this.engine.user.id && userReaction.reaction === r).length > 0;
            if (remove) {
                // optimistic unset reaction
                conversation.unsetReaction(message.key, r);

                this.engine.client.mutateMessageUnsetReaction({ messageId: message.id!, reaction: r });
            } else {
                // optimistic set reaction
                conversation.setReaction(message.key, r);

                trackEvent('reaction_sent', { reaction_type: r.toLowerCase(), double_tap: doubleTap ? 'yes' : 'not' });
                this.engine.client.mutateMessageSetReaction({ messageId: message.id!, reaction: r });
            }
        } catch (e) {
            Alert.alert(e.message);
        }
    }

    private useSelectionMode = (message: DataSourceMessageItem): [boolean, Function] => {
        let conversation: ConversationEngine = this.engine.getConversation(message.chatId);
        const state = conversation.messagesActionsStateEngine.getState();
        return [state.action === 'select', () => conversation.messagesActionsStateEngine.selectToggle(message)];
    }

    private handleMessagePress = (message: DataSourceMessageItem) => {
        const [isSelecting, toogleSelect] = this.useSelectionMode(message);
        if (isSelecting) {
            toogleSelect();
        }
    }

    private handleMessageLongPress = (message: DataSourceMessageItem) => {
        let conversation: ConversationEngine = this.engine.getConversation(message.chatId);
        let builder = new ActionSheetBuilder();

        if (message.isSending) {
            if (message.text) {
                builder.action('Copy', () => {
                    Clipboard.setString(message.text!!);
                }, false, require('assets/ic-copy-24.png'));

                builder.show(true);
            }

            return;
        }
        const state = conversation.messagesActionsStateEngine.getState();
        const isSelecting = state.action === 'select';

        if (isSelecting) {
            return;
        }

        builder.view((ctx: ZModalController) => (
            <View flexGrow={1} justifyContent="space-evenly" alignItems="center" flexDirection="row" height={52} paddingHorizontal={10}>
                {SortedReactions.map(r => (
                    <TouchableOpacity
                        onPress={() => {
                            ctx.hide();
                            this.handleReactionSetUnset(message, r);
                        }}
                    >
                        <View style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={reactionsImagesMap[r]} style={{ width: 36, height: 36 }} />
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        ));

        const hideSelect = state.action && state.action !== 'select';
        if (!hideSelect) {
            builder.action('Select', () => {
                conversation.messagesActionsStateEngine.selectToggle(message);
            }, false, require('assets/ic-select-24.png'));
        }

        if (conversation.canSendMessage) {
            builder.action('Reply', () => {
                conversation.messagesActionsStateEngine.reply(message);
            }, false, require('assets/ic-reply-24.png'));
        }

        builder.action('Forward', () => {
            forward(conversation, [message]);
        }, false, require('assets/ic-forward-24.png'));

        builder.action('Comment', () => {
            this.history.navigationManager.push('Message', { messageId: message.id });
        }, false, require('assets/ic-message-24.png'));

        if (message.text) {
            builder.action('Copy', () => {
                Clipboard.setString(message.text!!);
            }, false, require('assets/ic-copy-24.png'));
        }

        if (conversation.canPin) {
            builder.action('Pin', async () => {
                startLoader();
                try {
                    await this.engine.client.mutatePinMessage({ chatId: message.chatId, messageId: message.id! });
                } finally {
                    stopLoader();
                }
            }, false, require('assets/ic-pin-24.png'));
        }

        if (message.text) {
            if (message.senderId === this.engine.user.id) {
                builder.action('Edit', () => {
                    conversation.messagesActionsStateEngine.edit(message);
                }, false, require('assets/ic-edit-24.png'));
            }
        }

        if (message.senderId === this.engine.user.id || SUPER_ADMIN) {
            builder.action('Delete', async () => {
                try {
                    Alert.builder()
                        .title('Delete message?')
                        .message('The message will be deleted for everyone. This cannot be undone')
                        .button('Cancel', 'cancel')
                        .action('Delete', 'destructive', async () => {
                            await this.engine.client.mutateRoomDeleteMessage({ messageId: message.id! });
                        }).show();
                } catch (e) {
                    Alert.alert(e.message);
                }
            }, false, require('assets/ic-delete-24.png'));
        }

        builder.show(true);
    }

    private handleMessageDoublePress = (message: DataSourceMessageItem) => {
        const [isSelecting] = this.useSelectionMode(message);
        if (isSelecting) {
            return;
        }
        ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });

        this.handleReactionSetUnset(message, MessageReactionType.LIKE, true);
    }

    private handleReactionsClick = (message: DataSourceMessageItem) => {
        if (message.reactions.length > 0) {
            showReactionsList(message.reactions);
        }
    }
}