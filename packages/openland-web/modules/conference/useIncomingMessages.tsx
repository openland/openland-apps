import * as React from 'react';
import { DataSourceMessageItem, DataSourceDateItem, DataSourceNewDividerItem } from 'openland-engines/messenger/ConversationEngine';
import { XView } from 'react-mental';
import { cx, css } from 'linaria';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { emoji } from 'openland-y-utils/emoji';

import { SpannedView } from 'openland-web/fragments/chat/messenger/message/content/SpannedView';
import { MessageSenderContent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { FullMessage_GeneralMessage_attachments_MessageAttachmentFile } from 'openland-api/spacex.types';
import { ImgWithRetry } from 'openland-web/components/ImgWithRetry';
import { showImageModal } from 'openland-web/fragments/chat/messenger/message/content/ImageContent';
import { SpanType } from 'openland-y-utils/spans/Span';

const MediaItemClass = css`
    display: flex;
    width: 40px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 8px;

    &::before {
        content: '';
        display: block;
        padding-top: 100%;
    }
    &::after {
        content: '';
        position: absolute;
        opacity: 0;
        top: 1px;
        left: 1px;
        bottom: 1px;
        right: 1px;
        background: var(--overlayLight);
        border-radius: 8px;
    }
    &:hover::after {
        opacity: 1;
    }
`;
const MediaItemContentClass = css`
    position: absolute;
    top: 1px;
    left: 1px;

    border-radius: 8px;
    display: block;
    width: calc(100% - 2px);
    opacity: 0;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
`;

const ImgPreviewClass = css`
    position: absolute;
    top: -5px;
    left: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    filter: blur(5px);
    border-radius: 8px;
`;

const ImgPreviewContainerClass = css`
    position: absolute;
    top: 1px;
    left: 1px;
    bottom: 1px;
    right: 1px;

    border-radius: 8px;
    overflow: hidden;
    transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
    will-change: opacity;
`;

interface MediaContentProps {
    attach: FullMessage_GeneralMessage_attachments_MessageAttachmentFile;
    chatId: string;
    messageId?: string;
    senderNameEmojify: string | JSX.Element;
    messageDate: number;
}

export const MediaContent = React.memo((props: MediaContentProps) => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const placeholderRef = React.useRef<HTMLDivElement>(null);
    const onClick = React.useCallback(() => {
        showImageModal({
            chatId: props.chatId,
            mId: props.messageId,
            fileId: props.attach.fileId,
            imageWidth: props.attach.fileMetadata.imageWidth || 0,
            imageHeight: props.attach.fileMetadata.imageHeight || 0,
            preview: props.attach.filePreview,
            senderNameEmojify: props.senderNameEmojify,
            date: props.messageDate,
        });
    }, []);

    const onLoad = React.useCallback(() => {
        if (imgRef.current && placeholderRef.current) {
            imgRef.current.style.opacity = '1';
            placeholderRef.current.style.opacity = '0';
            placeholderRef.current.style.visibility = 'hidden';
        }
    }, []);
    return (
        <div className={MediaItemClass} onClick={onClick}>
            <div className={ImgPreviewContainerClass} ref={placeholderRef}>
                <ImgWithRetry
                    className={ImgPreviewClass}
                    src={props.attach.filePreview || undefined}
                />
            </div>

            <ImgWithRetry
                ref={imgRef}
                className={MediaItemContentClass}
                src={`https://ucarecdn.com/${
                    props.attach.fileId
                    }/-/format/auto/-/scale_crop/80x80/smart/`}
                onLoad={onLoad}
            />

            <XView
                position="absolute"
                top={1}
                left={1}
                right={1}
                bottom={1}
                borderWidth={1}
                borderColor="var(--borderLight)"
                borderRadius={8}
                zIndex={2}
            />
        </div>
    );
});

const messageWrapper = cx(
    'x',
    css`
        padding: 12px 16px;
        background-color: var(--backgroundPrimary);
        border-radius: 8px;
        box-shadow: 0px 0px 48px var(--borderLight), 0px 8px 24px var(--border);
        overflow: hidden;
        flex-direction: row;
        margin-bottom: 16px;
        opacity: 0;
        transform: scale(0.84) translateY(-8px);
        transition: transform 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99),
            opacity 150ms cubic-bezier(0.29, 0.09, 0.24, 0.99);
    `
);

const messageVisible = css`
    opacity: 1;
    transform: scale(1) translateY(0);
`;

const textContentWrapper = css`
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: var(--text-max-height);
`;

const heightBySpan = {
    [SpanType.loud]: 72,
    [SpanType.emoji]: 84,
};

type IncomingMessage = DataSourceMessageItem | DataSourceDateItem | DataSourceNewDividerItem;

const IncomingMessage = React.memo((props: { message: DataSourceMessageItem, onHide: (messageId: string) => void }) => {
    const { message, onHide } = props;
    const [visible, setVisible] = React.useState(false);

    const senderNameEmojify = React.useMemo(() => emoji(message.senderName), [message.senderName]);
    const imageAttaches =
        (message.attachments && message.attachments.filter(
            a => a.__typename === 'MessageAttachmentFile' && a.fileMetadata.isImage,
        ) as FullMessage_GeneralMessage_attachments_MessageAttachmentFile[]) || [];

    React.useEffect(() => {
        setTimeout(() => {
            setVisible(true);
        }, 10);
        let timeoutId = setTimeout(() => {
            setVisible(false);
            onHide(message.id!);
        }, 6000);

        return () => window.clearTimeout(timeoutId);
    }, []);

    const firstSpanType = message.textSpans.map(x => x.type)[0];
    const textMaxHeight = heightBySpan[firstSpanType] || 60;
    const textContent = message.text ? (
        <div className={textContentWrapper} style={{ '--text-max-height': `${textMaxHeight}px` } as React.CSSProperties}>
            <SpannedView spans={message.textSpans} />
        </div>
    ) : message.fallback ? (
        <XView {...TextStyles.Body} color="var(--foregroundSecondary)">{message.fallback}</XView>
    ) : null;

    let imageContent: JSX.Element | null = null;

    if (imageAttaches[0]) {
        imageContent = (
            <XView marginLeft={16} justifyContent="center">
                <MediaContent
                    attach={imageAttaches[0]}
                    chatId={message.chatId}
                    messageId={message.id}
                    senderNameEmojify={senderNameEmojify}
                    messageDate={message.date}
                />
            </XView>
        );
    }

    return (
        <div className={cx(messageWrapper, visible && messageVisible)}>
            <XView marginRight={16} paddingTop={4}>
                <UAvatar
                    id={message.senderId}
                    title={message.senderName}
                    photo={message.senderPhoto}
                />
            </XView>
            <XView flexGrow={1} flexShrink={1}>
                <MessageSenderContent sender={message.sender} senderNameEmojify={senderNameEmojify} />
                {textContent}
            </XView>
            {imageContent}
        </div>
    );
});

export const useIncomingMessages = (): [JSX.Element | null, (item: IncomingMessage) => void] => {
    const [messages, setMessages] = React.useState<DataSourceMessageItem[]>([]);
    const addMessage = (item: IncomingMessage) => {
        if (item.type === 'message') {
            setMessages(prev => [item, ...prev]);
        }
    };
    const handleHide = (messageId: string) => {
        setTimeout(() => {
            setMessages(prev => prev.filter(m => m.id !== messageId));
        }, 150);
    };

    const renderedMessages = (
        <XView
            position="absolute"
            top={16}
            right={80}
            width={320}
            height="100%"
            zIndex={4}
            overflow="hidden"
        >
            {messages.map(m => <IncomingMessage key={m.id} message={m} onHide={handleHide} />)}
        </XView>
    );
    return [renderedMessages, addMessage];
};
