import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';
import { showPictureModal } from '../components/modal/ZPictureModal';
import { AsyncMessageView } from './components/AsyncMessageView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { Clipboard, Platform, View, Text, TouchableOpacity } from 'react-native';
import { ActionSheetBuilder } from '../components/ActionSheet';
import { SRouting } from 'react-native-s/SRouting';
import { startLoader, stopLoader } from '../components/ZGlobalLoader';
import { Prompt } from '../components/Prompt';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { DialogItemViewAsync } from './components/DialogItemViewAsync';
import { ThemeProvider } from 'openland-mobile/themes/ThemeContext';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/Types';
import { ZModalController } from 'openland-mobile/components/ZModal';
import { ServiceMessageDefault } from './components/service/ServiceMessageDefaut';

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
                <ThemeProvider>
                    <DialogItemViewAsync item={item} onPress={this.handleDialogClick} />
                </ThemeProvider>
            );
        });
    }

    getConversation(id: string) {
        if (!this.conversations.has(id)) {
            let eng = this.engine.getConversation(id);
            this.conversations.set(id, new ASDataView(eng.dataSource, (item) => {
                if (item.type === 'message') {
                    if (item.serviceMetaData || item.isService) {
                        return (<ThemeProvider><ServiceMessageDefault message={item} onUserPress={this.handleAvatarClick} /></ThemeProvider>);
                    } else {
                        return (<ThemeProvider><AsyncMessageView navigationManager={this.history.navigationManager} message={item} engine={eng} onAvatarPress={this.handleAvatarClick} onDocumentPress={this.handleDocumentClick} onMediaPress={this.handleMediaClick} onMessageLongPress={this.handleMessageLongPress} /></ThemeProvider>);
                    }
                } else {
                    return (<ThemeProvider><AsyncDateSeparator year={item.year} month={item.month} date={item.date} /></ThemeProvider>);
                }
            }));
        }
        return this.conversations.get(id)!!;
    }

    private handleMediaClick = (document: DataSourceMessageItem, event: { path: string } & ASPressEvent) => {
        let attach = document.attachments!.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        showPictureModal({
            url: (Platform.OS === 'android' ? 'file://' : '') + event.path,
            width: attach.fileMetadata.imageWidth!,
            height: attach.fileMetadata.imageHeight!,
            isGif: false,
            animate: {
                x: event.x,
                y: event.y,
                width: event.w,
                height: event.h,
                borderRadius: 16
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
        let attach = document.attachments!.filter(a => a.__typename === 'MessageAttachmentFile')[0] as FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
        // { config: { uuid, name, size }
        this.history.navigationManager.push('FilePreview', { config: { uuid: attach.fileId, name: attach.fileMetadata.name, size: attach.fileMetadata.size } });
    }

    private handleDialogClick = (id: string) => {
        this.history.navigationManager.push('Conversation', { id });
    }
    private handleAvatarClick = (id: string) => {
        this.history.navigationManager.push('ProfileUser', { id });
    }

    private handleReactionSetUnset = async (message: DataSourceMessageItem, r: string) => {
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
    }

    private handleMessageLongPress = (message: DataSourceMessageItem) => {
        let builder = new ActionSheetBuilder();

        const defaultReactions = ['❤️', '👍', '😂', '😱', '😢', '🤬'];

        builder.view((ctx: ZModalController) => (
            <View flexGrow={1} justifyContent="space-evenly" alignItems="center" flexDirection="row" height={56} paddingHorizontal={10}>
                {defaultReactions.map(r => (
                    <TouchableOpacity
                        onPress={() => {
                            ctx.hide();
                            this.handleReactionSetUnset(message, r);
                        }}
                    >
                        <Text style={{ fontSize: 30 }}>{r}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        ));

        if (message.text) {
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

            builder.action('Copy', () => {
                Clipboard.setString(message.text!!);
            });
        }

        if (message.senderId === this.engine.user.id) {
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

}