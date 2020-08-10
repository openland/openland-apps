import { createLogger } from 'mental-log';
import { DataSource } from 'openland-y-utils/DataSource';
import { DataSourceStored, DataSourceStoredProvider } from 'openland-y-utils/DataSourceStored';
import { DataSourceAugmentor } from 'openland-y-utils/DataSourceAugmentor';
import { formatMessage } from './formatMessage';
import { MessengerEngine } from '../MessengerEngine';
import {
    DialogFragment,
    DialogKind,
    DialogUpdateFragment,
    DialogUpdateFragment_DialogMessageUpdated,
    DialogUpdateFragment_DialogMessageDeleted,
    DialogUpdateFragment_DialogMessageReceived,
    DialogUpdateFragment_DialogBump,
    DialogUpdateFragment_DialogPeerUpdated,
    DialogUpdateFragment_DialogDeleted,
    DialogUpdateFragment_DialogMuteChanged,
    DialogUpdateFragment_DialogMessageRead,
    DialogUpdateFragment_DialogCallStateChanged,
    RoomNano_PrivateRoom,
    RoomPico_room_SharedRoom,
    TypingType,
    SharedRoomMembershipStatus,
} from 'openland-api/spacex.types';

const log = createLogger('Engine-Dialogs');

export interface DialogDataSourceItemStored {
    // Chat IDs
    key: string;
    flexibleId: string;

    // Chat Description
    title: string;
    kind: 'PRIVATE' | 'INTERNAL' | 'PUBLIC' | 'GROUP';
    isChannel?: boolean;
    isPremium?: boolean;
    photo?: string;

    // Chat State
    unread: number;
    isMuted?: boolean;
    hasActiveCall?: boolean;

    // Chat Top Message
    message?: string;
    date?: number;
    fallback: string;

    // Chat Top Message Flags
    forward?: boolean;
    haveMention?: boolean;
    isService?: boolean;
    isOut?: boolean;

    // Chat Top Message Sender
    sender?: string;
    showSenderName?: boolean;

    // Internal State
    messageId?: string;

    membership: 'MEMBER' | 'REQUESTED' | 'LEFT' | 'KICKED' | 'NONE';
}

export interface DialogDataSourceItem extends DialogDataSourceItemStored {
    online?: boolean;
    typing?: string;
    typingType?: TypingType;
}

const extractDialog = (dialog: DialogFragment, uid: string): DialogDataSourceItemStored => {
    let msg = formatMessage(dialog.topMessage);
    let isOut = dialog.topMessage ? dialog.topMessage!!.sender.id === uid : undefined;
    let sender = dialog.topMessage
        ? dialog.topMessage.sender.id === uid
            ? 'You'
            : dialog.topMessage.sender.firstName
        : undefined;
    let kicked = dialog.membership === SharedRoomMembershipStatus.KICKED;
    let isService = (dialog.topMessage && dialog.topMessage.__typename === 'ServiceMessage' || kicked) || undefined;
    return {
        haveMention: dialog.haveMention,
        isMuted: dialog.isMuted,
        hasActiveCall: dialog.hasActiveCall,
        kind: dialog.kind,
        isChannel: dialog.isChannel,
        isPremium: dialog.isPremium,
        title: dialog.title,
        photo: dialog.photo,
        key: dialog.cid,
        flexibleId: dialog.fid,
        unread: dialog.unreadCount,
        message: kicked ? 'you were kicked' : dialog.topMessage && dialog.topMessage.message ? msg : undefined,
        fallback: kicked ? 'you were kicked' : msg,
        isOut: dialog.topMessage ? dialog.topMessage.sender.id === uid : undefined,
        sender: sender,
        messageId: dialog.topMessage ? dialog.topMessage.id : undefined,
        date: dialog.topMessage ? parseInt(dialog.topMessage.date, 10) : undefined,
        forward: dialog.topMessage ? dialog.topMessage.__typename === 'GeneralMessage' && !!dialog.topMessage.quotedMessages.length && !dialog.topMessage.message : false,
        isService,
        showSenderName: !!(msg && (isOut || dialog.kind !== 'PRIVATE') && sender) && !isService,
        membership: dialog.membership
    };
};

export class DialogListEngine {
    readonly engine: MessengerEngine;
    readonly _dataSourceStored: DataSourceStored<DialogDataSourceItemStored>;
    readonly dataSource: DataSource<DialogDataSourceItem>;
    private userConversationMap = new Map<string, string>();
    private visibleConversations = new Set<string>();

    constructor(engine: MessengerEngine) {
        this.engine = engine;

        //
        // DataStore
        //

        let provider: DataSourceStoredProvider<DialogDataSourceItemStored> = {
            loadMore: async (cursor?: string) => {
                let res = await this.engine.client.queryDialogs({ after: cursor }, { fetchPolicy: 'network-only' });
                return {
                    items: res.dialogs.items.filter((v) => !!v.topMessage).map((v) => extractDialog(v, engine.user.id)),
                    cursor: res.dialogs.cursor ? res.dialogs.cursor : undefined,
                    state: res.state.state!!
                };
            },
            onStarted: (state: string) => {
                engine.dialogSequence.handleDialogsStarted(state);
            }
        };
        this._dataSourceStored = new DataSourceStored('dialogs', engine.options.store, 20, provider);
        let typingsAugmentator = new DataSourceAugmentor<DialogDataSourceItemStored, { typing: string, typingType?: TypingType }>(this._dataSourceStored.dataSource);
        let onlineAugmentator = new DataSourceAugmentor<DialogDataSourceItemStored & { typing?: string }, { online: boolean }>(typingsAugmentator.dataSource);
        this.dataSource = onlineAugmentator.dataSource;

        //
        // Presences
        //

        this.dataSource.watch({
            onDataSourceInited: (items) => {
                let newChats = [];
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        newChats.push(i.flexibleId);
                    }
                }
                this.engine.getOnlines().onPrivateChatsAppear(newChats);
            },
            onDataSourceLoadedMore: (items) => {
                let newChats = [];
                for (let i of items) {
                    if (i.kind === 'PRIVATE') {
                        this.userConversationMap.set(i.flexibleId, i.key);
                        newChats.push(i.flexibleId);
                    }
                }
                this.engine.getOnlines().onPrivateChatsAppear(newChats);
            },
            onDataSourceItemAdded: (item) => {
                if (item.kind === 'PRIVATE') {
                    this.userConversationMap.set(item.flexibleId, item.key);
                    this.engine.getOnlines().onPrivateChatsAppear([item.flexibleId]);
                }
            },
            onDataSourceLoadedMoreForward: (items) => {
                // Nothing to do
            },
            onDataSourceItemRemoved: (item) => {
                // Nothing to do
            },
            onDataSourceItemMoved: () => {
                // Nothing to do
            },
            onDataSourceItemUpdated: () => {
                // Nothing to do
            },
            onDataSourceCompleted: () => {
                // Nothing to do
            },
            onDataSourceCompletedForward: () => {
                // Nothing to do
            },
            onDataSourceScrollToKeyRequested: () => {
                //
            },
            onDataSourceScrollToTop: () => {
                //
            }
        });
        engine.getOnlines().onSingleChange((user, online) => {
            let conversationId = this.userConversationMap.get(user);
            if (!conversationId) {
                return;
            }
            onlineAugmentator.setAugmentation(conversationId, { online });
        });

        //
        // Typings
        //

        engine.getTypings().subcribe((typing, users, typingType, conversationId) => {
            if (typing) {
                typingsAugmentator.setAugmentation(conversationId, { typing, typingType });
            } else {
                typingsAugmentator.removeAugmentation(conversationId);
            }
        });
    }

    onConversationVisible = (conversationId: string) => {
        this.visibleConversations.add(conversationId);
    }

    onConversationHidden = (conversationId: string) => {
        this.visibleConversations.delete(conversationId);
    }

    handleUpdate = async (update: DialogUpdateFragment): Promise<boolean> => {
        if (update.__typename === 'DialogMessageReceived') {
            await this.handleNewMessage(update, this.visibleConversations.has(update.cid));
            return true;
        } else if (update.__typename === 'DialogMessageRead') {
            await this.handleUserRead(update);
            return true;
        } else if (update.__typename === 'DialogMessageDeleted') {
            await this.handleMessageDeleted(update);
            return true;
        } else if (update.__typename === 'DialogPeerUpdated') {
            await this.handlePeerUpdated(update);
            return true;
        } else if (update.__typename === 'DialogBump') {
            await this.handleNewMessage(update, this.visibleConversations.has(update.cid));
            return true;
        } else if (update.__typename === 'DialogMuteChanged') {
            await this.handleMuteUpdated(update);
            return true;
        } else if (update.__typename === 'DialogMessageUpdated') {
            await this.handleMessageUpdated(update);
            return true;
        } else if (update.__typename === 'DialogDeleted') {
            await this.handleDialogDeleted(update);
            return true;
        } else if (update.__typename === 'DialogCallStateChanged') {
            await this.handleDialogCallStateChanged(update);
            return true;
        }
        return false;
    }

    handleStateProcessed = async (state: string) => {
        log.log('State Processed');
        await this._dataSourceStored.updateState(state);
    }

    private handleUserRead = async (update: DialogUpdateFragment_DialogMessageRead) => {
        log.log('User Read');
        let res = await this._dataSourceStored.getItem(update.cid);
        if (res) {
            await this._dataSourceStored.updateItem({
                ...res,
                unread: update.unread,
                haveMention: update.haveMention
            });
        }
    }

    private handleDialogDeleted = async (update: DialogUpdateFragment_DialogDeleted) => {
        log.log('Dialog Deleted');
        if (await this._dataSourceStored.hasItem(update.cid)) {
            await this._dataSourceStored.removeItem(update.cid);
        }
    }

    private handleMessageUpdated = async (update: DialogUpdateFragment_DialogMessageUpdated) => {
        log.log('Message Updated');
        const conversationId = update.cid;
        let existing = await this._dataSourceStored.getItem(conversationId);

        if (existing) {
            if (existing.messageId === update.message.id) {
                const msg = formatMessage(update.message);

                await this._dataSourceStored.updateItem({
                    ...existing,
                    message: update.message.message ? msg : undefined,
                    fallback: msg,
                    haveMention: update.haveMention
                });
            }
        }
    }

    private handleMessageDeleted = async (update: DialogUpdateFragment_DialogMessageDeleted) => {
        log.log('Message Deleted');
        let existing = await this._dataSourceStored.getItem(update.cid);

        if (existing && existing.messageId === update.message.id) {
            if (update.prevMessage === null) {
                await this._dataSourceStored.removeItem(existing.key);
            } else {
                await this._dataSourceStored.updateItem(extractDialog({
                    __typename: "Dialog",
                    id: existing.key,
                    cid: update.cid,
                    fid: existing.flexibleId,
                    kind: existing.kind as DialogKind,
                    isChannel: !!existing.isChannel,
                    isPremium: !!existing.isPremium,
                    title: existing.title,
                    photo: existing.photo || '',
                    unreadCount: update.unread,
                    topMessage: update.prevMessage,
                    isMuted: !!existing.isMuted,
                    haveMention: update.haveMention,
                    membership: existing.membership as SharedRoomMembershipStatus,
                    hasActiveCall: !!existing.hasActiveCall
                }, this.engine.user.id));
            }
        }
    }

    private handlePeerUpdated = async (update: DialogUpdateFragment_DialogPeerUpdated) => {
        log.log('Peer Updated');
        let existing = await this._dataSourceStored.getItem(update.cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                title: update.peer.__typename === 'PrivateRoom' ? update.peer.user.name : update.peer.title,
                photo: update.peer.__typename === 'PrivateRoom' ? update.peer.user.photo || undefined : update.peer.photo,
            });
        }
    }

    private handleMuteUpdated = async (update: DialogUpdateFragment_DialogMuteChanged) => {
        log.log('Mute Updated');
        let existing = await this._dataSourceStored.getItem(update.cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                isMuted: update.mute,
            });
        }
    }

    private handleDialogCallStateChanged = async (update: DialogUpdateFragment_DialogCallStateChanged) => {
        log.log('Call State Changed');
        let existing = await this._dataSourceStored.getItem(update.cid);
        if (existing) {
            await this._dataSourceStored.updateItem({
                ...existing,
                hasActiveCall: update.hasActiveCall,
            });
        }
    }

    private handleNewMessage = async (event: DialogUpdateFragment_DialogMessageReceived | DialogUpdateFragment_DialogBump, visible: boolean) => {
        log.log('New Message');
        const conversationId = event.cid;
        const unreadCount = event.unread;
        const message = event.__typename === 'DialogMessageReceived' ? event.message : event.topMessage!;

        let res = await this._dataSourceStored.getItem(conversationId);
        let isOut = message.sender.id === this.engine.user.id;
        let sender = isOut ? 'You' : message.sender.firstName;
        let kicked = event.membership === SharedRoomMembershipStatus.KICKED;
        let isService = (message.__typename === 'ServiceMessage') || kicked;
        if (res) {
            // TODO: remove. Mb implement global events seq?
            // needed for recover chat after subscription pause
            if (res.membership !== event.membership) {
                this.engine.client.refetchRoomChat({ id: conversationId });
            }

            let msg = formatMessage(message);

            log.log('Update Item: ' + res.key);
            await this._dataSourceStored.updateItem({
                ...res,
                isService,
                unread: !visible || res.unread > unreadCount ? unreadCount : res.unread,
                isOut: isOut,
                sender: sender,
                haveMention: event.haveMention,
                messageId: message.id,
                message: kicked ? 'you were kicked' : message && message.message ? msg : undefined,
                fallback: kicked ? 'you were kicked' : msg,
                date: parseInt(message.date, 10),
                forward: !message.message && message.__typename === 'GeneralMessage' && message.quotedMessages && !!message.quotedMessages.length,
                showSenderName:
                    !!(msg && (isOut || res.kind !== 'PRIVATE') && sender) &&
                    !isService,
                membership: event.membership
            });

            log.log('Move Item: ' + res.key);
            await this._dataSourceStored.moveItem(res.key, 0);
        } else {
            let info = await this.engine.client.queryRoomPico({
                id: conversationId,
            });

            let sharedRoom =
                info.room!.__typename === 'SharedRoom' ? (info.room as RoomPico_room_SharedRoom) : null;
            let privateRoom =
                info.room!.__typename === 'PrivateRoom'
                    ? (info.room as RoomNano_PrivateRoom)
                    : null;
            let room = (sharedRoom || privateRoom)!;

            let msg = formatMessage(message);

            if (privateRoom) {
                this.userConversationMap.set(privateRoom!.user.id, privateRoom.id);
            }

            log.log('Add Item: ' + conversationId);
            await this._dataSourceStored.addItem(
                {
                    key: conversationId,
                    isService,
                    isMuted: !!room.settings.mute,
                    haveMention: event.haveMention,
                    flexibleId: privateRoom ? privateRoom.user.id : room.id,
                    kind: sharedRoom ? sharedRoom.kind : 'PRIVATE',
                    isChannel: sharedRoom ? sharedRoom.isChannel : false,
                    isPremium: sharedRoom ? sharedRoom.isPremium : false,
                    title: sharedRoom ? sharedRoom.title : privateRoom ? privateRoom.user.name : '',
                    photo:
                        (sharedRoom
                            ? sharedRoom.photo
                            : privateRoom
                                ? privateRoom.user.photo
                                : undefined) || undefined,
                    unread: unreadCount,
                    isOut: isOut,
                    sender: sender,
                    messageId: message.id,
                    message: kicked ? 'you were kicked' : message && message.message ? msg : undefined,
                    fallback: msg,
                    date: parseInt(message.date, 10),
                    forward: !message.message && message.__typename === 'GeneralMessage' && message.quotedMessages && !!message.quotedMessages.length,
                    showSenderName:
                        !!(
                            msg &&
                            (isOut || (sharedRoom ? sharedRoom.kind : 'PRIVATE') !== 'PRIVATE') &&
                            sender
                        ) && !isService,
                    membership: event.membership
                },
                0
            );
        }
    }
}
