import * as React from 'react';
import { MessengerEngine } from 'openland-engines/MessengerEngine';
import { DialogDataSourceItem } from 'openland-engines/messenger/DialogListEngine';
import { ASDataView } from 'react-native-async-view/ASDataView';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { XPStyles } from 'openland-xp/XPStyles';
import { formatDate } from '../utils/formatDate';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ASImage } from 'react-native-async-view/ASImage';
import { DataSourceMessageItem, DataSourceDateItem } from 'openland-engines/messenger/ConversationEngine';
import { AsyncDateSeparator } from './components/AsyncDateSeparator';
import { ZPictureModal } from '../components/modal/ZPictureModal';
import { AsyncMessageView } from './components/AsyncMessageView';
import { ASPressEvent } from 'react-native-async-view/ASPressEvent';
import { RNAsyncConfigManager } from 'react-native-async-view/platform/ASConfigManager';
import { Clipboard, Alert } from 'react-native';
import { ActionSheetBuilder } from '../components/ActionSheet';
import { SRouting } from 'react-native-s/SRouting';
import { MessageSetReactionMutation, MessageUnsetReactionMutation } from 'openland-api';
import { startLoader, stopLoader } from '../components/ZGlobalLoader';

interface ASAvatarProps {
    size: number;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
}

export class ASAvatar extends React.PureComponent<ASAvatarProps> {
    render() {
        if (this.props.src) {
            let url = this.props.src;
            url += '-/scale_crop/' + 256 + 'x' + 256 + '/';
            return (
                <ASImage
                    width={this.props.size}
                    height={this.props.size}
                    source={{ uri: url }}
                    borderRadius={this.props.size / 2}
                />
            );
        }

        let placeholderIndex = 0;
        if (this.props.placeholderKey) {
            placeholderIndex = doSimpleHash(this.props.placeholderKey);
        }
        let placeholderStyle = XPStyles.avatars[placeholderIndex % XPStyles.avatars.length];
        let placeholderText = '?';
        if (this.props.placeholderTitle) {
            placeholderText = extractPlaceholder(this.props.placeholderTitle);
        }
        let textSize = 28;
        if (this.props.size === 40) {
            textSize = 16;
        }
        if (this.props.size === 32) {
            textSize = 14;
        }
        if (this.props.size === 28) {
            textSize = 12;
        }
        if (this.props.size === 30) {
            textSize = 13;
        }
        if (this.props.size === 56) {
            textSize = 26;
        }
        if (this.props.size === 96) {
            textSize = 28;
        }
        if (this.props.size === 36) {
            textSize = 14;
        }

        return (
            <ASFlex
                width={this.props.size}
                height={this.props.size}
                alignItems="center"
                justifyContent="center"
                backgroundColor={placeholderStyle.placeholderColor}
                backgroundGradient={{ start: placeholderStyle.placeholderColorStart, end: placeholderStyle.placeholderColorEnd }}
                borderRadius={this.props.size / 2}
            >
                <ASText fontSize={textSize} color="#fff">{placeholderText}</ASText>
            </ASFlex>
        );
    }
}

export class UserAvatar extends React.PureComponent<ASAvatarProps & { online?: boolean }> {
    render() {
        return (
            <ASFlex
                width={this.props.size}
                height={this.props.size}
                alignItems="center"
                justifyContent="center"
            >
                <ASAvatar {...this.props} />

                <ASFlex overlay={true} alignItems="flex-end" justifyContent="flex-end">
                    {this.props.online && (
                        <ASFlex width={12} height={12} borderRadius={6} backgroundColor="#ffffff" justifyContent="center">
                            <ASFlex width={10} height={10} borderRadius={5} backgroundColor="rgb(92,212,81)" marginLeft={1} marginTop={1} marginRight={1} />
                        </ASFlex>
                    )}
                </ASFlex>
            </ASFlex>

        );
    }
}

class ASCounter extends React.PureComponent<{ value: number | string, muted?: boolean }> {
    render() {
        return (
            <ASFlex borderRadius={9} backgroundColor={XPStyles.colors.brand} height={18} minWidth={18} justifyContent="center">
                <ASFlex justifyContent="center" marginLeft={4} marginRight={4}>
                    <ASText color="#fff" lineHeight={16} fontSize={12} minWidth={8} textAlign="center">{this.props.value + ''}</ASText>
                </ASFlex>
            </ASFlex>
        );
    }
}

export class DialogItemViewAsync extends React.PureComponent<{ item: DialogDataSourceItem, onPress: (id: string) => void }> {

    handlePress = () => {
        this.props.onPress(this.props.item.key);
    }

    render() {
        let item = this.props.item;
        let showSenderName = !!(item.message && (!(item.isOut && item.type === 'PrivateConversation')) && item.sender);
        let isUser = item.type === 'PrivateConversation';
        return (
            <ASFlex height={80} flexDirection="row" highlightColor={XPStyles.colors.selectedListItem} onPress={this.handlePress}>
                <ASFlex width={80} height={80} alignItems="center" justifyContent="center">
                    {!isUser && <ASAvatar
                        src={item.photo}
                        size={60}
                        placeholderKey={item.key}
                        placeholderTitle={item.title}
                    />}
                    {isUser && <UserAvatar
                        src={item.photo}
                        size={60}
                        placeholderKey={item.flexibleId}
                        placeholderTitle={item.title}
                        online={item.online}
                    />}
                </ASFlex>
                <ASFlex marginRight={10} marginTop={12} marginBottom={12} flexDirection="column" flexGrow={1} flexBasis={0} alignItems="stretch">
                    <ASFlex height={18}>
                        <ASText fontSize={15} height={18} fontWeight={'600'} color="#181818" flexGrow={1} flexBasis={0} marginRight={10}>{item.title}</ASText>
                        {item.date !== undefined && <ASText fontSize={13} height={16} marginTop={2} color="#aaaaaa">{formatDate(item.date)}</ASText>}
                    </ASFlex>
                    <ASFlex flexDirection="row" alignItems="stretch" marginTop={2} marginBottom={2} height={38}>
                        {!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            {showSenderName && (<ASText fontSize={14} lineHeight={18} height={18} color="#181818" numberOfLines={1}>{item.sender}</ASText>)}
                            <ASText fontSize={14} height={showSenderName ? 18 : 36} lineHeight={18} color="#7b7b7b" numberOfLines={showSenderName ? 1 : 2}>{item.message}</ASText>
                        </ASFlex>}
                        {!!item.typing && <ASFlex flexDirection="column" alignItems="stretch" flexGrow={1} flexBasis={0}>
                            <ASText fontSize={14} height={36} lineHeight={18} color="#4747ec" numberOfLines={2}>{item.typing}</ASText>
                        </ASFlex>}
                        {item.unread > 0 && (
                            <ASFlex marginTop={18} flexShrink={0}>
                                <ASCounter value={item.unread} />
                            </ASFlex>
                        )}
                    </ASFlex>
                </ASFlex>
                <ASFlex overlay={true} flexDirection="row" justifyContent="flex-end" alignItems="flex-end">
                    <ASFlex height={0.5} flexGrow={1} marginLeft={80} backgroundColor={XPStyles.colors.selectedListItem} />
                </ASFlex>
            </ASFlex>
        );
    }
}

export const MobileMessengerContext = React.createContext<MobileMessenger>(undefined as any);

export class MobileMessenger {
    readonly engine: MessengerEngine;
    readonly history: SRouting;
    readonly dialogs: ASDataView<DialogDataSourceItem>;
    private readonly conversations = new Map<string, ASDataView<DataSourceMessageItem | DataSourceDateItem>>();
    private readonly modal: React.RefObject<ZPictureModal>;

    constructor(engine: MessengerEngine, history: SRouting, modal: React.RefObject<ZPictureModal>) {
        this.engine = engine;
        this.history = history;
        this.modal = modal;
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
                    return (<AsyncMessageView navigationManager={this.history.navigationManager} message={item} engine={eng} onAvatarPress={this.handleAvatarClick} onDocumentPress={this.handleDocumentClick} onMediaPress={this.handleMediaClick} onMessageLongPress={this.handleMessageLongPress} onMessagePress={this.handleMessagePress} />);
                } else {
                    return (<AsyncDateSeparator year={item.year} month={item.month} date={item.date} />);
                }
            }));
        }
        return this.conversations.get(id)!!;
    }

    private handleMediaClick = (document: DataSourceMessageItem, event: { path: string } & ASPressEvent) => {
        if (this.modal.current) {
            this.modal.current!!.showModal({
                url: event.path,
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
                onBegin: () => {
                    RNAsyncConfigManager.setSuspended(event.instanceKey!!, true);
                },
                onEnd: () => {
                    RNAsyncConfigManager.setSuspended(event.instanceKey!!, false);
                }
            });
        }
        //
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
            builder.action('Edit', () => {
                // Clipboard.setString(message.text!!);
            });
        }
        builder.action('Delete', () => {
            //
        });
        builder.show();
    }

    private handleMessagePress = (message: DataSourceMessageItem) => {
        if (!message.id) {
            return;
        }

        let builder = new ActionSheetBuilder();
        (message.reactions || []).reduce((res: string[], r) => res.indexOf(r.reaction) > -1 ? res : [r.reaction, ...res], ['❤️', '👍', '🤷‍', '😱', '👀']).map(r => {
            builder.action(r, async () => {
                startLoader();
                try {
                    let remove = message.reactions && message.reactions.filter(userReaction => userReaction.user.id === this.engine.user.id && userReaction.reaction === r).length > 0;
                    await this.engine.client.client.mutate({ mutation: remove ? MessageUnsetReactionMutation.document : MessageSetReactionMutation.document, variables: { messageId: message.id, reaction: r } });
                } catch (e) {
                    Alert.alert(e.message);
                }
                stopLoader();
            });
        });

        builder.show();
    }
}