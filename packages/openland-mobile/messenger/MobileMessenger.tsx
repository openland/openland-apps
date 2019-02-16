import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';
import { showPictureModal } from '../components/modal/ZPictureModal';
import { AsyncMessageView } from './components/AsyncMessageView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { Clipboard, Platform } from 'react-native';
import { ActionSheetBuilder } from '../components/ActionSheet';
import { SRouting } from 'react-native-s/SRouting';
import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { Prompt } from '../components/Prompt';
import { AsyncServiceMessageView } from './components/AsyncServiceMessageView';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { DialogItemViewAsync } from './components/DialogItemViewAsync';

export class MobileMessenger {
    readonly engine: MessengerEngine;
    readonly history: SRouting;
    readonly dialogs: ASDataView<DialogDataSourceItem>;
    private readonly conversations = new Map<string, ASDataView<DataSourceMessageItem | DataSourceDateItem>>();

    constructor(engine: MessengerEngine, history: SRouting) {
        this.engine = engine;
        this.history = history;
        this.dialogs = new ASDataView(engine.dialogList.dataSource, (item) => {
            return (
                <DialogItemViewAsync item={item} onPress={this.handleDialogClick} />
            );
        });
    }

    getConversation(id: string) {
        if (!this.conversations.has(id)) {
            let eng = this.engine.getConversation(id);
            this.conversations.set(id, new ASDataView(eng.dataSource, (item) => {
                if (item.type === 'message') {
                    if (item.serviceMetaData || item.isService) {
                        return (<AsyncServiceMessageView message={item} engine={eng} onUserPress={this.handleAvatarClick} onRoomPress={this.handleDialogClick} />);
                    } else {
                        return (<AsyncMessageView navigationManager={this.history.navigationManager} message={item} engine={eng} onAvatarPress={this.handleAvatarClick} onDocumentPress={this.handleDocumentClick} onMediaPress={this.handleMediaClick} onMessageLongPress={this.handleMessageLongPress} />);
                    }
                } else {
                    return (<AsyncDateSeparator year={item.year} month={item.month} date={item.date} />);
                }
            }));
        }
        return this.conversations.get(id)!!;
    }

    private handleMediaClick = (document: DataSourceMessageItem, event: { path: string } & ASPressEvent) => {
        showPictureModal({
            url: (Platform.OS === 'android' ? 'file://' : '') + event.path,
            width: document.file!!.imageSize!!.width,
            height: document.file!!.imageSize!!.height,
            isGif: false,
            animate: {
                x: event.x,
                y: event.y,
                width: event.w,
                height: event.h,
                borderRadius: 10
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

    private handleDocumentClick = (document: DataSourceMessageItem) => {
        // { config: { uuid, name, size }
        this.history.navigationManager.push('FilePreview', { config: { uuid: document.file!!.fileId, name: document.file!!.fileName, size: document.file!!.fileSize } });
    }

    private handleDialogClick = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }
    private handleAvatarClick = (id: string) => {
        this.history.navigationManager.push('ProfileUser', { id });
    }

    private handleMessageLongPress = (message: DataSourceMessageItem) => {
        let builder = new ActionSheetBuilder();
        if (message.text) {
            builder.action('Copy', () => {
                Clipboard.setString(message.text!!);
            });
            if (message.senderId === this.engine.user.id) {
                builder.action('Edit', () => {
                    Prompt.builder()
                        .title('Edit message')
                        .value(message.text!)
                        .callback(async (text) => {
                            startLoader();
                            try {
                                await this.engine.client.mutateRoomEditMessage({ messageId: message.id!, message: text });
                            } catch (e) {
                                Alert.alert(e.message);
                            }
                            stopLoader();
                        })
                        .show();
                });
            }
        }
        if (message.senderId === this.engine.user.id) {
            builder.action('Delete', async () => {
                try {
                    Alert.builder()
                        .title('Delete message')
                        .message('Are you sure you want to delete this message?')
                        .button('Cancel', 'cancel')
                        .action('Delete', 'destructive', async () => {
                            await this.engine.client.mutateRoomDeleteMessage({ messageId: message.id! });
                        }).show();
                } catch (e) {
                    Alert.alert(e.message);
                }
            });
        }

        if (message.id) {
            (message.reactions || []).reduce((res: string[], r) => res.indexOf(r.reaction) > -1 ? res : [r.reaction, ...res], ['❤️']).filter(r => r !== 'respondPost').map(r => {
                builder.action(r, async () => {
                    startLoader();
                    try {
                        let remove = message.reactions && message.reactions.filter(userReaction => userReaction.user.id === this.engine.user.id && userReaction.reaction === r).length > 0;
                        if (remove) {
                            this.engine.client.mutateMessageUnsetReaction({ messageId: message.id!, reaction: r });
                        } else {
                            this.engine.client.mutateMessageSetReaction({ messageId: message.id!, reaction: r });
                        }
                    } catch (e) {
                        Alert.alert(e.message);
                    }
                    stopLoader();
                });
            });
        }

        builder.show();
    }

}