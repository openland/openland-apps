import * as React from 'react';
import { XView } from 'react-mental';
import { MentionComponentInnerText } from 'openland-x/XRichTextInput';
import { UserPopper } from 'openland-web/components/UserPopper';
import { UserShort } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { LinkToRoom } from './service/views/LinkToRoom';
import { OthersPopper, JoinedUserPopperRowProps } from './service/views/OthersPopper';
import { SpannedString } from '../../data/SpannedString';
import { isInternalLink } from 'openland-web/utils/isInternalLink';
import { makeInternalLinkRelative } from 'openland-web/utils/makeInternalLinkRelative';
import { Span } from 'openland-y-utils/spans/Span';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';

const EmojiSpaceStyle = css`
    & img {
        margin-left: 1px;
        margin-right: 1px;
    }
`;

const boldTextClassName = css`
    font-weight: bold;
`;

const italicTextClassName = css`
    font-style: italic;
`;

const ironyTextClassName = css`
    font-style: italic;
    color: #d75454;
`;

const codeInlineClassName = css`
    padding-left: 6px;
    padding-right: 6px;
    background-color: rgba(255, 171, 0, 0.1);
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
`;

const codeBlockClassName = css`
    display: block;
    padding: 8px 16px;
    background-color: rgba(255, 171, 0, 0.1);
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
    white-space: pre;
    word-wrap: normal;
`;

const loudTextClassName = css`
    font-size: 36px;
    line-height: 40px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
`;

const rotatingTextClassName = css`
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

const insaneTextClassName = css`
    background: url(https://cdn.openland.com/shared/web/insane.gif);
    background-clip: text, border;
    -webkit-background-clip: text;
    color: transparent;
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

const SpanView = React.memo<{ span: Span, children?: any }>(props => {
    const { span, children } = props;

    if (span.type === 'link') {
        let href: string | undefined = span.link || undefined;
        let path: string | undefined = undefined;

        let internalLink = isInternalLink(href || '');

        if (internalLink) {
            path = makeInternalLinkRelative(href || '');
            href = undefined;
        }
        let openlandLink: boolean = !!internalLink;
        
        return (
            <span className={LinkText}>
                <XView
                    as="a"
                    target={openlandLink ? undefined : '_blank'}
                    href={href}
                    path={path}
                >
                    {children}
                </XView>
            </span>
        );
    } else if (span.type === 'bold') {
        return (
            <span className={boldTextClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'italic') {
        return (
            <span className={italicTextClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'loud') {
        return (
            <span className={loudTextClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'rotating') {
        return (
            <span className={loudTextClassName + ' ' + rotatingTextClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'insane') {
        return (
            <span className={loudTextClassName + ' ' + insaneTextClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'irony') {
        return (
            <span className={ironyTextClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'code_inline') {
        return (
            <span className={codeInlineClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'code_block') {
        return (
            <span className={codeBlockClassName}>
                {children}
            </span>
        );
    } else if (span.type === 'mention_room') {
        return (
            <LinkToRoom
                text={children}
                roomId={span.id}
            />
        );
    } else if (span.type === 'mention_user') {
        return (
            <MentionedUser
                isYou={span.user.isYou}
                text={children}
                user={span.user}
            />
        );
    } else if (span.type === 'mention_users') {
        let otherItems: JoinedUserPopperRowProps[] = [];

        span.users.map(j => {
            otherItems.push({
                title: j.name,
                subtitle: '',
                photo: j.photo || '',
                id: j.id,
            });
        });

        return (<OthersPopper items={otherItems}>{children}</OthersPopper>);
    } else if (span.type === 'new_line') {
        return <br />;
    } else if (span.type === 'text') {
        return <span>{span.text}</span>;
    }

    return props.children ? <span>{props.children}</span> : null;
});

export const SpannedView = React.memo<{ spans: Span[] }>(props => {
    return (
        <>
            {renderSpans(SpanView, props.spans)}
        </>
    );
});