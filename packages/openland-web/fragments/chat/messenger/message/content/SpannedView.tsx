import * as React from 'react';
import { useUserPopper } from 'openland-web/components/UserPopper';
import { UserForMention } from 'openland-api/Types';
import { css, cx } from 'linaria';
import { Span } from 'openland-y-utils/spans/Span';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { OthersPopper } from './OthersPopper';
import { TextTitle2 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';

const boldTextClassName = css`
    font-weight: bold;
`;

const boldTextServiceClassName = css`
    font-weight: 600;
`;

const italicTextClassName = css`
    font-style: italic;
`;

const ironyTextClassName = css`
    font-style: italic;
    color: var(--accentNegative);
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
    overflow-y: hidden;
    overflow-x: auto;
`;

const loudTextClassName = css`
    color: var(--foregroundPrimary);
    padding-top: 8px;
    padding-bottom: 4px;
    display: inline-block;

    &:first-child {
        padding-top: 4px;
    }
`;

const onlyEmojiClassName = css`
    font-size: 38px;
    line-height: 38px;
`;

const rotatingTextClassName = css`
    color: var(--foregroundPrimary);
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
    color: var(--foregroundPrimary);
    background: url(https://cdn.openland.com/shared/web/insane.gif);
    background-clip: text, border;
    -webkit-background-clip: text;
    color: transparent;
`;

const mentionServiceClassName = css`
    color: #676d7a !important;
    font-weight: 600;

    &:hover {
        color: #676d7a !important;
        text-decoration: none;
    }
`;

const mentionClassName = css`
    color: #1885f2;
    font-weight: 600;

    &:hover {
        color: #1885f2;
        text-decoration: none;
    }
`;

const mentionBgClassName = css`
    background-color: #d6edff;
    padding: 2px 4px;
    border-radius: 4px;
`;

const MentionedUser = React.memo(
    ({
        user,
        text,
        isYou,
        isService,
    }: {
        user: UserForMention;
        text: any;
        isYou: boolean;
        isService?: boolean;
    }) => {
        const [show] = useUserPopper({ user: user, isMe: isYou, noCardOnMe: true });
        return (
            <span onMouseEnter={show}>
                <ULink
                    path={`/${user.shortname || user.id}`}
                    className={cx(
                        mentionClassName,
                        isYou && !isService && mentionBgClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {text}
                </ULink>
            </span>
        );
    },
);

export const SpanView = React.memo<{ span: Span; children?: any; isService?: boolean }>(props => {
    const { span, children } = props;

    if (span.type === 'link') {
        return <ULink href={span.link}>{children}</ULink>;
    } else if (span.type === 'bold') {
        return (
            <span className={cx(boldTextClassName, props.isService && boldTextServiceClassName)}>
                {children}
            </span>
        );
    } else if (span.type === 'italic') {
        return <span className={italicTextClassName}>{children}</span>;
    } else if (span.type === 'loud') {
        return <span className={cx(loudTextClassName, TextTitle2)}>{children}</span>;
    } else if (span.type === 'rotating') {
        return <span className={cx(rotatingTextClassName, TextTitle2)}>{children}</span>;
    } else if (span.type === 'insane') {
        return <span className={cx(insaneTextClassName, TextTitle2)}>{children}</span>;
    } else if (span.type === 'irony') {
        return <span className={ironyTextClassName}>{children}</span>;
    } else if (span.type === 'code_inline') {
        return <span className={codeInlineClassName}>{children}</span>;
    } else if (span.type === 'code_block') {
        return <div className={codeBlockClassName}>{children}</div>;
    } else if (span.type === 'mention_room') {
        return (
            <ULink
                path={'/group/' + span.room.id}
                className={cx(props.isService && mentionServiceClassName)}
            >
                {children}
            </ULink>
        );
    } else if (span.type === 'mention_user') {
        return (
            <MentionedUser
                isYou={span.user.isYou}
                text={children}
                user={span.user}
                isService={props.isService}
            />
        );
    } else if (span.type === 'mention_users') {
        return <OthersPopper users={span.users}>{children}</OthersPopper>;
        // } else if (span.type === 'mention_all') {
        //     return <MentionComponentInnerText isYou={true}>{children}</MentionComponentInnerText>;
    } else if (span.type === 'new_line') {
        return <br />;
    } else if (span.type === 'emoji') {
        return <span className={onlyEmojiClassName}>{children}</span>;
    } else if (span.type === 'text') {
        return <span>{span.text}</span>;
    }

    return props.children ? <span>{props.children}</span> : null;
});

export const SpannedView = React.memo<{ spans: Span[]; isService?: boolean }>(props => {
    return <>{renderSpans(SpanView, props.spans, props.isService)}</>;
});
