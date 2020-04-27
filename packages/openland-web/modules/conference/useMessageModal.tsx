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
import { showDonation } from 'openland-web/fragments/chat/components/showDonation';
import { MessengerContext } from 'openland-engines/MessengerEngine';
// import { AutoCompleteComponent, AutoCompleteComponentRef } from 'openland-web/fragments/chat/components/SendMessageComponent';
// import { Deferred } from 'openland-unicorn/components/Deferred';
// import { MentionToSend } from 'openland-engines/messenger/MessageSender';
import { XModalController } from 'openland-x/showModal';
import { useCaptionPopper } from 'openland-web/components/CaptionPopper';
// import { emojiWordMap } from 'openland-y-utils/emojiWordMap';

const inputStyle = css`
    min-height: 88px;
    max-height: 250px;
`;

const IconButton = (props: { caption: string, icon: JSX.Element, onClick: React.MouseEventHandler }) => {
    let [show] = useCaptionPopper({ text: props.caption, placement: 'bottom', scope: 'message-modal' });
    return (
        <UIconButton icon={props.icon} onMouseEnter={show} size="large" onClick={props.onClick} />
    );
};

interface MessageModalProps {
    chatId: string;
    name: string;
    // isChannel?: boolean;
    // isPrivate?: boolean;
    // membersCount?: number;
    onAttach: (files: File[], cb?: () => void) => void;
}

const MessageModal = (props: MessageModalProps & { ctx: XModalController }) => {
    let messenger = React.useContext(MessengerContext);
    let os = detectOS();
    let isMobile = os === 'Android' || os === 'iOS';
    let inputRef = React.useRef<URickInputInstance>(null);
    let fileInputRef = React.useRef<HTMLInputElement>(null);
    // let suggestRef = React.useRef<AutoCompleteComponentRef>(null);
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
        // TODO pass different ids
        showDonation({ name: props.name, chatId: props.chatId });
    }, []);
    let onSend = () => {
        let editor = inputRef.current;
        if (!editor) {
            return;
        }
        let data = editor.getText();
        const { text, mentions } = convertFromInputValue(data);
        if (text.length > 0) {
            let conversation = messenger.getConversation(props.chatId);
            conversation.sendMessage(text, mentions);
        }
        props.ctx.hide();
    };
    // const [activeWord, setActiveWord] = React.useState<string | null>(null);
    // const onAutocompleteWordChange = React.useCallback((word: string) => {
    //     setActiveWord(word);
    // }, []);
    // const onUserPicked = React.useCallback((mention: MentionToSend) => {
    //     inputRef.current!.commitSuggestion('mention', mention);
    // }, []);
    // const onEmojiPicked = React.useCallback((emoji: { name: string; value: string }) => {
    //     inputRef.current!.commitSuggestion('emoji', emoji);
    // }, []);

    // let onPressUp = React.useCallback(() => {
    //     let s = suggestRef.current;
    //     if (s && s.isActive()) {
    //         s.onPressUp();
    //         return true;
    //     }
    //     return false;
    // }, []);
    // let onPressDown = React.useCallback(() => {
    //     let s = suggestRef.current;
    //     if (s) {
    //         return s.onPressDown();
    //     }
    //     return false;
    // }, []);
    // let onPressTab = React.useCallback(() => {
    //     let s = suggestRef.current;
    //     if (s) {
    //         return s.onPressEnter();
    //     }
    //     return false;
    // }, []);
    let onPressEnter = async () => {
        // let s = suggestRef.current;
        // if (s) {
        //     if (s.onPressEnter()) {
        //         return true;
        //     }
        // }
        onSend();
        return true;
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
                    {/* <Deferred>
                        <AutoCompleteComponent
                            onSelected={onUserPicked}
                            onEmojiSelected={onEmojiPicked}
                            groupId={props.chatId}
                            membersCount={props.membersCount}
                            activeWord={activeWord}
                            isChannel={props.isChannel}
                            isPrivate={props.isPrivate}
                            ref={suggestRef}
                        />
                    </Deferred> */}
                    <URickInput
                        ref={inputRef}
                        className={inputStyle}
                        placeholder="Write a message..."
                        withShortcutsButton={!isMobile}
                        autofocus={true}
                        // autocompletePrefixes={['@', ':', ...Object.keys(emojiWordMap)]}
                        // onAutocompleteWordChange={onAutocompleteWordChange}
                        // onPressUp={onPressUp}
                        // onPressDown={onPressDown}
                        // onPressTab={onPressTab}
                        onPressEnter={onPressEnter}
                        onFilesPaste={props.onAttach}
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

export const useMessageModal = (props: MessageModalProps): [boolean, () => void] => {
    let [open, setOpen] = React.useState(false);

    const show = () => {
        setOpen(true);
        showModalBox({
            title: `Message to ${props.name}`,
            titleTruncation: true,
            width: 480,
            onCancel: () => setOpen(false)
        },
            ctx => <MessageModal {...props} ctx={ctx} />
        );
    };
    return [open, show];
};
