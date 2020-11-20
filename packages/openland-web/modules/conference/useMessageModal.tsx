import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { URickInput, URickInputInstance, URickTextValue } from 'openland-web/components/unicorn/URickInput';
import { css, cx } from 'linaria';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import DonationIcon from 'openland-icons/s/ic-donation-24.svg';
import { useDonationModal } from 'openland-web/fragments/chat/components/showDonation';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { AutoCompleteComponent, AutoCompleteComponentRef, useInputAutocompleteHanlders } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { XModalController } from 'openland-x/showModal';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { StickerFragment } from 'openland-api/spacex.types';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { showNoiseWarning } from 'openland-web/fragments/chat/components/NoiseWarning';
import { plural } from 'openland-y-utils/plural';
import { useShake } from 'openland-web/pages/auth/components/authComponents';
import { extractTextAndMentions } from 'openland-web/utils/convertTextAndMentions';
import { useAttachButtonHandlers } from 'openland-web/fragments/chat/components/AttachConfirm';
import { isFileImage } from 'openland-web/utils/UploadCareUploading';

const inputStyle = css`
    min-height: 88px;
    max-height: 250px;
`;

const mentionsStyle = css`
    max-height: 140px;
    left: 0;
    right: 0;
`;

const IconButton = (props: { caption: string, icon: JSX.Element, onClick: React.MouseEventHandler }) => {
    let [show] = useCaptionPopper({ text: props.caption, placement: 'bottom', scope: 'message-modal' });
    return (
        <UIconButton icon={props.icon} onMouseEnter={show} size="large" onClick={props.onClick} />
    );
};

interface MessageModalProps {
    chatId: string;
    userId?: string;
    name?: string;
    chatTitle?: string;
    isChannel?: boolean;
    isPrivate?: boolean;
    membersCount?: number;
    onAttach: (files: File[], text: URickTextValue, isImage: boolean, cb?: () => void) => void;
}

const MessageModal = (props: MessageModalProps & { ctx: XModalController }) => {
    let messenger = React.useContext(MessengerContext);
    let conversation = messenger.getConversation(props.chatId);
    let inputRef = React.useRef<URickInputInstance>(null);
    let suggestRef = React.useRef<AutoCompleteComponentRef>(null);
    let [shakeStyle, shake] = useShake();

    let showDonation = useDonationModal({
        name: props.name,
        chatId: !props.isPrivate ? props.chatId : undefined,
        chatTitle: props.chatTitle,
        userId: props.userId,
        onDonate: props.ctx.hide,
        onWalletLockedContinue: props.ctx.hide,
    });
    let handleAttach = (files: File[]) => {
        props.onAttach(files, inputRef.current?.getText()!, files.every(f => isFileImage(f)), () => props.ctx.hide());
    };
    let { inputElements, onAttachClick } = useAttachButtonHandlers({
        onAttach: handleAttach
    });
    let onDonationPress = React.useCallback(() => {
        showDonation();
    }, [showDonation]);
    let onSend = async () => {
        let editor = inputRef.current;
        if (!editor) {
            return false;
        }
        let data = editor.getText();
        const { text, mentions } = extractTextAndMentions(data);
        const mentionsPrepared = prepareLegacyMentionsForSend(text, mentions);
        if (text.length > 0) {
            if (mentionsPrepared.filter(m => m.all === true).length) {
                try {
                    const chatType = props.isChannel ? 'channel' : 'group';
                    const membersType = props.isChannel ? ['follower', 'followers'] : ['member', 'members'];

                    await showNoiseWarning(
                        `Notify all ${!!props.membersCount ? plural(props.membersCount, membersType) : membersType[1]}?`,
                        `By using @All, you’re about to notify all ${chatType} ${membersType[1]} even when they muted this chat. Please use it only for important messages`
                    );
                } catch {
                    return false;
                }
            }
            conversation.sendMessage(text, mentions, undefined);
            editor.clear();
            props.ctx.hide();
        } else {
            shake();
            editor?.focus();
        }
        return true;
    };
    let onStickerSent = (sticker: StickerFragment) => {
        // TODO: add typing?
        conversation.sendSticker(sticker, undefined);
        props.ctx.hide();
    };
    const {
        prefixes,
        activeWord,
        onWordChange,
        onUserPicked,
        onEmojiPicked,
        onPressUp,
        onPressDown,
        onPressTab,
        onPressEnter,
    } = useInputAutocompleteHanlders({ inputRef, suggestRef });

    let handlePressEnter = async () => {
        let handled = onPressEnter();
        if (handled) {
            return true;
        }
        return await onSend();
    };
    return (
        <XView flexDirection="column" paddingTop={12}>
            <XView>
                <XView marginHorizontal={24} marginBottom={12}>
                    <Deferred>
                        <AutoCompleteComponent
                            onSelected={onUserPicked}
                            onEmojiSelected={onEmojiPicked}
                            groupId={props.chatId}
                            membersCount={props.membersCount}
                            activeWord={activeWord}
                            isChannel={props.isChannel}
                            isPrivate={props.isPrivate}
                            ref={suggestRef}
                            containerClassName={mentionsStyle}
                        />
                    </Deferred>
                    <URickInput
                        ref={inputRef}
                        className={cx(inputStyle, shakeStyle)}
                        placeholder="Write a message..."
                        autofocus={true}
                        autocompletePrefixes={prefixes}
                        onAutocompleteWordChange={onWordChange}
                        onPressUp={onPressUp}
                        onPressDown={onPressDown}
                        onPressTab={onPressTab}
                        onPressEnter={handlePressEnter}
                        onFilesPaste={handleAttach}
                        onStickerSent={onStickerSent}
                    />
                </XView>
                {inputElements}
                <XView flexDirection="row" paddingHorizontal={20} paddingBottom={20}>
                    <IconButton icon={<MediaIcon />} caption="Photo" onClick={() => onAttachClick('image')} />
                    <IconButton icon={<FileIcon />} caption="Document" onClick={() => onAttachClick('document')} />
                    <IconButton icon={<DonationIcon />} caption="Donation" onClick={onDonationPress} />
                </XView>
            </XView>
            <XModalFooter>
                <UButton
                    text="Cancel"
                    style="tertiary"
                    size="large"
                    onClick={props.ctx.hide}
                />
                <UButton
                    text="Send"
                    style="primary"
                    size="large"
                    onClick={onSend}
                />
            </XModalFooter>
        </XView>
    );
};

export const useMessageModal = (props: MessageModalProps) => {
    const show = () => {
        showModalBox({
            title: props.chatTitle || props.name ? `Message to ${props.chatTitle || props.name}` : `Message`,
            titleTruncation: true,
            overflowVisible: true,
            width: 480,
        },
            ctx => <MessageModal {...props} ctx={ctx} />
        );
    };
    return show;
};
