import * as React from 'react';
import { XView } from 'react-mental';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { isEmoji } from 'openland-y-utils/isEmoji';
import { LinkToRoom } from './service/views/LinkToRoom';
import { OthersPopper, JoinedUserPopperRowProps } from './service/views/OthersPopper';
import { SpannedString } from '../../data/SpannedString';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { MessagesStateContext } from '../../MessagesStateContext';
import { IsActiveContext } from 'openland-web/pages/main/mail/components/Components';

const EmojiSpaceStyle = css`
    & img {
        margin-left: 1px;
        margin-right: 1px;
    }
`;

const boldTextClassName = css`
    font-weight: bold;
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

const MentionedUser = React.memo(
    ({ user, text, isYou }: { user: UserShort; text: any; isYou: boolean }) => {
        return (
            <UserPopper user={user} isMe={isYou} noCardOnMe startSelected={false}>
                <MentionComponentInnerText isYou={isYou}>{text}</MentionComponentInnerText>
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

interface SpannedStringViewProps {
    spannedString: SpannedString;
    isService?: boolean;
}

export const SpannedStringView = React.memo<SpannedStringViewProps>(props => {
    const messagesContextProps = React.useContext(MessagesStateContext);
    const isActive = React.useContext(IsActiveContext);
    const doRerender = messagesContextProps.useForwardHeader && isActive;
    if (!isActive) {
        return null;
    }
    let res: any[] = [];
    let i = 0;
    for (let s of props.spannedString.spans) {
        if (s.type === 'text') {
            res.push(
                <span
                    key={'text-' + i}
                    className={cx(
                        EmojiSpaceStyle,
                        s.isBig && TextLargeStyle,
                        s.isInsane && TextInsaneStyle,
                        s.isRotating && TextRotatingStyle,
                        s.isOnlyEmoji && TextOnlyEmojiStyle,
                    )}
                >
                    {s.textEmoji}
                </span>,
            );
        } else if (s.type === 'link') {
            let href: string | undefined = s.url || undefined;
            let path: string | undefined = undefined;

            let internalLink = isInternalLink(href || '');

            if (internalLink) {
                path = makeInternalLinkRelative(href || '');
                href = undefined;
            }
            let openlandLink: boolean = !!internalLink;

            if (doRerender) {
                path = undefined;
                href = undefined;
            }

            if (!props.isService) {
                res.push(
                    <span key={'link-' + i} className={LinkText}>
                        <XView
                            as="a"
                            target={openlandLink ? undefined : '_blank'}
                            href={href}
                            path={path}
                            hoverTextDecoration={
                                doRerender ? 'none' : undefined
                            }
                        >
                            <SpannedStringView
                                spannedString={s.child}
                                isService={props.isService}
                            />
                        </XView>
                    </span>,
                );
            }
        } else if (s.type === 'bold') {
            res.push(
                <span key={'bold-' + i} className={boldTextClassName}>
                    <SpannedStringView spannedString={s.child} />
                </span>,
            );
        } else if (s.type === 'group') {
            res.push(
                <LinkToRoom
                    key={'room-' + i}
                    text={<SpannedStringView spannedString={s.child} />}
                    roomId={s.group.id}
                />,
            );
        } else if (s.type === 'user') {
            res.push(
                <MentionedUser
                    key={'user-' + i}
                    isYou={s.user.isYou}
                    text={<SpannedStringView spannedString={s.child} />}
                    user={{
                        __typename: 'User',
                        id: s.user.id,
                        name: s.user.name,
                        firstName: s.user.name,
                        lastName: null,
                        photo: s.user.photo,
                        email: null,
                        online: false,
                        lastSeen: null,
                        isYou: s.user.isYou,
                        isBot: false,
                        shortname: null,
                        primaryOrganization: s.user.primaryOrganization,
                    }}
                />,
            );
        } else if (s.type === 'users') {
            let otherItems: JoinedUserPopperRowProps[] = [];
            s.users.map(j => {
                otherItems.push({
                    title: j.name,
                    subtitle: '',
                    photo: j.photo || '',
                    id: j.id,
                });
            });
            res.push(<OthersPopper items={otherItems}>{s.users.length} others</OthersPopper>);
        }

        i++;
    }
    return <>{res}</>;
});
