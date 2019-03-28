import * as React from 'react';
import { XView } from 'react-mental';
import { Container } from './views/Container';
import { FullMessage_ServiceMessage_spans } from 'openland-api/Types';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { emoji } from 'openland-y-utils/emoji';
import { css, cx } from 'linaria';
import { OthersPopper } from './views/OthersPopper';
import { LinkToRoom } from './views/LinkToRoom';
import { isEmoji } from 'openland-y-utils/isEmoji';

const EmojiSpaceStyle = css`
    & img {
        margin-left: 1px;
        margin-right: 1px;
    }
`;

const boldTextClassName = css`
    font-weight: bold;
`;

const EditLabelStyle = css`
    display: inline-block;
    vertical-align: baseline;
    color: rgba(0, 0, 0, 0.4);
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    padding-left: 6px;
    letter-spacing: 0;
`;

const TextOnlyEmojiStyle = css`
    letter-spacing: 3px;
    & img {
        margin-right: 4px;
    }
`;

const TextLargeStyle = css`
    display: inline;
    white-space: pre-wrap;
    word-wrap: break-word;
    max-width: 100%;
    font-size: 36px;
    min-height: 44px;
    line-height: 40px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
`;

const TextInsaneStyle = css`
    background: url(https://cdn.openland.com/shared/web/insane.gif);
    background-clip: text, border;
    -webkit-background-clip: text;
    color: transparent;
`;

const TextRotatingStyle = css`
    animation: rotate 1s linear infinite;
    display: inline-block;

    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
`;

function emojiChecker(messageText: string) {
    if (isEmoji(messageText)) {
        return true;
    }
    const messageArray = Array.from(messageText);
    const pattern = /^([a-zа-яё\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]+|\d+)$/i;
    for (let i = 0; i < messageArray.length; i++) {
        if (messageArray[i].match(pattern) && messageArray[i] !== '‍' && messageArray[i] !== '️') {
            return false;
        }
    }
    return true;
}

const SpansMessageTextPreprocess = ({
    text,
    isEdited,
    asPinMessage,
}: {
    text: string;
    isEdited?: boolean;
    asPinMessage?: boolean;
}) => {
    const isOnlyEmoji = emojiChecker(text);
    const isRotating = text.startsWith('🔄') && text.endsWith('🔄');
    const isInsane = text.startsWith('🌈') && text.endsWith('🌈');
    const isMouthpiece = text.startsWith('📣') && text.endsWith('📣');
    let isBig =
        isOnlyEmoji ||
        isInsane ||
        isRotating ||
        isMouthpiece ||
        (text.length <= 302 && text.startsWith(':') && text.endsWith(':'));
    const isTextSticker = !isOnlyEmoji && isBig;
    if (isInsane || isMouthpiece || isRotating) {
        text = text
            .replace(/🌈/g, '')
            .replace(/📣/g, '')
            .replace(/🔄/g, '');
    } else if (isTextSticker) {
        text = text.slice(1, text.length - 1);
    }
    if (asPinMessage) {
        isBig = false;
    }
    let smileSize: 38 | 16 = isBig ? 38 : 16;
    return (
        <span
            className={cx(
                EmojiSpaceStyle,
                isBig && TextLargeStyle,
                isInsane && TextInsaneStyle,
                isRotating && TextRotatingStyle,
                isOnlyEmoji && TextOnlyEmojiStyle,
            )}
        >
            {emoji({
                src: text,
                size: smileSize,
            })}
            {isEdited && <span className={EditLabelStyle}>(Edited)</span>}
        </span>
    );
};

const MentionedUser = React.memo(
    ({ user, text, isYou }: { user: UserShort; text: string; isYou: boolean }) => {
        const userNameEmojified = React.useMemo(() => {
            return emoji({
                src: text,
                size: 16,
            });
        }, [text]);

        return (
            <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
                <MentionComponentInnerText isYou={isYou}>
                    {userNameEmojified}
                </MentionComponentInnerText>
            </UserPopper>
        );
    },
);

const LinkText = css`
    display: inline;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    & > a {
        display: inline;
    }
`;

const SpansMessageText = ({ text }: { text: string }) => {
    return (
        <>
            {emoji({
                src: text,
                size: 16,
            })}
        </>
    );
};
export const SpansMessage = ({
    message,
    spans,
    isEdited,
    asPinMessage,
}: {
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
    isEdited?: boolean;
    asPinMessage?: boolean;
}) => {
    console.log(message);
    console.log(spans);
    let res: any[] = [];

    let lastOffset = 0;
    let i = 0;

    if (spans && spans.length) {
        const sortedSpans = spans.sort((span1: any, span2: any) => {
            return span1.offset - span2.offset;
        });

        for (let span of sortedSpans) {
            if (lastOffset < span.offset) {
                res.push(
                    <SpansMessageText
                        key={'text-' + i}
                        text={message.slice(lastOffset, span.offset)}
                    />,
                );
            }

            if (span.__typename === 'MessageSpanMultiUserMention') {
                res.push(
                    <span key={'users-' + i}>
                        <OthersPopper
                            show={true}
                            items={span.users.map(
                                ({ id, name, picture, primaryOrganization }: any) => ({
                                    title: name,
                                    subtitle: primaryOrganization ? primaryOrganization.name : '',
                                    picture,
                                    id,
                                }),
                            )}
                        >
                            {message.slice(span.offset, span.offset + span.length)}
                        </OthersPopper>
                    </span>,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanRoomMention') {
                res.push(
                    <LinkToRoom
                        key={'room-' + i}
                        text={message.slice(span.offset + 1, span.offset + span.length)}
                        roomId={span.room.id}
                    />,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanLink') {
                res.push(
                    <span key={'link-' + i} className={LinkText}>
                        <XView
                            as="a"
                            target="_blank"
                            href={span.url}
                            onClick={(e: any) => e.stopPropagation()}
                        >
                            {message.slice(span.offset, span.offset + span.length)}
                        </XView>
                    </span>,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanUserMention') {
                let finalMessage = message.slice(span.offset, span.offset + span.length);

                if (finalMessage.startsWith('@')) {
                    finalMessage = finalMessage.slice(1);
                }

                res.push(
                    <MentionedUser
                        key={'user-' + i}
                        isYou={span.user.isYou}
                        text={finalMessage}
                        user={{
                            __typename: 'User',
                            id: span.user.id,
                            name: span.user.name,
                            firstName: span.user.name,
                            lastName: null,
                            photo: span.user.photo,
                            email: null,
                            online: false,
                            lastSeen: null,
                            isYou: span.user.isYou,
                            isBot: false,
                            shortname: null,
                            primaryOrganization: null,
                        }}
                    />,
                );
                lastOffset = span.offset + span.length;
            } else if (span.__typename === 'MessageSpanBold') {
                let finalMessage = message.slice(span.offset, span.offset + span.length);

                res.push(
                    <span key={'link-' + i} className={boldTextClassName}>
                        {message.slice(span.offset, span.offset + span.length)}
                    </span>,
                );
                lastOffset = span.offset + span.length;
            }

            i++;
        }

        if (lastOffset < message.length) {
            res.push(
                <SpansMessageText
                    key={'text-' + i}
                    text={message.slice(lastOffset, message.length)}
                />,
            );
        }
    } else {
        return (
            <SpansMessageTextPreprocess
                text={message}
                isEdited={isEdited}
                asPinMessage={asPinMessage}
            />
        );
    }

    return <>{res}</>;
};

export const ServiceMessageDefault = ({
    message,
    spans,
}: {
    message: string;
    spans?: FullMessage_ServiceMessage_spans[];
}) => {
    return (
        <Container>
            <SpansMessage message={message} spans={spans} />
        </Container>
    );
};
