import * as React from 'react';
import { EmojiData } from 'emoji-mart';
import { XView } from 'react-mental';
import { EmojiButton } from './EmojiButton';
import { css, cx } from 'linaria';
import { XIcon } from 'openland-x/XIcon';
import PhotoIcon from 'openland-icons/ic-photo-2.svg';
import FileIcon from 'openland-icons/ic-file-3.svg';
import { UploadContext } from 'openland-web/modules/FileUploading/UploadContext';
import Glamorous from 'glamorous';

const photoIconClassName = css`
    width: 18px;
    height: 18px;
    & * {
        width: 18px;
        height: 18px;
    }
`;

const fileIconClassName = css`
    width: 18px;
    height: 18px;
    & * {
        width: 18px;
        height: 18px;
    }
`;

const sendIconClassName = css`
    width: 14px;
    height: 14px;
    font-size: 14px;
    color: white;
    position: absolute;
    left: 3px;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
`;

const sendIconWrapperClassName = css`
    position: relative;
    width: 30px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;

    border-radius: 15px;
`;

const sendIconWrapperActiveWrapperClassName = css`
    background-color: #1790ff;
`;

const iconWrapperClassName = css`
    z-index: 1;
    & * {
        cursor: pointer;
        fill: #c1c7cf;
    }
`;

const PhotoButton = ({ fileSelector }: { fileSelector: () => void }) => {
    return (
        <div className={cx(photoIconClassName, iconWrapperClassName)} onClick={fileSelector}>
            <PhotoIcon />
        </div>
    );
};

const DocumentButton = ({ fileSelector }: { fileSelector: () => void }) => {
    return (
        <div className={cx(fileIconClassName, iconWrapperClassName)} onClick={fileSelector}>
            <FileIcon />
        </div>
    );
};

const SendIconWrapper = ({ onSubmit, active }: { onSubmit?: () => void; active: boolean }) => {
    return (
        <div
            className={cx(
                iconWrapperClassName,
                sendIconWrapperClassName,
                active && sendIconWrapperActiveWrapperClassName,
            )}
            onClick={onSubmit}
        >
            <XIcon icon="send" className={sendIconClassName} />
        </div>
    );
};

const FileInput = Glamorous.input({
    display: 'none',
});

export const Icons = ({
    hideAttachments,
    hasText,
    minimal,
    onEmojiPicked,
    onSubmit,
}: {
    hideAttachments?: boolean;
    hasText?: boolean;
    minimal?: boolean;
    onEmojiPicked: (emoji: EmojiData) => void;
    onSubmit?: () => Promise<void>;
}) => {
    const fileInput: React.RefObject<HTMLInputElement> = React.createRef();
    const { handleDrop, file } = React.useContext(UploadContext);

    const fileSelector = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleInputChange = (e: any) => {
        handleDrop(e.target.files[0]);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    return (
        <XView
            position="absolute"
            height="100%"
            alignItems="center"
            top={0}
            right={minimal ? 6 : 16}
            zIndex={1}
            flexDirection="row"
        >
            <FileInput type="file" innerRef={fileInput} onChange={handleInputChange} />
            {minimal && !hideAttachments && (
                <XView marginRight={20}>
                    <PhotoButton fileSelector={fileSelector} />
                </XView>
            )}
            {minimal && !hideAttachments && (
                <XView marginRight={18}>
                    <DocumentButton fileSelector={fileSelector} />
                </XView>
            )}
            {minimal && (
                <XView marginRight={16}>
                    <EmojiButton onEmojiPicked={onEmojiPicked} />
                </XView>
            )}
            {!minimal && (
                <XView>
                    <EmojiButton onEmojiPicked={onEmojiPicked} />
                </XView>
            )}
            {minimal && <SendIconWrapper active={!!file || !!hasText} onSubmit={onSubmit} />}
        </XView>
    );
};
