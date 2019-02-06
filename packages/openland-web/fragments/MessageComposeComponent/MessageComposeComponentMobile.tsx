import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import UploadCare from 'uploadcare-widget';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';
import { DropZone } from './FileUploading/DropZone';
import { FileUploader } from './FileUploading/FileUploader';
import { UploadContext } from './FileUploading/UploadContext';
import { SendMessageWrapper, SendMessageContent } from './Components';
import { AttachmentButtons } from './AttachmentButtons';
import { MessageFull_mentions, PostMessageType } from 'openland-api/Types';

const TextArea = css`
    border-radius: 10px;
    background-color: #fff;
    border: solid 1px #ececec;
    min-height: 40px;
    max-height: 255px;
    overflow: auto;
    padding-top: 9px;
    padding-bottom: 9px;
    padding-left: 16px;
    padding-right: 16px;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const InputPlaceholder = css`
    position: absolute;
    top: 10px;
    left: 17px;
    pointer-events: none;
    color: rgba(0, 0, 0, 0.5);
`;

const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '\n': '<br>',
};

function escapeHtml(str: string) {
    return String(str).replace(/[&<>"'`=\/\n]/g, function(s: string) {
        return entityMap[s];
    });
}

export const MobileMessageCompose = ({
    onSendFile,
    onSend,
    enabled,
    handleHideChat,
    onChange,
}: {
    onSendFile?: ((file: UploadCare.File) => void) | undefined;
    onSend?: ((text: string, mentions: MessageFull_mentions[] | null) => void) | undefined;
    enabled?: boolean | undefined;
    handleHideChat?: ((show: boolean, postType: PostMessageType | null) => void) | undefined;
    onChange?: ((text: string) => void) | undefined;
}) => {
    const [message, setMessage] = React.useState('');
    const { file, fileRemover } = React.useContext(UploadContext);
    const { handleDrop } = React.useContext(UploadContext);
    const inputRef = React.createRef<HTMLDivElement>();

    const closeEditor = () => {
        setMessage('');
        fileRemover();

        if (inputRef.current) {
            inputRef.current.innerText = '';
        }
    };

    const onUploadCareSendFile = (fileToUpload: UploadCare.File) => {
        const ucFile = UploadCare.fileFrom('object', fileToUpload);
        if (onSendFile) {
            onSendFile(ucFile);
        }
    };

    const handleSend = () => {
        if (message.trim().length > 0) {
            let msg = message.trim();
            if (onSend) {
                onSend(msg, null);

                if (file) {
                    onUploadCareSendFile(file);
                }
            }
        } else if (file) {
            onUploadCareSendFile(file);
        }
        closeEditor();
    };

    const handleDialogDone = (r: UploadCare.File) => {
        setMessage('');
        if (onSendFile) {
            onSendFile(r);
        }
    };

    const onPaste = (e: any) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertHTML', false, escapeHtml(text));
        if (inputRef.current) {
            inputRef.current.scrollTop = inputRef.current.scrollHeight;
        }
    };

    const handleChange = () => {
        if (!inputRef.current) {
            return;
        }

        const msg = inputRef.current.innerText;

        setMessage(msg);

        if (onChange) {
            onChange(msg);
        }
    };

    return (
        <SendMessageWrapper>
            <DropZone height="calc(100% - 115px)" onFileDrop={handleDrop} />
            <SendMessageContent separator={4} alignItems="center">
                <XVertical separator={6} flexGrow={1} maxWidth="100%">
                    <XView flexGrow={1} maxHeight="100%" maxWidth="100%">
                        <div
                            contentEditable={true}
                            className={TextArea}
                            onInput={handleChange}
                            onPaste={onPaste}
                            ref={inputRef}
                        />
                        {message === '' && (
                            <div className={InputPlaceholder}>Write a message...</div>
                        )}
                    </XView>
                    <XHorizontal alignItems="center" justifyContent="space-between" flexGrow={1}>
                        <AttachmentButtons
                            enabled={enabled}
                            handleHideChat={handleHideChat}
                            handleDialogDone={handleDialogDone}
                        />

                        <XButton
                            text="Send"
                            style="primary"
                            action={handleSend}
                            iconRight="send"
                            enabled={enabled !== false}
                        />
                    </XHorizontal>
                    <FileUploader />
                </XVertical>
            </SendMessageContent>
        </SendMessageWrapper>
    );
};
