import * as React from 'react';
import { XView } from 'react-mental';
import { showModalBox } from 'openland-x/showModalBox';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XModalFooter } from 'openland-web/components/XModalFooter';
import { URickInput, convertFromInputValue, URickInputInstance } from 'openland-web/components/unicorn/URickInput';
import { detectOS } from 'openland-x-utils/detectOS';
import { css } from 'linaria';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import MediaIcon from 'openland-icons/s/ic-gallery-24.svg';
import FileIcon from 'openland-icons/s/ic-document-24.svg';
import DonationIcon from 'openland-icons/s/ic-donation-24.svg';
import { fileListToArray } from 'openland-web/fragments/chat/components/DropZone';
import { useDonationModal } from 'openland-web/fragments/chat/components/showDonation';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { AutoCompleteComponent, AutoCompleteComponentRef } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { Deferred } from 'openland-unicorn/components/Deferred';
import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { XModalController } from 'openland-x/showModal';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
import { StickerFragment } from 'openland-api/spacex.types';
import { emojiWordMap } from 'openland-y-utils/emojiWordMap';
import { prepareLegacyMentionsForSend } from 'openland-engines/legacy/legacymentions';
import { showNoiseWarning } from 'openland-web/fragments/chat/components/NoiseWarning';
import { plural } from 'openland-y-utils/plural';

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
    isChannel?: boolean;
    isPrivate?: boolean;
    membersCount?: number;
    onAttach: (files: File[], cb?: () => void) => void;
}

const MessageModal = (props: MessageModalProps & { ctx: XModalController }) => {
    let messenger = React.useContext(MessengerContext);
    let os = detectOS();
    let isMobile = os === 'Android' || os === 'iOS';
    let inputRef = React.useRef<URickInputInstance>(null);
    let fileInputRef = React.useRef<HTMLInputElement>(null);
    let conversation = messenger.getConversation(props.chatId);
    let suggestRef = React.useRef<AutoCompleteComponentRef>(null);

    let showDonation = useDonationModal({
        name: props.name,
        chatId: !props.isPrivate ? props.chatId : undefined,
        userId: props.userId,
        onDonate: props.ctx.hide,
        onWalletLockedContinue: props.ctx.hide,
    });
    let onFileInputChange = React.useCallback(e => {
        if (props.onAttach) {
            props.onAttach(fileListToArray(e.target.files), () => props.ctx.hide());
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, []);
    let onAttachPress = React.useCallback(() => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }, []);
    let onDonationPress = React.useCallback(() => {
        showDonation();
    }, [showDonation]);
    let onSend = async () => {
        let editor = inputRef.current;
        if (!editor) {
            return false;
        }
        let data = editor.getText();
        const { text, mentions } = convertFromInputValue(data);
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
            conversation.sendMessage(text, mentions);
            editor.clear();
        }
        props.ctx.hide();
        return true;
    };
    let onStickerSent = (sticker: StickerFragment) => {
        // TODO: add typing?
        conversation.sendSticker(sticker);
        props.ctx.hide();
    };
    const [activeWord, setActiveWord] = React.useState<string | null>(null);
    const onAutocompleteWordChange = React.useCallback((word: string) => {
        setActiveWord(word);
    }, []);
    const onUserPicked = React.useCallback((mention: MentionToSend) => {
        inputRef.current!.commitSuggestion('mention', mention);
    }, []);
    const onEmojiPicked = React.useCallback((emoji: { name: string; value: string }) => {
        inputRef.current!.commitSuggestion('emoji', emoji);
    }, []);

    let onPressUp = React.useCallback(() => {
        let s = suggestRef.current;
        if (s && s.isActive()) {
            s.onPressUp();
            return true;
        }
        return false;
    }, []);
    let onPressDown = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressDown();
        }
        return false;
    }, []);
    let onPressTab = React.useCallback(() => {
        let s = suggestRef.current;
        if (s) {
            return s.onPressEnter();
        }
        return false;
    }, []);
    let onPressEnter = async () => {
        let s = suggestRef.current;
        if (s) {
            if (s.onPressEnter()) {
                return true;
            }
        }
        return await onSend();
    };
    return (
        <XView flexDirection="column" paddingTop={12}>
            <XView>
                <XView marginHorizontal={24} marginBottom={12}>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple={true}
                        style={{ display: 'none' }}
                        onChange={onFileInputChange}
                    />
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
                        className={inputStyle}
                        placeholder="Write a message..."
                        withShortcutsButton={!isMobile}
                        autofocus={true}
                        autocompletePrefixes={['@', ':', ...Object.keys(emojiWordMap)]}
                        onAutocompleteWordChange={onAutocompleteWordChange}
                        onPressUp={onPressUp}
                        onPressDown={onPressDown}
                        onPressTab={onPressTab}
                        onPressEnter={onPressEnter}
                        onFilesPaste={props.onAttach}
                        onStickerSent={onStickerSent}
                    />
                </XView>
                <XView flexDirection="row" paddingHorizontal={20} paddingBottom={20}>
                    <IconButton icon={<MediaIcon />} caption="Photo or video" onClick={onAttachPress} />
                    <IconButton icon={<FileIcon />} caption="Document" onClick={onAttachPress} />
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
            title: props.name ? `Message to ${props.name}` : `Message`,
            titleTruncation: true,
            overflowVisible: true,
            width: 480,
        },
            ctx => <MessageModal {...props} ctx={ctx} />
        );
    };
    return show;
};
