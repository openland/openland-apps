import * as React from 'react';
import { useUserPopper, useEntityPopper } from 'openland-web/components/EntityPoppers';
import {
    UserForMention,
    OrganizationShort,
    RoomNano,
    Room_room_SharedRoom,
} from 'openland-api/spacex.types';
import { css, cx } from 'linaria';
import { Span } from 'openland-y-utils/spans/Span';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { OthersPopper } from './OthersPopper';
import { TextTitle2 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';
import { plural } from 'openland-y-utils/plural';
import { isInviteLink, InviteLink } from './InviteContent';
import { useClient } from 'openland-api/useClient';
import { XViewRouterContext, XViewRouter } from 'react-mental';

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
    (props: { user: UserForMention; children: any; isService?: boolean }) => {
        const { user, children, isService } = props;
        const [show] = useUserPopper({ user, isMe: user.isYou, noCardOnMe: true });
        return (
            <span onMouseEnter={show}>
                <ULink
                    path={`/${user.shortname || user.id}`}
                    className={cx(
                        mentionClassName,
                        user.isYou && !isService && mentionBgClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {children}
                </ULink>
            </span>
        );
    },
);

interface OpenEntityParams {
    isGroup: boolean;
    entity: RoomNano | OrganizationShort;
    router: XViewRouter;
}

const openEntity = async (params: OpenEntityParams) => {
    const { isGroup, entity, router } = params;

    if (isGroup) {
        router.navigate(`/mail/${entity.id}`);
    } else {
        router.navigate(`/${entity.id}`);
    }
};

const MentionedGroup = React.memo(
    (props: { group: RoomNano; children: any; isService?: boolean }) => {
        const { group, children, isService } = props;
        let subtitle =
            group.__typename === 'SharedRoom'
                ? group.isChannel
                    ? 'Channel'
                    : 'Group'
                : 'Private chat';

        if (group.__typename === 'SharedRoom') {
            subtitle +=
                ', ' +
                plural(
                    group.membersCount,
                    group.isChannel ? ['follower', 'followers'] : ['member', 'members'],
                );
        }

        const [show] = useEntityPopper({
            title: group.__typename === 'SharedRoom' ? group.title : group.user.name,
            photo: group.__typename === 'SharedRoom' ? group.roomPhoto : group.user.photo,
            subtitle,
            id: group.id,
        });

        const client = useClient();
        const router = React.useContext(XViewRouterContext)!;

        return (
            <span onMouseEnter={show}>
                <ULink
                    // path={`/group/${group.id}`}
                    onClick={() =>
                        openEntity({
                            isGroup: true,
                            entity: group,
                            router,
                        })
                    }
                    className={cx(
                        mentionClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {children}
                </ULink>
            </span>
        );
    },
);

const MentionedOrganization = React.memo(
    (props: { organization: OrganizationShort; children: any; isService?: boolean }) => {
        const { organization, children, isService } = props;
        const [show] = useEntityPopper({
            title: organization.name,
            photo: organization.photo,
            subtitle:
                (organization.isCommunity ? 'Community' : 'Organization') +
                ', ' +
                plural(organization.membersCount, ['member', 'members']),
            id: organization.id,
        });
        const client = useClient();
        const router = React.useContext(XViewRouterContext)!;
        return (
            <span onMouseEnter={show}>
                <ULink
                    // path={`/${organization.shortname || organization.id}`}
                    onClick={() =>
                        openEntity({
                            isGroup: false,
                            entity: organization,
                            router,
                        })
                    }
                    className={cx(
                        mentionClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {children}
                </ULink>
            </span>
        );
    },
);

export const SpanView = React.memo<{ span: Span; children?: any; isService?: boolean }>(props => {
    const { span, children } = props;

    if (span.type === 'link') {
        if (isInviteLink(span.link)) {
            return <InviteLink link={span.link}>{children}</InviteLink>;
        }
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
            <MentionedGroup group={span.room} isService={props.isService}>
                {children}
            </MentionedGroup>
        );
    } else if (span.type === 'mention_organization') {
        return (
            <MentionedOrganization organization={span.organization} isService={props.isService}>
                {children}
            </MentionedOrganization>
        );
    } else if (span.type === 'mention_user') {
        return (
            <MentionedUser user={span.user} isService={props.isService}>
                {children}
            </MentionedUser>
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
