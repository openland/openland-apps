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
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { DialogItemViewAsync } from './components/DialogItemViewAsync';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { reactionsImagesMap, defaultReactions, reactionMap } from './components/AsyncMessageReactionsView';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { showReactionsList } from 'openland-mobile/components/message/showReactionsList';
import { formatDateTime } from 'openland-mobile/utils/formatTime';
import { SUPER_ADMIN } from 'openland-mobile/pages/Init';
import { NotificationCenterItemAsync } from 'openland-mobile/notificationCenter/NotificationCenterItemAsync';
import { NotificationsDataSourceItem } from 'openland-engines/NotificationCenterEngine';
import { trackEvent } from 'openland-mobile/analytics';
import { AsyncNewMessageDivider } from './components/AsyncNewMessageDivider';

export const forward = (conversationEngine: ConversationEngine, messages: DataSourceMessageItem[]) => {
    let actionsState = conversationEngine.messagesActionsState;

    actionsState.clear();
    actionsState.setState({ messages });

    getMessenger().history.navigationManager.push('HomeDialogs', {
        title: 'Forward to', pressCallback: (id: string) => {
            let selectedActionsState = getMessenger().engine.getConversation(id).messagesActionsState;
            let stateToForward = actionsState.getState();

            actionsState.clear();

            selectedActionsState.setState({ ...stateToForward, action: 'forward' });

            if (conversationEngine.conversationId === id) {
                getMessenger().history.navigationManager.pushAndReset('Conversation', { id });
            } else {
                getMessenger().history.navigationManager.pushAndRemove('Conversation', { id });
            }
        }
    });
}

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
                    return (<AsyncMessageView navigationManager={this.history.navigationManager} message={item} engine={eng} onUserPress={this.handleUserClick} onGroupPress={this.handleGroupClick} onDocumentPress={this.handleDocumentClick} onMediaPress={this.handleMediaClick} onMessageLongPress={this.handleMessageLongPress} onMessageDoublePress={this.handleMessageDoublePress} onReactionPress={this.handleReactionSetUnset} onCommentsPress={this.handleCommentsClick} onReactionsPress={this.handleReactionsClick} />);
                } else if (item.type === 'date') {
                    return (<AsyncDateSeparator year={item.year} month={item.month} date={item.date} />);
                } else {
                    return <AsyncNewMessageDivider />
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
                borderRadius: typeof radius !== 'undefined' ? radius : 16
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

    handleCommentsClick = (message: DataSourceMessageItem, chatId: string) => {
        this.history.navigationManager.push('MessageComments', { messageId: message.id, chatId });
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

    handleReactionSetUnset = (message: DataSourceMessageItem, r: string) => {
        startLoader();
        try {
            let remove = message.reactions && message.reactions.filter(userReaction => userReaction.user.id === this.engine.user.id && userReaction.reaction === r).length > 0;
            if (remove) {
                this.engine.client.mutateMessageUnsetReaction({ messageId: message.id!, reaction: reactionMap[r] });
            } else {
                trackEvent('reaction_sent', { reaction_type: r.toLowerCase(), double_tap: 'not' });

                this.engine.client.mutateMessageSetReaction({ messageId: message.id!, reaction: reactionMap[r] });
            }
        } catch (e) {
            Alert.alert(e.message);
        }
        stopLoader();
    }

    private handleMessageLongPress = (message: DataSourceMessageItem, chatId: string) => {
        let conversation: ConversationEngine = this.engine.getConversation(message.chatId);
        let builder = new ActionSheetBuilder();

        builder.view((ctx: ZModalController) => (
            <View flexGrow={1} justifyContent="space-evenly" alignItems="center" flexDirection="row" height={Platform.OS === 'android' ? 62 : 56} paddingHorizontal={10}>
                {defaultReactions.map(r => (
                    <TouchableOpacity
                        onPress={() => {
                            ctx.hide();
                            this.handleReactionSetUnset(message, r);
                        }}
                    >
                        <Image source={reactionsImagesMap[r]} />
                    </TouchableOpacity>
                ))}
            </View>
        ));

        builder.action('Select', () => {
            conversation.messagesActionsState.selectToggle(message);
        });

        if (conversation.canSendMessage) {
            builder.action('Reply', () => {
                conversation.messagesActionsState.setState({ messages: [message], action: 'reply' });
            });
        }

        builder.action('Forward', () => {
            forward(conversation, [message]);
        });

        builder.action('Comment', () => {
            this.history.navigationManager.push('MessageComments', { messageId: message.id, chatId });
        });

        if (message.text) {
            if (message.senderId === this.engine.user.id) {
                builder.action('Edit', () => {
                    conversation.messagesActionsState.setState({ messages: [message], action: 'edit' });
                });
            };

            builder.action('Copy', () => {
                Clipboard.setString(message.text!!);
            });
        }

        if (conversation.canPin) {
            builder.action('Pin', async () => {
                startLoader();
                try {
                    await this.engine.client.mutatePinMessage({ chatId: message.chatId, messageId: message.id! })
                } finally {
                    stopLoader();
                }
            });
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
            }, true);
        }

        builder.show();
    }

    private handleMessageDoublePress = (message: DataSourceMessageItem) => {
        startLoader();
        try {
            trackEvent('reaction_sent', { reaction_type: 'like', double_tap: 'yes' });

            this.engine.client.mutateMessageSetReaction({ messageId: message.id!, reaction: reactionMap.LIKE });
        } catch (e) {
            Alert.alert(e.message);
        }
        stopLoader();
    }

    private handleReactionsClick = (message: DataSourceMessageItem) => {
        if (message.reactions && message.reactions.length > 0) {
            showReactionsList(message.reactions);
        }
    }
}