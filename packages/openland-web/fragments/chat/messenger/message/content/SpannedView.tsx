import * as React from 'react';
import { css, cx } from 'linaria';
import { XViewRouterContext, XViewRouter, XView } from 'react-mental';
import { UserPopperContent } from 'openland-web/components/EntityPopperContent';
import { usePopper } from 'openland-web/components/unicorn/usePopper';
import { EntityPopperContent } from 'openland-web/components/EntityPopperContent';
import { MentionItemComponent } from 'openland-web/fragments/chat/components/SendMessageComponent';
import { Span } from 'openland-y-utils/spans/Span';
import { renderSpans } from 'openland-y-utils/spans/renderSpans';
import { ULink } from 'openland-web/components/unicorn/ULink';
import { TextTitle2 } from 'openland-web/utils/TextStyles';
import { defaultHover } from 'openland-web/utils/Styles';
import { useClient } from 'openland-api/useClient';
import { plural } from 'openland-y-utils/plural';
import { isInviteLink, InviteLink } from './InviteContent';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { XLoader } from 'openland-x/XLoader';
import { ChatSearchContext } from 'openland-web/fragments/chat/MessengerFragment';

const boldTextClassName = css`
    font-weight: bold;
`;

const boldTextServiceClassName = css`
    font-weight: 600;
`;

const othersMentionStyle = css`
    font-weight: 600;

    &:hover {
        text-decoration: none;
    }
`;

const othersMentionWrapper = css`
    padding: 8px 0;
    max-height: 70vh;
    max-width: 400px;
    overflow-y: scroll;
`;

const italicTextClassName = css`
    font-style: italic;
`;

const ironyTextClassName = css`
    font-style: italic;
    color: var(--accentNegative);
`;

const searchHighlightClassName = css`
    background-color: var(--accentPrimaryTrans);
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
    font-size: var(--emoji-size);
    line-height: var(--emoji-size);
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
    background: url(https://cdn.openland.com/shared/web/insane.gif);
    background-clip: border-box;
    -webkit-background-clip: text;
    color: transparent;
`;

const mentionServiceClassName = css`
    color: var(--foregroundSecondary) !important;
    font-weight: 600;

    &:hover {
        color: var(--foregroundSecondary) !important;
        text-decoration: none;
    }
`;

const mentionClassName = css`
    cursor: pointer;
    color: var(--accentPrimary);
    font-weight: 600;

    &:hover {
        color: var(--accentPrimary);
        text-decoration: none;
    }
`;

const mentionBgClassName = css`
    background-color: var(--accentPrimaryTrans);
    padding: 2px 4px;
    border-radius: 4px;
`;

const MentionedUserPopperContent = React.memo(
    (props: { userId: string; myId: string; hide: Function }) => {
        const client = useClient();
        const user = client.useUserNano({ id: props.userId }, { fetchPolicy: 'cache-and-network' })
            .user;
        return (
            <UserPopperContent
                user={user}
                isMe={props.userId === props.myId}
                hidePopper={props.hide}
                noCardOnMe={true}
            />
        );
    },
);

const MentionedUser = React.memo(
    (props: { userId: string; children: any; isService?: boolean }) => {
        const engine = React.useContext(MessengerContext);
        const router = React.useContext(XViewRouterContext)!;
        const { userId, children, isService } = props;

        const useWrapper = userId !== engine.user.id;

        const [, show, instantHide] = usePopper(
            {
                placement: 'top',
                hideOnLeave: true,
                useObserve: true,
                borderRadius: 8,
                scope: 'entity-popper',
                useWrapper: useWrapper,
                showTimeout: 400,
                hideOnChildClick: false,
                hideOnClick: false,
                updatedDeps: userId,
            },
            (ctx) => (
                <React.Suspense fallback={<XLoader loading={true} transparentBackground={true} />}>
                    <MentionedUserPopperContent
                        userId={userId}
                        myId={engine.user.id}
                        hide={ctx.hide}
                    />
                </React.Suspense>
            ),
        );
        return (
            <span>
                <span
                    onMouseEnter={show}
                    onClick={(e) => {
                        e.stopPropagation();
                        instantHide();
                        router.navigate(`/${userId}`);
                    }}
                    className={cx(
                        mentionClassName,
                        userId === engine.user.id && !isService && mentionBgClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {children}
                </span>
            </span>
        );
    },
);

interface MentionedOtherUsersPopperContentProps {
    mId?: string;
    hide: Function;
}

const MentionedOtherUsersPopperContent = React.memo(
    (props: MentionedOtherUsersPopperContentProps) => {
        const client = useClient();
        const message = client.useMessageMultiSpan(
            { id: props.mId || '' },
            { fetchPolicy: 'cache-and-network' },
        ).message;
        if (!message) {
            return null;
        }

        // TODO: remove this when cache-and-network be work!
        React.useLayoutEffect(() => {
            (async () => {
                await client.refetchMessageMultiSpan({ id: props.mId || '' });
            })();
        }, []);

        const findSpans = message.spans.find((i) => i.__typename === 'MessageSpanMultiUserMention');
        return (
            <>
                {findSpans &&
                    findSpans.__typename === 'MessageSpanMultiUserMention' &&
                    findSpans.users && (
                        <div className={othersMentionWrapper}>
                            {findSpans.users.map((user, i) => (
                                <XView
                                    key={`user-${user.name}-${i}`}
                                    hoverBackgroundColor="var(--backgroundTertiaryTrans)"
                                    cursor="pointer"
                                    path={`/${user.shortname || user.id}`}
                                    onClick={() => props.hide()}
                                >
                                    <MentionItemComponent
                                        id={user.id}
                                        title={user.name}
                                        photo={user.photo}
                                        subtitle={
                                            user.isBot
                                                ? 'Bot'
                                                : user.primaryOrganization
                                                    ? user.primaryOrganization.name
                                                    : undefined
                                        }
                                    />
                                </XView>
                            ))}
                        </div>
                    )}
            </>
        );
    },
);

const MentionedOtherUsers = React.memo((props: { mId?: string; children: any }) => {
    const { mId, children } = props;
    const [, show] = usePopper(
        {
            placement: 'top',
            hideOnLeave: true,
            useObserve: true,
            scope: 'others-users',
            showTimeout: 400,
        },
        (ctx) => (
            <React.Suspense fallback={<XLoader loading={true} transparentBackground={true} />}>
                <MentionedOtherUsersPopperContent mId={mId} hide={ctx.hide} />
            </React.Suspense>
        ),
    );

    return (
        <span onMouseEnter={show} className={othersMentionStyle}>
            {children}
        </span>
    );
});

interface OpenEntityParams {
    isGroup: boolean;
    entity: string;
    router: XViewRouter;
}

const openEntity = async (params: OpenEntityParams) => {
    const { isGroup, entity, router } = params;

    if (isGroup) {
        router.navigate(`/mail/${entity}`);
    } else {
        router.navigate(`/${entity}`);
    }
};

const MentionedGroupPopperContent = React.memo((props: { groupId: string; hide: Function }) => {
    const client = useClient();
    const group = client.useRoomPico({ id: props.groupId }, { fetchPolicy: 'cache-and-network' })
        .room;
    if (!group) {
        return null;
    }

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

    return (
        <EntityPopperContent
            id={group.id}
            subtitle={subtitle}
            title={group.__typename === 'SharedRoom' ? group.title : group.user.name}
            photo={group.__typename === 'SharedRoom' ? group.photo : group.user.photo}
            hidePopper={props.hide}
            featured={group.__typename === 'SharedRoom' && group.featured}
        />
    );
});

const MentionedGroup = React.memo(
    (props: { groupId: string; children: any; isService?: boolean }) => {
        const { groupId, children, isService } = props;
        const router = React.useContext(XViewRouterContext)!;
        const [, show, instantHide] = usePopper(
            {
                placement: 'top',
                hideOnLeave: true,
                useObserve: true,
                borderRadius: 8,
                scope: 'entity-popper',
                showTimeout: 400,
                updatedDeps: groupId,
            },
            (ctx) => (
                <React.Suspense fallback={<XLoader loading={true} transparentBackground={true} />}>
                    <MentionedGroupPopperContent hide={ctx.hide} groupId={groupId} />
                </React.Suspense>
            ),
        );

        return (
            <span>
                <span
                    onMouseEnter={show}
                    onClick={(e) => {
                        e.stopPropagation();
                        instantHide();
                        openEntity({
                            isGroup: true,
                            entity: groupId,
                            router,
                        });
                    }}
                    className={cx(
                        mentionClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {children}
                </span>
            </span>
        );
    },
);

const MentionedOrgPopperContent = React.memo(
    (props: { organizationId: string; hide: Function }) => {
        const client = useClient();
        const organization = client.useOrganizationPico(
            { id: props.organizationId },
            { fetchPolicy: 'cache-and-network' },
        ).organization;

        return (
            <EntityPopperContent
                id={organization.id}
                subtitle={
                    (organization.isCommunity ? 'Community' : 'Organization') +
                    ', ' +
                    plural(organization.membersCount, ['member', 'members'])
                }
                title={organization.name}
                photo={organization.photo}
                hidePopper={props.hide}
                featured={organization.featured}
            />
        );
    },
);

const MentionedOrganization = React.memo(
    (props: { organizationId: string; children: any; isService?: boolean }) => {
        const { organizationId, children, isService } = props;
        const router = React.useContext(XViewRouterContext)!;
        const [, show, instantHide] = usePopper(
            {
                placement: 'top',
                hideOnLeave: true,
                useObserve: true,
                borderRadius: 8,
                scope: 'entity-popper',
                showTimeout: 400,
                updatedDeps: organizationId,
            },
            (ctx) => (
                <React.Suspense fallback={<XLoader loading={true} transparentBackground={true} />}>
                    <MentionedOrgPopperContent hide={ctx.hide} organizationId={organizationId} />
                </React.Suspense>
            ),
        );
        return (
            <span>
                <span
                    onMouseEnter={show}
                    onClick={(e) => {
                        e.stopPropagation();
                        instantHide();
                        openEntity({
                            isGroup: false,
                            entity: organizationId,
                            router,
                        });
                    }}
                    className={cx(
                        mentionClassName,
                        isService && mentionServiceClassName,
                        isService && defaultHover,
                    )}
                >
                    {children}
                </span>
            </span>
        );
    },
);

const HashtagView = React.memo((props: { text?: string; children: any }) => {
    const chatSearchContext = React.useContext(ChatSearchContext);

    const handleClick = () => {
        chatSearchContext!.setChatSearchState({ enabled: true, initialQuery: props.text });
    };

    return <ULink onClick={handleClick}>{props.children}</ULink>;
});

export const SpanView = React.memo<{
    span: Span;
    children?: any;
    isService?: boolean;
    mId?: string;
}>((props) => {
    const { span, children } = props;
    if (span.type === 'link') {
        if (isInviteLink(span.link)) {
            return <InviteLink link={span.link}>{children}</InviteLink>;
        }
        return <ULink href={span.link}>{children}</ULink>;
    } else if (span.type === 'hashtag') {
        return <HashtagView text={span.textRaw}>{children}</HashtagView>;
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
    } else if (span.type === 'search_highlight') {
        return <span className={searchHighlightClassName}>{children}</span>;
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
            <MentionedGroup groupId={span.room.id} isService={props.isService}>
                {children}
            </MentionedGroup>
        );
    } else if (span.type === 'mention_organization') {
        return (
            <MentionedOrganization
                organizationId={span.organization.id}
                isService={props.isService}
            >
                {children}
            </MentionedOrganization>
        );
    } else if (span.type === 'mention_user') {
        return (
            <MentionedUser userId={span.user.id} isService={props.isService}>
                {children}
            </MentionedUser>
        );
    } else if (span.type === 'mention_users') {
        return <MentionedOtherUsers mId={props.mId}>{children}</MentionedOtherUsers>;
    } else if (span.type === 'new_line') {
        return <br />;
    } else if (span.type === 'emoji') {
        return <span className={onlyEmojiClassName}>{children}</span>;
    } else if (span.type === 'text') {
        return <span>{span.text}</span>;
    }

    return props.children ? <span>{props.children}</span> : null;
});

export const SpannedView = React.memo<{ spans: Span[]; isService?: boolean; mId?: string }>(
    (props) => {
        return <>{renderSpans(SpanView, props.spans, props.isService, props.mId)}</>;
    },
);
