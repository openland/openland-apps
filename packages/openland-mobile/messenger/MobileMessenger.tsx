import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DataSourceMessageItem, DataSourceDateItem, ConversationEngine, DataSourceNewDividerItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';
import { showPictureModal } from '../components/modal/ZPictureModal';
import { AsyncMessageView } from './components/AsyncMessageView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { Clipboard, Platform, View, TouchableOpacity, Image } from 'react-native';
import { ActionSheetBuilder } from '../components/ActionSheet';
import { SRouting } from 'react-native-s/SRouting';
import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import Alert from 'openland-mobile/components/AlertBlanket';
import { DialogItemViewAsync } from './components/DialogItemViewAsync';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile, MessageReactionType } from 'openland-api/Types';
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
            getMessenger().engine.getConversation(id).messagesActionsStateEngine.forward(messages, conversationEngine.messagesActionsStateEngine);
            if (conversationEngine.conversationId === id) {
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
    readonly dialogs: ASDataView<DialogDataSourceItem>;
    readonly notifications: ASDataView<NotificationsDataSourceItem>;
    private readonly conversations = new Map<string, ASDataView<DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem>>();

    constructor(engine: MessengerEngine, history: SRouting) {
        this.engine = engine;
        this.history = history;
        this.dialogs = new ASDataView(engine.dialogList.dataSource, (item) => {
            return (
                <DialogItemViewAsync item={item} onPress={this.handleDialogClick} />
            );
        });

        this.notifications = new ASDataView(engine.notificationCenter.dataSource, (item) => {
            return (
                <NotificationCenterItemAsync item={item} />
            );
        });
    }

    getConversation(id: string) {
        if (!this.conversations.has(id)) {
            let eng = this.engine.getConversation(id);
            this.conversations.set(id, new ASDataView(eng.dataSource, (item) => {
                if (item.type === 'message') {
                    if (item.isService) {
                        return <AsyncServiceMessage message={item} onUserPress={this.handleUserClick} onGroupPress={this.handleGroupClick} />;
                    } else {
                        return <AsyncMessageView message={item} engine={eng} onUserPress={this.handleUserClick} onGroupPress={this.handleGroupClick} onDocumentPress={this.handleDocumentClick} onMediaPress={this.handleMediaClick} onMessageLongPress={this.handleMessageLongPress} onMessageDoublePress={this.handleMessageDoublePress} onCommentsPress={this.handleCommentsClick} onReactionsPress={this.handleReactionsClick} />;
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
        this.history.navigationManager.push('MessageComments', { messageId: message.id });
    }

    handleDocumentClick = (document: DataSourceMessageItem) => {
        let attach = document.attachments!.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        // { config: { uuid, name, size }
        this.history.navigationManager.push('FilePreview', { config: { uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size } });
    }

    handleDialogClick = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }
    handleUserClick = (id: string) => {
        this.history.navigationManager.push('ProfileUser', { id });
    }
    handleGroupClick = (id: string) => {
        this.history.navigationManager.push('ProfileGroup', { id });
    }
    handleConversationClick = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }

    handleReactionSetUnset = (message: DataSourceMessageItem, r: MessageReactionType, doubleTap?: boolean) => {
        try {
            let remove = message.reactions.filter(userReaction => userReaction.user.id === this.engine.user.id && userReaction.reaction === r).length > 0;
            if (remove) {
                this.engine.client.mutateMessageUnsetReaction({ messageId: message.id!, reaction: r });
            } else {
                trackEvent('reaction_sent', { reaction_type: r.toLowerCase(), double_tap: doubleTap ? 'yes' : 'not' });

                this.engine.client.mutateMessageSetReaction({ messageId: message.id!, reaction: r });
            }
        } catch (e) {
            Alert.alert(e.message);
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

        builder.action('Select', () => {
            conversation.messagesActionsStateEngine.selectToggle(message);
        }, false, require('assets/ic-select-24.png'));

        if (conversation.canSendMessage) {
            builder.action('Reply', () => {
                conversation.messagesActionsStateEngine.reply(message);
            }, false, require('assets/ic-reply-24.png'));
        }

        builder.action('Forward', () => {
            forward(conversation, [message]);
        }, false, require('assets/ic-forward-24.png'));

        builder.action('Comment', () => {
            this.history.navigationManager.push('MessageComments', { messageId: message.id });
        }, false, require('assets/ic-chat-24.png'));

        if (message.text) {
            if (message.senderId === this.engine.user.id) {
                builder.action('Edit', () => {
                    conversation.messagesActionsStateEngine.edit(message);
                }, false, require('assets/ic-edit-24.png'));
            }

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

        if (message.senderId === this.engine.user.id || SUPER_ADMIN) {
            builder.action('Delete', async () => {
                try {
                    Alert.builder()
                        .title('Delete message')
                        .message('Delete this message for everyone? This cannot be undone.')
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
        this.handleReactionSetUnset(message, MessageReactionType.LIKE, true);
    }

    private handleReactionsClick = (message: DataSourceMessageItem) => {
        if (message.reactions.length > 0) {
            showReactionsList(message.reactions);
        }
    }
}