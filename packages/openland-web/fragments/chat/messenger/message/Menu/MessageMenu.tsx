import * as React from 'react';
import { UPopperController } from 'openland-web/components/unicorn/UPopper';
import { UPopperMenuBuilder } from 'openland-web/components/unicorn/UPopperMenuBuilder';
import SelectIcon from 'openland-icons/s/ic-select-24.svg';
import ReplyIcon from 'openland-icons/s/ic-reply-24.svg';
import ForwardIcon from 'openland-icons/s/ic-forward-24.svg';
import PinIcon from 'openland-icons/s/ic-pin-24.svg';
import EditIcon from 'openland-icons/s/ic-edit-24.svg';
import DeleteIcon from 'openland-icons/s/ic-delete-24.svg';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';
import { ConversationEngine } from 'openland-engines/messenger/ConversationEngine';
import { XViewRouter } from 'react-mental';
import { showDeleteMessageModal } from 'openland-web/fragments/chat/components/MessengerRootComponent';
import { forward } from '../actions/forward';

export const buildMessageMenu = (ctx: UPopperController, message: DataSourceWebMessageItem, engine: ConversationEngine, router: XViewRouter) => {
    let menu = new UPopperMenuBuilder();
    const role = engine.role;
    menu.item({ title: 'Select', icon: <SelectIcon />, onClick: () => engine.messagesActionsStateEngine.selectToggle(message) });
    if (engine.canSendMessage) {
        menu.item({ title: 'Reply', icon: <ReplyIcon />, onClick: () => engine.messagesActionsStateEngine.reply(message) });
    }
    menu.item({
        title: 'Forward', icon: <ForwardIcon />, onClick: () => {
            forward([message], engine.engine, router);
        }
    });
    if (engine.canPin && message.id) {
        menu.item({ title: 'Pin', icon: <PinIcon />, action: () => engine.engine.client.mutatePinMessage({ messageId: message.id!, chatId: engine.conversationId }) });
    }
    let hasPurchase = message.attachments && message.attachments.some(a => a.__typename === 'MessageAttachmentPurchase');
    if (message.sender.id === engine.engine.user.id && message.text && !hasPurchase) {
        menu.item({ title: 'Edit', icon: <EditIcon />, onClick: () => engine.messagesActionsStateEngine.edit(message) });
    }
    if (message.sender.id === engine.engine.user.id || role === 'ADMIN' || role === 'OWNER') {
        menu.item({
            title: 'Delete', icon: <DeleteIcon />, onClick: () => showDeleteMessageModal([message.id!], engine.engine.client)
        });
    }

    return menu.build(ctx);
};